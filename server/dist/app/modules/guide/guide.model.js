"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideSchedule = exports.Guide = void 0;
const mongoose_1 = require("mongoose");
const guideSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    expertise: {
        type: [String],
        required: true,
    },
    experienceYears: {
        type: Number,
        min: 0,
    },
    certifications: [String],
    availability: [
        {
            day: String,
            slots: [String],
        },
    ],
    hourlyRate: {
        type: Number,
        required: true,
    },
    languages: {
        type: [String],
        required: true,
    },
    currency: {
        type: String, // ISO-4217
        // required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: Date,
    bankInfo: {
        bankCode: String,
        accountName: String,
        accountNumber: String,
        country: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, { timestamps: true });
exports.Guide = (0, mongoose_1.model)("Guide", guideSchema);
const GuideScheduleSchema = new mongoose_1.Schema({
    guideId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Guide",
        unique: true,
    },
    unavailableRanges: [
        {
            startDate: Date,
            endDate: Date,
            reason: String,
        },
    ],
}, { timestamps: true });
exports.GuideSchedule = (0, mongoose_1.model)("GuideSchedule", GuideScheduleSchema);
