import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const price = await prisma.livePrice.findFirst();
    return NextResponse.json(price || {});
  } catch (err) {
    console.error("LivePrices GET Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch live prices" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const user = verifyToken(token);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { gold, goldRTGS, silver } = await req.json();

    if (
      typeof gold !== "number" ||
      typeof goldRTGS !== "number" ||
      typeof silver !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid prices" },
        { status: 400 }
      );
    }

    const updated = await prisma.livePrice.upsert({
      where: { id: "singleton" },
      update: { gold, goldRTGS, silver },
      create: {
        id: "singleton",
        gold,
        goldRTGS,
        silver,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("LivePrices POST Error:", err);
    return NextResponse.json(
      { error: "Failed to update prices" },
      { status: 500 }
    );
  }
}
