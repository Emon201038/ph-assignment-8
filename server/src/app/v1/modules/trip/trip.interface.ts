import { Document, Types } from "mongoose";

export enum TripStatus {
  OPEN = "OPEN",
  FULL = "FULL",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  UPCOMING = "UPCOMING",
}

export interface IFinalItinerary {
  day: number;
  timing: string;
  notes?: string;
}

export interface ITrip extends Document {
  _id: Types.ObjectId;
  tourId: Types.ObjectId;
  guideId: Types.ObjectId;
  startDate: Date;
  duration: number;
  maxCapacity: number;
  bookedSeats: number;
  finalItinerary: IFinalItinerary[];
  status: TripStatus;
  isDeleted: boolean;
}
