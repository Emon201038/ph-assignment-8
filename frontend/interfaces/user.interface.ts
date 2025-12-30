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

export interface IUser<T> {
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
  profile: T;

  createdAt: Date;
  updatedAt?: Date;

  isDeleted?: boolean;
  isBlocked?: boolean;
}

export interface ITourist {
  _id: string;
  user: IUser<ITourist>;
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
