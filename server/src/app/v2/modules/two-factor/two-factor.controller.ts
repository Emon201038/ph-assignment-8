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
      user.id,
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

export const TwoFactorController = {
  register2fa,
  sendOtp,
};
