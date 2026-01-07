// utils/DynamicQueryBuilder.ts
import { Model, Document, PipelineStage } from "mongoose";

interface QueryBuilderOptions {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any; // dynamic filters
}

export interface PopulatedModelConfig {
  model: Model<Document>;
  localField: string;
  foreignField?: string;
  filterKeys: string[]; // query keys that belong to this populated model
  searchFields?: string[]; // fields to search in this populated model
  as?: string; // optional output array name
}

export class DynamicQueryBuilder<T extends Document> {
  private model: Model<T>;
  private query: QueryBuilderOptions;
  private pipeline: PipelineStage[];
  private page: number;
  private limit: number;
  private sortBy: string;
  private sortOrder: "asc" | "desc" | 1 | -1;
  private filters: Record<string, any>;

  private populatedConfigs: PopulatedModelConfig[];
  private populatedModels: Set<string>; // Track which models have been populated

  constructor(
    model: Model<T>,
    query: QueryBuilderOptions = {},
    populatedConfigs: PopulatedModelConfig[] = []
  ) {
    this.model = model;
    this.query = query;
    this.pipeline = [];
    this.populatedModels = new Set();

    this.page = Number(query.page || 1);
    this.limit = Number(query.limit || 10);
    this.sortBy = query.sortBy || "createdAt";
    this.sortOrder = query.sortOrder === "asc" ? 1 : -1;

    const { page, limit, sortBy, sortOrder, searchTerm, ...rest } = query;
    this.filters = rest;

    this.populatedConfigs = populatedConfigs;
  }

  /** Helper method to perform lookup and unwind for a populated model */
  private populateModel(cfg: PopulatedModelConfig): void {
    const { model, localField, foreignField, as } = cfg;
    const collectionName = as || model.collection.collectionName;

    // Skip if already populated
    if (this.populatedModels.has(collectionName)) return;

    // $lookup
    this.pipeline.push({
      $lookup: {
        from: model.collection.collectionName,
        localField,
        foreignField: foreignField || "_id",
        as: collectionName,
      },
    });

    // $unwind
    this.pipeline.push({
      $unwind: {
        path: `$${collectionName}`,
        preserveNullAndEmptyArrays: true,
      },
    });

    this.populatedModels.add(collectionName);
  }

  /** Search in multiple fields */
  search(fields: string[]): this {
    if (!this.query.searchTerm || fields.length === 0) return this;

    this.pipeline.push({
      $match: {
        $or: fields.map((field) => ({
          [field]: { $regex: this.query.searchTerm, $options: "i" },
        })),
      },
    });

    return this;
  }

  /** Search in populated model fields */
  searchPopulated(): this {
    if (!this.query.searchTerm) return this;

    const searchConditions: any[] = [];

    this.populatedConfigs.forEach((cfg) => {
      const { model, searchFields, as } = cfg;

      // Skip if no search fields defined for this config
      if (!searchFields || searchFields.length === 0) return;

      const collectionName = as || model.collection.collectionName;

      // Populate the model first
      this.populateModel(cfg);

      // Collect search conditions for this populated model
      searchFields.forEach((field) => {
        searchConditions.push({
          [`${collectionName}.${field}`]: {
            $regex: this.query.searchTerm,
            $options: "i",
          },
        });
      });
    });

    // Apply all search conditions with $or
    if (searchConditions.length > 0) {
      this.pipeline.push({
        $match: {
          $or: searchConditions,
        },
      });
    }

    return this;
  }

  /** Apply filters for main model */
  filter(): this {
    if (Object.keys(this.filters).length > 0) {
      // Only apply keys that are NOT mapped to any populated model
      const mainModelFilters: Record<string, any> = { ...this.filters };
      this.populatedConfigs.forEach((cfg) => {
        cfg.filterKeys.forEach((key) => {
          delete mainModelFilters[key];
        });
      });

      if (Object.keys(mainModelFilters).length > 0) {
        this.pipeline.push({ $match: mainModelFilters });
      }
    }
    return this;
  }

  /** Apply filters for all populated models dynamically */
  filterPopulated(): this {
    this.populatedConfigs.forEach((cfg) => {
      const { model, filterKeys, as } = cfg;
      const collectionName = as || model.collection.collectionName;

      // Populate the model first
      this.populateModel(cfg);

      // Apply filters dynamically
      filterKeys.forEach((key) => {
        if (this.filters[key] !== undefined) {
          this.pipeline.push({
            $match: { [`${collectionName}.${key}`]: this.filters[key] },
          });
          delete this.filters[key];
        }
      });
    });

    return this;
  }

  /** Sorting */
  sort(): this {
    this.pipeline.push({
      $sort: {
        [this.sortBy]:
          this.sortOrder === "asc"
            ? 1
            : this.sortOrder === "desc"
            ? -1
            : this.sortOrder,
      },
    });
    return this;
  }

  /** Pagination */
  paginate(): this {
    const skip = (this.page - 1) * this.limit;
    this.pipeline.push({ $skip: skip });
    this.pipeline.push({ $limit: this.limit });
    return this;
  }

  /** Execute the aggregation */
  async exec() {
    const data = await this.model.aggregate(this.pipeline);

    const countPipeline = this.pipeline.filter(
      (stage) => !("$skip" in stage) && !("$limit" in stage)
    );

    const totalAgg = await this.model.aggregate([
      ...countPipeline,
      { $count: "total" },
    ]);

    return {
      meta: {
        page: this.page,
        limit: this.limit,
        total: parseInt(totalAgg[0]?.total) || 0,
        totalPages: Math.ceil(totalAgg[0]?.total / this.limit) || 0,
      },
      data,
    };
  }
}
