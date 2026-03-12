"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwt_1 = require("../../../utils/jwt");
const env_1 = require("../../../config/env");
const otp_model_1 = require("../otp/otp.model");
const sendEmail_1 = require("../../../utils/sendEmail");
const login = async (res, email, password) => {
    const isExists = await user_model_1.default.findOne({ email });
    if (!isExists || isExists.isDeleted) {
        throw new appError_1.default(404, "No user found");
    }
    if (isExists.isBlocked) {
        throw new appError_1.default(400, "Your account has been blocked. Contact admin to solve this issue");
    }
    const isPassMatched = await bcryptjs_1.default.compare(password, isExists.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    const accessToken = (0, jwt_1.generateJwt)({
        userId: isExists._id.toString(),
        role: isExists.role,
        email: isExists.email,
    }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateJwt)({
        userId: isExists._id.toString(),
        role: isExists.role,
        email: isExists.email,
    }, env_1.envVars.JWT_REFRESH_TOKEN_SECRET, env_1.envVars.JWT_REFRESH_TOKEN_EXPIRES_IN);
    res.cookie("accessToken", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        // 6000,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 90 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
};
const me = async (accessToken) => {
    const verifiedToken = (0, jwt_1.verifyJwt)(accessToken, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    return await user_model_1.default.findById(verifiedToken.userId)
        .select("-password")
        .populate("profile");
};
const refreshToken = async (token, res) => {
    const verifiedToken = (0, jwt_1.verifyJwt)(token, env_1.envVars.JWT_REFRESH_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    const accessToken = (0, jwt_1.generateJwt)({
        userId: verifiedToken.userId,
        role: verifiedToken.role,
        email: verifiedToken.email,
    }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateJwt)({
        userId: verifiedToken.userId,
        role: verifiedToken.role,
        email: verifiedToken.email,
    }, env_1.envVars.JWT_REFRESH_TOKEN_SECRET, env_1.envVars.JWT_REFRESH_TOKEN_EXPIRES_IN);
    res.cookie("accessToken", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 90 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    return { refreshToken, accessToken };
};
const forgotPassword = async (email) => {
    const isExists = await user_model_1.default.findOne({ email });
    if (!isExists) {
        throw new appError_1.default(404, "No user found");
    }
    // create 6 digit random number for otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpDoc = await otp_model_1.Otp.create({
        userId: isExists._id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    if (!otpDoc) {
        throw new appError_1.default(400, "Failed to create otp");
    }
    // send otp to user's email
    await (0, sendEmail_1.sendEmail)({
        to: isExists.email,
        subject: "Forgot Password",
        templateName: "reset-password",
        templateData: { otp, name: isExists.name, email: isExists.email },
    });
    return otpDoc;
};
const resetPassword = async (token, newPassword, confirmPassword) => {
    console.log(token, confirmPassword, newPassword);
    const verifiedToken = (0, jwt_1.verifyJwt)(token, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    const isExists = await user_model_1.default.findById(verifiedToken.userId);
    if (!isExists) {
        throw new appError_1.default(404, "No user found");
    }
    const isPassMatched = await bcryptjs_1.default.compare(confirmPassword, isExists.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    isExists.password = newPassword;
    await isExists.save();
    return isExists;
};
const changePassword = async (userId, oldPassword, newPassword) => {
    const isExists = await user_model_1.default.findById(userId);
    if (!isExists) {
        throw new appError_1.default(404, "No user found");
    }
    const isPassMatched = await bcryptjs_1.default.compare(oldPassword, isExists.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    isExists.password = newPassword;
    await isExists.save();
    return isExists;
};
exports.AuthService = {
    login,
    me,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
};
