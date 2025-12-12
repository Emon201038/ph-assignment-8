"use server";

import { cookies } from "next/headers";

const serverUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
export const auth = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${serverUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
