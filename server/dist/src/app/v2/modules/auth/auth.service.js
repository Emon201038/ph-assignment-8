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
const appError_1 = __importDefault(require("../../../helpers/appError"));
const jwt_1 = require("../../../utils/jwt");
const env_1 = require("../../../config/env");
const sendEmail_1 = require("../../../utils/sendEmail");
const db_1 = __importDefault(require("../../../config/db"));
const login = (res, email, password) => __awaiter(void 0, void 0, void 0, function* () {
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
        include: { guideProfile: true },
    });
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    // Remove password from response
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    return userWithoutPassword;
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
exports.AuthService = {
    login,
    loginWithProvider,
    me,
    refreshTokenService,
    forgotPassword,
    resetPassword,
    changePassword,
};
