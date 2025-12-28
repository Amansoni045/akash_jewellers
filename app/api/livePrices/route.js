import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const prices = await prisma.price.findMany({
            orderBy: { createdAt: "desc" },
        });

        const latest = {
            gold: prices.find(p => p.type === "GOLD")?.rate || null,
            goldRTGS: prices.find(p => p.type === "GOLD_RTGS")?.rate || null,
            silver: prices.find(p => p.type === "SILVER")?.rate || null,
            updatedAt: prices[0]?.createdAt || null,
        };

        return NextResponse.json(latest);
    } catch (err) {
        console.error("LivePrices API Error:", err);
        return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
    }
}
