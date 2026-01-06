import express from "express";
import { ReviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createReviewSchema } from "./review.validation";

const reviewRouter = express.Router();

reviewRouter.post(
  "/",
  checkAuth(...Object.values(UserRole)),
  validateRequest(createReviewSchema),
  ReviewController.createReview
);

reviewRouter.get("/:targetType/:targetId", ReviewController.getReviews);

reviewRouter.get(
  "/stats/:targetType/:targetId",
  ReviewController.getReviewStats
);

export default reviewRouter;
