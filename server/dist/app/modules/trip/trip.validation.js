"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const trip_interface_1 = require("./trip.interface");
exports.tripSchema = zod_1.default.object({
    tourId: zod_1.default
        .string("Tour is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid tour ID"),
    guideId: zod_1.default
        .string("Guide is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid guide ID"),
    startDate: zod_1.default.coerce.date("Start date is required"),
    endDate: zod_1.default.coerce.date("End date is required"),
    maxCapacity: zod_1.default.number("Max capacity is required"),
    finalItinerary: zod_1.default
        .array(zod_1.default
        .object({
        day: zod_1.default.number(),
        timing: zod_1.default.string(),
        notes: zod_1.default.string(),
    })
        .optional())
        .optional()
        .default([]),
    bookedSeats: zod_1.default.number().default(0),
    status: zod_1.default.enum(Object.values(trip_interface_1.TripStatus)).default(trip_interface_1.TripStatus.UPCOMING),
});
