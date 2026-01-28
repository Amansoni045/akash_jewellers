import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Akash Jewellers'}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Email sending error:', err);
    return { success: false, error: err.message };
  }
}

export function createAdminNotificationEmail(name, email, phone, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-row { margin: 15px 0; padding: 12px; background: white; border-left: 4px solid #667eea; border-radius: 4px; }
        .label { font-weight: 600; color: #667eea; display: inline-block; min-width: 80px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #e0e0e0; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">✨ New Customer Inquiry</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone's interested in your jewellery collection!</p>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>Great news! You've received a new inquiry through your website. Here are the details:</p>
          
          <div class="info-row">
            <span class="label">Name:</span> ${name}
          </div>
          
          <div class="info-row">
            <span class="label">Email:</span> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
          </div>
          
          ${phone ? `<div class="info-row"><span class="label">Phone:</span> ${phone}</div>` : ''}
          
          <div class="message-box">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #667eea;">Their Message:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 25px;">Don't keep them waiting – a quick response can make all the difference! 😊</p>
          
          <div class="footer">
            <p>This notification was sent from your Akash Jewellers website contact form.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createCustomerReplyEmail(customerName, replyText) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin: 0; }
        .tagline { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .reply-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; padding: 20px; }
        .cta { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">💎 Akash Jewellers</h1>
          <p class="tagline">Crafting Timeless Elegance</p>
        </div>
        <div class="content">
          <p>Hello ${customerName},</p>
          
          <p>Thank you so much for reaching out to us! We really appreciate you taking the time to get in touch.</p>
          
          <div class="reply-box">
            ${replyText}
          </div>
          
          <p>If you have any other questions or need more information, please don't hesitate to ask. We're here to help and would love to assist you further!</p>
          
          <div class="signature">
            <p style="margin: 5px 0;">Warm regards,</p>
            <p style="margin: 5px 0; font-weight: 600;">The Akash Jewellers Team</p>
            <p style="margin: 5px 0; color: #888; font-size: 14px;">Where every piece tells a story ✨</p>
          </div>
          
          <div class="footer">
            <p>This email was sent in response to your inquiry at Akash Jewellers.</p>
            <p style="margin-top: 10px;">Have questions? Just reply to this email – we'd love to hear from you!</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createCustomerConfirmationEmail(customerName) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin: 0; }
        .tagline { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .checkmark { font-size: 48px; text-align: center; margin: 20px 0; color: #10b981; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; padding: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">💎 Akash Jewellers</h1>
          <p class="tagline">Crafting Timeless Elegance</p>
        </div>
        <div class="content">
          <div class="checkmark">✓</div>
          
          <h2 style="text-align: center; color: #667eea; margin-top: 0;">We've Received Your Message!</h2>
          
          <p>Hello ${customerName},</p>
          
          <p>Thank you for reaching out to Akash Jewellers! We wanted to let you know that we've received your inquiry and we're excited to help you.</p>
          
          <div class="info-box">
            <p style="margin: 0; font-weight: 600; color: #667eea;">What happens next?</p>
            <p style="margin: 10px 0 0 0;">Our team will review your message and get back to you within 24 hours. We're here to answer any questions you have about our jewellery collection.</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul style="color: #555;">
            <li>Browse our latest collection on our website</li>
            <li>Follow us on social media for new designs</li>
            <li>Visit our store if you're nearby</li>
          </ul>
          
          <p>If you have any urgent questions, don't hesitate to reach out to us directly.</p>
          
          <div class="signature">
            <p style="margin: 5px 0;">Warm regards,</p>
            <p style="margin: 5px 0; font-weight: 600;">The Akash Jewellers Team</p>
            <p style="margin: 5px 0; color: #888; font-size: 14px;">Where every piece tells a story ✨</p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email from Akash Jewellers.</p>
            <p style="margin-top: 10px;">If you didn't send this inquiry, please disregard this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

