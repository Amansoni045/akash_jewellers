import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { sendResendEmail } from "@/lib/sendEmail";

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
    const { action, replyText } = body;

    let updateData = {};

    if (action === "reply") {
      if (!replyText) {
        return NextResponse.json({ error: "Reply text required" }, { status: 400 });
      }
      updateData = {
        reply: replyText,
        repliedAt: new Date(),
      };

      const contact = await prisma.contact.findUnique({ where: { id } });
      if (contact?.email) {
        await sendResendEmail({
          to: contact.email,
          subject: "Re: Your inquiry to Akash Jewellers",
          html: `
            <p>Hello ${contact.name},</p>
            <p>Here is a reply to your message:</p>
            <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
              ${contact.message}
            </blockquote>
            <hr />
            <p><strong>Reply:</strong></p>
            <pre style="font-family: sans-serif;">${replyText}</pre>
            <p>Best regards,<br/>Akash Jewellers</p>
          `,
        });
      }
    } else if (action === "archive") {
      updateData = { archived: true };
    } else if (action === "unarchive") {
      updateData = { archived: false };
    } else {
      updateData = body;
      delete updateData.action;
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ message: "Updated", data: updated });
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

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /contact/[id] ERROR", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
