interface ContactNotificationData {
  fullName: string;
  email: string;
  service?: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function contactNotificationText({ fullName, email, service, message }: ContactNotificationData): string {
  return [
    `Name: ${fullName}`,
    `Email: ${email}`,
    service ? `Interested service: ${service}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function contactNotificationHtml({ fullName, email, service, message }: ContactNotificationData): string {
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeService = service ? escapeHtml(service) : null;
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const serviceRow = safeService
    ? `
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #d3e2e3; color:#094e52; font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; width:120px; vertical-align:top;">Service</td>
                    <td style="padding:10px 0; border-bottom:1px solid #d3e2e3; color:#074044; font-family:Arial,Helvetica,sans-serif; font-size:15px;">${safeService}</td>
                  </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f2f5f7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f5f7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; max-width:600px; width:100%;">
            <tr>
              <td style="background-color:#0a5c61; padding:24px 32px;">
                <span style="color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:13px; letter-spacing:1px; text-transform:uppercase; font-weight:bold;">New Contact Inquiry</span>
                <div style="color:#ebf2f2; font-family:Arial,Helvetica,sans-serif; font-size:18px; margin-top:6px;">Deewan for Digital Learning Development</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #d3e2e3; color:#094e52; font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; width:120px; vertical-align:top;">Name</td>
                    <td style="padding:10px 0; border-bottom:1px solid #d3e2e3; color:#074044; font-family:Arial,Helvetica,sans-serif; font-size:15px;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #d3e2e3; color:#094e52; font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; vertical-align:top;">Email</td>
                    <td style="padding:10px 0; border-bottom:1px solid #d3e2e3; font-family:Arial,Helvetica,sans-serif; font-size:15px;">
                      <a href="mailto:${safeEmail}" style="color:#0a5c61; text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>${serviceRow}
                </table>
                <div style="color:#094e52; font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Message</div>
                <p style="margin:0; color:#074044; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7;">${safeMessage}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f2f5f7; padding:18px 32px; text-align:center;">
                <span style="color:#4d5761; font-family:Arial,Helvetica,sans-serif; font-size:12px;">Reply directly to this email to respond to ${safeName}.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
