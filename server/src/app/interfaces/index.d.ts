import "express";
import "jsonwebtoken";
import { UserRole } from "../modules/user/user.interface";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
    role: UserRole;
    email: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
