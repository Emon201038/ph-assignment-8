"use server";
import { parse } from "cookie";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";
import { verifyToken } from "@/lib/jwtHandlers";
import { serverFetch } from "@/lib/server-fetch";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { zodValidator } from "@/lib/zod-validator";
import z from "zod";
import cookie from "cookie";

export const getNewAccessToken = async () => {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // Case 2 : Access Token exist- and need to verify
    if (accessToken) {
      const verifiedToken = await verifyToken(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      );

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    //Case 3 : refresh Token is missing- user is logged out
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
    // This is the only case we need to call the API

    // Now we know: accessToken is invalid/missing AND refreshToken exists
    // Safe to call the API
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
    const response = await serverFetch.get("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("password is required")
    .min(6, "password must be minimum 6 digit"),
});

export const login = async (prevState: unknown, formData: FormData) => {
  try {
    const redirectTo = formData.get("redirect") || null;
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedPayload = zodValidator(payload, loginSchema);
    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.errors,
        formData: payload,
        message: "validation error",
      };
    }
    const res = await serverFetch.post(`/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data?.success) {
      throw new Error(data?.message);
    }

    const cookiesHeaders = res.headers.getSetCookie();
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    if (cookiesHeaders && cookiesHeaders.length > 0) {
      cookiesHeaders.forEach((c) => {
        const parsed = cookie.parse(c);
        if (parsed["accessToken"]) {
          accessTokenObject = parsed;
        }
        if (parsed["refreshToken"]) {
          refreshTokenObject = parsed;
        }
      });

      if (!accessTokenObject) {
        throw new Error("No access token found");
      }
      if (!refreshTokenObject) {
        throw new Error("No refresh token found");
      }

      await setCookie("accessToken", accessTokenObject.accessToken, {
        httpOnly: true,
        sameSite: accessTokenObject.SameSite || "none",
        maxAge: parseInt(accessTokenObject["Max-Age"]),
        path: accessTokenObject.path,
        secure: true,
      });
      await setCookie("refreshToken", refreshTokenObject.refreshToken, {
        httpOnly: true,
        sameSite: refreshTokenObject.SameSite || "none",
        maxAge: parseInt(refreshTokenObject["Max-Age"]),
        path: refreshTokenObject.path,
        secure: true,
      });
    } else {
      throw new Error("No get set cookie found");
    }

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject["accessToken"],
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );
    if (typeof verifiedToken === "string") {
      throw new Error("Failed to verify token");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, verifiedToken.role)) {
        redirect(requestedPath);
      } else {
        redirect(getDefaultDashboardRoute(verifiedToken.role));
      }
    } else {
      redirect(getDefaultDashboardRoute(verifiedToken.role));
    }
  } catch (error: any) {
    console.log(error);
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: error?.message,
      errors: [],
    };
  }
};
