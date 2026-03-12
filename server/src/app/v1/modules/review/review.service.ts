import { Types } from "mongoose";
import { Review } from "./review.model";
import { IReview } from "./review.interface";

const createReview = async (payload: IReview) => {
  return await Review.create(payload);
};

const getReviewsByTarget = async (
  targetId: string,
  targetType: "Tour" | "User"
) => {
  return await Review.find({
    targetId,
    targetType,
    isDeleted: false,
  })
    .populate("reviewerId", "name profileImage")
    .sort({ createdAt: -1 });
};

const getReviewStats = async (
  targetId: string,
  targetType: "Tour" | "User"
) => {
  const stats = await Review.aggregate([
    {
      $match: {
        targetId: new Types.ObjectId(targetId),
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

  return (
    stats[0] || {
      averageRating: 0,
      totalReviews: 0,
    }
  );
};

export const ReviewService = {
  createReview,
  getReviewsByTarget,
  getReviewStats,
};
