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
exports.OtpService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../../config/db"));
const generate_otp_1 = require("../../../helpers/generate-otp");
const appError_1 = __importDefault(require("../../../helpers/appError"));
const sendOtp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = (0, generate_otp_1.generateOtp)(6);
    let userId;
    let email;
    if (payload.email) {
        email = payload.email;
        const user = yield db_1.default.user.findUnique({
            where: { email },
            select: { id: true },
        });
        if (!user) {
            throw new Error("User not found");
        }
        userId = user.id;
    }
    else if (payload.userId) {
        userId = payload.userId;
        const user = yield db_1.default.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });
        if (!user) {
            throw new Error("User not found");
        }
        email = user.email;
    }
    else {
        throw new appError_1.default(400, "Email or userId is required");
    }
    const hashedOtp = yield bcryptjs_1.default.hash(otp, 10);
    console.log({ otp });
    const otpDoc = yield db_1.default.oTP.upsert({
        where: {
            id: userId,
            type: payload.type,
        },
        create: {
            userId,
            email,
            otp: hashedOtp,
            type: payload.type,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
        update: {
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
    });
    return otpDoc;
});
exports.OtpService = { sendOtp };
