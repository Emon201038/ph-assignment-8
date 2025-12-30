"use server";

import { Gender } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const createTouristSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  email: z.email("Invalide email address"),
  phone: z.string("phone is required").min(10, "phone is required"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 digit"),
  image: z.file("image is required").optional(),
  bio: z.string().optional(),
  interests: z
    .string()
    .optional()
    .transform((z) => {
      return z?.split(",")?.map((i) => i.trim());
    })
    .default([]),
  preferredLanguage: z.string().optional(),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
});

export const getUsers = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?${queryString}`);
  return await res.json();
};

export const createTouristAction = async (
  currentState: unknown,
  formData: FormData
) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image") || null,
      preferedLanguage: formData.get("preferedLanguage") || "",
      interests: formData.get("interests") || "",
      bio: formData.get("bio") || "",
      phone: formData.get("phone") || "",
      gender: formData.get("gender") || Gender.MALE,
      address: formData.get("address") || "",
    };

    const validationResult = zodValidator(payload, createTouristSchema);

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

    modifiedFormData.append("name", payload?.name as string);
    modifiedFormData.append("email", payload?.email as string);
    modifiedFormData.append("password", payload?.password as string);
    if ((formData.get("image") as File)?.size) {
      modifiedFormData.append("image", payload?.image as Blob);
    }
    modifiedFormData.append(
      "preferedLanguage",
      payload?.preferedLanguage as string
    );
    modifiedFormData.append("interests", payload?.interests as string);
    modifiedFormData.append("bio", payload?.bio as string);
    modifiedFormData.append("phone", payload?.phone as string);
    modifiedFormData.append("gender", payload?.gender as string);
    modifiedFormData.append("address", payload?.address as string);

    const res = await serverFetch.post("/tourists", {
      body: modifiedFormData,
    });

    const data = await res.json();
    if (!data?.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.message || "Something went wrong",
      errors: [],
    };
  }
};
