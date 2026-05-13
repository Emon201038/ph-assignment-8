"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const destinationSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  description: z
    .string("description is required")
    .min(2, "description is required"),
  continent: z.string("continent is required").min(2, "continent is required"),
  country: z.string("country is required").min(2, "country is required"),
  city: z.string("city is required").min(2, "city is required"),
  currency: z.string("currency is required").min(2, "currency is required"),
  languages: z
    .array(z.string("languages is required"))
    .min(1, "languages is required"),
  bestSeason: z
    .array(z.string("bestSeason is required"))
    .min(1, "bestSeason is required"),
  transportation: z
    .array(z.string("transportation is required"))
    .min(1, "transportation is required"),
  lat: z.string("lat is required").min(2, "lat is required"),
  lng: z.string("lng is required").min(2, "lng is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required"),
});

export const createDestination = async (
  initialState: unknown,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    continent: formData.get("continent"),
    country: formData.get("country"),
    city: formData.get("city"),
    description: formData.get("description"),
    currency: formData.get("currency"),
    languages: formData.getAll("languages"),
    bestSeason: formData.getAll("bestSeason"),
    transportation: formData.getAll("transportation"),
    lat: formData.get("lat"),
    lng: formData.get("lng"),
    image: formData.get("image"),
  };

  try {
    const validationResult = zodValidator(payload, destinationSchema);

    if (!validationResult.success && validationResult.errors) {
      return {
        success: false,
        errors: validationResult.errors,
        formData: payload,
        message: "validation error",
      };
    }

    const res = await serverFetch.post("/v2/destinations", {
      body: formData,
    });
    const data = await res.json();
    if (!data?.success) throw new Error(data?.message);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      formData: payload,
      errors: [],
    };
  }
};

export const updateDestination = async (
  initialState: unknown,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    continent: formData.get("continent"),
    country: formData.get("country"),
    city: formData.get("city"),
    description: formData.get("description"),
    currency: formData.get("currency"),
    languages: formData.getAll("languages"),
    bestSeason: formData.getAll("bestSeason"),
    transportation: formData.getAll("transportation"),
    lat: formData.get("lat"),
    lng: formData.get("lng"),
    image: formData.get("image"),
  };

  if (payload?.image instanceof File) {
    if (payload.image.size <= 0) formData.delete("image");
  }

  try {
    const validationResult = zodValidator(
      payload,
      destinationSchema.extend({
        image: z.optional(z.instanceof(File)).nullable(),
      }),
    );

    if (!validationResult.success && validationResult.errors) {
      return {
        success: false,
        errors: validationResult.errors,
        formData: payload,
        message: "validation error",
      };
    }

    const res = await serverFetch.put(
      `/v2/destinations/${formData.get("id")}`,
      {
        body: formData,
      },
    );
    const data = await res.json();
    if (!data?.success) throw new Error(data?.message);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      formData: payload,
      errors: [],
    };
  }
};
