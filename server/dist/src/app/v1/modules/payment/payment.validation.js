"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.paymentZodSchema = zod_1.default.object({
    tripId: zod_1.default
        .string("tripId is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid trip ID"),
    bookingId: zod_1.default
        .string("bookingId is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid booking ID"),
});
