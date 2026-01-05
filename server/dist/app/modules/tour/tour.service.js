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
const tour_model_1 = __importDefault(require("./tour.model"));
const upload_files_1 = require("../../utils/upload-files");
const createTour = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (req.files) {
        const res = yield (0, upload_files_1.uploadFilesToCloudinary)(req.files, "local-guide");
        payload.images = Array.isArray(res) ? res === null || res === void 0 ? void 0 : res.map((i) => i === null || i === void 0 ? void 0 : i.url) : res === null || res === void 0 ? void 0 : res.url;
    }
    payload.createdBy = req.user.userId;
    return yield tour_model_1.default.create(payload);
});
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tour_model_1.default.findByIdAndUpdate(id, payload.body, { new: true });
    if (!result)
        throw new appError_1.default(404, "Tour not found");
    return result;
});
const getAllTours = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchTerm = query.searchTerm;
    const matchStage = {};
    if (searchTerm) {
        const words = searchTerm.trim().split(/\s+/);
        matchStage.$and = words.map((w) => ({
            $or: [{ title: new RegExp(w, "i") }, { description: new RegExp(w, "i") }],
        }));
    }
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: "trips",
                localField: "_id",
                foreignField: "tourId",
                as: "trips",
            },
        },
        {
            $addFields: {
                totalTrips: { $size: "$trips" },
                totalReviews: { $sum: "$trips.totalReviews" },
                averageRating: {
                    $cond: [
                        { $gt: [{ $sum: "$trips.totalReviews" }, 0] },
                        {
                            $divide: [
                                {
                                    $sum: {
                                        $map: {
                                            input: "$trips",
                                            as: "t",
                                            in: { $multiply: ["$$t.rating", "$$t.totalReviews"] },
                                        },
                                    },
                                },
                                { $sum: "$trips.totalReviews" },
                            ],
                        },
                        0,
                    ],
                },
            },
        },
        { $project: { trips: 0 } },
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                total: [{ $count: "count" }],
            },
        },
    ];
    const result = yield tour_model_1.default.aggregate(pipeline);
    const tours = result[0].data;
    const total = ((_a = result[0].total[0]) === null || _a === void 0 ? void 0 : _a.count) || 0;
    return {
        tours,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSingleTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tour_model_1.default.findById(id);
    if (!tour)
        throw new appError_1.default(404, "Tour not found");
    return tour;
});
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tour_model_1.default.findByIdAndDelete(id);
    if (!tour)
        throw new appError_1.default(404, "Tour not found");
    return tour;
});
exports.TourService = {
    createTour,
    updateTour,
    getAllTours,
    getSingleTour,
    deleteTour,
};
