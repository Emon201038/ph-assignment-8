import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req, res, next) => {
  await AuthService.login(res, req.body.email, req.body.password);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged In successfull",
    data: null,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Profile retrived",
    success: true,
    data: await AuthService.me(
      req.cookies.accessToken || (req.headers.authorization as string)
    ),
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Profile retrived",
    success: true,
    data: await AuthService.refreshToken(req.cookies.refreshToken, res),
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Profile retrived",
    success: true,
    data: await AuthService.forgotPassword(req.body.email),
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Profile retrived",
    success: true,
    data: await AuthService.resetPassword(
      req.body.token,
      req.body.newPassword,
      req.body.confirmPassword
    ),
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Profile retrived",
    success: true,
    data: await AuthService.changePassword(
      req.user.userId,
      req.body.currentPassword,
      req.body.newPassword
    ),
  });
});

export const AuthController = {
  login,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
