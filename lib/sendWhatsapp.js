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

    await client.messages.create({
      from: formattedFrom,
      to: formattedTo,
      body: message,
    });
  } catch (err) {
    console.error("WhatsApp send error:", err);
  }
}