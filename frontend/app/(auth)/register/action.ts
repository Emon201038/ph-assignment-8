"use server";
import { UserRole } from "@/interfaces/user.interface";
import { zodValidator } from "@/lib/zod-validator";
import z, { email } from "zod";
import { login } from "../login/action";

const serverUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const schema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
  email: z.email("Invalid email"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 charecter."),
  role: z.enum(["TOURIST", "GUIDE"]).default(UserRole.TOURIST),
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
      role: formData.get("role"),
    };
    if (!zodValidator(payload, schema).success) {
      return zodValidator(payload, schema);
    }

    const validatedPayload = zodValidator(payload, schema);

    const newFormData = new FormData();

    newFormData.append("name", validatedPayload?.data?.name as string);
    newFormData.append("email", validatedPayload?.data?.email as string);
    newFormData.append("password", validatedPayload?.data?.password as string);
    newFormData.append("role", validatedPayload?.data?.role as string);
    if (formData.get("image")) {
      newFormData.append("image", formData.get("image") as Blob);
    }

    const res = await fetch(`${serverUrl}/users`, {
      method: "POST",
      credentials: "include",
      body: newFormData,
    });

    const data = await res.json();

    if (data?.success) {
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
