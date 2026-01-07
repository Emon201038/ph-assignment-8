"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourValidation = void 0;
const zod_1 = require("zod");
const itinerarySchema = zod_1.z.array(zod_1.z.object({
    step: zod_1.z.number(),
    title: zod_1.z.string(),
    details: zod_1.z.string(),
}));
exports.TourValidation = {
    create: zod_1.z.object({
        title: zod_1.z.string("title is required").min(3),
        description: zod_1.z.string("description is required").min(3),
        category: zod_1.z.string("category is required"),
        city: zod_1.z.string("city is required"),
        country: zod_1.z.string("country is required"),
        price: zod_1.z.string("price is required").min(0),
        itinerary: itinerarySchema.optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        language: zod_1.z
            .string("language is required")
            .min(1, "At least one language is required"),
        isActive: zod_1.z.boolean().optional().default(true),
        isFeatured: zod_1.z.boolean().optional().default(false),
    }),
    update: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string("title is required").min(3),
            description: zod_1.z.string("description is required").min(3),
            category: zod_1.z.string("category is required"),
            city: zod_1.z.string("city is required"),
            country: zod_1.z.string("country is required"),
            price: zod_1.z.string("price is required").min(0),
            itinerary: itinerarySchema.optional(),
            images: zod_1.z.array(zod_1.z.string()).optional(),
            language: zod_1.z
                .string("language is required")
                .min(1, "At least one language is required"),
            isActive: zod_1.z.boolean().optional().default(true),
            isFeatured: zod_1.z.boolean().optional().default(false),
        }),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
};
