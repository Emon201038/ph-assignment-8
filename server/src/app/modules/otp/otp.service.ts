import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../helpers/appError";
import { generateJwt } from "../../utils/jwt";
import User from "../user/user.model";
import { Otp } from "./otp.model";

const sendOtp = async (email: string) => {
  if (!email) {
    throw new AppError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpDoc = await Otp.findOne({ userId: user._id, isUsed: false });

  if (!otpDoc) {
    const otpDoc = await Otp.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    return otpDoc;
  }
  otpDoc.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  otpDoc.otp = otp;
  await otpDoc.save();
  return otpDoc;
};

const verifyOtp = async (docId: string, otp: number) => {
  if (!docId) {
    throw new AppError(400, "Otp id is required");
  }
  if (!otp) {
    throw new AppError(400, "Otp is required");
  }
  const otpDoc = await Otp.findById(docId);
  if (!otpDoc) {
    throw new AppError(404, "Otp not found");
  }

  console.log(otpDoc);

  if (otpDoc.isUsed) {
    throw new AppError(400, "Otp already used");
  }

  if (otpDoc.expiresAt < new Date(Date.now())) {
    throw new AppError(400, "Otp expired");
  }

  if (otpDoc.otp !== parseInt(otp.toString())) {
    throw new AppError(400, "Invalid otp");
  }

  const token = generateJwt(
    { userId: otpDoc.userId.toString() } as JwtPayload,
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  otpDoc.isUsed = true;
  await otpDoc.save();
  return { token };
};

export const OtpService = { sendOtp, verifyOtp };
