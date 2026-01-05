"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guideSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("../user/user.interface");
exports.guideSchema = zod_1.default.object({
    name: zod_1.default.string("name is required").min(2, "name is required"),
    email: zod_1.default.email("Invalide email address"),
    phone: zod_1.default.string("phone is required").min(10, "phone is required"),
    password: zod_1.default
        .string("password is required")
        .min(6, "password must be minimum 6 digit"),
    image: zod_1.default.file("image is required").optional(),
    bio: zod_1.default.string("bio is required").min(2, "bio is required"),
    expertise: zod_1.default.string("expertise is required").transform((z) => {
        var _a;
        return (_a = z === null || z === void 0 ? void 0 : z.split(",")) === null || _a === void 0 ? void 0 : _a.map((i) => i.trim());
    }),
    languages: zod_1.default.string("languages is required").transform((z) => {
        var _a;
        return (_a = z === null || z === void 0 ? void 0 : z.split(",")) === null || _a === void 0 ? void 0 : _a.map((i) => i.trim());
    }),
    gender: zod_1.default.enum(Object.values(user_interface_1.Gender), "Invalide gender").default(user_interface_1.Gender.MALE),
    hourlyRate: zod_1.default
        .string("hourly rate is required")
        .min(1, "hourly rate is required")
        .transform((z) => parseFloat(z.toString())),
    address: zod_1.default.string("address is required"),
    experienceYears: zod_1.default
        .string("experience years is required")
        .min(1, "experience years is required")
        .transform((z) => parseFloat(z.toString())),
    currency: zod_1.default.string("currency is required").optional(),
});
