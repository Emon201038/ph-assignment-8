"use server";
import { Gender, UserRole } from "@/interfaces/user.interface";
import { zodValidator } from "@/lib/zod-validator";
import z, { email } from "zod";
import { login } from "../login/action";

const serverUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

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
      console.log(z);
      return z?.split(",")?.map((i) => i.trim());
    })
    .default([]),
  preferredLanguage: z.string().optional(),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
});

export const signUpAction = async (
  initialState: unknown,
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
      gender: formData.get("gender") as Gender,
      address: formData.get("address") || "",
    };

    if (!zodValidator(payload, createTouristSchema).success) {
      return zodValidator(payload, createTouristSchema);
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

    console.log(payload);

    const res = await fetch(`${serverUrl}/tourists`, {
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
