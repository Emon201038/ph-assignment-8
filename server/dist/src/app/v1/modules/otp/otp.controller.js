"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const otp_service_1 = require("./otp.service");
const sendOtp = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Otp sent successfully",
        statusCode: 200,
        success: true,
        data: await otp_service_1.OtpService.sendOtp(req.query.email),
    });
});
const verifyOtp = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Otp verified successfully",
        statusCode: 200,
        success: true,
        data: await otp_service_1.OtpService.verifyOtp(req.query.session_id, req.body.otp),
    });
});
exports.OtpController = { sendOtp, verifyOtp };
