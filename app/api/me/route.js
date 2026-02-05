import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    console.log("Verifying token:", token.substring(0, 10) + "...");
    const decoded = verifyToken(token);

    if (!decoded) {
      console.error("Token verification result: null");
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      },
    });

    return NextResponse.json(
      { user },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 403 }
    );
  }
}
