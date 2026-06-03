# WhatsApp API — Production Checklist

Use this after the privacy page is deployed. Your app ID: `1684619072776244`.

---

## What “production” means for Doris

| Piece | What it is |
|-------|------------|
| **Sender** | Meta WhatsApp API number (`WHATSAPP_PHONE_NUMBER_ID` + `WHATSAPP_TOKEN`) |
| **Receiver** | Doris’s personal WhatsApp (`WHATSAPP_BUSINESS_NUMBER`, e.g. `9725XXXXXXXX`) |
| **Website** | Vercel frontend calls Render backend → backend calls Meta API |

You can go live **without a new phone line** using Meta’s **test sender number**, as long as Doris’s phone is added as a **test recipient** in Meta. For messaging many customers later, add your own production number in Meta.

---

## Part A — Meta (do first)

### A1. App settings (required for Go Live)

1. Open [App Settings → Basic](https://developers.facebook.com/apps/1684619072776244/settings/basic/).
2. Set **Privacy Policy URL** (must be public, no login):
   - `https://YOUR-VERCEL-DOMAIN.vercel.app/he/privacy`
   - or `/en/privacy` if you prefer English
3. Set **App category** and **App icon** if missing.
4. Save.

### A2. Permanent access token (required on Render)

Temporary tokens from API Setup expire in ~24 hours. For production you need a **System User** token.

1. [business.facebook.com/settings](https://business.facebook.com/settings) → **Users** → **System users** → **Add** (Admin).
   - If **Add** is disabled: link your app under **Accounts → Apps → Connect app ID** `1684619072776244`, complete **business verification**, enable **2FA** on your Facebook account.
2. **Assign assets** to the system user:
   - Your app → **Manage app** (full control)
   - WhatsApp Business Account → **Manage WhatsApp Business Accounts** (full control)
3. **Generate token** with permissions:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
4. Copy the token once — you will not see it again.

**Fallback (testing only):** [WhatsApp → API Setup](https://developers.facebook.com/apps/1684619072776244/whatsapp-business/wa-dev-console/) → **Generate access token**. Re-copy to Render every day until A2 works.

### A3. Copy IDs from API Setup

Open [WhatsApp → API Setup](https://developers.facebook.com/apps/1684619072776244/whatsapp-business/wa-dev-console/):

| Copy this | Goes in Render as |
|-----------|-------------------|
| **Phone number ID** | `WHATSAPP_PHONE_NUMBER_ID` |
| System user token (A2) | `WHATSAPP_TOKEN` |
| Doris’s phone, digits only `972...` | `WHATSAPP_BUSINESS_NUMBER` |

### A4. Test recipients (if using Meta’s test number)

1. In **API Setup**, add Doris’s WhatsApp number as a **test phone number**.
2. Confirm the test message on her phone.
3. Reply once in WhatsApp (opens the 24-hour window for free-text replies).

### A5. Business verification (recommended)

[Business settings → Security Center](https://business.facebook.com/settings) → complete **Business verification**. Helps unlock system users and higher limits.

### A6. App mode

For **your own website only** (not a SaaS for other businesses):

- You usually **do not** need full App Review.
- You **do not** have to click **Go Live** for Doris-only use; developers with app roles can use Standard access.
- Deploy the site and use a **permanent token** on Render.

---

## Part B — Deploy backend (Render)

1. [render.com](https://render.com) → your service (or create one per `DEPLOYMENT.md`).
2. **Root Directory:** `souldigits-backend`
3. **Environment variables:**

```env
NODE_ENV=production
PORT=3001
WHATSAPP_TOKEN=<system_user_token_from_A2>
WHATSAPP_PHONE_NUMBER_ID=<from_A3>
WHATSAPP_BUSINESS_NUMBER=972XXXXXXXXX
FRONTEND_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
```

4. Save → wait for redeploy.
5. Test: open `https://YOUR-RENDER-URL.onrender.com/api/health` → should show `{"ok":true}`.

> First request after sleep on free tier can take 30–60 seconds.

---

## Part C — Deploy frontend (Vercel)

1. Vercel project → **Root Directory:** `souldigits-web`
2. **Environment variable:**

```env
NEXT_PUBLIC_API_URL=https://YOUR-RENDER-URL.onrender.com
```

3. Deploy.
4. Copy the production URL (e.g. `https://doris-numerology-website.vercel.app`).
5. Update Render `FRONTEND_URL` to that exact URL (no trailing slash) → redeploy backend.

---

## Part D — End-to-end test

1. Open `https://YOUR-VERCEL-DOMAIN/he/contact`
2. Submit the form with a valid Israeli mobile number.
3. Doris should get a WhatsApp message from the Meta sender number.
4. If it fails, check **Render → Logs** and browser **Network** tab on `POST .../api/whatsapp/send`.

### Common errors

| Symptom | Fix |
|---------|-----|
| CORS error in browser | `FRONTEND_URL` on Render must match Vercel URL exactly (https, no trailing `/`) |
| `NEXT_PUBLIC_API_URL is not set` | Set on Vercel and redeploy frontend |
| Meta `190` / token error | Regenerate token; update `WHATSAPP_TOKEN` on Render |
| Message not delivered to Doris | Add her number as test recipient; check `WHATSAPP_BUSINESS_NUMBER` format |
| `131047` / template required | Doris must message the business number first, or use an approved **message template** |

---

## Part E — Optional: real production phone number

When you want a **public business sender** (not Meta’s test number):

1. Meta → **API Setup** → **Add phone number** (SMS/voice verify).
2. Wait for **display name** approval.
3. Replace `WHATSAPP_PHONE_NUMBER_ID` on Render with the **new** Phone number ID.
4. Keep the same `WHATSAPP_TOKEN` if the system user still has access to that WABA.

---

## Quick reference — your `.env` locally

**Backend** (`souldigits-backend/.env`):

```env
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_NUMBER=972XXXXXXXXX
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`souldigits-web/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Links

- [WhatsApp Cloud API Get Started](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- [Register a business phone number](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/registration/)
- Full stack deploy: `DEPLOYMENT.md`
