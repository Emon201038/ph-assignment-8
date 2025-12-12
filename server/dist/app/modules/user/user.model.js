"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "User name is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        set: function (v) {
            return bcryptjs_1.default.hashSync(v, 12);
        },
    },
    role: {
        type: String,
        enum: ["TOURIST", "GUIDE", "ADMIN"],
        default: user_interface_1.UserRole.TOURIST,
    },
    // Common fields
    profileImage: String,
    bio: String,
    languages: [String],
    // Tourist specific fields
    touristInfo: {
        preferences: [String],
        wishlist: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Tour" }],
    },
    // Guide specific fields
    guideInfo: {
        expertise: [String],
        dailyRate: Number,
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
        availability: [
            {
                day: String,
                slots: [String], // e.g ["09:00", "10:00"]
            },
        ],
    },
    // Admin specific fields
    adminInfo: {
        permissions: [String],
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
