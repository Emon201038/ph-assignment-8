import { Schema, model, Types } from "mongoose";
import { IReview, ReviewTargetType } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    target: {
      type: Types.ObjectId,
      required: true,
      index: true,
    },

    targetType: {
      type: String,
      enum: Object.values(ReviewTargetType),
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });

export const Review = model("Review", reviewSchema);
