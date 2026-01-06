"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itinerarySchema = new mongoose_1.Schema({
    step: Number,
    title: String,
    details: String,
}, { _id: false });
const tourSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    category: {
        type: String,
        required: [true, "Category is required"],
        lowercase: true,
        trim: true,
    },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    duration: { type: String, required: [true, "Duration is required"] },
    itinerary: [itinerarySchema],
    images: [{ type: String }],
    language: { type: String },
    isActive: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const Tour = (0, mongoose_1.model)("Tour", tourSchema);
exports.default = Tour;
