"use server";

import { IResponse } from "@/interfaces";
import { IUser } from "@/interfaces/user.interface";
import { serverFetch } from "./server-fetch";

export const auth = async <T>() => {
  try {
    const res = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["me"] },
    });
    const data: IResponse<IUser<T>> = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
