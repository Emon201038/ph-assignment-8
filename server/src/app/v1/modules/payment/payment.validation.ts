import z from "zod";

export const paymentZodSchema = z.object({
  tripId: z
    .string("tripId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid trip ID"),
  bookingId: z
    .string("bookingId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid booking ID"),
});
