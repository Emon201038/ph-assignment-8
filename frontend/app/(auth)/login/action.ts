"use server";
import cookie from "cookie";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/interfaces/user.interface";
import { redirect } from "next/navigation";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/auth-utils";
import z from "zod";
import { zodValidator } from "@/lib/zod-validator";

const serverUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const schema = z.object({
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
    if (!zodValidator(payload, schema).success) {
      return zodValidator(payload, schema);
    }
    const res = await fetch(`${serverUrl}/auth/login`, {
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

      const cookieStore = await cookies();
      cookieStore.set("accessToken", accessTokenObject.accessToken, {
        httpOnly: true,
        sameSite: accessTokenObject.SameSite || "none",
        maxAge: parseInt(accessTokenObject["Max-Age"]),
        path: accessTokenObject.path,
        secure: true,
      });
      cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
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
