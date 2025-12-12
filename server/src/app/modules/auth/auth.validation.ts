import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z
    .string("Password must be string")
    .min(1, "Password is required")
    .min(6, "Password must be minimum 6 digit"),
});
