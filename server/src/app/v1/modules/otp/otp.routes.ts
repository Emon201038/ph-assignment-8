import express from "express";
import { OtpController } from "./otp.controller";

const otpRouter = express.Router();

otpRouter.get("/send-otp", OtpController.sendOtp);
otpRouter.post("/verify-otp", OtpController.verifyOtp);

export default otpRouter;
