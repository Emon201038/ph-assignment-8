"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getGuides = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?role=GUIDE&${queryString}`);
  return await res.json();
};
