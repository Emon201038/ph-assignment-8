import { z } from "zod";

const itinerarySchema = z.array(
  z.object({
    step: z.number(),
    title: z.string(),
    details: z.string(),
  })
);

export const TourValidation = {
  create: z.object({
    body: z.object({
      title: z.string().min(3),
      description: z.string().min(10),

      category: z.string(),
      city: z.string(),
      country: z.string(),

      price: z.number().min(0),
      duration: z.string().min(2),

      itinerary: itinerarySchema.optional(),

      images: z.array(z.string()).optional(),

      meetingPoint: z.string(),
      maxGroupSize: z.number().min(1),

      language: z.array(z.string()).min(1, "At least one language is required"),

      guide: z.string(), // guide userId
    }),
  }),

  update: z.object({
    body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),

      category: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),

      price: z.number().optional(),
      duration: z.string().optional(),

      itinerary: itinerarySchema.optional(),
      images: z.array(z.string()).optional(),

      meetingPoint: z.string().optional(),
      maxGroupSize: z.number().optional(),

      language: z.array(z.string()).optional(),

      isActive: z.boolean().optional(),
    }),
    params: z.object({
      id: z.string(),
    }),
  }),
};
