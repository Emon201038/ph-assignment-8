import { AuthProvider } from "../../../../../prisma/generated/enums";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req, res, next) => {
  const data = await AuthService.login(res, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged In successfully",
    data,
  });
});

const loginWithGoogle = catchAsync(async (req, res, next) => {
  const { email, name, avatar, providerId } = req.body;

  const user = await AuthService.loginWithProvider(
    res,
    email,
    name,
    AuthProvider.GOOGLE,
    providerId,
    avatar,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Google login successful",
    data: user,
  });
});

const loginWithFacebook = catchAsync(async (req, res, next) => {
  const { email, name, avatar, providerId } = req.body;

  const user = await AuthService.loginWithProvider(
    res,
    email,
    name,
    AuthProvider.FACEBOOK,
    providerId,
    avatar,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Facebook login successful",
    data: user,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  const token =
    req.cookies.accessToken || (req.headers.authorization as string);

  sendResponse(res, {
    statusCode: 200,
    message: "Profile retrieved",
    success: true,
    data: await AuthService.me(token),
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const data = await AuthService.refreshTokenService(
    req.cookies.refreshToken,
    res,
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Token refreshed",
    success: true,
    data,
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  await AuthService.forgotPassword(req.body.email);

  sendResponse(res, {
    statusCode: 200,
    message: "OTP sent to your email",
    success: true,
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  await AuthService.resetPassword(
    req.body.token,
    req.body.newPassword,
    req.body.confirmPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Password reset successfully",
    success: true,
    data: null,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  await AuthService.changePassword(
    req.user.userId,
    req.body.currentPassword,
    req.body.newPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
    success: true,
    data: null,
  });
});

const verify2FA = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    statusCode: 200,
    message: "2FA verified successfully",
    success: true,
    data: await AuthService.verify2FA(req.body, res),
  });
});

export const AuthController = {
  login,
  loginWithGoogle,
  loginWithFacebook,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  verify2FA,
};
