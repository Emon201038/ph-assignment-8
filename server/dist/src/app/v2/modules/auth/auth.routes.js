"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../../middlewares/validateRequest");
const auth_validation_1 = require("./auth.validation");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const enums_1 = require("../../../../../prisma/generated/enums");
const authRouter = (0, express_1.Router)();
// Credential login
authRouter.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.loginSchema), auth_controller_1.AuthController.login);
// OAuth logins
authRouter.post("/login/google", (0, validateRequest_1.validateRequest)(auth_validation_1.googleLoginSchema), auth_controller_1.AuthController.loginWithGoogle);
authRouter.post("/login/facebook", (0, validateRequest_1.validateRequest)(auth_validation_1.facebookLoginSchema), auth_controller_1.AuthController.loginWithFacebook);
// Get current user
authRouter.get("/me", auth_controller_1.AuthController.getMe);
// Refresh token
authRouter.get("/refresh-token", auth_controller_1.AuthController.refreshToken);
// Forgot password
authRouter.post("/forgot-password", (0, validateRequest_1.validateRequest)(auth_validation_1.forgotPasswordSchema), auth_controller_1.AuthController.forgotPassword);
// Reset password
authRouter.post("/reset-password", (0, validateRequest_1.validateRequest)(auth_validation_1.resetPasswordSchema), auth_controller_1.AuthController.resetPassword);
// Change password (protected route)
authRouter.post("/change-password", (0, checkAuth_1.checkAuth)(enums_1.UserRole.TRAVELER, enums_1.UserRole.GUIDE, enums_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(auth_validation_1.changePasswordSchema), auth_controller_1.AuthController.changePassword);
exports.default = authRouter;
