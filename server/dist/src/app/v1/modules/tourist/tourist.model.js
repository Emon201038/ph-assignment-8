"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tourist = void 0;
const mongoose_1 = require("mongoose");
const touristSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    interests: [String],
    preferredLanguage: String, // ISO-639-1
    preferredCurrency: String, // ISO-4217
    emergencyContact: {
        name: String,
        phone: String,
        relation: String,
    },
    totalTrips: {
        type: Number,
        default: 0,
    },
    totalSpent: {
        type: Number,
        default: 0,
    },
    wishlistTours: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Tour",
        },
    ],
    bookedTours: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Tour",
        },
    ],
    reviewsGiven: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Review",
        },
    ],
}, { timestamps: true });
exports.Tourist = (0, mongoose_1.model)("Tourist", touristSchema);
