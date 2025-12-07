import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = request.cookies.get("token");

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/tweet/:path*"],
};