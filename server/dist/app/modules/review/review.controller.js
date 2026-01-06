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
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatus_1 = require("../../utils/httpStatus");
const createReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewerId = req.user.userId; // from auth middleware
    const review = yield review_service_1.ReviewService.createReview(Object.assign({ reviewerId }, req.body));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.CREATED,
        success: true,
        message: "Review submitted successfully",
        data: review,
    });
}));
const getReviews = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetId, targetType } = req.params;
    const reviews = yield review_service_1.ReviewService.getReviewsByTarget(targetId, targetType);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.OK,
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });
}));
const getReviewStats = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetId, targetType } = req.params;
    const stats = yield review_service_1.ReviewService.getReviewStats(targetId, targetType);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.OK,
        success: true,
        message: "Review stats fetched successfully",
        data: stats,
    });
}));
exports.ReviewController = {
    createReview,
    getReviews,
    getReviewStats,
};
