import { Schema, model } from "mongoose";
import { IGuide } from "./guide.interface";

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

    dailyRate: {
      type: Number,
      required: true,
    },

    currency: {
      type: String, // ISO-4217
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    pendingEarnings: {
      type: Number,
      default: 0,
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

    completedTours: {
      type: Number,
      default: 0,
    },

    cancelledTours: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

export const Guide = model<IGuide>("Guide", guideSchema);
