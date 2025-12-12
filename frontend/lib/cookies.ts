"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name);
  } catch (error) {
    throw error;
  }
};
export const deleteCookie = async (name: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (error) {
    throw error;
  }
};
