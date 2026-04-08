import z from "zod";
import { OTPType } from "../../../../../prisma/generated/enums";

export const sendOtpSchema = z.object({
  type: z.enum(OTPType),
  email: z.string(),
  userId: z.string(),
});

export type SendOtpSchema = z.infer<typeof sendOtpSchema>;
