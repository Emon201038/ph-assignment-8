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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
class QueryBuilder {
    constructor(model, queryParams) {
        this.filters = {};
        this.model = model;
        this.queryParams = queryParams;
        this.mongooseQuery = this.model.find();
    }
    filter(excludeFields = []) {
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
        const filters = Object.assign({}, this.queryParams);
        excludedFields.forEach((field) => delete filters[field]);
        for (const key in filters) {
            let value = filters[key];
            // Handle boolean strings
            if (value === "true" || value === "false") {
                filters[key] = value === "true";
                continue;
            }
            // Skip null/undefined/empty values
            if (value === null ||
                value === undefined ||
                value === "null" ||
                value === "undefined" ||
                value === "") {
                delete filters[key];
                continue;
            }
            // Handle comma-separated values (for array fields like interests)
            // Convert "History & Heritage,Nature & Outdoor,Adventure" to array
            if (typeof value === "string" && value.includes(",")) {
                const arrayValues = value.split(",").map((v) => v.trim());
                // Use $in operator for array matching
                filters[key] = { $in: arrayValues };
            }
            else {
                filters[key] = value;
            }
        }
        this.filters = Object.assign(Object.assign({}, this.filters), filters);
        this.mongooseQuery = this.model.find(this.filters);
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
    filterPopulated(refModel_1, localField_1, filterFields_1) {
        return __awaiter(this, arguments, void 0, function* (refModel, localField, filterFields, foreignField = "_id") {
            const refFilters = {};
            // Extract filters that apply to the referenced model
            for (const [paramKey, refFieldName] of Object.entries(filterFields)) {
                const value = this.queryParams[paramKey];
                if (value !== null &&
                    value !== undefined &&
                    value !== "null" &&
                    value !== "undefined" &&
                    value !== "") {
                    // Handle boolean conversion
                    if (value === "true" || value === "false") {
                        refFilters[refFieldName] = value === "true";
                    }
                    // Handle comma-separated values
                    else if (typeof value === "string" && value.includes(",")) {
                        const arrayValues = value.split(",").map((v) => v.trim());
                        refFilters[refFieldName] = { $in: arrayValues };
                    }
                    else {
                        refFilters[refFieldName] = value;
                    }
                }
            }
            // If no filters apply to referenced model, skip this step
            if (Object.keys(refFilters).length === 0) {
                return this;
            }
            // Find matching documents from the referenced model
            const matchingRefs = yield refModel.find(refFilters).select(foreignField);
            // Extract the values from the foreignField
            const matchingValues = matchingRefs.map((doc) => doc[foreignField]);
            if (matchingValues.length > 0) {
                // Check if there's already a filter on this localField
                const existingFilter = this.filters[localField];
                if (existingFilter && existingFilter.$in) {
                    // If there's already a filter (from searchPopulated or previous filterPopulated),
                    // intersect the two arrays (AND logic)
                    const existingIds = existingFilter.$in.map((id) => id.toString());
                    const newIds = matchingValues.map((id) => id.toString());
                    const intersection = existingIds.filter((id) => newIds.includes(id));
                    if (intersection.length > 0) {
                        this.filters = Object.assign(Object.assign({}, this.filters), { [localField]: {
                                $in: intersection.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                            } });
                    }
                    else {
                        // No intersection - return empty result
                        this.filters = Object.assign(Object.assign({}, this.filters), { _id: { $in: [] } });
                    }
                }
                else {
                    // No existing filter, just add the new one
                    this.filters = Object.assign(Object.assign({}, this.filters), { [localField]: { $in: matchingValues } });
                }
                this.mongooseQuery = this.model.find(this.filters);
            }
            else {
                // No matches found - return empty result
                this.filters = Object.assign(Object.assign({}, this.filters), { _id: { $in: [] } });
                this.mongooseQuery = this.model.find(this.filters);
            }
            return this;
        });
    }
    search(fields, populateField) {
        const keyword = this.queryParams.searchTerm;
        if (!keyword || fields.length === 0)
            return this;
        const regex = new RegExp(keyword, "i");
        let searchConditions = fields.map((field) => {
            if (populateField) {
                return { [`${populateField}.${field}`]: { $regex: regex } };
            }
            return { [field]: { $regex: regex } };
        });
        this.filters = Object.assign(Object.assign({}, this.filters), { $or: searchConditions });
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
    searchPopulated(refModel_1, localField_1, searchFields_1) {
        return __awaiter(this, arguments, void 0, function* (refModel, localField, searchFields, foreignField = "_id") {
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
            const matchingRefs = yield refModel
                .find({ $or: searchConditions })
                .select(foreignField);
            // Extract the values from the foreignField
            const matchingValues = matchingRefs.map((doc) => doc[foreignField]);
            if (matchingValues.length > 0) {
                // Add to existing filters
                this.filters = Object.assign(Object.assign({}, this.filters), { [localField]: { $in: matchingValues } });
                this.mongooseQuery = this.model.find(this.filters);
            }
            else {
                // No matches found - return empty result
                this.filters = Object.assign(Object.assign({}, this.filters), { _id: null });
                this.mongooseQuery = this.model.find(this.filters);
            }
            return this;
        });
    }
    sort(field) {
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
    paginate() {
        const page = Number(this.queryParams.page) || 1;
        const limit = Number(this.queryParams.limit) || 10;
        const skip = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
    populate(fields, renameFields) {
        // Handle if fields is a string (single field)
        const fieldsArray = !fields
            ? []
            : typeof fields === "string"
                ? [fields]
                : fields;
        const populateFromQuery = this.queryParams.populate;
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
            }
            else {
                const actualPath = field.trim();
                this.mongooseQuery = this.mongooseQuery.populate(actualPath);
            }
        });
        // Store rename configuration for post-processing
        if (renameFields) {
            this.mongooseQuery.__renameFields = renameFields;
        }
        return this;
    }
    select(fields = []) {
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
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.mongooseQuery;
            return this.applyFieldRenames(results);
        });
    }
    execWithMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(this.queryParams.page) || 1;
            const limit = Number(this.queryParams.limit) || 10;
            const [data, total] = yield Promise.all([
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
        });
    }
    /**
     * Apply field renaming to results based on renameFields configuration
     */
    applyFieldRenames(results) {
        const renameFields = this.mongooseQuery.__renameFields;
        if (!renameFields || Object.keys(renameFields).length === 0) {
            return results;
        }
        return results.map((doc) => {
            const plainDoc = doc.toObject ? doc.toObject() : doc;
            const renamedDoc = Object.assign({}, plainDoc);
            Object.entries(renameFields).forEach(([oldKey, newKey]) => {
                if (oldKey in renamedDoc) {
                    renamedDoc[newKey] = renamedDoc[oldKey];
                    delete renamedDoc[oldKey];
                }
            });
            return renamedDoc;
        });
    }
}
exports.QueryBuilder = QueryBuilder;
