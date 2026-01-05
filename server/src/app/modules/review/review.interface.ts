import mongoose, { Document } from "mongoose";

export enum ReviewTargetType {
  TOUR = "TOUR",
  GUIDE = "GUIDE",
}

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  target: mongoose.Types.ObjectId;
  targetType: ReviewTargetType;
  rating: number;
  comment: string;
  isDeleted: boolean;
}
