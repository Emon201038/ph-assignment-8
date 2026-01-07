import { IGuide } from "./guide.interface";
import { ITour } from "./tour.interface";
import { IUser } from "./user.interface";

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

export interface ITrip<T = string> {
  _id: string;
  tourId: T;
  guide: IUser<IGuide>;
  tour: ITour;
  guideId: string;
  startDate: Date;
  duration: number;
  maxCapacity: number;
  bookedSeats: number;
  finalItinerary: IFinalItinerary[];
  status: TripStatus;
  isDeleted: boolean;
}
