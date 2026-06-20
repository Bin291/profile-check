// Pure HTML builder shared by the local Express server and the Cloudflare Function.
// No Node-specific APIs here so it runs on both Node and the Workers runtime.

function senderAvatarUrl(email: string, name: string, size = 80) {
  // unavatar.io fetches real avatars (Gravatar, GitHub, etc.)
  // Falls back to ui-avatars initials if nothing found
  const fallback = encodeURIComponent(
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=cc785c&color=ffffff&bold=true&rounded=true&format=png`
  );
  return `https://unavatar.io/${encodeURIComponent(email)}?fallback=${fallback}&size=${size}`;
}

// Bình's own GitHub avatar — real photo, always available
const MY_AVATAR = `https://github.com/Bin291.png?size=40`;

export function buildEmailHtml(name: string, email: string, message: string) {
  const avatar = senderAvatarUrl(email, name, 80);
  const replySubject = encodeURIComponent(`Re: Message from ${name}`);
  const replyBody = encodeURIComponent(`\n\n---\nReplying to ${name} (${email})\n`);
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${replySubject}&body=${replyBody}`;
  const mailtoUrl = `mailto:${email}?subject=${replySubject}&body=${replyBody}`;

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f0ede8;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#181715;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color:#faf9f5;font-size:15px;font-weight:500;letter-spacing:0.5px;">NPB · Portfolio</span>
                  </td>
                  <td align="right">
                    <span style="color:#a09d96;font-size:12px;">binhh.id.vn</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#faf9f5;padding:40px 40px 32px;">

              <!-- Sender card -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#efe9de;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
                <tr>
                  <td style="vertical-align:middle;width:64px;">
                    <img src="${avatar}"
                      width="56" height="56"
                      alt="${name}"
                      style="border-radius:50%;display:block;border:2px solid #e6dfd8;" />
                  </td>
                  <td style="padding-left:16px;vertical-align:middle;">
                    <div style="font-size:17px;font-weight:500;color:#141413;margin-bottom:3px;">${name}</div>
                    <div style="font-size:13px;color:#cc785c;">${email}</div>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:400;color:#141413;letter-spacing:-0.3px;font-family:Georgia,serif;">
                New message from your portfolio
              </h1>

              <!-- Divider -->
              <div style="height:1px;background:#e6dfd8;margin-bottom:24px;"></div>

              <!-- Message -->
              <div style="font-size:15px;line-height:1.75;color:#3d3d3a;white-space:pre-wrap;margin-bottom:36px;">${message}</div>

              <!-- CTA buttons -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="${gmailComposeUrl}" target="_blank"
                      style="display:inline-block;background:#cc785c;color:#ffffff;font-size:14px;font-weight:500;
                             text-decoration:none;padding:12px 24px;border-radius:8px;letter-spacing:0.2px;">
                      ↩ Reply in Gmail
                    </a>
                  </td>
                  <td>
                    <a href="${mailtoUrl}"
                      style="display:inline-block;background:#faf9f5;color:#141413;font-size:14px;font-weight:500;
                             text-decoration:none;padding:12px 24px;border-radius:8px;border:1px solid #e6dfd8;letter-spacing:0.2px;">
                      Open Mail App
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f0e8;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e6dfd8;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#8e8b82;font-size:12px;line-height:1.6;">
                    Sent from <strong style="color:#6c6a64;">Binh's portfolio</strong> at binhh.id.vn<br>
                    Hit reply to respond directly to ${name}.
                  </td>
                  <td align="right">
                    <img src="${MY_AVATAR}"
                      width="32" height="32"
                      alt="Binh Nguyen"
                      style="border-radius:50%;border:1px solid #e6dfd8;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
