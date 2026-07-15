import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendMessage } from './Controllers/sendMessage.js';
import { verifyWebhook, handleWebhook } from './Controllers/webhook.js';

dotenv.config();

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
  console.log(`Backend listening on http://localhost:${port}`);
});


