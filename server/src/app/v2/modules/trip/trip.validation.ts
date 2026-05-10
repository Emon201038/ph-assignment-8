import z from "zod";
import { TripStatus } from "../../../../../prisma/generated/enums";

export const createTripSchema = z.object({
  tourId: z.string("Tour ID is required").min(1, "Tour ID is required"),
  guideId: z.string("Guide ID is required").min(1, "Guide ID is required"),
  startDate: z.coerce.date("Start date is required"),
  endDate: z.coerce.date("End date is required"),
  maxGuests: z.coerce
    .number("Max guests is required")
    .min(1, "Max guests is required"),
  status: z.enum(TripStatus).default(TripStatus.SCHEDULED),
  tripIncludes: z
    .string({
      error: "Trip includes is required",
    })
    .min(1, "Trip includes is required")
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    )
    .refine((data) => data.length > 0, {
      message: "At least one trip include is required",
    }),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
