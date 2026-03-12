"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const httpStatus_1 = require("../../../utils/httpStatus");
const createReview = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const reviewerId = req.user.userId; // from auth middleware
    const review = await review_service_1.ReviewService.createReview({
        reviewerId,
        ...req.body,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.CREATED,
        success: true,
        message: "Review submitted successfully",
        data: review,
    });
});
const getReviews = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { targetId, targetType } = req.params;
    const reviews = await review_service_1.ReviewService.getReviewsByTarget(targetId, targetType);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.OK,
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });
});
const getReviewStats = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { targetId, targetType } = req.params;
    const stats = await review_service_1.ReviewService.getReviewStats(targetId, targetType);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.OK,
        success: true,
        message: "Review stats fetched successfully",
        data: stats,
    });
});
exports.ReviewController = {
    createReview,
    getReviews,
    getReviewStats,
};
