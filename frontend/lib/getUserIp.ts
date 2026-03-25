import { headers } from "next/headers";

export async function getClientIP() {
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";

  return ip;
}
