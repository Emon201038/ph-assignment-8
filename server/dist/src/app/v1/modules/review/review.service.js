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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const mongoose_1 = require("mongoose");
const review_model_1 = require("./review.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.create(payload);
});
const getReviewsByTarget = (targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.find({
        targetId,
        targetType,
        isDeleted: false,
    })
        .populate("reviewerId", "name profileImage")
        .sort({ createdAt: -1 });
});
const getReviewStats = (targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield review_model_1.Review.aggregate([
        {
            $match: {
                targetId: new mongoose_1.Types.ObjectId(targetId),
                targetType,
                isDeleted: false,
            },
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
            },
        },
    ]);
    return (stats[0] || {
        averageRating: 0,
        totalReviews: 0,
    });
});
exports.ReviewService = {
    createReview,
    getReviewsByTarget,
    getReviewStats,
};
