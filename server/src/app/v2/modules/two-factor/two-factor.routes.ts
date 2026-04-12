import express from "express";
import { UserRole } from "../../../../../prisma/generated/enums";
import { checkAuth } from "../../../middlewares/checkAuth";
import { TwoFactorController } from "./two-factor.controller";

const twoFactorRoutes = express.Router();

twoFactorRoutes.post(
  "/register",
  checkAuth(...Object.values(UserRole)),
  TwoFactorController.register2fa,
);
twoFactorRoutes.post(
  "/send-otp",
  checkAuth(...Object.values(UserRole)),
  TwoFactorController.sendOtp,
);
twoFactorRoutes.post(
  "/verify-otp",
  checkAuth(...Object.values(UserRole)),
  TwoFactorController.verifyEmailOtp,
);
twoFactorRoutes.post(
  "/verify-totp-otp",
  checkAuth(...Object.values(UserRole)),
  TwoFactorController.verifyTotpOtp,
);
twoFactorRoutes.post(
  "/disable",
  checkAuth(...Object.values(UserRole)),
  TwoFactorController.disable2fa,
);
twoFactorRoutes.get(
  "/get",
  checkAuth(...Object.values(UserRole)),
  TwoFactorController.get2fa,
);

export default twoFactorRoutes;
