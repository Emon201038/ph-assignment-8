import z from "zod";
import { TwoFactorMethod } from "../../../../../prisma/generated/enums";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string("Password must be string")
    .min(1, "Password is required")
    .min(6, "Password must be minimum 6 characters"),
  deviceId: z.string().min(1, "Device ID is required"),
  rememberMe: z.boolean().default(false),
  deviceName: z.string().nullable().optional(),
  browserName: z.string().nullable().optional(),
  os: z.string().nullable().optional(),
  deviceType: z.string().nullable().optional(),
});

export const googleLoginSchema = z.object({
  email: z.string().email("Email is required"),
  name: z.string().min(1, "Name is required"),
  avatar: z.string().optional(),
  providerId: z.string().min(1, "Provider ID is required"),
});

export const facebookLoginSchema = z.object({
  email: z.string().email("Email is required"),
  name: z.string().min(1, "Name is required"),
  avatar: z.string().optional(),
  providerId: z.string().min(1, "Provider ID is required"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z
    .string("Password must be string")
    .min(6, "Password must be minimum 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string("New password must be string")
    .min(6, "Password must be minimum 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email is required"),
});

export const verifyOtpSchema = z.object({
  id: z.string("Id is required").nullable().optional(),
  method: z.enum(TwoFactorMethod, "Method is required"),
  userId: z.string("User Id is required").min(1, "User Id is required"),
  deviceId: z.string("Device Id is required").min(1, "Device Id is required"),
  otp: z.string("OTP is required").min(1, "OTP is required"),
  rememberMe: z.boolean().default(false),
  deviceName: z.string().nullable().optional(),
  browserName: z.string().nullable().optional(),
  os: z.string().nullable().optional(),
  deviceType: z.string().nullable().optional(),
});

export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
