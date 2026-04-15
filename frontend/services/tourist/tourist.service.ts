"use server";
import { Gender, ITourist, IUser, UserRole } from "@/interfaces/user.interface";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";
import { login } from "../auth/auth.service";
import { serverFetch } from "@/lib/server-fetch";
import { IResponse } from "@/interfaces";
import { revalidateTag } from "next/cache";
import { IGuide } from "@/interfaces/guide.interface";

const touristSchema = z
  .object({
    name: z.string("name is required").min(2, "name is required"),
    email: z.email("Invalide email address"),
    phone: z.string("phone is required").min(10, "phone is required"),
    password: z
      .string("password is required")
      .min(6, "password must be minimum 6 digit"),
    image: z.any().optional(),
    bio: z.string().optional(),
    interests: z
      .string()
      .optional()
      .transform((z) => {
        return z?.split(",")?.map((i) => i.trim());
      })
      .default([]),
    preferredLanguage: z.string().optional(),
    gender: z
      .enum(Object.values(Gender), "Invalide gender")
      .default(Gender.MALE),
    country: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    address: z.string("address is required").min(2, "address is required"),
  })
  .superRefine((data, ctx) => {
    if (data?.address) {
      const [city, country] = data?.address?.split(",");
      if (!country) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "country is required. Format: city, country",
        });
      }
      if (!city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          input: data?.address,
          path: ["address"],
          message: "city is required. Format: city, country",
        });
      }

      data.city = city?.trim();
      data.country = country?.trim();
    }
  });

export const createTouristAction = async (
  initialState: unknown,
  formData: FormData,
) => {
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
    agree: formData.get("agree"),
  };
  console.log(payload);
  try {
    const validationResult = zodValidator(payload, touristSchema);

    console.log({ validationResult: validationResult.data, formData: payload });
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

    modifiedFormData.append("name", validationResult?.data?.name as string);
    modifiedFormData.append("email", validationResult?.data?.email as string);
    modifiedFormData.append(
      "password",
      validationResult?.data?.password as string,
    );
    if ((formData.get("image") as File)?.size) {
      modifiedFormData.append("image", validationResult?.data?.image as Blob);
    }
    modifiedFormData.append(
      "preferredLanguage",
      validationResult?.data?.preferredLanguage as string,
    );
    modifiedFormData.append(
      "interests",
      validationResult?.data?.interests as string,
    );
    modifiedFormData.append("bio", validationResult?.data?.bio as string);
    modifiedFormData.append("phone", validationResult?.data?.phone as string);
    modifiedFormData.append("gender", validationResult?.data?.gender as string);
    modifiedFormData.append(
      "address",
      validationResult?.data?.address as string,
    );

    const res = await serverFetch.post(`/v2/users`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        ...validationResult?.data,
        languages: (validationResult?.data?.preferredLanguage as string)?.split(
          ",",
        ),
      }),
      headers: { "Content-Type": "application/json" },
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
      data: null,
      formData: payload,
    };
  }
};

export const getTourists = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?role=TOURIST&${queryString}`);
  return await res.json();
};

export const deleteTourist = async (
  id: string,
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

export const travelerSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  interests: z.array(z.string("interests is required")),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
  city: z.string("city is required").min(2, "city is required"),
  country: z.string("country is required").min(2, "country is required"),
  bio: z.string().optional(),
  bloodGroup: z.string().optional(),
  dateOfBirth: z.string().optional(),
});
export const guideSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  specilities: z.array(z.string("specilities is required")),
  gender: z.enum(Object.values(Gender), "Invalide gender").default(Gender.MALE),
  city: z.string("city is required").min(2, "city is required"),
  country: z.string("country is required").min(2, "country is required"),
  bio: z.string().optional(),
  bloodGroup: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const editTourist = async <T>(
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
  formData: z.infer<typeof travelerSchema>;
}> => {
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const payload = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    interests: ((formData.get("interests") as string) || "")
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
    const validatedPayload = zodValidator(payload, travelerSchema);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "validation failed",
        formData: payload as z.infer<typeof travelerSchema>,
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
      formData: payload as z.infer<typeof travelerSchema>,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to edit tourist",
      formData: payload as z.infer<typeof travelerSchema>,
      data: null,
      errors: undefined,
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
