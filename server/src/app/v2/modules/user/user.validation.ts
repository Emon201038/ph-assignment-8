import z from "zod";
import { UserRole } from "../../../../../prisma/generated/enums";

export const createUserSchema = z.object({
  name: z.string({
    error: "Name is required",
  }),
  email: z
    .string({
      error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(UserRole).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
