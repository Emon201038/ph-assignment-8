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
exports.TwoFactorController = void 0;
const appError_1 = __importDefault(require("../../../helpers/appError"));
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const two_factor_service_1 = require("./two-factor.service");
const register2fa = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "2FA registered successfully",
        success: true,
        data: yield two_factor_service_1.TwoFactorService.enable2FA(user.userId, user.email, req.body.method),
    });
}));
const sendOtp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Otp sent successfully",
        success: true,
        data: yield two_factor_service_1.TwoFactorService.sendOtp(user.userId, req.body.email, (_a = req.query) === null || _a === void 0 ? void 0 : _a.doc_id),
    });
}));
const verifyEmailOtp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Otp verified successfully",
        success: true,
        data: yield two_factor_service_1.TwoFactorService.verifyEmailOtp(user.userId, req.body.otp, req.body.id),
    });
}));
const verifyTotpOtp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    const otp = req.body.otp;
    if (!otp) {
        throw new appError_1.default(400, "Otp is required");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Otp verified successfully",
        success: true,
        data: yield two_factor_service_1.TwoFactorService.verifyTotpOtp(user.userId, req.body.otp),
    });
}));
const disable2fa = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "2FA disabled successfully",
        success: true,
        data: yield two_factor_service_1.TwoFactorService.disable2FA(user.userId),
    });
}));
const get2fa = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "2FA fetched successfully",
        success: true,
        data: yield two_factor_service_1.TwoFactorService.get2FA(user.userId),
    });
}));
exports.TwoFactorController = {
    register2fa,
    sendOtp,
    verifyEmailOtp,
    verifyTotpOtp,
    disable2fa,
    get2fa,
};
