"use server";
import { IResponse } from "@/interfaces";
import { IGuide } from "@/interfaces/guide.interface";
import { Gender, IUser } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";
import { login } from "../auth/auth.service";

export const getGuides = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?role=GUIDE&${queryString}`);
  return await res.json();
};

const guideSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  email: z.email("Invalide email address"),
  phone: z.string("phone is required").min(10, "phone is required"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 digit"),
  image: z.file("image is required").optional(),
  bio: z.string("bio is required").min(2, "bio is required"),
  expertise: z.string("expertise is required").transform((z) => {
    return z?.split(",")?.map((i) => i.trim());
  }),
  languages: z.string("languages is required").transform((z) => {
    return z?.split(",")?.map((i) => i.trim());
  }),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
  hourlyRate: z
    .string("hourly rate is required")
    .min(1, "hourly rate is required")
    .transform((z) => parseFloat(z.toString())),
  address: z.string("address is required").min(2, "address is required"),
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

    const validationResult = zodValidator(payload, guideSchema);

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

    const res = await serverFetch.post("/guides", {
      body: modifiedFormData,
    });

    const data = await res.json();

    if (!data?.success) {
      throw new Error(data?.message);
    }

    if (data?.success && formData.get("isSignUp") === "true") {
      await login(prevState, formData);
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

export const editGuide = async (
  guideId: string,
  prevState: unknown,
  formData: FormData
) => {
  try {
    const schema = z.object({
      name: z.string("name is required").min(2, "name is required"),
      phone: z.string("phone is required").min(10, "phone is required"),
      // image: z.file("image is required").optional(),
      bio: z.string("bio is required").min(2, "bio is required"),
      expertise: z.string("expertise is required").transform((z) => {
        return z?.split(",")?.map((i) => i.trim());
      }),
      languages: z.string("languages is required").transform((z) => {
        return z?.split(",")?.map((i) => i.trim());
      }),
      gender: z
        .enum(Object.values(Gender), "Invalide gender")
        .default(Gender.MALE),
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
    const payload = {
      name: formData.get("name"),
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

    const res = await serverFetch.put(`/guides/${guideId}`, {
      body: JSON.stringify(validationResult.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

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

export const deleteGuide = async (
  guideId: string
): Promise<IResponse<IUser<IGuide> | null>> => {
  try {
    const res = await serverFetch.delete(`/guides/${guideId}`);

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete guide",
      data: null,
    };
  }
};
