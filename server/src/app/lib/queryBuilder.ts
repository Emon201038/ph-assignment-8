/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document, Model } from "mongoose";
import { QueryFilter } from "mongoose";
import { IMeta } from "../utils/sendResponse";

interface QueryParams {
  search?: string;
  sort?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  select?: string;
  populate?: string;
  [key: string]: any;
}

export class QueryBuilder<T extends Document> {
  private model: Model<T>;
  private queryParams: QueryParams;
  private mongooseQuery: any;
  private filters: QueryFilter<T> = {};

  constructor(model: Model<T>, queryParams: Record<string, string>) {
    this.model = model;
    this.queryParams = queryParams;
    this.mongooseQuery = this.model.find();
  }

  filter(): this {
    const excludedFields = [
      "search",
      "searchTerm",
      "sort",
      "sortBy",
      "sortOrder",
      "limit",
      "page",
    ];
    const filters = { ...this.queryParams };

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    excludedFields.forEach((field) => delete filters[field]);

    for (const key in filters) {
      let value = filters[key];

      if (value === "true" || value === "false") {
        filters[key] = value === "true";
      }
      // if the value is "null", null, "undefined", undefined, or empty string → remove this field
      if (
        value === null ||
        value === undefined ||
        value === "null" ||
        value === "undefined" ||
        value === ""
      ) {
        delete filters[key];
        continue;
      }

      filters[key] = value;
    }

    this.filters = { ...this.filters, ...filters };
    this.mongooseQuery = this.model.find(this.filters);
    return this;
  }

  search(fields: string[]): this {
    const keyword = this.queryParams.searchTerm;
    const searchFields: string[] = this.queryParams.searchFields
      ? this.queryParams.searchFields.split(",")
      : fields
      ? fields
      : [];

    if (keyword && searchFields.length > 0) {
      const regex = new RegExp(keyword, "i");
      const searchConditions = searchFields
        .map((field) => {
          const schemaType = this.model.schema.path(field);

          // If the field is ObjectId → match directly
          if (
            schemaType instanceof mongoose.Schema.Types.ObjectId ||
            schemaType?.instance === "ObjectID"
          ) {
            return mongoose.Types.ObjectId.isValid(keyword)
              ? { [field]: new mongoose.Types.ObjectId(keyword) }
              : null; // skip invalid ObjectId
          }

          // Default: String regex search
          return { [field]: { $regex: regex } };
        })
        .filter(Boolean); // remove nulls

      if (searchConditions.length > 0) {
        this.filters = { ...this.filters, $or: searchConditions };
        this.mongooseQuery = this.model.find(this.filters);
      }
    }

    return this;
  }

  sort(field: { [key: string]: string | number }): this {
    const { sortBy, sortOrder } = this.queryParams;

    // if (sort) {
    //   const sortFields = sort.split(",").join(" ");
    //   this.mongooseQuery = this.mongooseQuery.sort(sortFields);
    // } else if (sortBy && sortOrder) {
    //   const order = sortOrder === "desc" ? -1 : 1;
    //   this.mongooseQuery = this.mongooseQuery.sort({ [sortBy]: order });
    // } else {
    this.mongooseQuery = this.mongooseQuery.sort(field);
    // }

    return this;
  }

  paginate(): this {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  populate(fields: string[] = []): this {
    const populateFromQuery = this.queryParams.populate as string;
    const fieldsToPopulate = populateFromQuery
      ? populateFromQuery.split(",")
      : fields.length
      ? fields
      : [];

    fieldsToPopulate.forEach((field) => {
      // Support syntax: "author:name;email" => populate only name, email
      if (field.includes(":")) {
        const [path, select] = field.split(":");
        this.mongooseQuery = this.mongooseQuery.populate({
          path: path.trim(),
          select: select.split(";").join(" "), // allow "name;email"
        });
      } else {
        this.mongooseQuery = this.mongooseQuery.populate(field.trim());
      }
    });

    return this;
  }

  select(fields: string[] = []): this {
    const selectFromQuery = this.queryParams.select;
    const fieldsToSelect = fields.length
      ? fields
      : selectFromQuery
      ? selectFromQuery.split(",")
      : [];

    if (fieldsToSelect.length > 0) {
      const projection = fieldsToSelect.join(" ");
      this.mongooseQuery = this.mongooseQuery.select(projection);
    }

    return this;
  }

  async exec(): Promise<T[]> {
    return this.mongooseQuery;
  }

  async execWithMeta(): Promise<{
    data: T[];
    meta: IMeta;
  }> {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;

    const [data, total] = await Promise.all([
      this.mongooseQuery.exec(),
      this.model.countDocuments(this.filters),
    ]);

    return {
      data,
      meta: {
        total: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
