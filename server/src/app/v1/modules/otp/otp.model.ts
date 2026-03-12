import { model, Schema } from "mongoose";
import { IOtp } from "./otp.interface";

const otpSchema = new Schema<IOtp>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  otp: { type: Number, required: true },
  isUsed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: Date.now },
});

export const Otp = model<IOtp>("Otp", otpSchema);
