import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jewelleryUpdateSchema } from "@/lib/validators/jewellery";
import { handleZodError } from "@/lib/validators/utils";
import { verifyToken } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await req.json();
    const validation = jewelleryUpdateSchema.safeParse(body);

    if (!validation.success) {
      return handleZodError(validation.error);
    }

    const data = validation.data;
    if (data.category) data.category = data.category.toLowerCase();

    const updatedItem = await prisma.jewellery.update({
      where: { id },
      data: {
        ...data
      },
    });

    return NextResponse.json({ message: "Updated", data: updatedItem });
  } catch (err) {
    console.error("[PUT ERROR]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await prisma.jewellery.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("[DELETE ERROR]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
