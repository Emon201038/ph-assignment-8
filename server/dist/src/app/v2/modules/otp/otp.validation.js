"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const enums_1 = require("../../../../../prisma/generated/enums");
exports.sendOtpSchema = zod_1.default.object({
    type: zod_1.default.enum(enums_1.OTPType),
    email: zod_1.default.string(),
    userId: zod_1.default.string(),
});
