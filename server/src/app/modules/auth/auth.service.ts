import { Response } from "express";
import bcrypt from "bcryptjs";
import AppError from "../../helpers/appError";
import User from "../user/user.model";
import { generateJwt, verifyJwt } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { Otp } from "../otp/otp.model";
import { sendEmail } from "../../utils/sendEmail";

const login = async (res: Response, email: string, password: string) => {
  const isExists = await User.findOne({ email });
  if (!isExists || isExists.isDeleted) {
    throw new AppError(404, "No user found");
  }

  if (isExists.isBlocked) {
    throw new AppError(
      400,
      "Your account has been blocked. Contact admin to solve this issue"
    );
  }

  const isPassMatched = await bcrypt.compare(password, isExists.password);
  if (!isPassMatched) {
    throw new AppError(400, "Incorrect password");
  }

  const accessToken = generateJwt(
    {
      userId: isExists._id.toString(),
      role: isExists.role,
      email: isExists.email,
    },
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN
  );
  const refreshToken = generateJwt(
    {
      userId: isExists._id.toString(),
      role: isExists.role,
      email: isExists.email,
    },
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES_IN
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    // 6000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
};

const me = async (accessToken: string) => {
  const verifiedToken = verifyJwt(accessToken, envVars.JWT_ACCESS_TOKEN_SECRET);
  if (typeof verifiedToken === "string") {
    throw new AppError(400, "Failed to verify token");
  }
  return await User.findById(verifiedToken.userId)
    .select("-password")
    .populate("profile");
};

const refreshToken = async (token: string, res: Response) => {
  const verifiedToken = verifyJwt(token, envVars.JWT_REFRESH_TOKEN_SECRET);
  if (typeof verifiedToken === "string") {
    throw new AppError(400, "Failed to verify token");
  }
  const accessToken = generateJwt(
    {
      userId: verifiedToken.userId,
      role: verifiedToken.role,
      email: verifiedToken.email,
    },
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  const refreshToken = generateJwt(
    {
      userId: verifiedToken.userId,
      role: verifiedToken.role,
      email: verifiedToken.email,
    },
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES_IN
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });

  return { refreshToken, accessToken };
};

const forgotPassword = async (email: string) => {
  const isExists = await User.findOne({ email });
  if (!isExists) {
    throw new AppError(404, "No user found");
  }

  // create 6 digit random number for otp
  const otp = Math.floor(100000 + Math.random() * 900000);

  const otpDoc = await Otp.create({
    userId: isExists._id,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  if (!otpDoc) {
    throw new AppError(400, "Failed to create otp");
  }

  // send otp to user's email
  await sendEmail({
    to: isExists.email,
    subject: "Forgot Password",
    templateName: "reset-password",
    templateData: { otp, name: isExists.name, email: isExists.email },
  });
  return otpDoc;
};

const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  console.log(token, confirmPassword, newPassword);
  const verifiedToken = verifyJwt(token, envVars.JWT_ACCESS_TOKEN_SECRET);
  if (typeof verifiedToken === "string") {
    throw new AppError(400, "Failed to verify token");
  }

  const isExists = await User.findById(verifiedToken.userId);
  if (!isExists) {
    throw new AppError(404, "No user found");
  }

  const isPassMatched = await bcrypt.compare(
    confirmPassword,
    isExists.password
  );
  if (!isPassMatched) {
    throw new AppError(400, "Incorrect password");
  }

  isExists.password = newPassword;
  await isExists.save();
  return isExists;
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const isExists = await User.findById(userId);
  if (!isExists) {
    throw new AppError(404, "No user found");
  }

  const isPassMatched = await bcrypt.compare(oldPassword, isExists.password);
  if (!isPassMatched) {
    throw new AppError(400, "Incorrect password");
  }

  isExists.password = newPassword;
  await isExists.save();
  return isExists;
};

export const AuthService = {
  login,
  me,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
