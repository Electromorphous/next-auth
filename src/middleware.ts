import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || ""; // if token is found then return its value else return ""

  // if user wants a public path and they are logged in
  if (isPublicPath && !!token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  // if user wants a private path and not logged in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  // if any other case just carry on

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/signup",
    "/login",
    "/emailVerification",
  ],
};
