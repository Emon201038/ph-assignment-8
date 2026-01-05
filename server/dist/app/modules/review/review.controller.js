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
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const review_service_1 = require("./review.service");
const getReviews = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Reviews fetched successfully",
        statusCode: 200,
        success: true,
        data: yield review_service_1.ReviewService.getReviews(),
    });
}));
const createReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Review created successfully",
        statusCode: 201,
        success: true,
        data: yield review_service_1.ReviewService.createReview(req.body),
    });
}));
exports.ReviewController = { getReviews, createReview };
