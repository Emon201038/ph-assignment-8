import z from "zod";
import { Gender } from "../user/user.interface";

export const touristSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  email: z.email("Invalide email address"),
  phone: z.string("Invalid phone").min(10, "phone is required"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 digit"),
  image: z.file("image is required").optional(),
  bio: z.string().optional(),
  interests: z
    .string()
    .optional()
    .transform((z) => z?.split(",").map((i) => i.trim()))
    .default([]),
  preferredLanguage: z.string().optional(),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
});
