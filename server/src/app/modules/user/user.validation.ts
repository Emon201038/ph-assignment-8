import { z } from "zod";

// -----------------------------------------
// Common Validations
// -----------------------------------------
const languagesSchema = z.array(z.string()).optional();

const availabilitySchema = z
  .array(
    z.object({
      day: z.string(),
      slots: z.array(z.string()),
    })
  )
  .optional();

// -----------------------------------------
// Tourist Info
// -----------------------------------------
const touristInfoSchema = z
  .object({
    preferences: z.array(z.string()).optional(),
    wishlist: z.array(z.string()).optional(), // tour IDs
  })
  .optional();

// -----------------------------------------
// Guide Info
// -----------------------------------------
const guideInfoSchema = z
  .object({
    expertise: z.array(z.string()).min(1, "At least one expertise is required"),
    dailyRate: z.number().min(0, "Daily rate must be a positive number"),
    rating: z.number().optional(),
    totalReviews: z.number().optional(),
    verified: z.boolean().optional(),
    availability: availabilitySchema,
  })
  .optional();

// -----------------------------------------
// Admin Info
// -----------------------------------------
const adminInfoSchema = z
  .object({
    permissions: z.array(z.string()).optional(),
  })
  .optional();

// -----------------------------------------
// Create User Schema (Register)
// -----------------------------------------
export const UserValidation = {
  create: z.object({
    body: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(["tourist", "guide", "admin"]),

      // Common fields
      profileImage: z.string().optional(),
      bio: z.string().optional(),
      languages: languagesSchema,

      // Nested Role-based fields
      touristInfo: touristInfoSchema,
      guideInfo: guideInfoSchema,
      adminInfo: adminInfoSchema,
    }),
  }),

  // -----------------------------------------
  // Update User Schema
  // -----------------------------------------
  update: z.object({
    body: z.object({
      name: z.string().min(2).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),

      profileImage: z.string().optional(),
      bio: z.string().optional(),
      languages: languagesSchema,

      touristInfo: touristInfoSchema,
      guideInfo: guideInfoSchema,
      adminInfo: adminInfoSchema,
    }),
    params: z.object({
      id: z.string(),
    }),
  }),

  // -----------------------------------------
  // Change Role (Admin Only)
  // -----------------------------------------
  updateRole: z.object({
    body: z.object({
      role: z.enum(["tourist", "guide", "admin"]),
    }),
    params: z.object({
      id: z.string(),
    }),
  }),
};
