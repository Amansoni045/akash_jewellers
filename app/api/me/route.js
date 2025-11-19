import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(req),
  });
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders(req) }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 403, headers: corsHeaders(req) }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(
      { user },
      { status: 200, headers: corsHeaders(req) }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 403, headers: corsHeaders(req) }
    );
  }
}
