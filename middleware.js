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
    return NextResponse.json({ error: "No token found in cookies" }, { status: 401 });
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
    console.error("Middleware Error:", err);
    return NextResponse.json({
      error: "Middleware Verification Failed",
      details: err.message,
      check: "Check console logs",
      envSecretExists: !!JWT_SECRET
    }, { status: 401 });
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
