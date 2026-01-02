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
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },

    category: { type: String, required: [true, "Category is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },

    price: { type: Number, required: [true, "Price is required"] },
    duration: { type: String, required: [true, "Duration is required"] },
    itinerary: [itinerarySchema],
    images: [{ type: String }],
    language: { type: String },
    isActive: { type: Boolean, default: false },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

export default model<ITour>("Tour", tourSchema);
