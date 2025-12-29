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

export const AuthController = { login, getMe, refreshToken };
