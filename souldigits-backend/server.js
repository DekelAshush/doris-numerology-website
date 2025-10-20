import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendMessage } from './Controllers/sendMessage.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// POST /api/whatsapp/send - delegate to controller
app.post('/api/whatsapp/send', sendMessage);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});


