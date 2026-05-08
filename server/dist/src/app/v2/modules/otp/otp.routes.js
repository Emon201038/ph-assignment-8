"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otp_controller_1 = require("./otp.controller");
const validateRequest_1 = require("../../../middlewares/validateRequest");
const otp_validation_1 = require("./otp.validation");
const otpRoutes = express_1.default.Router();
otpRoutes.post("/send-otp", (0, validateRequest_1.validateRequest)(otp_validation_1.sendOtpSchema), otp_controller_1.OtpController.sendOtp);
exports.default = otpRoutes;
