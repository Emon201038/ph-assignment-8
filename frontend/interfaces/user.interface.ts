export enum UserRole {
  TOURIST = "TOURIST",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: string;
  contactNumber: string;

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
