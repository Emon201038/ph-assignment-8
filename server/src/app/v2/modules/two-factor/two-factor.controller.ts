import AppError from "../../../helpers/appError";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { TwoFactorService } from "./two-factor.service";

const register2fa = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError(404, "No user found");
  }
  sendResponse(res, {
    statusCode: 200,
    message: "2FA registered successfully",
    success: true,
    data: await TwoFactorService.enable2FA(
      user.userId,
      user.email,
      req.body.method,
    ),
  });
});

const sendOtp = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError(404, "No user found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Otp sent successfully",
    success: true,
    data: await TwoFactorService.sendOtp(
      user.userId,
      req.body.email,
      req.query?.doc_id as string,
    ),
  });
});

const verifyEmailOtp = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError(404, "No user found");
  }
  sendResponse(res, {
    statusCode: 200,
    message: "Otp verified successfully",
    success: true,
    data: await TwoFactorService.verifyEmailOtp(
      user.userId,
      req.body.otp,
      req.body.id,
    ),
  });
});
const verifyTotpOtp = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError(404, "No user found");
  }
  const otp = req.body.otp;
  if (!otp) {
    throw new AppError(400, "Otp is required");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Otp verified successfully",
    success: true,
    data: await TwoFactorService.verifyTotpOtp(user.userId, req.body.otp),
  });
});

const disable2fa = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError(404, "No user found");
  }
  sendResponse(res, {
    statusCode: 200,
    message: "2FA disabled successfully",
    success: true,
    data: await TwoFactorService.disable2FA(user.userId),
  });
});

const get2fa = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new AppError(404, "No user found");
  }
  sendResponse(res, {
    statusCode: 200,
    message: "2FA fetched successfully",
    success: true,
    data: await TwoFactorService.get2FA(user.userId),
  });
});

export const TwoFactorController = {
  register2fa,
  sendOtp,
  verifyEmailOtp,
  verifyTotpOtp,
  disable2fa,
  get2fa,
};
