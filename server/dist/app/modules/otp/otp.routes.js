"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otp_controller_1 = require("./otp.controller");
const otpRouter = express_1.default.Router();
otpRouter.get("/send-otp", otp_controller_1.OtpController.sendOtp);
otpRouter.post("/verify-otp", otp_controller_1.OtpController.verifyOtp);
exports.default = otpRouter;
