"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourService = void 0;
const appError_1 = __importDefault(require("../../../helpers/appError"));
const tour_model_1 = __importDefault(require("./tour.model"));
const upload_files_1 = require("../../../utils/upload-files");
const queryBuilder_1 = require("../../../lib/queryBuilder");
const createTour = async (req) => {
    const payload = req.body;
    if (req.files) {
        const res = await (0, upload_files_1.uploadFilesToCloudinary)(req.files, "local-guide");
        payload.images = Array.isArray(res) ? res?.map((i) => i?.url) : res?.url;
    }
    payload.createdBy = req.user.userId;
    return await tour_model_1.default.create(payload);
};
const updateTour = async (id, payload) => {
    const result = await tour_model_1.default.findByIdAndUpdate(id, payload.body, { new: true });
    if (!result)
        throw new appError_1.default(404, "Tour not found");
    return result;
};
const getAllTours = async (query) => {
    const builder = new queryBuilder_1.QueryBuilder(tour_model_1.default, query);
    const res = await builder
        .filter()
        .priceRange("price")
        .search(["title", "description"])
        .populate("totalTrips")
        .paginate()
        .sort()
        .execWithMeta();
    return res;
};
const getSingleTour = async (id) => {
    const tour = await tour_model_1.default.findById(id);
    if (!tour)
        throw new appError_1.default(404, "Tour not found");
    return tour;
};
const deleteTour = async (id) => {
    const tour = await tour_model_1.default.findByIdAndDelete(id);
    if (!tour)
        throw new appError_1.default(404, "Tour not found");
    return tour;
};
exports.TourService = {
    createTour,
    updateTour,
    getAllTours,
    getSingleTour,
    deleteTour,
};
