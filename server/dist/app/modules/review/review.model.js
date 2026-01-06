"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    reviewerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    targetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: "targetType",
    },
    targetType: {
        type: String,
        enum: ["Tour", "User"],
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
/**
 * Prevent duplicate review:
 * One user can review a Tour/User only once
 */
reviewSchema.index({ reviewerId: 1, targetId: 1, targetType: 1 }, { unique: true });
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
