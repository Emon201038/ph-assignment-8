"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTourGuideSchema = exports.createTourSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTourSchema = zod_1.default.object({
    title: zod_1.default.string({
        error: "Tour title is required",
    }),
    description: zod_1.default
        .string("description is required")
        .min(3, " description should minimum 3 charecters"),
    destinationId: zod_1.default.string({
        error: "Destination ID is required",
    }),
    category: zod_1.default.string({
        error: "Category is required",
    }),
    priceFrom: zod_1.default
        .string({
        error: "Price is required",
    })
        .min(1, "Price should be greater than 0")
        .transform((z) => parseFloat(z.toString())),
    maxGroupSize: zod_1.default
        .string({
        error: "Max group size is required",
    })
        .min(1, "Max group size should be greater than 0")
        .transform((z) => parseInt(z.toString())),
    durationDays: zod_1.default
        .string({
        error: "Duration is required",
    })
        .min(1, "Duration should be greater than 0")
        .transform((z) => parseInt(z.toString())),
    difficulty: zod_1.default
        .string({
        error: "At least one difficulty is required",
    })
        .min(1, "At least one difficulty is required"),
    isPublished: zod_1.default.boolean().default(false),
    featured: zod_1.default.boolean().default(false),
});
exports.toggleTourGuideSchema = zod_1.default.object({
    guideId: zod_1.default
        .string({
        error: "Guide ID is required",
    })
        .min(1, "Guide ID is required"),
});
