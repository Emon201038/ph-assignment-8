import { Document, Types } from "mongoose";

export interface IOtp extends Document {
  userId: Types.ObjectId;
  otp: number;
  isUsed: boolean;
  createdAt: Date;
  expiresAt: Date;
}
