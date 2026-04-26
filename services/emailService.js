import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailService = {
  async sendEmails(to, subject, html, text, userEmail, userName) {
    // Send to contact@ideasprout.in
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      text,
    });

    // Send acknowledgment to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: userEmail,
      subject: "Thank you for contacting us",
      html: `<p>Hi ${userName},</p><p>Thank you for reaching out. We have received your message and will get back to you soon.</p>`,
      text: `Hi ${userName}, Thank you for reaching out. We have received your message and will get back to you soon.`,
    });
  },
};
