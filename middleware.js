import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware Auth Error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
