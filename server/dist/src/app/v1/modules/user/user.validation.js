"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
// -----------------------------------------
// Common Validations
// -----------------------------------------
const languagesSchema = zod_1.z.array(zod_1.z.string()).optional();
const availabilitySchema = zod_1.z
    .array(zod_1.z.object({
    day: zod_1.z.string(),
    slots: zod_1.z.array(zod_1.z.string()),
}))
    .optional();
// -----------------------------------------
// Tourist Info
// -----------------------------------------
const touristInfoSchema = zod_1.z
    .object({
    preferences: zod_1.z.array(zod_1.z.string()).optional(),
    wishlist: zod_1.z.array(zod_1.z.string()).optional(), // tour IDs
})
    .optional();
// -----------------------------------------
// Guide Info
// -----------------------------------------
const guideInfoSchema = zod_1.z
    .object({
    expertise: zod_1.z.array(zod_1.z.string()).min(1, "At least one expertise is required"),
    dailyRate: zod_1.z.number().min(0, "Daily rate must be a positive number"),
    rating: zod_1.z.number().optional(),
    totalReviews: zod_1.z.number().optional(),
    verified: zod_1.z.boolean().optional(),
    availability: availabilitySchema,
})
    .optional();
// -----------------------------------------
// Admin Info
// -----------------------------------------
const adminInfoSchema = zod_1.z
    .object({
    permissions: zod_1.z.array(zod_1.z.string()).optional(),
})
    .optional();
// -----------------------------------------
// Create User Schema (Register)
// -----------------------------------------
exports.UserValidation = {
    create: zod_1.z.object({
        name: zod_1.z.string().min(2),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        role: zod_1.z
            .enum(["TOURIST", "GUIDE"], "Invalide role")
            .default(user_interface_1.UserRole.TOURIST),
        // Common fields
        profileImage: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        languages: languagesSchema,
        // Nested Role-based fields
        touristInfo: touristInfoSchema,
        guideInfo: guideInfoSchema,
        adminInfo: adminInfoSchema,
    }),
    // -----------------------------------------
    // Update User Schema
    // -----------------------------------------
    update: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().min(2).optional(),
            email: zod_1.z.string().email().optional(),
            password: zod_1.z.string().min(6).optional(),
            profileImage: zod_1.z.string().optional(),
            bio: zod_1.z.string().optional(),
            languages: languagesSchema,
            touristInfo: touristInfoSchema,
            guideInfo: guideInfoSchema,
            adminInfo: adminInfoSchema,
        }),
        params: zod_1.z.object({
            id: zod_1.z.string(),
        }),
    }),
    // -----------------------------------------
    // Change Role (Admin Only)
    // -----------------------------------------
    updateRole: zod_1.z.object({
        body: zod_1.z.object({
            role: zod_1.z.enum(["tourist", "guide", "admin"]),
        }),
        params: zod_1.z.object({
            id: zod_1.z.string(),
        }),
    }),
};
