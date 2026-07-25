import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendMessage } from './Controllers/sendMessage.js';
import { verifyWebhook, handleWebhook } from './Controllers/webhook.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const parsed = dotenv.parse(fs.readFileSync(envPath));
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = value;
  }
}

const app = express();
const port = process.env.PORT || 3001;

// CORS: FRONTEND_URL can be one URL or comma-separated (e.g. prod + local dev)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// WhatsApp webhook (Meta verification + incoming events)
app.get('/api/whatsapp/webhook', verifyWebhook);
app.post('/api/whatsapp/webhook', handleWebhook);

// POST /api/whatsapp/send - delegate to controller
app.post('/api/whatsapp/send', sendMessage);

app.listen(port, () => {
  const whatsappReady = Boolean(
    process.env.WHATSAPP_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_BUSINESS_NUMBER,
  );
  console.log(`Backend listening on http://localhost:${port}`);
  console.log(`WhatsApp API: ${whatsappReady ? 'ready' : 'not configured — check .env'}`);
});


