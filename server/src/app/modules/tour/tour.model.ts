import { Schema, model } from "mongoose";
import { ITour } from "./tour.interface";

const itinerarySchema = new Schema(
  {
    step: Number,
    title: String,
    details: String,
  },
  { _id: false }
);

const tourSchema = new Schema<ITour>(
  {
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

    languages: [{ type: String }],

    guide: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<ITour>("Tour", tourSchema);
