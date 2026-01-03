import { IResponse } from "@/interfaces";
import { ITrip } from "@/interfaces/trip.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const tripSchema = z.object({
  tourId: z
    .string("Tour is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid tour ID"),
  guideId: z
    .string("Guide is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid guide ID"),
  startDate: z.coerce.date("Start date is required"),
  endDate: z.coerce.date("End date is required"),
  maxCapacity: z.number("Max capacity is required"),
});

export const createTrip = async (prevState: unknown, formData: FormData) => {
  const payload = {
    tourId: formData.get("tourId"),
    guideId: formData.get("guideId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    maxCapacity: formData.get("maxCapacity"),
  };
  try {
    const validationResult = zodValidator(payload, tripSchema);
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

    const res = await serverFetch.post("/trips", {
      body: validationResult.data as unknown as BodyInit | null | undefined,
    });

    const data = await res.json();

    if (!data?.success) {
      return {
        success: false,
        message: data?.message,
        errors: data?.errors,
        formData: payload,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "something went wrong",
      formData: payload,
    };
  }
};

export const updateTrip = async (tripId: string, data: Partial<ITrip>) => {};

export const getTrips = async (
  queryString: string
): Promise<IResponse<ITrip[]>> => {
  const res = await serverFetch.get(`/trips?${queryString}`);
  const data = await res.json();
  console.log(data);
  return data.data;
};
