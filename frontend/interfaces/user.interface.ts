export enum UserRole {
  TOURIST = "TOURIST",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: string;
  phone: string;
  gender: Gender;

  // Common fields
  profileImage?: string;
  bio?: string;
  languages?: string[];

  // Tourist fields
  touristInfo?: {
    preferences?: string[];
    wishlist?: string[];
  };

  // Guide fields
  guideInfo?: {
    gender: string;
    expertise: string[];
    dailyRate: number;
    rating?: number;
    totalReviews?: number;
    verified?: boolean;
    availability?: {
      day: string;
      slots: string[];
    }[];
  };

  // Admin fields
  adminInfo?: {
    permissions: string[];
  };

  createdAt: Date;
  updatedAt?: Date;

  isDeleted?: boolean;
  isBlocked?: boolean;
}

export interface ITourist {
  _id: string;
  user: IUser;
  interests: string[];
  preferredLanguage: string;
  preferredCurrency: string;
  totalTrips: number;
  totalSpent: number;
  wishlistTours: string[];
  bookedTours: string[];
  reviewsGiven: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
  createdAt: Date;
  "user.name": string;
}
