"use server";

import { IResponse } from "@/interfaces";
import { ITour } from "@/interfaces/tour.interface";
import { ITrip } from "@/interfaces/trip.interface";
import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

const tourSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  category: z.string().min(1, "Category is required").toUpperCase(),
  destinationId: z.string().min(1, "Destination is required"),

  maxGroupSize: z.coerce.number().min(1, "Must be at least 1"),
  durationDays: z.coerce.number().min(1, "Must be at least 1"),
  priceFrom: z.coerce.number().min(1, "Price is required"),

  difficulty: z.string().min(1, "difficulty is required"),

  isPublished: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),

  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required")
    .refine((file) => file.size < 5 * 1024 * 1024, "Max 5MB allowed")
    .refine(
      (file) => file.type.startsWith("image/"),
      "Only image files allowed",
    ),
});

const extractPayload = (formData: FormData) => ({
  title: formData.get("title"),
  description: formData.get("description"),
  category: formData.get("category")?.toString().toUpperCase(),
  destinationId: formData.get("destinationId"),

  maxGroupSize: formData.get("maxGroupSize"),
  durationDays: formData.get("durationDays"),
  priceFrom: formData.get("priceFrom"),

  difficulty: formData.get("difficulty"),
  image: formData.get("image"),

  isActive: formData.get("isPublished") === "on",
  featured: formData.get("featured") === "on",
});

export const createTour = async (_: unknown, formData: FormData) => {
  const isPublished = formData.get("isPublished") === "on";
  const featured = formData.get("featured") === "on";
  const guides = formData.getAll("guides");
  console.log(guides);
  formData.delete("isPublished");
  formData.delete("featured");

  formData.set("isPublished", isPublished ? "true" : "false");
  formData.set("featured", featured ? "true" : "false");

  const payload = extractPayload(formData);

  const parsed = tourSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((e) => {
        return {
          field: e.path[0] as string,
          message: e.message as string,
        };
      }),
      formData: payload,
      message: "Validation error",
    };
  }

  try {
    throw new Error("test");
    const res = await serverFetch.post("/v2/tours", {
      body: formData, // ✅ reuse original FormData
    });

    const data = await res.json();

    if (!data?.success) throw new Error(data?.message);

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create tour",
      formData: payload,
      errors: [],
    };
  }
};
export const updateTour = async (_: unknown, formData: FormData) => {
  const isPublished = formData.get("isPublished") === "on";
  const featured = formData.get("featured") === "on";
  formData.delete("isPublished");
  formData.delete("featured");

  formData.set("isPublished", isPublished ? "true" : "false");
  formData.set("featured", featured ? "true" : "false");
  const payload = {
    ...extractPayload(formData),
    id: formData.get("tourId"),
  };

  const schema = tourSchema.extend({
    id: z.string().uuid("Invalid ID"),
    image: z.instanceof(File).nullable().optional(), // optional for update
  });

  if (payload?.image instanceof File) {
    if (payload.image.size <= 0) formData.delete("image");
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((e) => {
        return {
          field: e.path[0] as string,
          message: e.message as string,
        };
      }),
      formData: payload,
      message: "Validation error",
    };
  }

  try {
    const res = await serverFetch.put(`/v2/tours/${parsed.data.id}`, {
      body: formData, // ✅ consistent
    });

    const data = await res.json();

    if (!data?.success) throw new Error(data?.message);

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update tour",
      formData: payload,
      errors: [],
    };
  }
};
export const getTours = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(`/tours?${queryString}`);
    const data: IResponse<ITour[]> = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getSingleTour = async (id: string) => {
  try {
    const res = await serverFetch.get(`/tours/${id}`);
    const data: IResponse<ITour> = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUserTours = async (id: string) => {
  const res = await serverFetch.get(`/guides/tours/${id}`);
  const data: IResponse<{ trip: ITrip<ITour>; _id: string }[]> =
    await res.json();
  return data;
};
