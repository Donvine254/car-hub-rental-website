import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath =
    path.startsWith("/profile") ||
    path.startsWith("/admin") ||
    path.startsWith("/me");

  const isPublicPath =
    path.startsWith("/login") || path.startsWith("/register");
  const token = request.cookies.get("token");
  let userData = null;
  if (token) {
    try {
      const { payload } = await jose.jwtVerify(token.value, JWT_SECRET);
      userData = payload;
    } catch (error: any) {
      console.error("Invalid token:", error.message);
      request.cookies.delete("token");
    }
  }
  const isAdmin = userData?.role == "admin";
  // redirect users to homepage if they are not admin
  if (path.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (path === "/admin" && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
  }
  if (path === "/me" && userData) {
    return NextResponse.redirect(new URL("/me/profile", request.nextUrl));
  }
  if (isProtectedPath && !userData) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  } else if (userData && isPublicPath) {
    //prevent users from visiting login page if they are already logged in
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/register",
    "/me",
    "/me/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
