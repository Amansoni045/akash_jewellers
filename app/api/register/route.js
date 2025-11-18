import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400, headers: CORS_HEADERS });
    }

    const existingUser = await prisma.user.findUnique({ 
        where:{ 
            email: email.toLowerCase()
        } 
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400, headers: CORS_HEADERS });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be atleast 8 characters" }, { status: 400, headers: CORS_HEADERS });
    }

    const hashedPassword = hashPassword(password);

    const newUser = await prisma.user.create({
      data:{
        name,
        email, 
        password: hashedPassword 
    }
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: { id: newUser.id, 
        name: newUser.name, 
        email: newUser.email 
    },
    }, { headers: CORS_HEADERS });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500, headers: CORS_HEADERS });
  }
}
