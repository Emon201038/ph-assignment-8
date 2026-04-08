import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import {
  loginSchema,
  googleLoginSchema,
  facebookLoginSchema,
  resetPasswordSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
} from "./auth.validation";
import { checkAuth } from "../../../middlewares/checkAuth";
import { UserRole } from "../../../../../prisma/generated/enums";

const authRouter = Router();

// Credential login
authRouter.post("/login", validateRequest(loginSchema), AuthController.login);

// OAuth logins
authRouter.post(
  "/login/google",
  validateRequest(googleLoginSchema),
  AuthController.loginWithGoogle,
);

authRouter.post(
  "/login/facebook",
  validateRequest(facebookLoginSchema),
  AuthController.loginWithFacebook,
);

authRouter.post(
  "/verify-otp",
  validateRequest(verifyOtpSchema),
  AuthController.verify2FA,
);

// Get current user
authRouter.get("/me", AuthController.getMe);

// Refresh token
authRouter.get("/refresh-token", AuthController.refreshToken);

// Forgot password
authRouter.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword,
);

// Reset password
authRouter.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword,
);

// Change password (protected route)
authRouter.post(
  "/change-password",
  checkAuth(UserRole.TRAVELER, UserRole.GUIDE, UserRole.ADMIN),
  validateRequest(changePasswordSchema),
  AuthController.changePassword,
);

export default authRouter;
