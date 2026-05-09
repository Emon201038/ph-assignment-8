"use server";
import { IResponse } from "@/interfaces";
import { ITrip, TripStatus } from "@/interfaces/trip.interface";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";

const tripSchema = z
  .object({
    tourId: z.string("Tour is required"),
    guideId: z.string("Guide is required"),
    startDate: z.coerce.date("Start date is required"),
    duration: z.coerce.string("Duration is required").transform((d) => {
      return parseInt(d);
    }),
    maxGuests: z
      .string("Max capacity is required")
      .min(1, "Max capacity is required")
      .transform((z) => {
        return parseInt(z.toString());
      })
      .refine((data) => data > 0, {
        message: "Max capacity must be greater than 0",
        path: ["maxGuests"],
      })
      .refine((data) => data <= 50, {
        message: "Max capacity must be less than 50",
        path: ["maxGuests"],
      }),
    status: z.enum(Object.values(TripStatus)).default(TripStatus.UPCOMING),
    tripIncludes: z
      .string("Trip includes is required")
      .min(1, "Trip includes is required"),
  })
  .refine(
    (data) => {
      return data.duration >= 1 && data.duration <= 7;
    },
    {
      message: "Duration must be between 1 - 7 days",
      path: ["duration"],
    },
  );

export const createTrip = async (prevState: unknown, formData: FormData) => {
  const payload = {
    tourId: formData.get("tourId"),
    guideId: formData.get("guideId"),
    startDate: formData.get("startDate"),
    duration: formData.get("duration"),
    maxGuests: formData.get("maxCapacity"),
    tripIncludes: formData.get("tripIncludes"),
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

    const res = await serverFetch.post("/v2/trips", {
      body: JSON.stringify(validationResult.data),
      headers: {
        "Content-Type": "application/json",
      },
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
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "something went wrong",
      formData: payload,
      errors: [],
    };
  }
};
export const updateTrip = async (prevState: unknown, formData: FormData) => {
  const payload = {
    tourId: formData.get("tourId"),
    guideId: formData.get("guideId"),
    startDate: formData.get("startDate"),
    duration: formData.get("duration"),
    maxCapacity: formData.get("maxCapacity"),
    status: formData.get("status"),
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

    const res = await serverFetch.put(`/trips/${formData.get("tripId")}`, {
      body: JSON.stringify(validationResult.data),
      headers: {
        "Content-Type": "application/json",
      },
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
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "something went wrong",
      formData: payload,
      errors: [],
    };
  }
};

export const getTrips = async (
  queryString: string,
): Promise<IResponse<ITrip[]>> => {
  const res = await serverFetch.get(`/trips?${queryString}`);
  const data = await res.json();
  return data.data;
};

export const getTourTrips = async (tourId: string) => {
  const res = await serverFetch.get(`/trips/tour/${tourId}`);
  const data: IResponse<ITrip[]> = await res.json();
  return data.data;
};

export const getSingleTripDetails = async (tripId: string) => {
  const res = await serverFetch.get(`/trips/${tripId}`);
  const data: IResponse<ITrip> = await res.json();
  return data.data;
};

export const bookTrip = async (payload: { tripId: string; seats: number }) => {
  try {
    const validationResult = zodValidator(
      payload,
      z.object({
        tripId: z
          .string("tripId is required")
          .regex(/^[0-9a-fA-F]{24}$/, "Invalid trip ID"),
        seats: z
          .number("seats is required. Type missmatch")
          .min(1, "seats is required. Quantity missmatch"),
      }),
    );
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

    const res = await serverFetch.post("/bookings/trip", {
      body: JSON.stringify(validationResult.data),
      headers: {
        "Content-Type": "application/json",
      },
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

    const finalRes = await serverFetch.post(`/payments/trip/checkout-session`, {
      body: JSON.stringify({
        tripId: payload.tripId,
        bookingId: data.data._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const finalData = await finalRes.json();

    if (!finalData?.success) {
      return {
        success: false,
        message: finalData?.message,
        errors: finalData?.errors,
        formData: payload,
      };
    }

    return finalData;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "something went wrong",
      formData: payload,
      errors: [],
    };
  }
};
