import { Document, Types } from "mongoose";

export interface ITour extends Document {
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
  language: string;
  isActive: boolean;
  isFeatured: boolean;
  averageRating: number;
  totalReviews: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
