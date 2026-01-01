import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { sendResendEmail } from "@/lib/sendEmail";
import { sendWhatsApp } from "@/lib/sendWhatsapp";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP_NUMBER;

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const entry = await prisma.contact.create({
      data: { name, email, phone, message },
    });

    await sendResendEmail({
      to: ADMIN_EMAIL,
      subject: `📩 New Message From ${name}`,
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <pre>${message}</pre>
      `,
    });

    if (ADMIN_WHATSAPP) {
      await sendWhatsApp({
        to: ADMIN_WHATSAPP,
        message: `New inquiry from ${name}\n\n${message}`,
      });
    }

    return NextResponse.json(
      { message: "Message received successfully", data: entry },
      { status: 201 }
    );
  } catch (err) {
    console.error("CONTACT POST ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (admin?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: messages });
  } catch (err) {
    console.error("CONTACT GET ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const admin = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (admin?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    await prisma.contact.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("CONTACT DELETE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
