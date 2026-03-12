"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const env_1 = require("../../../config/env");
const appError_1 = __importDefault(require("../../../helpers/appError"));
const jwt_1 = require("../../../utils/jwt");
const user_model_1 = __importDefault(require("../user/user.model"));
const otp_model_1 = require("./otp.model");
const sendOtp = async (email) => {
    if (!email) {
        throw new appError_1.default(400, "Email is required");
    }
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpDoc = await otp_model_1.Otp.findOne({ userId: user._id, isUsed: false });
    if (!otpDoc) {
        const otpDoc = await otp_model_1.Otp.create({
            userId: user._id,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });
        return otpDoc;
    }
    otpDoc.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    otpDoc.otp = otp;
    await otpDoc.save();
    return otpDoc;
};
const verifyOtp = async (docId, otp) => {
    if (!docId) {
        throw new appError_1.default(400, "Otp id is required");
    }
    if (!otp) {
        throw new appError_1.default(400, "Otp is required");
    }
    const otpDoc = await otp_model_1.Otp.findById(docId);
    if (!otpDoc) {
        throw new appError_1.default(404, "Otp not found");
    }
    console.log(otpDoc);
    if (otpDoc.isUsed) {
        throw new appError_1.default(400, "Otp already used");
    }
    if (otpDoc.expiresAt < new Date(Date.now())) {
        throw new appError_1.default(400, "Otp expired");
    }
    if (otpDoc.otp !== parseInt(otp.toString())) {
        throw new appError_1.default(400, "Invalid otp");
    }
    const token = (0, jwt_1.generateJwt)({ userId: otpDoc.userId.toString() }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    otpDoc.isUsed = true;
    await otpDoc.save();
    return { token };
};
exports.OtpService = { sendOtp, verifyOtp };
