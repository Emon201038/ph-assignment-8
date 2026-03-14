import z from "zod";

export const createTourSchema = z.object({
  title: z.string({
    error: "Tour title is required",
  }),
  description: z.string().optional(),
  destinationId: z.string({
    error: "Destination ID is required",
  }),
  category: z.string({
    error: "Category is required",
  }),
  priceFrom: z.number({
    error: "Price is required",
  }),
});

export type CreateTourInput = z.infer<typeof createTourSchema>;
