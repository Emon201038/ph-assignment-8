import { Response } from "express";
import bcrypt from "bcryptjs";
import AppError from "../../../helpers/appError";
import { generateJwt, verifyJwt } from "../../../utils/jwt";
import { envVars } from "../../../config/env";
import { sendEmail } from "../../../utils/sendEmail";
import prisma from "../../../config/db";
import { AuthProvider } from "../../../../../prisma/generated/enums";

const login = async (res: Response, email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(404, "No user found");
  }

  // Check if user has password (for credential providers)
  if (!user.password) {
    throw new AppError(
      400,
      "This account uses a provider login. Please use the provider to sign in.",
    );
  }

  const isPassMatched = await bcrypt.compare(password, user.password);
  if (!isPassMatched) {
    throw new AppError(400, "Incorrect password");
  }

  const accessToken = generateJwt(
    {
      userId: user.id,
      role: user.role,
      email: user.email,
    },
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN,
  );

  const refreshToken = generateJwt(
    {
      userId: user.id,
      role: user.role,
      email: user.email,
    },
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES_IN,
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
};

const loginWithProvider = async (
  res: Response,
  email: string,
  name: string,
  provider: AuthProvider,
  providerId: string,
  avatar?: string,
) => {
  let user = await prisma.user.findUnique({ where: { email } });

  // Create new user if doesn't exist
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        provider,
        providerId,
        avatar: avatar || null,
        city: "",
        country: "",
        password: null,
      },
    });
  } else {
    // Update provider info if user already exists
    if (!user.provider) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          provider,
          providerId,
          avatar: avatar || user.avatar,
        },
      });
    }
  }

  const accessToken = generateJwt(
    {
      userId: user.id,
      role: user.role,
      email: user.email,
    },
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN,
  );

  const refreshToken = generateJwt(
    {
      userId: user.id,
      role: user.role,
      email: user.email,
    },
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES_IN,
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

  return user;
};

const me = async (accessToken: string) => {
  const verifiedToken = verifyJwt(accessToken, envVars.JWT_ACCESS_TOKEN_SECRET);
  if (typeof verifiedToken === "string") {
    throw new AppError(400, "Failed to verify token");
  }

  const user = await prisma.user.findUnique({
    where: { id: verifiedToken.userId },
    include: { guideProfile: true, travelerProfile: true },
    omit: { password: true },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Remove password from response
  const { guideProfile, travelerProfile, ...userWithoutPassword } = user;
  return {
    profile: guideProfile || travelerProfile || null,
    ...userWithoutPassword,
  };
};

const refreshTokenService = async (token: string, res: Response) => {
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
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN,
  );

  const newRefreshToken = generateJwt(
    {
      userId: verifiedToken.userId,
      role: verifiedToken.role,
      email: verifiedToken.email,
    },
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES_IN,
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });

  res.cookie("refreshToken", newRefreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });

  return { refreshToken: newRefreshToken, accessToken };
};

const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(404, "No user found");
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Note: You may want to create an OTP model in Prisma schema
  // For now, storing OTP in memory or Redis would be recommended
  // Store OTP temporarily (implementation depends on your OTP storage strategy)
  const otpData = {
    userId: user.id,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  };

  // Send OTP to user's email
  await sendEmail({
    to: user.email,
    subject: "Forgot Password",
    templateName: "reset-password",
    templateData: { otp, name: user.name, email: user.email },
  });

  return otpData;
};

const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string,
) => {
  const verifiedToken = verifyJwt(token, envVars.JWT_ACCESS_TOKEN_SECRET);
  if (typeof verifiedToken === "string") {
    throw new AppError(400, "Failed to verify token");
  }

  const user = await prisma.user.findUnique({
    where: { id: verifiedToken.userId },
  });

  if (!user) {
    throw new AppError(404, "No user found");
  }

  if (!user.password) {
    throw new AppError(
      400,
      "Cannot reset password for provider-based accounts",
    );
  }

  const isPassMatched = await bcrypt.compare(confirmPassword, user.password);
  if (!isPassMatched) {
    throw new AppError(400, "Incorrect password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return updatedUser;
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "No user found");
  }

  if (!user.password) {
    throw new AppError(
      400,
      "Cannot change password for provider-based accounts",
    );
  }

  const isPassMatched = await bcrypt.compare(oldPassword, user.password);
  if (!isPassMatched) {
    throw new AppError(400, "Incorrect password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return updatedUser;
};

export const AuthService = {
  login,
  loginWithProvider,
  me,
  refreshTokenService,
  forgotPassword,
  resetPassword,
  changePassword,
};
