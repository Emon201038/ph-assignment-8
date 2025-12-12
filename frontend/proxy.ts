import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "./interfaces/user";
import { cookies } from "next/headers";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./lib/auth-utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  const accessToken = request.cookies.get("accessToken")?.value || null;
  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }

  const routerOwner = getRouteOwner(pathname);
  const isAuthRouter = isAuthRoute(pathname);

  // user trying to access auth route while loggedin
  if (accessToken && isAuthRouter) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // user is trying to access open public route
  if (routerOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //  user is trying to access common protected route
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  if (
    routerOwner === "ADMIN" ||
    routerOwner === "GUIDE" ||
    routerOwner === "TOURIST"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. API routes   : /api/...
     * 2. Next.js internals: /_next/...
     * 3. Static files: files with a dot (.) like favicon.ico, .png, etc.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
