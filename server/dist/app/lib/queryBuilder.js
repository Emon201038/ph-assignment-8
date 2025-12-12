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
    filter() {
        const excludedFields = [
            "search",
            "sort",
            "sortBy",
            "sortOrder",
            "limit",
            "page",
        ];
        const filters = Object.assign({}, this.queryParams);
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        excludedFields.forEach((field) => delete filters[field]);
        for (const key in filters) {
            let value = filters[key];
            if (value === "true" || value === "false") {
                filters[key] = value === "true";
            }
            // if the value is "null", null, "undefined", undefined, or empty string → remove this field
            if (value === null ||
                value === undefined ||
                value === "null" ||
                value === "undefined" ||
                value === "") {
                delete filters[key];
                continue;
            }
            filters[key] = value;
        }
        this.filters = Object.assign(Object.assign({}, this.filters), filters);
        this.mongooseQuery = this.model.find(this.filters);
        return this;
    }
    search(fields) {
        const keyword = this.queryParams.search;
        const searchFields = this.queryParams.searchFields
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
                if (schemaType instanceof mongoose_1.default.Schema.Types.ObjectId ||
                    (schemaType === null || schemaType === void 0 ? void 0 : schemaType.instance) === "ObjectID") {
                    return mongoose_1.default.Types.ObjectId.isValid(keyword)
                        ? { [field]: new mongoose_1.default.Types.ObjectId(keyword) }
                        : null; // skip invalid ObjectId
                }
                // Default: String regex search
                return { [field]: { $regex: regex } };
            })
                .filter(Boolean); // remove nulls
            if (searchConditions.length > 0) {
                this.filters = Object.assign(Object.assign({}, this.filters), { $or: searchConditions });
                this.mongooseQuery = this.model.find(this.filters);
            }
        }
        return this;
    }
    sort(field) {
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
    paginate() {
        const page = Number(this.queryParams.page) || 1;
        const limit = Number(this.queryParams.limit) || 10;
        const skip = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
    populate(fields = []) {
        const populateFromQuery = this.queryParams.populate;
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
            }
            else {
                this.mongooseQuery = this.mongooseQuery.populate(field.trim());
            }
        });
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
            return this.mongooseQuery;
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
                data,
                meta: {
                    totalResult: total,
                    page,
                    limit,
                    totalPage: Math.ceil(total / limit),
                },
            };
        });
    }
}
exports.QueryBuilder = QueryBuilder;
