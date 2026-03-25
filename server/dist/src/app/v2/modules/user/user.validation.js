"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../../../../prisma/generated/enums");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string({ error: "Name is required" }),
    email: zod_1.z.string({ error: "Email is required" }).email("Invalid email format"),
    password: zod_1.z
        .string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.enum(enums_1.UserRole).default(enums_1.UserRole.TRAVELER),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    password: zod_1.z
        .string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters long")
        .optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    gender: zod_1.z.enum(enums_1.Gender).default(enums_1.Gender.MALE),
    avatar: zod_1.z.any().optional(),
    emergencyContactRelation: zod_1.z.string().optional(),
    emergencyContactNumber: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    interests: zod_1.z.string().transform((z) => { var _a; return (_a = z === null || z === void 0 ? void 0 : z.split(",")) === null || _a === void 0 ? void 0 : _a.map((i) => i.trim()); }),
    languages: zod_1.z.array(zod_1.z.string()).default([]),
    specialties: zod_1.z.array(zod_1.z.string()).default([]),
});
