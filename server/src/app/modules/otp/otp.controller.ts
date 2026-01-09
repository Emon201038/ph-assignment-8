import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OtpService } from "./otp.service";

const sendOtp = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Otp sent successfully",
    statusCode: 200,
    success: true,
    data: await OtpService.sendOtp(req.query.email as string),
  });
});

const verifyOtp = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Otp verified successfully",
    statusCode: 200,
    success: true,
    data: await OtpService.verifyOtp(
      req.query.session_id as string,
      req.body.otp
    ),
  });
});

export const OtpController = { sendOtp, verifyOtp };
