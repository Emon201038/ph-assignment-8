"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const mongoose_1 = require("mongoose");
const review_model_1 = require("./review.model");
const createReview = async (payload) => {
    return await review_model_1.Review.create(payload);
};
const getReviewsByTarget = async (targetId, targetType) => {
    return await review_model_1.Review.find({
        targetId,
        targetType,
        isDeleted: false,
    })
        .populate("reviewerId", "name profileImage")
        .sort({ createdAt: -1 });
};
const getReviewStats = async (targetId, targetType) => {
    const stats = await review_model_1.Review.aggregate([
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
};
exports.ReviewService = {
    createReview,
    getReviewsByTarget,
    getReviewStats,
};
