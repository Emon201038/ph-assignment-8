import mongoose, { Document } from "mongoose";
import { Types } from "mongoose";

export interface IGuide extends Document {
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
  hourlyRate: number;
  currency: string; // ISO-4217

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

  // Reviews
  totalReviews: number;
  averageRating: number;

  // System
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  bufferDays: number;
  deletedAt?: Date;
}

export interface IUnavailableRange {
  startDate: Date;
  endDate: Date;
  reason?: string;
}

export interface IGuideSchedule {
  guideId: Types.ObjectId;
  unavailableRanges: IUnavailableRange[];
}
