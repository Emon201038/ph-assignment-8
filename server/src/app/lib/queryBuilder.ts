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

  filter(excludeFields: string[] = []): this {
    const excludedFields = [
      "search",
      "searchTerm",
      "sort",
      "sortBy",
      "sortOrder",
      "limit",
      "page",
      "populate",
      ...excludeFields, // Add custom excluded fields
    ];
    const filters = { ...this.queryParams };

    excludedFields.forEach((field) => delete filters[field]);

    for (const key in filters) {
      let value = filters[key];

      // Handle boolean strings
      if (value === "true" || value === "false") {
        filters[key] = value === "true";
        continue;
      }

      // Skip null/undefined/empty values
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

      // Handle comma-separated values (for array fields like interests)
      // Convert "History & Heritage,Nature & Outdoor,Adventure" to array
      if (typeof value === "string" && value.includes(",")) {
        const arrayValues = value.split(",").map((v) => v.trim());
        // Use $in operator for array matching
        filters[key] = { $in: arrayValues };
      } else {
        filters[key] = value;
      }
    }

    this.filters = { ...this.filters, ...filters };
    this.mongooseQuery = this.model.find(this.filters);

    console.log(this.filters, this.queryParams, filters);
    return this;
  }

  /**
   * Filter by fields in a referenced/populated model
   * Use this when you need to filter by fields in a referenced model
   *
   * @param refModel - The referenced model (e.g., User model)
   * @param localField - The field in current model that references (e.g., 'userId')
   * @param filterFields - Object mapping query param names to ref model fields
   *                       e.g., { gender: 'gender', userRole: 'role' }
   * @param foreignField - The field in referenced model to match against (default: '_id')
   */
  async filterPopulated(
    refModel: Model<any>,
    localField: string,
    filterFields: Record<string, string>,
    foreignField: string = "_id"
  ): Promise<this> {
    const refFilters: Record<string, any> = {};

    // Extract filters that apply to the referenced model
    for (const [paramKey, refFieldName] of Object.entries(filterFields)) {
      const value = this.queryParams[paramKey];
      if (
        value !== null &&
        value !== undefined &&
        value !== "null" &&
        value !== "undefined" &&
        value !== ""
      ) {
        // Handle boolean conversion
        if (value === "true" || value === "false") {
          refFilters[refFieldName] = value === "true";
        }
        // Handle comma-separated values
        else if (typeof value === "string" && value.includes(",")) {
          const arrayValues = value.split(",").map((v: string) => v.trim());
          refFilters[refFieldName] = { $in: arrayValues };
        } else {
          refFilters[refFieldName] = value;
        }
      }
    }

    // If no filters apply to referenced model, skip this step
    if (Object.keys(refFilters).length === 0) {
      return this;
    }

    // Find matching documents from the referenced model
    const matchingRefs = await refModel.find(refFilters).select(foreignField);

    // Extract the values from the foreignField
    const matchingValues = matchingRefs.map((doc) => doc[foreignField]);

    if (matchingValues.length > 0) {
      // Check if there's already a filter on this localField
      const existingFilter = this.filters[localField];

      if (existingFilter && existingFilter.$in) {
        // If there's already a filter (from searchPopulated or previous filterPopulated),
        // intersect the two arrays (AND logic)
        const existingIds = existingFilter.$in.map((id: any) => id.toString());
        const newIds = matchingValues.map((id: any) => id.toString());
        const intersection = existingIds.filter((id: string) =>
          newIds.includes(id)
        );

        if (intersection.length > 0) {
          this.filters = {
            ...this.filters,
            [localField]: {
              $in: intersection.map(
                (id: string) => new mongoose.Types.ObjectId(id)
              ),
            },
          };
        } else {
          // No intersection - return empty result
          this.filters = { ...this.filters, _id: { $in: [] } };
        }
      } else {
        // No existing filter, just add the new one
        this.filters = {
          ...this.filters,
          [localField]: { $in: matchingValues },
        };
      }

      this.mongooseQuery = this.model.find(this.filters);
    } else {
      // No matches found - return empty result
      this.filters = { ...this.filters, _id: { $in: [] } };
      this.mongooseQuery = this.model.find(this.filters);
    }

    return this;
  }

  search(fields: string[], populateField?: string): this {
    const keyword = this.queryParams.searchTerm;
    if (!keyword || fields.length === 0) return this;

    const regex = new RegExp(keyword, "i");

    let searchConditions = fields.map((field) => {
      if (populateField) {
        return { [`${populateField}.${field}`]: { $regex: regex } };
      }
      return { [field]: { $regex: regex } };
    });

    this.filters = { ...this.filters, $or: searchConditions };
    this.mongooseQuery = this.model.find(this.filters);

    return this;
  }

  /**
   * Search across a referenced/populated field using aggregation lookup
   * Use this when you need to search by fields in a referenced model
   *
   * @param refModel - The referenced model (e.g., User model)
   * @param localField - The field in current model that references (e.g., 'userId')
   * @param searchFields - Fields to search in the referenced model (e.g., ['name', 'email'])
   * @param foreignField - The field in referenced model to match against (default: '_id')
   */
  async searchPopulated(
    refModel: Model<any>,
    localField: string,
    searchFields: string[],
    foreignField: string = "_id"
  ): Promise<this> {
    const keyword = this.queryParams.searchTerm;
    if (!keyword || searchFields.length === 0) {
      return this;
    }
    const regex = new RegExp(keyword, "i");

    // Find matching documents from the referenced model
    const searchConditions = searchFields.map((field) => ({
      [field]: { $regex: regex },
    }));

    // Select only the foreignField to get matching values
    const matchingRefs = await refModel
      .find({ $or: searchConditions })
      .select(foreignField);

    // Extract the values from the foreignField
    const matchingValues = matchingRefs.map((doc) => doc[foreignField]);

    if (matchingValues.length > 0) {
      // Add to existing filters
      this.filters = {
        ...this.filters,
        [localField]: { $in: matchingValues },
      };
      this.mongooseQuery = this.model.find(this.filters);
    } else {
      // No matches found - return empty result
      this.filters = { ...this.filters, _id: null };
      this.mongooseQuery = this.model.find(this.filters);
    }
    return this;
  }

  sort(field?: { [key: string]: string | number }): this {
    const { sortBy, sortOrder } = this.queryParams;

    // Priority 1: Check if sortBy and sortOrder exist in queryParams
    if (sortBy && sortOrder) {
      const order = sortOrder === "desc" ? -1 : 1;
      this.mongooseQuery = this.mongooseQuery.sort({ [sortBy]: order });
    }
    // Priority 2: Use provided field parameter
    else if (field && Object.keys(field).length > 0) {
      this.mongooseQuery = this.mongooseQuery.sort(field);
    }
    // Priority 3: Default sorting
    else {
      this.mongooseQuery = this.mongooseQuery.sort({ createdAt: -1 });
    }

    return this;
  }

  paginate(): this {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  populate(
    fields?: string[] | string,
    renameFields?: Record<string, string>
  ): this {
    // Handle if fields is a string (single field)
    const fieldsArray: string[] = !fields
      ? []
      : typeof fields === "string"
      ? [fields]
      : fields;

    const populateFromQuery = this.queryParams.populate as string;
    const fieldsToPopulate = populateFromQuery
      ? populateFromQuery.split(",")
      : fieldsArray.length
      ? fieldsArray
      : [];

    fieldsToPopulate.forEach((field) => {
      // Support syntax: "author:name;email" => populate only name, email
      if (field.includes(":")) {
        const [path, select] = field.split(":");
        const actualPath = path.trim();

        this.mongooseQuery = this.mongooseQuery.populate({
          path: actualPath,
          select: select.split(";").join(" "),
        });
      } else {
        const actualPath = field.trim();
        this.mongooseQuery = this.mongooseQuery.populate(actualPath);
      }
    });

    // Store rename configuration for post-processing
    if (renameFields) {
      (this.mongooseQuery as any).__renameFields = renameFields;
    }

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
    const results = await this.mongooseQuery;
    return this.applyFieldRenames(results);
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
      data: this.applyFieldRenames(data),
      meta: {
        total: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Apply field renaming to results based on renameFields configuration
   */
  private applyFieldRenames(results: T[]): T[] {
    const renameFields = (this.mongooseQuery as any).__renameFields;

    if (!renameFields || Object.keys(renameFields).length === 0) {
      return results;
    }

    return results.map((doc) => {
      const plainDoc = doc.toObject ? doc.toObject() : doc;
      const renamedDoc: any = { ...plainDoc };

      Object.entries(renameFields).forEach(([oldKey, newKey]) => {
        if (oldKey in renamedDoc) {
          renamedDoc[newKey as string] = renamedDoc[oldKey];
          delete renamedDoc[oldKey];
        }
      });

      return renamedDoc as T;
    });
  }
}
