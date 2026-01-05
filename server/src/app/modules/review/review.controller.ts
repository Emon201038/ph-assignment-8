import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const getReviews = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Reviews fetched successfully",
    statusCode: 200,
    success: true,
    data: await ReviewService.getReviews(),
  });
});

const createReview = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Review created successfully",
    statusCode: 201,
    success: true,
    data: await ReviewService.createReview(req.body),
  });
});

export const ReviewController = { getReviews, createReview };
