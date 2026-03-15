"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicQueryBuilder = void 0;
class DynamicQueryBuilder {
    constructor(model, query = {}, populatedConfigs = []) {
        this.model = model;
        this.query = query;
        this.pipeline = [];
        this.populatedModels = new Set();
        this.page = Number(query.page || 1);
        this.limit = Number(query.limit || 10);
        this.sortBy = query.sortBy || "createdAt";
        this.sortOrder = query.sortOrder === "asc" ? 1 : -1;
        const { page, limit, sortBy, sortOrder, searchTerm } = query, rest = __rest(query, ["page", "limit", "sortBy", "sortOrder", "searchTerm"]);
        this.filters = rest;
        this.populatedConfigs = populatedConfigs;
    }
    /** Helper method to perform lookup and unwind for a populated model */
    populateModel(cfg) {
        const { model, localField, foreignField, as } = cfg;
        const collectionName = as || model.collection.collectionName;
        // Skip if already populated
        if (this.populatedModels.has(collectionName))
            return;
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
    search(fields) {
        if (!this.query.searchTerm || fields.length === 0)
            return this;
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
    searchPopulated() {
        if (!this.query.searchTerm)
            return this;
        const searchConditions = [];
        this.populatedConfigs.forEach((cfg) => {
            const { model, searchFields, as } = cfg;
            // Skip if no search fields defined for this config
            if (!searchFields || searchFields.length === 0)
                return;
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
    filter() {
        if (Object.keys(this.filters).length > 0) {
            // Only apply keys that are NOT mapped to any populated model
            const mainModelFilters = Object.assign({}, this.filters);
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
    filterPopulated() {
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
    sort() {
        this.pipeline.push({
            $sort: {
                [this.sortBy]: this.sortOrder === "asc"
                    ? 1
                    : this.sortOrder === "desc"
                        ? -1
                        : this.sortOrder,
            },
        });
        return this;
    }
    /** Pagination */
    paginate() {
        const skip = (this.page - 1) * this.limit;
        this.pipeline.push({ $skip: skip });
        this.pipeline.push({ $limit: this.limit });
        return this;
    }
    /** Execute the aggregation */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const data = yield this.model.aggregate(this.pipeline);
            const countPipeline = this.pipeline.filter((stage) => !("$skip" in stage) && !("$limit" in stage));
            const totalAgg = yield this.model.aggregate([
                ...countPipeline,
                { $count: "total" },
            ]);
            return {
                meta: {
                    page: this.page,
                    limit: this.limit,
                    total: parseInt((_a = totalAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
                    totalPages: Math.ceil(((_b = totalAgg[0]) === null || _b === void 0 ? void 0 : _b.total) / this.limit) || 0,
                },
                data,
            };
        });
    }
}
exports.DynamicQueryBuilder = DynamicQueryBuilder;
