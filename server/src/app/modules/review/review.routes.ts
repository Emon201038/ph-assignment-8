import express from "express";
import { ReviewController } from "./review.controller";
const reviewRouter = express.Router();

reviewRouter.get("/", ReviewController.getReviews);

export default reviewRouter;
