import { Review } from "./review.model";

const getReviews = async () => {
  return await Review.find();
};

const createReview = async (data: any) => {
  return await Review.create(data);
};

export const ReviewService = { getReviews, createReview };
