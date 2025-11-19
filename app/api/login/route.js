import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(req),
  });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400, headers: corsHeaders(req) }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders(req) }
      );
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401, headers: corsHeaders(req) }
      );
    }

    const token = generateToken(user);

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200, headers: corsHeaders(req) }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders(req) }
    );
  }
}
