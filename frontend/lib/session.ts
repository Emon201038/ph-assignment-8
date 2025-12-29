"use server";

import { IResponse } from "@/interfaces";
import { IUser } from "@/interfaces/user.interface";
import { getCookie } from "./cookies";
import { serverFetch } from "./server-fetch";

export const auth = async () => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      return null;
    }
    const res = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["me"] },
    });
    const data: IResponse<IUser> = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
