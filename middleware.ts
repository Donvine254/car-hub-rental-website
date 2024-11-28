// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const path = req.nextUrl.pathname;
//   // Create a Supabase client configured to use cookies
//   const supabase = createMiddlewareClient({ req, res });
//   const isProtectedPath =
//     path.startsWith("/me") ||
//     path.startsWith("/booking") ||
//     path.startsWith("/admin") ||
//     path.startsWith("/api");
//   // Refresh session if expired - required for Server Components
//   const session = await supabase.auth.getSession();
//   if (!session && isProtectedPath) {
//     // Redirect to the login page if the user is not logged in
//     return NextResponse.redirect(new URL("/login", req.nextUrl));

//   }

//   return res;
// }

// // Ensure the middleware is only called for relevant paths.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|login).*)",
//     "/booking",
//     "/me",
//     "/me/:path*",
//     "/api",
//     "/admin",
//     "/admin/:path*",
//   ],
// };

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  const isProtectedPath =
    path.startsWith("/me") ||
    path.startsWith("/booking") ||
    path.startsWith("/admin") ||
    path.startsWith("/api");

  // Retrieve session and ensure proper validation
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session && isProtectedPath) {
    // Redirect to login if user is not authenticated
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl, { headers: res.headers });
  }

  return res; // Return response with updated cookies
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|login).*)",
    "/booking",
    "/me",
    "/me/:path*",
    "/api",
    "/admin",
    "/admin/:path*",
  ],
};
