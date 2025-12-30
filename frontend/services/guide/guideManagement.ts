"use server";

import { Gender } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const schema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  email: z.email("Invalide email address"),
  phone: z.string("phone is required").min(10, "phone is required"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 digit"),
  image: z.file("image is required").optional(),
  bio: z.string("bio is required").min(2, "bio is required"),
  expertise: z.string("expertise is required").transform((z) => {
    console.log(z, "expertise");
    return z?.split(",")?.map((i) => i.trim());
  }),
  languages: z.string("languages is required").transform((z) => {
    console.log(z);
    return z?.split(",")?.map((i) => i.trim());
  }),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
  hourlyRate: z
    .string("hourly rate is required")
    .min(1, "hourly rate is required")
    .transform((z) => parseFloat(z.toString())),
  address: z.string("address is required"),
  experienceYears: z
    .string("experience years is required")
    .min(1, "experience years is required")
    .transform((z) => parseFloat(z.toString())),
  currency: z.string("currency is required").optional(),
});

export const createGuide = async (prevState: unknown, formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image") || null,
      languages: formData.get("languages") || null,
      expertise: formData.get("expertise") || null,
      bio: formData.get("bio"),
      phone: formData.get("phone"),
      gender: formData.get("gender") as Gender,
      address: formData.get("address"),
      hourlyRate: formData.get("hourlyRate"),
      experienceYears: formData.get("experienceYears"),
      currency: formData.get("currency") || "",
    };

    const validationResult = zodValidator(payload, schema);

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
    modifiedFormData.append("languages", payload?.languages as string);
    modifiedFormData.append("expertise", payload?.expertise as string);
    modifiedFormData.append("bio", payload?.bio as string);
    modifiedFormData.append("phone", payload?.phone as string);
    modifiedFormData.append("gender", payload?.gender as string);
    modifiedFormData.append("address", payload?.address as string);
    modifiedFormData.append("hourlyRate", payload?.hourlyRate as string);
    modifiedFormData.append(
      "experienceYears",
      payload?.experienceYears as string
    );
    modifiedFormData.append("currency", payload?.currency as string);

    console.log(payload);

    const res = await serverFetch.post("/guides", {
      body: modifiedFormData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });

    const data = await res.json();

    console.log(data);

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
