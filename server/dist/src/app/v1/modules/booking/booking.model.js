"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_interface_1 = require("./booking.interface");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    trip: {
        type: mongoose_1.Types.ObjectId,
        ref: "Trip",
        required: true,
        index: true,
    },
    seats: {
        type: Number,
        min: 1,
        required: true,
    },
    pricePaid: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(booking_interface_1.BookingStatus),
        default: booking_interface_1.BookingStatus.CONFIRMED,
        index: true,
    },
    reviewed: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
bookingSchema.index({ user: 1, trip: 1 }, { unique: true });
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
