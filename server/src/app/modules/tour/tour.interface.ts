import { Types } from "mongoose";

export interface ITour {
  title: string;
  description: string;
  category: string;
  city: string;
  country: string;

  price: number; // per tour
  duration: string; // e.g. "3 hours", "1 day"

  itinerary: {
    step: number;
    title: string;
    details: string;
  }[];

  images: string[];
  meetingPoint: string;
  maxGroupSize: number;

  language: string[];

  guide: Types.ObjectId; // reference to User (guide)

  rating?: number;
  totalReviews?: number;

  isActive: boolean;
}
