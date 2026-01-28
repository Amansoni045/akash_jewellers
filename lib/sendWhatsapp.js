import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsApp({ to, message }) {
  try {
    const formattedFrom = process.env.TWILIO_WHATSAPP_NUMBER.startsWith("whatsapp:")
      ? process.env.TWILIO_WHATSAPP_NUMBER
      : `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;

    const formattedTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

    const result = await client.messages.create({
      from: formattedFrom,
      to: formattedTo,
      body: message,
    });

    console.log("WhatsApp sent successfully:", result.sid);
    return { success: true, sid: result.sid };
  } catch (err) {
    console.error("WhatsApp send error:", err.message);
    console.error("Error details:", err);
    return { success: false, error: err.message };
  }
}