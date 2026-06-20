import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { buildEmailHtml } from './email-template';

const app = express();

// Local dev origins + production frontend(s) from ALLOWED_ORIGINS (comma-separated)
const allowedOrigins = [
  'http://localhost:3000',
  'http://0.0.0.0:3000',
  ...(process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) ?? []),
];

app.use(cors({
  origin: (origin, cb) => {
    // allow non-browser requests (no Origin header) like health checks / curl
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`Origin not allowed by CORS: ${origin}`));
  },
}));
app.use(express.json());

// Resend sends over HTTPS (port 443) → works on Render free (SMTP is blocked there).
const resend = new Resend(process.env.RESEND_API_KEY);

// Where contact messages land (your inbox).
const CONTACT_TO = process.env.CONTACT_TO || 'binhnguyen290104@gmail.com';
// Sender. Use onboarding@resend.dev until binhh.id.vn is verified in Resend,
// then switch to e.g. "Portfolio <noreply@binhh.id.vn>".
const RESEND_FROM = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    build: 'resend-http',
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' });
  }

  console.log(`[Contact] Nhận tin nhắn từ: ${name} <${email}>`);

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_TO,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] Tin nhắn từ ${name}`,
      html: buildEmailHtml(name, email, message),
    });

    if (error) {
      console.error('[Contact] Resend error:', error);
      return res.status(500).json({ error: 'Không thể gửi email. Vui lòng thử lại.' });
    }

    console.log('[Contact] Gửi thành công:', data?.id);
    return res.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('[Contact] Resend error:', err.message);
    return res.status(500).json({ error: 'Không thể gửi email. Vui lòng thử lại.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server: http://localhost:${PORT}`);
});
