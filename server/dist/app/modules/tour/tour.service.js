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
exports.TourService = void 0;
const appError_1 = __importDefault(require("../../helpers/appError"));
const queryBuilder_1 = require("../../middlewares/queryBuilder");
const tour_model_1 = __importDefault(require("./tour.model"));
exports.TourService = {
    createTour(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tour_model_1.default.create(payload);
        });
    },
    updateTour(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield tour_model_1.default.findByIdAndUpdate(id, payload, { new: true });
            if (!result)
                throw new appError_1.default(404, "Tour not found");
            return result;
        });
    },
    getAllTours(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new queryBuilder_1.QueryBuilder(tour_model_1.default, query);
            const res = yield builder
                .filter()
                .search(["title", "description", "tag"])
                .paginate()
                .execWithMeta();
            return { tours: res.data, meta: res.meta };
        });
    },
    getSingleTour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tour = yield tour_model_1.default.findById(id).populate("guide");
            if (!tour)
                throw new appError_1.default(404, "Tour not found");
            return tour;
        });
    },
    deleteTour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tour = yield tour_model_1.default.findByIdAndDelete(id);
            if (!tour)
                throw new appError_1.default(404, "Tour not found");
            return tour;
        });
    },
};
