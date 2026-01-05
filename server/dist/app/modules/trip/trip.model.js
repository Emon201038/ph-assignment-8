"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const trip_interface_1 = require("./trip.interface");
const TripSchema = new mongoose_1.Schema({
    tourId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Tour",
        required: [true, "Tour is required"],
    },
    guideId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Guide is required"],
    },
    startDate: { type: Date, required: [true, "Start date is required"] },
    endDate: { type: Date, required: [true, "End date is required"] },
    maxCapacity: { type: Number, required: [true, "Max capacity is required"] },
    bookedSeats: { type: Number, default: 0 },
    finalItinerary: [
        {
            day: Number,
            timing: String,
            notes: String,
        },
    ],
    status: {
        type: String,
        enum: Object.values(trip_interface_1.TripStatus),
        default: trip_interface_1.TripStatus.OPEN,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Trip = (0, mongoose_1.model)("Trip", TripSchema);
