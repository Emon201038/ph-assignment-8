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
exports.TwoFactorService = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const enums_1 = require("../../../../../prisma/generated/enums");
const db_1 = __importDefault(require("../../../config/db"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const generate_otp_1 = require("../../../helpers/generate-otp");
const sendEmail_1 = require("../../../utils/sendEmail");
const enable2FA = (userId, email, method) => __awaiter(void 0, void 0, void 0, function* () {
    if (method === enums_1.TwoFactorMethod.TOTP) {
        const secret = speakeasy_1.default.generateSecret({
            name: `TourBuddy (${email})`,
        });
        yield db_1.default.twoFactorAuth.upsert({
            where: { userId },
            update: {
                totpSecret: secret.base32,
                method: enums_1.TwoFactorMethod.TOTP,
            },
            create: {
                userId,
                email,
                method: enums_1.TwoFactorMethod.TOTP,
                totpSecret: secret.base32,
            },
        });
        const qrCode = yield qrcode_1.default.toDataURL(secret.otpauth_url);
        return {
            qrCode,
            secret: secret.base32,
        };
    }
    return null;
});
const verifyTotpOtp = (userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    const twoFactorAuth = yield db_1.default.twoFactorAuth.findUnique({
        where: { userId },
        select: {
            totpSecret: true,
        },
    });
    if (!twoFactorAuth) {
        throw new appError_1.default(404, "Failed to verify OTP");
    }
    const verified = speakeasy_1.default.totp.verify({
        secret: twoFactorAuth.totpSecret,
        encoding: "base32",
        token: otp,
        window: 1,
    });
    if (!verified) {
        throw new appError_1.default(400, "Invalid OTP");
    }
    yield db_1.default.twoFactorAuth.update({
        where: { userId },
        data: {
            isEnabled: true,
            method: enums_1.TwoFactorMethod.TOTP,
        },
    });
});
const sendOtp = (userId, email, docId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new appError_1.default(404, "No user found");
    }
    const otp = (0, generate_otp_1.generateOtp)(6);
    const hashedOtp = yield bcryptjs_1.default.hash(otp, 10);
    let otpDoc;
    if (docId) {
        const doc = yield db_1.default.oTP.findUnique({ where: { id: docId } });
        if (doc) {
            otpDoc = yield db_1.default.oTP.update({
                where: {
                    id: docId,
                },
                data: {
                    otp: hashedOtp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                },
            });
        }
        else {
            yield db_1.default.oTP.deleteMany({
                where: {
                    expiresAt: {
                        lte: new Date(Date.now()),
                    },
                },
            });
            otpDoc = yield db_1.default.oTP.create({
                data: {
                    userId,
                    email,
                    otp: hashedOtp,
                    type: enums_1.OTPType.TWO_FACTOR,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                },
            });
        }
    }
    else {
        yield db_1.default.oTP.deleteMany({
            where: {
                expiresAt: {
                    lte: new Date(Date.now()),
                },
            },
        });
        otpDoc = yield db_1.default.oTP.create({
            data: {
                userId,
                email,
                otp: hashedOtp,
                type: enums_1.OTPType.TWO_FACTOR,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
    }
    if (!otpDoc) {
        throw new appError_1.default(500, "Error sending OTP");
    }
    console.log({
        to: email,
        subject: "Two-factor authentication",
        templateName: "otp-email",
        templateData: { otp, otpExpiresInMinutes: 10 },
    });
    try {
        yield (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "Two-factor authentication",
            templateName: "otp-email",
            templateData: { otp, otpExpiresInMinutes: 10 },
        });
    }
    catch (error) {
        console.log(error);
        throw new appError_1.default(500, "Error sending OTP");
    }
    return otpDoc;
});
const verifyEmailOtp = (userId_1, otp_1, docId_1, ...args_1) => __awaiter(void 0, [userId_1, otp_1, docId_1, ...args_1], void 0, function* (userId, otp, docId, method = enums_1.TwoFactorMethod.EMAIL) {
    const doc = yield db_1.default.oTP.findUnique({ where: { id: docId } });
    if (!doc) {
        throw new appError_1.default(400, "Otp not found");
    }
    if (doc.userId !== userId) {
        throw new appError_1.default(403, "Invalid otp");
    }
    if (doc.expiresAt < new Date(Date.now())) {
        throw new appError_1.default(400, "Otp expired. Please request a new one");
    }
    const isMatch = yield bcryptjs_1.default.compare(otp, doc.otp);
    if (!isMatch) {
        throw new appError_1.default(400, "Invalid otp");
    }
    const f2a = yield db_1.default.twoFactorAuth.upsert({
        where: {
            userId: doc.userId,
        },
        create: {
            email: doc.email,
            userId: doc.userId,
            method,
            isEnabled: true,
        },
        update: {
            email: doc.email,
            method,
            isEnabled: true,
        },
    });
    yield db_1.default.oTP.deleteMany({
        where: {
            userId: doc.userId,
        },
    });
    return true;
});
const disable2FA = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.twoFactorAuth.update({
        where: {
            userId,
        },
        data: {
            isEnabled: false,
        },
    });
    return data;
});
const get2FA = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.twoFactorAuth.findUnique({ where: { userId } });
});
exports.TwoFactorService = {
    enable2FA,
    sendOtp,
    verifyEmailOtp,
    verifyTotpOtp,
    disable2FA,
    get2FA,
};
