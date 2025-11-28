export async function sendResendEmail({ to, subject, html }) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
    }
  } catch (err) {
    console.error("sendResendEmail error:", err);
  }
}
