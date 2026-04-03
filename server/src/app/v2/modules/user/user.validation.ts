import { z } from "zod";
import { Gender, UserRole } from "../../../../../prisma/generated/enums";

export const createUserSchema = z.object({
  name: z.string({ error: "Name is required" }),
  email: z.string({ error: "Email is required" }).email("Invalid email format"),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),

  role: z.enum(UserRole).default(UserRole.TRAVELER),
  gender: z.enum(Gender).default(Gender.MALE),
  country: z.string().optional(),
  city: z.string().optional(),
  bio: z.string(),
  phone: z.string().optional(),
  interests: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  specialties: z.array(z.string()).default([]),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),

  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .optional(),

  country: z.string().optional(),
  city: z.string().optional(),

  gender: z.enum(Gender).default(Gender.MALE),

  avatar: z.any().optional(),

  bloodGroup: z.string().optional(),
  bio: z.string().optional(),
  dateOfBirth: z.string().optional(),

  interests: z.string().transform((z) => z?.split(",")?.map((i) => i.trim())),
  languages: z.array(z.string()).default([]),
  specialties: z.array(z.string()).default([]),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
