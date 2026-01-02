"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const tourSchema = z.object({
  title: z.string("title is required").min(2, "title is required"),
  images: z.file("image is required"),
  description: z
    .string("description is required")
    .min(3, "description should minimum 3 charecters"),
  category: z.string("category is required"),
  city: z.string("city is required"),
  country: z.string("country is required"),
  price: z.string("price is required").min(0),
  duration: z.string("duration is required").min(2),
  language: z
    .string("language is required")
    .min(1, "At least one language is required"),
});

export const createTour = async (prevState: unknown, formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title"),
      images: formData.get("images"),
      description: formData.get("description"),
      category: formData.get("category"),
      city: formData.get("city"),
      country: formData.get("country"),
      price: formData.get("price"),
      duration: formData.get("duration"),
      language: formData.get("language"),
    };

    console.log(payload.images);
    const validationResult = zodValidator(payload, tourSchema);
    if (!validationResult.success && validationResult.errors) {
      return {
        success: false,
        errors: validationResult.errors,
        formData: payload,
        message: "validation error",
      };
    }

    if (!validationResult.data) {
      return {
        success: false,
        errors: validationResult.errors,
        formData: payload,
        message: "validation error",
      };
    }

    const modifiedFormData = new FormData();

    modifiedFormData.append("title", payload.title as string);
    if (payload.images instanceof File) {
      modifiedFormData.append("images", payload.images as File);
    }
    modifiedFormData.append("description", payload.description as string);
    modifiedFormData.append("category", payload.category as string);
    modifiedFormData.append("city", payload.city as string);
    modifiedFormData.append("country", payload.country as string);
    modifiedFormData.append("price", payload.price as string);
    modifiedFormData.append("duration", payload.duration as string);
    modifiedFormData.append("language", payload.language as string);

    const res = await serverFetch.post("/tours", {
      body: modifiedFormData,
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.message || "Failed to create tour",
      formData: null,
      errors: [],
    };
  }
};
export const updateTour = async (prevState: unknown, formData: FormData) => {
  try {
    console.log("update");
    return {
      success: true,
      message: "success",
      formData: {},
      errors: [],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update tour",
      formData: null,
      errors: [],
    };
  }
};
