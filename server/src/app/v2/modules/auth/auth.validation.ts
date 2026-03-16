import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string("Password must be string")
    .min(1, "Password is required")
    .min(6, "Password must be minimum 6 characters"),
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
