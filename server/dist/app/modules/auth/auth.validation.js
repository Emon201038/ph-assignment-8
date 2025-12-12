"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.email("Email is required"),
    password: zod_1.default
        .string("Password must be string")
        .min(1, "Password is required")
        .min(6, "Password must be minimum 6 digit"),
});
