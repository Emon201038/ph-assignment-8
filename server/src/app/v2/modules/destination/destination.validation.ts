import z from "zod";

export const createDestinationSchema = z.object({
  name: z.string({
    required_error: "Destination name is required",
  }),
  description: z.string().optional(),
  country: z.string({
    required_error: "Country is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
});

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
