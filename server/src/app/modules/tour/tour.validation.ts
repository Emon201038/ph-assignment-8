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
    title: z.string("title is required").min(3),
    description: z.string("description is required").min(3),

    category: z.string("category is required"),
    city: z.string("city is required"),
    country: z.string("country is required"),

    price: z.string("price is required").min(0),
    duration: z.string("duration is required").min(2),

    itinerary: itinerarySchema.optional(),
    images: z.array(z.string()).optional(),
    language: z
      .string("language is required")
      .min(1, "At least one language is required"),
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
