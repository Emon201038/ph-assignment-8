import { Document } from "mongoose";

export enum UserRole {
  TOURIST = "TOURIST",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: string;
  contactNumber: string;
  preferedLanguages: string[];

  // Common fields
  profileImage?: string;
  bio?: string;

  createdAt?: Date;
  updatedAt?: Date;

  isDeleted?: boolean;
  isBlocked?: boolean;
}
