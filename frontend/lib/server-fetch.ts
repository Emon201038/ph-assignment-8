import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "./cookies";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const serverFetchHelper = async (
  endPoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  if (endPoint !== "/auth/refresh-token") {
    await getNewAccessToken();
  }

  const version = endPoint.split("/").filter((item) => item === "v1").length;

  const response = await fetch(
    `${BACKEND_API_URL}/api${version ? "/v1" : ""}${endPoint}`,
    {
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken}` : "",
        ...options.headers,
      },
      credentials: "include",
      ...restOptions,
    },
  );

  return response;
};

export const serverFetch = {
  get: async (endPoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "GET" }),
  post: async (endPoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "POST" }),
  put: async (endPoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "PUT" }),
  patch: async (endPoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "PATCH" }),
  delete: async (endPoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "DELETE" }),
};
