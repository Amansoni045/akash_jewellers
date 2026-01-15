import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.split(" ")[1];
  const user = verifyToken(token);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [
    jewelleryCount,
    messageCount,
    prices,
    latestMessage,
    latestJewellery,
  ] = await Promise.all([
    prisma.jewellery.count(),
    prisma.contact.count(),
    prisma.livePrice.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.contact.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.jewellery.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({
    jewelleryCount,
    messageCount,
    gold: prices?.gold ?? null,
    silver: prices?.silver ?? null,
    lastPriceUpdate: prices?.updatedAt ?? null,
    latestMessage,
    latestJewellery,
  });
}
