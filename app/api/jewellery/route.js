import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    const url = new URL(req.url);

    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "createdAt_desc";
    const category = url.searchParams.get("category") || "";

    const skip = (page - 1) * limit;

    const orderBy = (() => {
      switch (sort) {
        case "price_asc": return { price: "asc" };
        case "price_desc": return { price: "desc" };
        case "name_asc": return { name: "asc" };
        case "name_desc": return { name: "desc" };
        default: return { createdAt: "desc" };
      }
    })();

    const where = {
      AND: [
        search ? { name: { contains: search, mode: "insensitive" } } : {},
        category ? { category } : {}
      ]
    };

    const items = await prisma.jewellery.findMany({
      where,
      skip,
      take: limit,
      orderBy
    });

    const total = await prisma.jewellery.count({ where });

    return NextResponse.json({
      page,
      limit,
      total,
      data: items
    });

  } catch (err) {
    console.error("GET jewellery:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);

    if (!user || (user.role !== "admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, category, price, weight, image } = await req.json();

    if (!name || !category || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const item = await prisma.jewellery.create({
      data: { name, category, price: Number(price), weight, image }
    });

    return NextResponse.json({ message: "Jewellery added", item });

  } catch (err) {
    console.error("POST jewellery:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
