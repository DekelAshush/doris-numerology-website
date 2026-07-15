const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!expectedToken) {
    console.error('WHATSAPP_VERIFY_TOKEN is not set');
    return res.sendStatus(500);
  }

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('WhatsApp webhook verified');
    return res.status(200).send(challenge);
  }

  console.warn('WhatsApp webhook verification failed');
  return res.sendStatus(403);
};

const handleWebhook = (req, res) => {
  const body = req.body;

  if (body?.object === 'whatsapp_business_account') {
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        console.log('WhatsApp webhook event:', change.field, JSON.stringify(change.value));
      }
    }
  }

  return res.sendStatus(200);
};

export { verifyWebhook, handleWebhook };
