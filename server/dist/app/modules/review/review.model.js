"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const review_interface_1 = require("./review.interface");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    target: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        index: true,
    },
    targetType: {
        type: String,
        enum: Object.values(review_interface_1.ReviewTargetType),
        required: true,
        index: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
reviewSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
