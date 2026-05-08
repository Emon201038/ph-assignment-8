"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enums_1 = require("../../../../../prisma/generated/enums");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const two_factor_controller_1 = require("./two-factor.controller");
const twoFactorRoutes = express_1.default.Router();
twoFactorRoutes.post("/register", (0, checkAuth_1.checkAuth)(...Object.values(enums_1.UserRole)), two_factor_controller_1.TwoFactorController.register2fa);
twoFactorRoutes.post("/send-otp", (0, checkAuth_1.checkAuth)(...Object.values(enums_1.UserRole)), two_factor_controller_1.TwoFactorController.sendOtp);
twoFactorRoutes.post("/verify-otp", (0, checkAuth_1.checkAuth)(...Object.values(enums_1.UserRole)), two_factor_controller_1.TwoFactorController.verifyEmailOtp);
twoFactorRoutes.post("/verify-totp-otp", (0, checkAuth_1.checkAuth)(...Object.values(enums_1.UserRole)), two_factor_controller_1.TwoFactorController.verifyTotpOtp);
twoFactorRoutes.post("/disable", (0, checkAuth_1.checkAuth)(...Object.values(enums_1.UserRole)), two_factor_controller_1.TwoFactorController.disable2fa);
twoFactorRoutes.get("/get", (0, checkAuth_1.checkAuth)(...Object.values(enums_1.UserRole)), two_factor_controller_1.TwoFactorController.get2fa);
exports.default = twoFactorRoutes;
