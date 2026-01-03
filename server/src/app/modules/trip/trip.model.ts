import { model, Schema } from "mongoose";
import { ITrip, TripStatus } from "./trip.interface";

const TripSchema = new Schema<ITrip>(
  {
    tourId: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Tour is required"],
    },
    guideId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Guide is required"],
    },

    startDate: { type: Date, required: [true, "Start date is required"] },
    endDate: { type: Date, required: [true, "End date is required"] },

    maxCapacity: { type: Number, required: [true, "Max capacity is required"] },
    bookedSeats: { type: Number, default: 0 },

    finalItinerary: [
      {
        day: Number,
        timing: String,
        notes: String,
      },
    ],

    status: {
      type: String,
      enum: Object.values(TripStatus),
      default: TripStatus.OPEN,
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Trip = model<ITrip>("Trip", TripSchema);
