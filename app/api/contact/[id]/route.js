import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { sendEmail, createCustomerReplyEmail } from "@/lib/sendEmail";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

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
      select: { role: true },
    });

    if (admin?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { replyText } = body;

    if (!replyText) {
      return NextResponse.json({ error: "Reply text required" }, { status: 400 });
    }

    const contact = await prisma.contact.findUnique({ where: { id } });

    if (contact?.email) {
      await sendEmail({
        to: contact.email,
        subject: "Re: Your Inquiry - Akash Jewellers",
        html: createCustomerReplyEmail(contact.name, replyText),
      });
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: {
        reply: replyText,
        repliedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Reply sent", data: updated });

  } catch (err) {
    console.error("PATCH /contact/[id] ERROR", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

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
      select: { role: true },
    });

    if (admin?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.contact.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted" });

  } catch (err) {
    console.error("DELETE /contact/[id] ERROR", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
