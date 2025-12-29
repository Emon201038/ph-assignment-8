import { IResponse } from "@/interfaces";
import { Gender, IUser } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

export const getTourists = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?role=TOURIST&${queryString}`);
  return await res.json();
};

export const deleteTourist = async (
  id: string
): Promise<IResponse<IUser | null>> => {
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
        console.log(z);
        return z?.split(",")?.map((i) => i.trim());
      })
      .default([]),
    preferredLanguage: z.string().optional() || "",
    gender: z
      .enum(Object.values(Gender), "Invalide gender")
      .default(Gender.MALE),
    address: z.string().optional() || "",
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

  console.log(payload);
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
