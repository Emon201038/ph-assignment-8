"use server";
import { Gender, ITourist, IUser } from "@/interfaces/user.interface";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";
import { login } from "../auth/auth.service";
import { serverFetch } from "@/lib/server-fetch";
import { IResponse } from "@/interfaces";
import { revalidateTag } from "next/cache";

const touristSchema = z.object({
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

export const createTouristAction = async (
  initialState: unknown,
  formData: FormData
) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image") || null,
      preferredLanguage: formData.get("preferredLanguage") || "",
      interests: formData.get("interests") || "",
      bio: formData.get("bio") || "",
      phone: formData.get("phone") || "",
      gender: formData.get("gender") as Gender,
      address: formData.get("address") || "",
    };

    const validationResult = zodValidator(payload, touristSchema);

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
      "preferredLanguage",
      payload?.preferredLanguage as string
    );
    modifiedFormData.append("interests", payload?.interests as string);
    modifiedFormData.append("bio", payload?.bio as string);
    modifiedFormData.append("phone", payload?.phone as string);
    modifiedFormData.append("gender", payload?.gender as string);
    modifiedFormData.append("address", payload?.address as string);

    const res = await serverFetch.post(`/tourists`, {
      method: "POST",
      credentials: "include",
      body: modifiedFormData,
    });

    const data = await res.json();

    if (data?.success && formData.get("isSignUp") === "true") {
      await login(initialState, formData);
    }
    if (!data?.success) {
      throw new Error(data?.message);
    }
    return data;
  } catch (error: any) {
    console.log(error);
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: error?.message,
    };
  }
};

export const getTourists = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?role=TOURIST&${queryString}`);
  return await res.json();
};

export const deleteTourist = async (
  id: string
): Promise<IResponse<IUser<ITourist> | null>> => {
  try {
    const res = await serverFetch.delete(`/tourists/${id}`);

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete tourist",
      data: null,
    };
  }
};

export const editTourist = async (
  id: string,
  currentState: unknown,
  formData: FormData
) => {
  const schema = z.object({
    name: z.string("name is required").min(2, "name is required"),
    phone: z.string("phone is required").min(10, "phone is required"),
    // bio: z.string().optional() || "",
    interests: z
      .string()
      .optional()
      .transform((z) => {
        return z?.split(",")?.map((i) => i.trim());
      })
      .default([]),
    preferredLanguage: z.string().optional() || "",
    gender: z
      .enum(Object.values(Gender), "Invalide gender")
      .default(Gender.MALE),
    address: z.string().optional() || "",
    bio: z.string().optional() || "",
  });

  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    interests: formData.get("interests"),
    preferredLanguage: formData.get("preferredLanguage"),
    gender: formData.get("gender"),
    address: formData.get("address"),
  };

  try {
    const validatedPayload = zodValidator(payload, schema);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "validation failed",
        formData: payload,
        data: null,
        errors: validatedPayload.errors,
      };
    }
    const res = await serverFetch.put(`/tourists/${id}`, {
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("me", "max");

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to edit tourist",
      formData: payload,
      data: null,
    };
  }
};
