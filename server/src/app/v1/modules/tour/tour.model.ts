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

    category: {
      type: String,
      required: [true, "Category is required"],
      lowercase: true,
      trim: true,
    },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },

    price: { type: Number, required: [true, "Price is required"] },
    itinerary: [itinerarySchema],
    images: [{ type: String }],
    language: { type: String },
    isActive: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

tourSchema.virtual("totalTrips", {
  ref: "Trip",
  localField: "_id",
  foreignField: "tourId",
  count: true, // Only get the count
});

// Ensure virtuals are included when converting to JSON/Object
tourSchema.set("toJSON", { virtuals: true });
tourSchema.set("toObject", { virtuals: true });

const Tour = model<ITour>("Tour", tourSchema);
export default Tour;
