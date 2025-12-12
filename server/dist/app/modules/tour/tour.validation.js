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
        body: zod_1.z.object({
            title: zod_1.z.string().min(3),
            description: zod_1.z.string().min(10),
            category: zod_1.z.string(),
            city: zod_1.z.string(),
            country: zod_1.z.string(),
            price: zod_1.z.number().min(0),
            duration: zod_1.z.string().min(2),
            itinerary: itinerarySchema.optional(),
            images: zod_1.z.array(zod_1.z.string()).optional(),
            meetingPoint: zod_1.z.string(),
            maxGroupSize: zod_1.z.number().min(1),
            language: zod_1.z.array(zod_1.z.string()).min(1, "At least one language is required"),
            guide: zod_1.z.string(), // guide userId
        }),
    }),
    update: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            category: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
            country: zod_1.z.string().optional(),
            price: zod_1.z.number().optional(),
            duration: zod_1.z.string().optional(),
            itinerary: itinerarySchema.optional(),
            images: zod_1.z.array(zod_1.z.string()).optional(),
            meetingPoint: zod_1.z.string().optional(),
            maxGroupSize: zod_1.z.number().optional(),
            language: zod_1.z.array(zod_1.z.string()).optional(),
            isActive: zod_1.z.boolean().optional(),
        }),
        params: zod_1.z.object({
            id: zod_1.z.string(),
        }),
    }),
};
