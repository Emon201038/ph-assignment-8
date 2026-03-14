import z from "zod";

export const createTripSchema = z.object({
  tourId: z.string({
    error: "Tour ID is required",
  }),
  guideId: z
    .string({
      error: "Guide ID is required",
    })
    .nullable()
    .optional(),
  startDate: z.coerce.date({
    error: "Start date is required",
  }),
  endDate: z.coerce.date({
    error: "End date is required",
  }),
  price: z.number({
    error: "Price is required",
  }),
  maxGuests: z.number({
    error: "Max guests is required",
  }),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
