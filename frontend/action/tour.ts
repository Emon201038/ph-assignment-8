import { IResponse } from "@/interfaces";
import { ITour } from "@/interfaces/tour.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const tourSchema = z.object({
  title: z.string("title is required").min(1, "title is required"),
  description: z
    .string("description is required")
    .min(1, "description is required")
    .min(3, "description should minimum 3 charecters"),
  city: z.string("city is required").min(1, "city is required"),
  country: z.string("country is required").min(1, "country is required"),
  category: z.string("category is required").min(1, "category is required"),
  meetingPoint: z
    .string("meeting point is required")
    .min(1, "meeting point is required"),
  language: z
    .string("languages is required")
    .min(1, "languages is required")
    .transform((val) =>
      val
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean)
    ),
  duration: z
    .string("duration is required")
    .min(1, "duration should minimum 1h"),
  maxGroupSize: z
    .string("maxGroupSize is required")
    .min(1, "maxGroupSize should minimum 1"),
  images: z.file("image is required"),
});

export const formDataToObject = (formData: FormData) => {
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    // Handle multiple values (checkbox, multi-select)
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key])
        ? [...obj[key], value]
        : [obj[key], value];
    } else {
      obj[key] = value;
    }
  }

  return obj;
};

export const objectToFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // handle array values
    if (Array.isArray(value)) {
      value.forEach((v) => {
        formData.append(key, String(v));
      });
      return;
    }

    // handle File
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // default (string / number / boolean)
    formData.append(key, String(value));
  });

  return formData;
};

export const createTourAction = async (
  currentState: unknown,
  formData: FormData
) => {
  try {
    if (!zodValidator(formDataToObject(formData), tourSchema).success) {
      return zodValidator(formDataToObject(formData), tourSchema);
    }

    const res = await serverFetch.post("/tours", {
      body: formData,
    });

    const data = await res.json();

    console.log(data);
    return {
      success: true,
      message: "success",
      data: "",
      errors: [],
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.message,
      data: null,
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
