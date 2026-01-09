"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const appError_1 = __importDefault(require("../../helpers/appError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const otp_model_1 = require("../otp/otp.model");
const sendEmail_1 = require("../../utils/sendEmail");
const login = (res, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield user_model_1.default.findOne({ email });
    if (!isExists || isExists.isDeleted) {
        throw new appError_1.default(404, "No user found");
    }
    if (isExists.isBlocked) {
        throw new appError_1.default(400, "Your account has been blocked. Contact admin to solve this issue");
    }
    const isPassMatched = yield bcryptjs_1.default.compare(password, isExists.password);
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
});
const me = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = (0, jwt_1.verifyJwt)(accessToken, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    return yield user_model_1.default.findById(verifiedToken.userId)
        .select("-password")
        .populate("profile");
});
const refreshToken = (token, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield user_model_1.default.findOne({ email });
    if (!isExists) {
        throw new appError_1.default(404, "No user found");
    }
    // create 6 digit random number for otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpDoc = yield otp_model_1.Otp.create({
        userId: isExists._id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    if (!otpDoc) {
        throw new appError_1.default(400, "Failed to create otp");
    }
    // send otp to user's email
    yield (0, sendEmail_1.sendEmail)({
        to: isExists.email,
        subject: "Forgot Password",
        templateName: "reset-password",
        templateData: { otp, name: isExists.name, email: isExists.email },
    });
    return otpDoc;
});
const resetPassword = (token, newPassword, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(token, confirmPassword, newPassword);
    const verifiedToken = (0, jwt_1.verifyJwt)(token, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    const isExists = yield user_model_1.default.findById(verifiedToken.userId);
    if (!isExists) {
        throw new appError_1.default(404, "No user found");
    }
    const isPassMatched = yield bcryptjs_1.default.compare(confirmPassword, isExists.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    isExists.password = newPassword;
    yield isExists.save();
    return isExists;
});
const changePassword = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield user_model_1.default.findById(userId);
    if (!isExists) {
        throw new appError_1.default(404, "No user found");
    }
    const isPassMatched = yield bcryptjs_1.default.compare(oldPassword, isExists.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    isExists.password = newPassword;
    yield isExists.save();
    return isExists;
});
exports.AuthService = {
    login,
    me,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
};
