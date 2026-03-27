"use server";

import { IResponse } from "@/interfaces";
import { IUser } from "@/interfaces/user.interface";
import { serverFetch } from "./server-fetch";
import { getCookie } from "./cookies";
import { verifyToken } from "./jwtHandlers";

export const auth = async <T = null>() => {
  try {
    const res = await serverFetch.get("/v2/auth/me", {
      next: { tags: ["me"] },
    });
    const data: IResponse<IUser<T>> = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const session = async () => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) return null;
    const decode = verifyToken(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET!,
    );
    if (!decode) return null;
    return decode;
  } catch (error) {
    console.log(error);
    return null;
  }
};
