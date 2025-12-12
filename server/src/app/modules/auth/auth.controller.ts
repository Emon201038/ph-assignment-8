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

export const AuthController = { login };
