import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "createdAt_desc";
    const category = searchParams.get("category") || "";

    const orderFields = {
      createdAt_desc: { createdAt: "desc" },
      createdAt_asc: { createdAt: "asc" },
      price_asc: { price: "asc" },
      price_desc: { price: "desc" },
      name_asc: { name: "asc" },
      name_desc: { name: "desc" }
    };

    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 10000000;
    const minWeight = Number(searchParams.get("minWeight")) || 0;
    const maxWeight = Number(searchParams.get("maxWeight")) || 1000;

    const id = searchParams.get("id");

    const where = {
      AND: [
        {
          price: { gte: minPrice, lte: maxPrice },
        },
        {
          weight: { gte: minWeight, lte: maxWeight }
        },
        search
          ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { category: { contains: search, mode: "insensitive" } },
            ],
          }
          : {},

        category ? { category: category.toLowerCase() } : {},
        id ? { id: id } : {},
      ],
    };

    const data = await prisma.jewellery.findMany({
      where,
      orderBy: orderFields[sort],
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("[GET ERROR]", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer "))
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);

    if (!user || !["admin", "staff"].includes(user.role))
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );

    const body = await req.json();

    const weight = parseFloat(body.weight);

    if (isNaN(weight)) {
      return NextResponse.json(
        { error: "Weight is mandatory" },
        { status: 400 }
      );
    }

    const newItem = await prisma.jewellery.create({
      data: {
        name: body.name,
        category: (body.category || "").toLowerCase(),
        price: body.price ? parseFloat(body.price) : 0,
        weight: weight,
        makingCharges: body.makingCharges ? parseFloat(body.makingCharges) : 0,
        gst: body.gst ? parseFloat(body.gst) : 3.0,
        discount: body.discount ? parseFloat(body.discount) : 0,
        description: body.description || null,
        image: body.image,
      },
    });

    return NextResponse.json(
      { message: "Created", data: newItem },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST ERROR]", err);
    return NextResponse.json(
      { error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
