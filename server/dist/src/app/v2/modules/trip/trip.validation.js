"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const enums_1 = require("../../../../../prisma/generated/enums");
exports.createTripSchema = zod_1.default.object({
    tourId: zod_1.default.string("Tour ID is required").min(1, "Tour ID is required"),
    guideId: zod_1.default.string("Guide ID is required").min(1, "Guide ID is required"),
    startDate: zod_1.default.coerce.date("Start date is required"),
    endDate: zod_1.default.coerce.date("End date is required"),
    maxGuests: zod_1.default.coerce
        .number("Max guests is required")
        .min(1, "Max guests is required"),
    status: zod_1.default.enum(enums_1.TripStatus).default(enums_1.TripStatus.SCHEDULED),
    tripIncludes: zod_1.default
        .string({
        error: "Trip includes is required",
    })
        .min(1, "Trip includes is required")
        .transform((value) => value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean))
        .refine((data) => data.length > 0, {
        message: "At least one trip include is required",
    }),
});
