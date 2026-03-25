export enum UserRole {
  TOURIST = "TRAVELER",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface IUser<T = null> {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  city: string;
  country: string;
  phone: string;

  // Common fields
  avatar?: string;
  bio?: string;
  profile: T;

  createdAt: Date;
  updatedAt?: Date;

  isDeleted?: boolean;
  isBlocked?: boolean;
}

export interface ITourist {
  id: string;
  userId: string;
  languages: string[];
  interests: string[];
  gender: Gender;
  aboutMe: string;
  dateOfBirth: string;
  bloodGroup: string;
  totalTrips: number;
  totalSpent: number;
  wishlistTours: string[];
  bookedTours: string[];
  reviewsGiven: string[];
  emergencyContactRelation?: string;
  emergencyContactNumber: string;
  createdAt: Date;
}

export interface IEmergencyContact {
  name: string;
  phone: string;
  email: string;
  id: string;
  userId: string;
  createdAt: string;
}
