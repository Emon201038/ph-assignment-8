import { IGuide } from "./guide.interface";
import { ITour } from "./tour.interface";
import { IUser } from "./user.interface";

export enum TripStatus {
  OPEN = "OPEN",
  FULL = "FULL",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  UPCOMING = "SCHEDULED",
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
  endDate: Date;
  duration: number;
  maxCapacity: number;
  bookedSeats: number;
  includes: TripInclude[];
  finalItinerary: IFinalItinerary[];
  status: TripStatus;
  isDeleted: boolean;
}

export interface TripInclude {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  createdAt: Date;
  _count: {
    trips: number;
  };
}
