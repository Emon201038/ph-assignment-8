import z from "zod";
import { Gender } from "../user/user.interface";

export const guideSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  email: z.email("Invalide email address"),
  phone: z.string("phone is required").min(10, "phone is required"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 digit"),
  image: z.file("image is required").optional(),
  bio: z.string("bio is required").min(2, "bio is required"),
  expertise: z.string("expertise is required").transform((z) => {
    console.log(z, "expertise");
    return z?.split(",")?.map((i) => i.trim());
  }),
  languages: z.string("languages is required").transform((z) => {
    console.log(z);
    return z?.split(",")?.map((i) => i.trim());
  }),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
  hourlyRate: z
    .string("hourly rate is required")
    .min(1, "hourly rate is required")
    .transform((z) => parseFloat(z.toString())),
  address: z.string("address is required"),
  experienceYears: z
    .string("experience years is required")
    .min(1, "experience years is required")
    .transform((z) => parseFloat(z.toString())),
  currency: z.string("currency is required").optional(),
});
