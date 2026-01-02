import z from "zod";
import { TripStatus } from "./trip.interface";

export const tripSchema = z.object({
  tourId: z
    .string("Tour is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid tour ID"),
  guideId: z
    .string("Guide is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid guide ID"),
  startDate: z.coerce.date("Start date is required"),
  endDate: z.coerce.date("End date is required"),
  maxCapacity: z.number("Max capacity is required"),
  finalItinerary: z
    .array(
      z
        .object({
          day: z.number(),
          timing: z.string(),
          notes: z.string(),
        })
        .optional()
    )
    .optional()
    .default([]),
  bookedSeats: z.number().default(0),
  status: z.enum(Object.values(TripStatus)).default(TripStatus.UPCOMING),
});
