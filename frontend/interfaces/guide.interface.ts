import { IUser } from "./user.interface";

export interface IGuide {
  _id: string;

  // Professional profile
  expertise: string[]; // City tours, Food tours
  experienceYears: number;
  certifications?: string[];
  languages: string[];

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

  rating: number;
  totalTrips: number;
  totalEarnings: number;

  // System
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}
