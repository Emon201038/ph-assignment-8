"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getUsers = async (queryString?: string) => {
  const res = await serverFetch.get(`/users?${queryString}`);
  return await res.json();
};
