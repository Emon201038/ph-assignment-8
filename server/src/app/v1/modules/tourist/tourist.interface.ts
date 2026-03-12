import mongoose, { Document } from "mongoose";

export interface ITourist extends Document {
  userId: mongoose.Types.ObjectId;
  interests: string[];
  preferredLanguage: string;
  preferredCurrency: string;
  totalTrips: number;
  totalSpent: number;
  wishlistTours: mongoose.Types.ObjectId[];
  bookedTours: mongoose.Types.ObjectId[];
  reviewsGiven: mongoose.Types.ObjectId[];
  emergencyContact?: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
}
