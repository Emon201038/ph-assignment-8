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
    address: String,
    gender: {
        type: String,
        enum: Object.values(user_interface_1.Gender),
        default: user_interface_1.Gender.MALE,
    },
    phone: String,
    profile: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: "roleProfileModel",
    },
    roleProfileModel: {
        type: String,
        required: true,
        enum: ["Tourist", "Guide", "AdminProfile"],
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
