import { Document, Types } from "mongoose";

export type ReviewTargetType = "Tour" | "User";

export interface IReview extends Document {
  reviewerId: Types.ObjectId; // logged-in user
  targetId: Types.ObjectId; // tourId or userId (guide)
  targetType: ReviewTargetType;

  rating: number;
  comment?: string;

  isDeleted: boolean;
}
