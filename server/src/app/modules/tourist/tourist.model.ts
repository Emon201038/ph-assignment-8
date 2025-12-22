import { Schema, model, Types } from "mongoose";
import { ITourist } from "./tourist.interface";

const touristSchema = new Schema<ITourist>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    interests: [String],

    preferredLanguages: [String], // ISO-639-1

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
        type: Types.ObjectId,
        ref: "Tour",
      },
    ],

    bookedTours: [
      {
        type: Types.ObjectId,
        ref: "Tour",
      },
    ],

    reviewsGiven: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export const Tourist = model<ITourist>("Tourist", touristSchema);
