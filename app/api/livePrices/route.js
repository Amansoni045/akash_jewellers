import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

import { getLivePricesData } from "@/lib/data";

export async function GET() {
  try {
    const data = await getLivePricesData();
    return NextResponse.json(data);
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
