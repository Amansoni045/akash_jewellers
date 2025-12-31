import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendResendEmail } from "@/lib/sendEmail";

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

        const emailResult = await sendResendEmail({
            to: email,
            subject: subject,
            html: `
        <p>Dear ${name || "Customer"},</p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>Akash Jewellers Team</strong></p>
      `,
        });

        if (!emailResult.success) {
            const isTestingError = emailResult.error?.includes("testing emails") ||
                emailResult.error?.includes("validation_error");

            if (!isTestingError) {
                return NextResponse.json(
                    { error: "Failed to send email: " + (emailResult.error || "Unknown error") },
                    { status: 500 }
                );
            }
            console.warn("Resend Testing Mode: Email blocked but marking as replied.");
        }

        await prisma.contact.update({
            where: { id },
            data: {
                status: "replied",
                reply: message,
                repliedAt: new Date(),
            },
        });

        if (!emailResult.success) {
            return NextResponse.json({
                success: true,
                warning: "Message marked as replied, but email was blocked by Resend Free Tier (Testing Mode)."
            });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("REPLY API ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
