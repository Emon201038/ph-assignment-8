import { IGuide } from "./guide.interface";
import { IUser } from "./user.interface";

export interface ITour {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  country: string;
  destination: {
    city: string;
    country: string;
    languages: string[];
  };
  image: string;

  price: number; // per tour
  priceFrom: number;
  durationDays: number;
  duration: string; // e.g. "3 hours", "1 day"

  itinerary: {
    step: number;
    title: string;
    details: string;
    description: string;
    dayNumber: number;
  }[];

  images: string[];
  meetingPoint: string;
  maxGroupSize: number;

  language: string;

  guide: IUser<IGuide>; // reference to User (guide)

  averageRating?: number;
  rating: number;
  reviewCount: number;
  totalReviews?: number;
  totalTrips: number;

  itineraries: {
    dayNumber: number;
    title: string;
    description: string;
    icon: string;
  }[];

  trips: {
    id: string;
    guide: IUser;
    startDate: Date;
    endDate: Date;
    maxGuests: number;
    bookedSeats: number;
    price: number;
    status: string;
    includes: {
      category: string;
      title: string;
      description: string;
    }[];
  }[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
}
