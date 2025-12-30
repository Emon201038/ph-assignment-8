import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  docId: mongoose.Types.ObjectId;
  refPath: "Tour" | "User";
  rating: number;
  comment: string;
}
