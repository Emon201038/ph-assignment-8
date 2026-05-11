import z from "zod";

const commaSeparatedListSchema = (errorMessage: string) =>
  z
    .string({
      error: errorMessage,
    })
    .min(1, errorMessage)
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    );

export const createDestinationSchema = z.object({
  name: z
    .string({
      error: "Destination name is required",
    })
    .min(1, "Destination name is required"),
  country: z
    .string({
      error: "Country is required",
    })
    .min(1, "Country is required"),
  city: z
    .string({
      error: "City is required",
    })
    .min(1, "City is required"),
  continent: z
    .string({
      error: "Continent is required",
    })
    .min(1, "Continent is required"),
  description: z
    .string({
      error: "Description is required",
    })
    .min(1, "Description is required"),
  bestSeason: commaSeparatedListSchema("Best season is required"),
  currency: z
    .string({
      error: "Currency is required",
    })
    .min(1, "Currency is required"),
  languages: commaSeparatedListSchema("Languages are required"),
  transportation: z
    .string({
      error: "Transportation is required",
    })
    .min(1, "Transportation is required"),
});

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
