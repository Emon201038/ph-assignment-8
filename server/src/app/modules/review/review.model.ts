import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },

    targetType: {
      type: String,
      enum: ["Tour", "User"],
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate review:
 * One user can review a Tour/User only once
 */
reviewSchema.index(
  { reviewerId: 1, targetId: 1, targetType: 1 },
  { unique: true }
);

export const Review = model<IReview>("Review", reviewSchema);
