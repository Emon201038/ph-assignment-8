import mongoose from "mongoose";

export interface IGuide {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // ref: users

  // Professional profile
  expertise: string[]; // City tours, Food tours
  experienceYears: number;
  certifications?: string[];

  // Availability
  availability?: {
    day: string; // Monday
    slots: string[]; // ["09:00", "14:00"]
  }[];

  // Pricing
  dailyRate: number;
  currency: string; // ISO-4217

  // Ratings
  rating: number;
  totalReviews: number;

  // Earnings
  totalEarnings: number;
  pendingEarnings: number;

  // Verification
  verified: boolean;
  verifiedAt?: Date;

  // Bank / payout
  bankInfo?: {
    bankCode: string;
    accountName: string;
    accountNumber: string;
    country: string; // ISO-3166
  };

  // Activity
  completedTours: number;
  cancelledTours: number;

  // System
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}
