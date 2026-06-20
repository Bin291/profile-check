// Cloudflare Pages Function — handles POST /api/contact on the same domain as the
// frontend. Sends the email through Resend's HTTPS API (no SMTP, so it runs on the
// Workers runtime). Set the env vars in the Pages project settings.

import { buildEmailHtml } from '../../server/email-template';

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO?: string;
  RESEND_FROM?: string;
}

// Minimal shape of the context Cloudflare passes — avoids needing @cloudflare/workers-types.
interface Context {
  request: Request;
  env: Env;
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Yêu cầu không hợp lệ.' }, 400);
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return json({ error: 'Vui lòng điền đầy đủ thông tin.' }, 400);
  }

  const to = env.CONTACT_TO || 'binhnguyen290104@gmail.com';
  const from = env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: `${name} <${email}>`,
        subject: `[Portfolio] Tin nhắn từ ${name}`,
        html: buildEmailHtml(name, email, message),
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('[Contact] Resend error:', r.status, detail);
      return json({ error: 'Không thể gửi email. Vui lòng thử lại.' }, 500);
    }

    const data = (await r.json()) as { id?: string };
    return json({ success: true, id: data.id });
  } catch (err) {
    console.error('[Contact] Resend error:', err);
    return json({ error: 'Không thể gửi email. Vui lòng thử lại.' }, 500);
  }
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
