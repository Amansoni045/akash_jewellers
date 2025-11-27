import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const item = await prisma.jewellery.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || !["admin", "staff"].includes(decoded.role)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, category, price, weight, image } = body;

    const updatedItem = await prisma.jewellery.update({
      where: { id: params.id },
      data: { name, category, price: Number(price), weight, image },
    });

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Only admin can delete items" },
        { status: 403 }
      );
    }

    await prisma.jewellery.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
