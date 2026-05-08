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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const jwt_1 = require("../../../utils/jwt");
const env_1 = require("../../../config/env");
const sendEmail_1 = require("../../../utils/sendEmail");
const db_1 = __importDefault(require("../../../config/db"));
const enums_1 = require("../../../../../prisma/generated/enums");
const generate_otp_1 = require("../../../helpers/generate-otp");
const login = (res, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, deviceId, rememberMe, browserName, deviceName, deviceType, os, } = body;
    const user = yield db_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    // Check if user has password (for credential providers)
    if (!user.password) {
        throw new appError_1.default(400, "This account uses a provider login. Please use the provider to sign in.");
    }
    const isPassMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    const twoFactor = yield db_1.default.twoFactorAuth.findUnique({
        where: { userId: user.id },
    });
    const session = yield db_1.default.loggedInDevice.findUnique({
        where: {
            userId_deviceId: { userId: user.id, deviceId: deviceId },
        },
    });
    if (twoFactor === null || twoFactor === void 0 ? void 0 : twoFactor.isEnabled) {
        if (session && session.isTrusted) {
            const accessToken = (0, jwt_1.generateJwt)({
                userId: user.id,
                role: user.role,
                email: user.email,
            }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
            const refreshToken = (0, jwt_1.generateJwt)({
                userId: user.id,
                role: user.role,
                email: user.email,
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
            yield db_1.default.loggedInDevice.upsert({
                where: {
                    userId_deviceId: { userId: user.id, deviceId: deviceId },
                },
                create: {
                    userId: user.id,
                    deviceId,
                    isTrusted: rememberMe,
                    browserName,
                    deviceName,
                    deviceType,
                    os,
                },
                update: {
                    userId: user.id,
                    deviceId,
                    isTrusted: rememberMe,
                    browserName,
                    deviceName,
                    deviceType,
                    os,
                },
            });
            return;
        }
        let otpDoc;
        if (twoFactor.method === enums_1.TwoFactorMethod.EMAIL) {
            const otp = (0, generate_otp_1.generateOtp)(6);
            console.log({ otp });
            otpDoc = yield db_1.default.oTP.create({
                data: {
                    userId: user.id,
                    email: twoFactor.method === enums_1.TwoFactorMethod.EMAIL
                        ? twoFactor === null || twoFactor === void 0 ? void 0 : twoFactor.email
                        : user.email,
                    otp: yield bcryptjs_1.default.hash(otp, 10),
                    type: enums_1.OTPType.TWO_FACTOR,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                },
            });
            (0, sendEmail_1.sendEmail)({
                subject: "Two-factor authentication",
                to: twoFactor.method === enums_1.TwoFactorMethod.EMAIL
                    ? twoFactor === null || twoFactor === void 0 ? void 0 : twoFactor.email
                    : user.email,
                templateName: "otp-email",
                templateData: { otp, otpExpiresInMinutes: 10 },
            });
        }
        return {
            status: "requires-otp",
            message: "Two-factor authentication is enabled. Please enter the OTP to continue.",
            id: otpDoc === null || otpDoc === void 0 ? void 0 : otpDoc.id,
            userId: user.id,
            rememberMe,
            method: twoFactor.method,
        };
    }
    const accessToken = (0, jwt_1.generateJwt)({
        userId: user.id,
        role: user.role,
        email: user.email,
    }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateJwt)({
        userId: user.id,
        role: user.role,
        email: user.email,
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
    yield db_1.default.loggedInDevice.upsert({
        where: {
            userId_deviceId: { userId: user.id, deviceId: deviceId },
        },
        create: {
            userId: user.id,
            deviceId,
            isTrusted: rememberMe,
            deviceName,
            browserName,
            os,
            deviceType,
        },
        update: {
            userId: user.id,
            deviceId,
            isTrusted: rememberMe,
            deviceName,
            browserName,
            os,
            deviceType,
        },
    });
});
const loginWithProvider = (res, email, name, provider, providerId, avatar) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield db_1.default.user.findUnique({ where: { email } });
    // Create new user if doesn't exist
    if (!user) {
        user = yield db_1.default.user.create({
            data: {
                email,
                name,
                provider,
                providerId,
                avatar: avatar || null,
                city: "",
                country: "",
                password: null,
            },
        });
    }
    else {
        // Update provider info if user already exists
        if (!user.provider) {
            yield db_1.default.user.update({
                where: { id: user.id },
                data: {
                    provider,
                    providerId,
                    avatar: avatar || user.avatar,
                },
            });
        }
    }
    const accessToken = (0, jwt_1.generateJwt)({
        userId: user.id,
        role: user.role,
        email: user.email,
    }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateJwt)({
        userId: user.id,
        role: user.role,
        email: user.email,
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
    return user;
});
const me = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = (0, jwt_1.verifyJwt)(accessToken, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    const user = yield db_1.default.user.findUnique({
        where: { id: verifiedToken.userId },
        include: { guideProfile: true, travelerProfile: true },
        omit: { password: true },
    });
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    // Remove password from response
    const { guideProfile, travelerProfile } = user, userWithoutPassword = __rest(user, ["guideProfile", "travelerProfile"]);
    return Object.assign({ profile: guideProfile || travelerProfile || null }, userWithoutPassword);
});
const refreshTokenService = (token, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = (0, jwt_1.verifyJwt)(token, env_1.envVars.JWT_REFRESH_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    const accessToken = (0, jwt_1.generateJwt)({
        userId: verifiedToken.userId,
        role: verifiedToken.role,
        email: verifiedToken.email,
    }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const newRefreshToken = (0, jwt_1.generateJwt)({
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
    res.cookie("refreshToken", newRefreshToken, {
        maxAge: 90 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    return { refreshToken: newRefreshToken, accessToken };
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Note: You may want to create an OTP model in Prisma schema
    // For now, storing OTP in memory or Redis would be recommended
    // Store OTP temporarily (implementation depends on your OTP storage strategy)
    const otpData = {
        userId: user.id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    };
    // Send OTP to user's email
    yield (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: "Forgot Password",
        templateName: "reset-password",
        templateData: { otp, name: user.name, email: user.email },
    });
    return otpData;
});
const resetPassword = (token, newPassword, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = (0, jwt_1.verifyJwt)(token, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
    if (typeof verifiedToken === "string") {
        throw new appError_1.default(400, "Failed to verify token");
    }
    const user = yield db_1.default.user.findUnique({
        where: { id: verifiedToken.userId },
    });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    if (!user.password) {
        throw new appError_1.default(400, "Cannot reset password for provider-based accounts");
    }
    const isPassMatched = yield bcryptjs_1.default.compare(confirmPassword, user.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    const updatedUser = yield db_1.default.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
    return updatedUser;
});
const changePassword = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    if (!user.password) {
        throw new appError_1.default(400, "Cannot change password for provider-based accounts");
    }
    const isPassMatched = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isPassMatched) {
        throw new appError_1.default(400, "Incorrect password");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    const updatedUser = yield db_1.default.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
    return updatedUser;
});
const verify2FA = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: { id: payload.userId },
    });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    const twoFactor = yield db_1.default.twoFactorAuth.findUnique({
        where: {
            userId: payload.userId,
        },
    });
    if (!twoFactor) {
        throw new appError_1.default(404, "No 2FA found");
    }
    if (payload.method === enums_1.TwoFactorMethod.EMAIL && payload.id) {
        const otpDoc = yield db_1.default.oTP.findUnique({
            where: { id: payload.id },
        });
        if (!otpDoc) {
            throw new appError_1.default(404, "No 2FA found");
        }
        const isOtpMatched = yield bcryptjs_1.default.compare(payload.otp, otpDoc.otp);
        if (!isOtpMatched) {
            throw new appError_1.default(400, "Incorrect OTP");
        }
        const isExpired = otpDoc.expiresAt < new Date(Date.now());
        if (isExpired) {
            throw new appError_1.default(400, "OTP expired");
        }
        yield db_1.default.oTP.delete({
            where: { id: payload.id },
        });
    }
    if (payload.method === enums_1.TwoFactorMethod.TOTP) {
        speakeasy_1.default.totp.verify({
            secret: twoFactor.totpSecret,
            encoding: "base32",
            token: payload.otp,
            window: 1,
        });
    }
    yield db_1.default.loggedInDevice.upsert({
        where: {
            userId_deviceId: { userId: payload.userId, deviceId: payload.deviceId },
        },
        update: {
            deviceId: payload.deviceId,
            isTrusted: payload.rememberMe,
            deviceName: payload.deviceName,
            browserName: payload.browserName,
            os: payload.os,
            deviceType: payload.deviceType,
        },
        create: {
            userId: payload.userId,
            deviceId: payload.deviceId,
            isTrusted: payload.rememberMe,
            deviceName: payload.deviceName,
            browserName: payload.browserName,
            os: payload.os,
            deviceType: payload.deviceType,
        },
    });
    const accessToken = (0, jwt_1.generateJwt)({
        userId: user.id,
        role: user.role,
        email: user.email,
    }, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateJwt)({
        userId: user.id,
        role: user.role,
        email: user.email,
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
});
const savedDevices = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const devices = yield db_1.default.loggedInDevice.findMany({
        where: { userId },
    });
    return devices.filter((d) => d.os);
});
exports.AuthService = {
    login,
    loginWithProvider,
    me,
    refreshTokenService,
    forgotPassword,
    resetPassword,
    changePassword,
    verify2FA,
    savedDevices,
};
