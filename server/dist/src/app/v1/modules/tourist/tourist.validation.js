"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.touristSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("../user/user.interface");
exports.touristSchema = zod_1.default.object({
    name: zod_1.default.string("name is required").min(2, "name is required"),
    email: zod_1.default.email("Invalide email address"),
    phone: zod_1.default.string("Invalid phone").min(10, "phone is required"),
    password: zod_1.default
        .string("password is required")
        .min(6, "password must be minimum 6 digit"),
    image: zod_1.default.file("image is required").optional(),
    bio: zod_1.default.string().optional(),
    interests: zod_1.default
        .string()
        .optional()
        .transform((z) => z === null || z === void 0 ? void 0 : z.split(",").map((i) => i.trim()))
        .default([]),
    preferredLanguage: zod_1.default.string().optional(),
    gender: zod_1.default.enum(Object.values(user_interface_1.Gender), "Invalide gender").default(user_interface_1.Gender.MALE),
});
