import z from "zod";

export const createTourSchema = z.object({
  title: z.string({
    error: "Tour title is required",
  }),
  description: z
    .string("description is required")
    .min(3, " description should minimum 3 charecters"),
  destinationId: z.string({
    error: "Destination ID is required",
  }),
  category: z.string({
    error: "Category is required",
  }),
  priceFrom: z
    .string({
      error: "Price is required",
    })
    .min(1, "Price should be greater than 0")
    .transform((z) => parseFloat(z.toString())),
  maxGroupSize: z
    .string({
      error: "Max group size is required",
    })
    .min(1, "Max group size should be greater than 0")
    .transform((z) => parseInt(z.toString())),
  durationDays: z
    .string({
      error: "Duration is required",
    })
    .min(1, "Duration should be greater than 0")
    .transform((z) => parseInt(z.toString())),
  difficulty: z
    .string({
      error: "At least one difficulty is required",
    })
    .min(1, "At least one difficulty is required"),
  isPublished: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export const toggleTourGuideSchema = z.object({
  guideId: z
    .string({
      error: "Guide ID is required",
    })
    .min(1, "Guide ID is required"),
});

export type CreateTourInput = z.infer<typeof createTourSchema>;

export type ToggleTourGuideInput = z.infer<typeof toggleTourGuideSchema>;
