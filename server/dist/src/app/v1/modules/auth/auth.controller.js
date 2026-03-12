"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const login = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    await auth_service_1.AuthService.login(res, req.body.email, req.body.password);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Logged In successfull",
        data: null,
    });
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Profile retrived",
        success: true,
        data: await auth_service_1.AuthService.me(req.cookies.accessToken || req.headers.authorization),
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Profile retrived",
        success: true,
        data: await auth_service_1.AuthService.refreshToken(req.cookies.refreshToken, res),
    });
});
const forgotPassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Profile retrived",
        success: true,
        data: await auth_service_1.AuthService.forgotPassword(req.body.email),
    });
});
const resetPassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Profile retrived",
        success: true,
        data: await auth_service_1.AuthService.resetPassword(req.body.token, req.body.newPassword, req.body.confirmPassword),
    });
});
const changePassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Profile retrived",
        success: true,
        data: await auth_service_1.AuthService.changePassword(req.user.userId, req.body.currentPassword, req.body.newPassword),
    });
});
exports.AuthController = {
    login,
    getMe,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
};
