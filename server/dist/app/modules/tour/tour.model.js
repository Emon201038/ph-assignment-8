"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itinerarySchema = new mongoose_1.Schema({
    step: Number,
    title: String,
    details: String,
}, { _id: false });
const tourSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    itinerary: [itinerarySchema],
    images: [{ type: String }],
    meetingPoint: { type: String, required: true },
    maxGroupSize: { type: Number, default: 5 },
    language: [{ type: String }],
    guide: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Tour", tourSchema);
