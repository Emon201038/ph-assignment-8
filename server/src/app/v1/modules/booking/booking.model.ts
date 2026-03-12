import { Schema, model, Types } from "mongoose";
import { BookingStatus, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    trip: {
      type: Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true,
    },

    seats: {
      type: Number,
      min: 1,
      required: true,
    },

    pricePaid: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.CONFIRMED,
      index: true,
    },

    reviewed: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, trip: 1 }, { unique: true });

export const Booking = model("Booking", bookingSchema);
