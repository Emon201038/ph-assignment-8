import { Document, Types } from "mongoose";

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface IBooking extends Document {
  user: Types.ObjectId;
  trip: Types.ObjectId;
  seats: number;
  pricePaid: number;
  status: BookingStatus;
  reviewed: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
