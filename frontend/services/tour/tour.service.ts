"use server";

import { IResponse } from "@/interfaces";
import { ITour } from "@/interfaces/tour.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { is } from "date-fns/locale";
import z from "zod";

const tourSchema = {
  title: z.string("title is required").min(2, "title is required"),
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
};

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

    const validationResult = zodValidator(
      payload,
      z.object({ ...tourSchema, images: z.file("image is required") })
    );
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
    const payload = {
      id: formData.get("tourId"),
      title: formData.get("title"),
      images: formData.get("images"),
      description: formData.get("description"),
      category: formData.get("category"),
      city: formData.get("city"),
      country: formData.get("country"),
      price: formData.get("price"),
      duration: formData.get("duration"),
      language: formData.get("language"),
      isActive: formData.get("isActive"),
      isFeatured: formData.get("isFeatured"),
    };

    const validationResult = zodValidator(
      payload,
      z.object({
        ...tourSchema,
        id: z.string("id is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid id"),
        isActive: z.any().transform((z) => z === "on"),
        isFeatured: z.any().transform((z) => z === "on"),
      })
    );
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
    modifiedFormData.append("body", JSON.stringify(validationResult.data));

    const res = await serverFetch.put(`/tours/${validationResult.data.id}`, {
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

export const getSingleTour = async (id: string) => {
  const res = await serverFetch.get(`/tours/${id}`);
  const data: IResponse<ITour> = await res.json();
  return data;
};
