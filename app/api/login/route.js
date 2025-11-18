import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth"; 

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
    const { email, password } = await req.json();

    if (!email || !password){
      return NextResponse.json({ error: "All fields required" }, { status: 400, headers: CORS_HEADERS });
    }

    const user = await prisma.user.findUnique(
      { 
        where: { 
          email: email.toLowerCase()
        } 
      });
      
    if (!user){
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: CORS_HEADERS });
    }

    const valid = comparePassword(password, user.password);
    if (!valid){
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401, headers: CORS_HEADERS });
    }

    const token = generateToken(user);

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user.id, 
        name: user.name, 
        email: user.email 
      }
    }, { headers: CORS_HEADERS });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500, headers: CORS_HEADERS });
  }
}
