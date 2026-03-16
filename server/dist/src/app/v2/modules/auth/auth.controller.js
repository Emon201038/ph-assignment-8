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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const enums_1 = require("../../../../../prisma/generated/enums");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.login(res, req.body.email, req.body.password);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Logged In successfully",
        data: null,
    });
}));
const loginWithGoogle = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, avatar, providerId } = req.body;
    const user = yield auth_service_1.AuthService.loginWithProvider(res, email, name, enums_1.AuthProvider.GOOGLE, providerId, avatar);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Google login successful",
        data: user,
    });
}));
const loginWithFacebook = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, avatar, providerId } = req.body;
    const user = yield auth_service_1.AuthService.loginWithProvider(res, email, name, enums_1.AuthProvider.FACEBOOK, providerId, avatar);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Facebook login successful",
        data: user,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken || req.headers.authorization;
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Profile retrieved",
        success: true,
        data: yield auth_service_1.AuthService.me(token),
    });
}));
const refreshToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_service_1.AuthService.refreshTokenService(req.cookies.refreshToken, res);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Token refreshed",
        success: true,
        data,
    });
}));
const forgotPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.forgotPassword(req.body.email);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "OTP sent to your email",
        success: true,
        data: null,
    });
}));
const resetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.resetPassword(req.body.token, req.body.newPassword, req.body.confirmPassword);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Password reset successfully",
        success: true,
        data: null,
    });
}));
const changePassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.changePassword(req.user.userId, req.body.currentPassword, req.body.newPassword);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Password changed successfully",
        success: true,
        data: null,
    });
}));
exports.AuthController = {
    login,
    loginWithGoogle,
    loginWithFacebook,
    getMe,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
};
