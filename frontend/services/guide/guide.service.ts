"use server";
import { IResponse } from "@/interfaces";
import { IGuide } from "@/interfaces/guide.interface";
import { Gender, IUser } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";
import { login } from "../auth/auth.service";
import { revalidateTag } from "next/cache";

export const getGuides = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?role=GUIDE&${queryString}`);
  const data: IResponse<IUser<IGuide>[]> = await res.json();
  return data;
};

const guideSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  specilities: z.array(z.string("specilities is required")),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
  city: z.string("city is required").min(2, "city is required"),
  country: z.string("country is required").min(2, "country is required"),
  bio: z.string().optional(),
  bloodGroup: z.string().optional(),
  dateOfBirth: z.string().optional(),
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
      payload?.experienceYears as string,
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
  id: string,
  currentState: unknown,
  formData: FormData,
): Promise<{
  success: boolean;
  message: string;
  data: IUser<IGuide> | null;
  errors:
    | {
        field: string;
        message: string;
      }[]
    | undefined;
  formData: z.infer<typeof guideSchema>;
}> => {
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const payload = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    specilities: ((formData.get("specilities") as string) || "")
      .split(",")
      .map((i) => i.trim()),
    gender: formData.get("gender"),
    city: formData.get("city"),
    country: formData.get("country"),
    bloodGroup: formData.get("bloodGroup"),
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
    role: formData.get("role"),
  };
  const avatar = formData.get("avatar") as File;

  try {
    if (!payload.role) {
      throw new Error("role is required");
    }
    const validatedPayload = zodValidator(payload, guideSchema);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "validation failed",
        formData: payload as z.infer<typeof guideSchema>,
        data: null,
        errors: validatedPayload.errors,
      };
    }

    const formData = new FormData();
    Object.entries(validatedPayload.data as Record<string, any>).forEach(
      ([key, value]) => {
        formData.append(key, String(value));
      },
    );
    if (avatar.size) {
      formData.append("avatar", avatar as File);
    }
    const res = await serverFetch.put(`/v2/users/${id}`, {
      body: formData,
      credentials: "include",
    });

    revalidateTag("me", "max");

    const data = await res.json();

    if (!data?.success) {
      throw new Error(data?.message);
    }

    return {
      ...data,
      formData: payload as z.infer<typeof guideSchema>,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to edit tourist",
      formData: payload as z.infer<typeof guideSchema>,
      data: null,
      errors: undefined,
    };
  }
};

export const deleteGuide = async (
  guideId: string,
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

export const getSingleGuide = async (guideId: string) => {
  const res = await serverFetch.get(`/guides/${guideId}`);
  return await res.json();
};
export const getFilteredGuide = async (queryString?: string) => {
  const res = await serverFetch.get(`/guides?${queryString}`);
  const data: IResponse<IUser<IGuide>[]> = await res.json();
  return data;
};
