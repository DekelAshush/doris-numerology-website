const json = (data, status, cors) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...cors,
    },
  });

const text = (body, status, cors) =>
  new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...cors,
    },
  });

const allowedOrigins = (env) =>
  String(env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);

const corsHeaders = (request, env) => {
  const origin = request.headers.get('Origin') || '';
  const allowed = allowedOrigins(env);
  if (origin && allowed.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };
  }
  return {};
};

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

const verifyWebhook = (url, env) => {
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge') || '';
  const expectedToken = env.WHATSAPP_VERIFY_TOKEN;

  if (!expectedToken) {
    console.error('WHATSAPP_VERIFY_TOKEN is not set');
    return text('Server not configured', 500);
  }

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('WhatsApp webhook verified');
    return text(challenge, 200);
  }

  console.warn('WhatsApp webhook verification failed');
  return text('Forbidden', 403);
};

const handleWebhook = async (request) => {
  const body = await request.json().catch(() => ({}));
  console.log('WhatsApp webhook POST received', {
    object: body?.object,
    entries: body?.entry?.length ?? 0,
  });

  if (body?.object === 'whatsapp_business_account') {
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        for (const status of value.statuses || []) {
          const errors = (status.errors || []).map((e) => ({
            code: e.code,
            title: e.title,
            message: e.message,
            details: e.error_data?.details,
          }));
          const line = {
            status: status.status,
            recipient: status.recipient_id,
            messageId: status.id,
            errors: errors.length ? errors : undefined,
          };
          if (status.status === 'failed') {
            console.error('WhatsApp delivery FAILED:', line);
          } else {
            console.log('WhatsApp delivery status:', line);
          }
        }
        if (!value.statuses?.length) {
          console.log('WhatsApp webhook event:', change.field, JSON.stringify(value));
        }
      }
    }
  } else if (body && Object.keys(body).length > 0) {
    console.warn('WhatsApp webhook unexpected payload:', JSON.stringify(body));
  }

  return text('OK', 200);
};

const sendMessage = async (request, env, cors) => {
  const payloadIn = await request.json().catch(() => ({}));
  const { body, firstName, lastName, phone, service, lang, templateName, languageCode, to } =
    payloadIn || {};

  const hasRawBody = typeof body === 'string' && body.trim().length > 0;
  const hasStructured = firstName && lastName && phone && service;
  const wantsTemplate = typeof templateName === 'string' && templateName.trim().length > 0;

  if (!hasRawBody && !hasStructured) {
    return json(
      {
        error: 'Missing required content',
        acceptedFormats: [
          '{ body: string }',
          '{ firstName: string, lastName: string, phone: string, service: string, lang?: string }',
        ],
      },
      400,
      cors,
    );
  }

  const token = env.WHATSAPP_TOKEN;
  const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID;
  const businessNumber = env.WHATSAPP_BUSINESS_NUMBER;
  if (!token || !phoneNumberId || !businessNumber) {
    const missing = [
      !token && 'WHATSAPP_TOKEN',
      !phoneNumberId && 'WHATSAPP_PHONE_NUMBER_ID',
      !businessNumber && 'WHATSAPP_BUSINESS_NUMBER',
    ].filter(Boolean);
    console.error('WhatsApp env missing:', missing.join(', '));
    return json({ error: 'Server not configured for WhatsApp API', missing }, 500, cors);
  }

  const recipient = String(to || businessNumber);
  const textBody = hasRawBody
    ? body.trim()
    : buildMessage({ firstName, lastName, phone, service, lang });
  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const envTemplateName = String(env.WHATSAPP_TEMPLATE_NAME || '').trim();
  const envTemplateLang = String(env.WHATSAPP_TEMPLATE_LANGUAGE || 'he').trim() || 'he';

  if (hasStructured && !hasRawBody && !wantsTemplate && !envTemplateName) {
    console.error('WHATSAPP_TEMPLATE_NAME is not set — cannot send website inquiry as a template.');
    return json(
      {
        error: 'WhatsApp template not configured',
        missing: ['WHATSAPP_TEMPLATE_NAME'],
        hint: 'Set WHATSAPP_TEMPLATE_NAME (and WHATSAPP_TEMPLATE_LANGUAGE) so form inquiries deliver outside the 24h window.',
      },
      500,
      cors,
    );
  }

  const useEnvTemplate = Boolean(envTemplateName && hasStructured && !hasRawBody);

  let payload;
  if (wantsTemplate) {
    payload = {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'template',
      template: {
        name: templateName.trim(),
        language: { code: languageCode || 'en_US' },
      },
    };
  } else if (useEnvTemplate) {
    payload = {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'template',
      template: {
        name: envTemplateName,
        language: { code: envTemplateLang },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: String(firstName).trim() },
              { type: 'text', text: String(lastName).trim() },
              { type: 'text', text: String(phone).trim() },
              { type: 'text', text: String(service).trim() },
            ],
          },
        ],
      },
    };
  } else {
    console.warn(
      'Sending plain text — WhatsApp may not deliver without a 24h window. Set WHATSAPP_TEMPLATE_NAME for reliable delivery.',
    );
    payload = {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'text',
      text: { body: textBody },
    };
  }

  console.log('Sending WhatsApp message to Meta:', { to: recipient, type: payload.type });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log('Meta response:', data);

  if (!response.ok) {
    console.error('WhatsApp message failed:', data);
    return json({ error: 'WhatsApp API error', details: data }, response.status, cors);
  }

  const messageId = data?.messages?.[0]?.id;
  console.log('WhatsApp message sent successfully', { messageId, to: recipient });
  return json({ ok: true, messageId, data }, 200, cors);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return json({ ok: true }, 200, cors);
      }
      if (url.pathname === '/api/whatsapp/webhook' && request.method === 'GET') {
        return verifyWebhook(url, env);
      }
      if (url.pathname === '/api/whatsapp/webhook' && request.method === 'POST') {
        return handleWebhook(request);
      }
      if (url.pathname === '/api/whatsapp/send' && request.method === 'POST') {
        return sendMessage(request, env, cors);
      }
      return json({ error: 'Not found' }, 404, cors);
    } catch (err) {
      console.error('Worker error:', err);
      return json({ error: 'Internal error', details: String(err) }, 500, cors);
    }
  },
};
