import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password){
        return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ 
        where: { 
            email 
        } 
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 })

    const isValid = comparePassword(password, user.password);
    if (!isValid){
        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = generateToken(user);

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
    }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
