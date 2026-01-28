import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req) {
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

        const { email, subject, message, name, id } = await req.json();

        if (!email || !subject || !message || !id) {
            return NextResponse.json(
                { error: "Email, subject, message and ID are required" },
                { status: 400 }
            );
        }

        await prisma.contact.update({
            where: { id },
            data: {
                status: "replied",
                reply: message,
                repliedAt: new Date(),
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("REPLY API ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
