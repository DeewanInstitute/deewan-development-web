import { Router } from "express";
import { Resend } from "resend";
import { contactNotificationHtml, contactNotificationText } from "../emails/contactNotification.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  const { fullName, email, service, message } = req.body ?? {};

  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !fullName.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ error: "fullName, email, and message are required." });
  }

  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email is not configured on the server yet." });
  }

  const resend = new Resend(apiKey);
  const notificationData = {
    fullName: fullName.trim(),
    email: email.trim(),
    service: typeof service === "string" && service.trim() ? service.trim() : undefined,
    message: message.trim(),
  };

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_RECIPIENT_EMAIL ?? "project@deewandevelopment.com",
      replyTo: notificationData.email,
      subject: `New inquiry from ${notificationData.fullName}`,
      html: contactNotificationHtml(notificationData),
      text: contactNotificationText(notificationData),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Failed to send your message. Please try again later." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

export default router;
