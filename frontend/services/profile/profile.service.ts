"use server";
import { IResponse } from "@/interfaces";
import { IEmergencyContact } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const emergencyContactSchema = z.object({
  name: z.string("name is required").min(2, "name is required"),
  phone: z.string("phone is required").min(2, "phone is required"),
  email: z.string("email is required").min(2, "email is required"),
  id: z.string("id is required").min(2, "id is required"),
});

export const addEmergencyContact = async (
  currentState: unknown,
  formData: FormData,
) => {
  const { id, isEdit, ...payload } = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    id: formData.get("id"),
    isEdit: formData.get("isEdit") === "true",
  };

  try {
    const validatedPayload = zodValidator(
      { id, ...payload },
      emergencyContactSchema,
    );
    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.errors,
        formData: payload,
        message: "validation error",
      };
    }

    let res: Response;

    if (isEdit) {
      res = await serverFetch.put("/v2/users/emergency-contacts/" + id, {
        body: JSON.stringify({
          ...validatedPayload.data,
          id: formData.get("documentId"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      res = await serverFetch.post("/v2/users/emergency-contacts/" + id, {
        body: JSON.stringify(validatedPayload.data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const data: IResponse<IEmergencyContact[]> = await res.json();
    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
        errors: [],
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      data: null,
      errors: [],
      formData: payload,
    };
  }
};

export const deleteEmergencyContact = async (
  currentState: unknown,
  formData: FormData,
) => {
  const id = formData.get("id");
  const res = await serverFetch.delete("/v2/users/emergency-contacts/" + id);
  const data: IResponse<IEmergencyContact[]> = await res.json();
  if (data.success) {
    return {
      success: true,
      message: data.message,
      data: data.data,
      errors: [],
    };
  } else {
    throw new Error(data.message);
  }
};
