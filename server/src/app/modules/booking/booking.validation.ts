import z from "zod";

export const bookingZodSchema = z.object({
  tripId: z
    .string("tripId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid trip ID"),
  seats: z
    .number("seats is required")
    .min(1, "seats is required")
    .transform((z) => parseInt(z.toString())),
});
