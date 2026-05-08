"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.forgotPasswordSchema = exports.changePasswordSchema = exports.resetPasswordSchema = exports.facebookLoginSchema = exports.googleLoginSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const enums_1 = require("../../../../../prisma/generated/enums");
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Email is required"),
    password: zod_1.default
        .string("Password must be string")
        .min(1, "Password is required")
        .min(6, "Password must be minimum 6 characters"),
    deviceId: zod_1.default.string().min(1, "Device ID is required"),
    rememberMe: zod_1.default.boolean().default(false),
    deviceName: zod_1.default.string().nullable().optional(),
    browserName: zod_1.default.string().nullable().optional(),
    os: zod_1.default.string().nullable().optional(),
    deviceType: zod_1.default.string().nullable().optional(),
});
exports.googleLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Email is required"),
    name: zod_1.default.string().min(1, "Name is required"),
    avatar: zod_1.default.string().optional(),
    providerId: zod_1.default.string().min(1, "Provider ID is required"),
});
exports.facebookLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Email is required"),
    name: zod_1.default.string().min(1, "Name is required"),
    avatar: zod_1.default.string().optional(),
    providerId: zod_1.default.string().min(1, "Provider ID is required"),
});
exports.resetPasswordSchema = zod_1.default.object({
    token: zod_1.default.string().min(1, "Token is required"),
    newPassword: zod_1.default
        .string("Password must be string")
        .min(6, "Password must be minimum 6 characters"),
    confirmPassword: zod_1.default.string().min(1, "Confirm password is required"),
});
exports.changePasswordSchema = zod_1.default.object({
    currentPassword: zod_1.default.string().min(1, "Current password is required"),
    newPassword: zod_1.default
        .string("New password must be string")
        .min(6, "Password must be minimum 6 characters"),
});
exports.forgotPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().email("Email is required"),
});
exports.verifyOtpSchema = zod_1.default.object({
    id: zod_1.default.string("Id is required").nullable().optional(),
    method: zod_1.default.enum(enums_1.TwoFactorMethod, "Method is required"),
    userId: zod_1.default.string("User Id is required").min(1, "User Id is required"),
    deviceId: zod_1.default.string("Device Id is required").min(1, "Device Id is required"),
    otp: zod_1.default.string("OTP is required").min(1, "OTP is required"),
    rememberMe: zod_1.default.boolean().default(false),
    deviceName: zod_1.default.string().nullable().optional(),
    browserName: zod_1.default.string().nullable().optional(),
    os: zod_1.default.string().nullable().optional(),
    deviceType: zod_1.default.string().nullable().optional(),
});
