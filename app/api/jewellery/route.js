import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    const { search, sort, page, limit, category } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    let orderBy = {};
    if (sort) {
      const [field, direction] = sort.split("_");
      orderBy[field] = direction;
    } else {
      orderBy = { createdAt: "desc" };
    }

    const where = {
      AND: [
        category ? { category: { equals: category, mode: "insensitive" } } : {},
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    const data = await prisma.jewellery.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
    });

    const total = await prisma.jewellery.count({ where });

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || !["admin", "staff"].includes(decoded.role)) {
      return NextResponse.json(
        { error: "Access denied: Admin/Staff only" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, category, price, weight, image } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: "Name, category & price are required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.jewellery.create({
      data: { name, category, price: Number(price), weight, image },
    });

    return NextResponse.json(
      { success: true, message: "Item created", item: newItem },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
