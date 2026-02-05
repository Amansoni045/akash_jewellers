import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { userId: decoded.id },
            include: {
                jewellery: true,
            },
        });

        return NextResponse.json({ wishlist }, { status: 200 });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }

        const { jewelleryId } = await req.json();
        if (!jewelleryId) {
            return NextResponse.json({ error: "Jewellery ID required" }, { status: 400 });
        }

        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_jewelleryId: {
                    userId: decoded.id,
                    jewelleryId: jewelleryId,
                },
            },
        });

        if (existing) {
            await prisma.wishlist.delete({
                where: { id: existing.id },
            });
            return NextResponse.json({ message: "Removed from wishlist", added: false }, { status: 200 });
        } else {
            await prisma.wishlist.create({
                data: {
                    userId: decoded.id,
                    jewelleryId: jewelleryId,
                },
            });
            return NextResponse.json({ message: "Added to wishlist", added: true }, { status: 201 });
        }
    } catch (error) {
        console.error("Error toggling wishlist:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
