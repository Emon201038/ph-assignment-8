import { Schema, model } from "mongoose";
import { IGuide, IGuideSchedule } from "./guide.interface";

const guideSchema = new Schema<IGuide>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

export const Guide = model<IGuide>("Guide", guideSchema);

const GuideScheduleSchema = new Schema<IGuideSchedule>(
  {
    guideId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const GuideSchedule = model<IGuideSchedule>(
  "GuideSchedule",
  GuideScheduleSchema
);
