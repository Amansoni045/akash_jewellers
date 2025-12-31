import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const rows = await prisma.livePrice.findMany({
      orderBy: { updatedAt: "desc" },
      take: 2,
    });

    if (!rows || rows.length === 0) {
      return NextResponse.json(null);
    }

    const current = rows[0];
    const previous = rows[1];

    const calc = (curr, prev) => {
      if (prev == null) return null;
      return {
        delta: curr - prev,
        percent: ((curr - prev) / prev) * 100,
      };
    };

    return NextResponse.json({
      prices: {
        gold: current.gold,
        goldRTGS: current.goldRTGS,
        silver: current.silver,
      },
      diffs: {
        gold: calc(current.gold, previous?.gold),
        goldRTGS: calc(current.goldRTGS, previous?.goldRTGS),
        silver: calc(current.silver, previous?.silver),
      },
      updatedAt: current.updatedAt,
    });
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

    const body = await req.json();
    const { gold, goldRTGS, silver } = body;

    if (
      typeof gold !== "number" ||
      typeof goldRTGS !== "number" ||
      typeof silver !== "number"
    ) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const created = await prisma.livePrice.create({
      data: { gold, goldRTGS, silver },
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error("LivePrices POST Error:", err);
    return NextResponse.json(
      { error: "Failed to update prices" },
      { status: 500 }
    );
  }
}
