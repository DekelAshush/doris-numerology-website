import fetch from 'node-fetch';

const buildMessage = ({ firstName, lastName, phone, service, lang }) => {
  const safe = (v) => String(v || '').trim();
  const first = safe(firstName);
  const last = safe(lastName);
  const clientPhone = safe(phone);
  const requestedService = safe(service);
  const isHebrew = (lang || '').toLowerCase().startsWith('he');

  if (isHebrew) {
    return `שלום, פנייה חדשה מהאתר:\nשם: ${first} ${last}\nטלפון: ${clientPhone}\nשירות מבוקש: ${requestedService}`;
  }
  return `New inquiry from website:\nName: ${first} ${last}\nPhone: ${clientPhone}\nService: ${requestedService}`;
};

const sendMessage = async (req, res) => {
  const { body, firstName, lastName, phone, service, lang, templateName, languageCode, to } = req.body || {};

  // Support both payload styles:
  // 1) { body: "..." }
  // 2) { firstName, lastName, phone, service, lang }
  const hasRawBody = typeof body === 'string' && body.trim().length > 0;
  const hasStructured = firstName && lastName && phone && service;
  const wantsTemplate = typeof templateName === 'string' && templateName.trim().length > 0;
  if (!hasRawBody && !hasStructured) {
    return res.status(400).json({
      error: 'Missing required content',
      acceptedFormats: [
        '{ body: string }',
        '{ firstName: string, lastName: string, phone: string, service: string, lang?: string }',
      ],
    });
  }

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const businessNumber = process.env.WHATSAPP_BUSINESS_NUMBER;
  if (!token || !phoneNumberId || !businessNumber) {
    return res.status(500).json({ error: 'Server not configured for WhatsApp API' });
  }

  const recipient = String(to || businessNumber);
  const textBody = hasRawBody
    ? body.trim()
    : buildMessage({ firstName, lastName, phone, service, lang });
  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  try {
    const payload = wantsTemplate
      ? {
          messaging_product: 'whatsapp',
          to: recipient,
          type: 'template',
          template: {
            name: templateName.trim(),
            language: { code: (languageCode || 'en_US') },
            // components: [] // add if your template requires variables
          },
        }
      : {
          messaging_product: 'whatsapp',
          to: recipient,
          type: 'text',
          text: { body: textBody },
        };

    console.log('📩 Sending WhatsApp message to Meta:', { to: recipient, type: payload.type });
    console.log('🌍 URL:', url);
    console.log('🔐 Token starts with:', token.slice(0, 10));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('📥 Meta response:', data);

    if (!response.ok) {
      console.error('❌ WhatsApp message failed:', data);
      return res.status(response.status).json({ error: 'WhatsApp API error', details: data });
    }

    const messageId = data?.messages?.[0]?.id;
    console.log('✅ WhatsApp message sent successfully');
    if (messageId) console.log('   Message ID:', messageId);
    console.log('   To:', recipient);

    return res.json({ ok: true, messageId, data });
  } catch (err) {
    console.error('❌ WhatsApp send internal error:', err);
    return res.status(500).json({ error: 'Internal error', details: String(err) });
  }
};

export { sendMessage };


