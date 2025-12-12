"use server";

import { deleteCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

export const logout = async () => {
  try {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    redirect("/login");
  } catch (error) {
    throw error;
  }
};
