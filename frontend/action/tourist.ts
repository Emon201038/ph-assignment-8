import { IResponse } from "@/interfaces";
import { IUser } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";

export const getTourists = async (queryString?: string) => {
  const res = await serverFetch.get(`/tourists?${queryString}`);
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
