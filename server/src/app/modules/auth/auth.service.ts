import { Response } from "express";
import bcrypt from "bcryptjs";
import AppError from "../../helpers/appError";
import User from "../user/user.model";
import { generateJwt, verifyJwt } from "../../utils/jwt";
import { envVars } from "../../config/env";

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
    maxAge: 6000,
    // 24 * 60 * 60 * 1000,
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
  return await User.findById(verifiedToken.userId).select("-password");
};

const refreshToken = async (token: string, res: Response) => {
  console.log(token);
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

export const AuthService = { login, me, refreshToken };
