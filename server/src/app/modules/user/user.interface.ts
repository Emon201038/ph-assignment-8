import mongoose, { Document } from "mongoose";

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

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  // Common fields
  address: string;
  phone: string;
  preferedLanguages: string[];
  profileImage?: string;
  bio?: string;
  gender: Gender;
  profile: mongoose.Types.ObjectId;
  roleProfileModel: "Tourist" | "Guide" | "Admin";

  createdAt?: Date;
  updatedAt?: Date;

  isDeleted?: boolean;
  isBlocked?: boolean;
}
