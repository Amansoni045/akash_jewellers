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
      const errorText = await res.text();
      console.error("Resend API Error:", errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("sendResendEmail Exception:", err);
    return { success: false, error: err.message };
  }
}
