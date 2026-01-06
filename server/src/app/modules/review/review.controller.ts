import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../utils/httpStatus";

const createReview = catchAsync(async (req, res, next) => {
  const reviewerId = req.user.userId; // from auth middleware

  const review = await ReviewService.createReview({
    reviewerId,
    ...req.body,
  });

  sendResponse(res, {
    statusCode: HTTP_STATUS.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
});

const getReviews = catchAsync(async (req, res, next) => {
  const { targetId, targetType } = req.params;

  const reviews = await ReviewService.getReviewsByTarget(
    targetId,
    targetType as "Tour" | "User"
  );

  sendResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: reviews,
  });
});

const getReviewStats = catchAsync(async (req, res, next) => {
  const { targetId, targetType } = req.params;

  const stats = await ReviewService.getReviewStats(
    targetId,
    targetType as "Tour" | "User"
  );

  sendResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: "Review stats fetched successfully",
    data: stats,
  });
});

export const ReviewController = {
  createReview,
  getReviews,
  getReviewStats,
};
