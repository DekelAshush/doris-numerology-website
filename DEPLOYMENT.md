# 🚀 Deployment Guide

## Overview
This guide will help you deploy:
- **Backend** → Render (Free)
- **Frontend** → Vercel (Free)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account**
4. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Find and select **`doris-numerology-website`**
5. Click **"Connect"**

### Step 3: Configure Web Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `doris-numerology-backend` |
| **Region** | Choose closest (e.g., Frankfurt/Oregon) |
| **Branch** | `main` |
| **Root Directory** | `souldigits-backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** and add:

```
NODE_ENV=production
WHATSAPP_TOKEN=your_token_from_meta
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_NUMBER=your_business_number
FRONTEND_URL=https://your-frontend-url.vercel.app
```

> ⚠️ You'll update `FRONTEND_URL` after deploying the frontend

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. **Copy your backend URL**: `https://doris-numerology-backend.onrender.com`

### Step 6: Test Backend
Open in browser or use curl:
```bash
https://YOUR-BACKEND-URL.onrender.com/api/health
```

Should return: `{"ok":true}`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Login to Vercel
```bash
cd souldigits-frontend
vercel login
```

Follow the prompts to login with your email or GitHub.

### Step 2: Create Production Environment File
Create a `.env.production` file:

```bash
echo "VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com" > .env.production
```

**Replace `YOUR-BACKEND-URL` with your actual Render URL!**

### Step 3: Deploy to Vercel
```bash
vercel --prod
```

**During setup, answer:**
- Set up and deploy? → **Y**
- Which scope? → **Choose your account**
- Link to existing project? → **N**
- Project name? → **doris-numerology-website** (or your choice)
- Directory? → **Press Enter** (uses current directory)
- Override settings? → **N**

### Step 4: Get Your Frontend URL
After deployment, Vercel will show:
```
✅ Production: https://doris-numerology-website.vercel.app
```

**Copy this URL!**

---

## Part 3: Connect Frontend and Backend

### Step 1: Update Backend CORS
1. Go back to **Render Dashboard**
2. Open your backend service
3. Click **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update it with your Vercel URL: `https://doris-numerology-website.vercel.app`
6. Click **"Save Changes"**
7. Service will automatically redeploy

### Step 2: Verify Everything Works
1. Visit your frontend: `https://doris-numerology-website.vercel.app`
2. Test the WhatsApp contact form
3. Check browser console for errors

---

## 🎉 You're Live!

Your website is now deployed:
- **Frontend**: https://doris-numerology-website.vercel.app
- **Backend**: https://doris-numerology-backend.onrender.com

---

## 🔄 Future Updates

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push
```
Render will auto-deploy!

### Update Frontend:
```bash
cd souldigits-frontend
git add .
git commit -m "Update frontend"
git push
vercel --prod
```

---

## 📝 Environment Variables Summary

### Backend (.env on Render):
```
NODE_ENV=production
WHATSAPP_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_NUMBER=your_business_number
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env.production locally):
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## ⚠️ Important Notes

1. **Render Free Tier**: Services sleep after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

2. **WhatsApp API**: Make sure your Meta Business account is properly configured with:
   - WhatsApp Business API access
   - Phone number registered
   - Valid access token

3. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain → Add your domain

4. **HTTPS**: Both Render and Vercel provide free HTTPS automatically!

---

## 🐛 Troubleshooting

### Backend Issues:
- Check Render logs: Dashboard → Your Service → Logs
- Verify environment variables are set correctly
- Test health endpoint: `/api/health`

### Frontend Issues:
- Check browser console for errors
- Verify `VITE_API_URL` is correct in environment variables
- Check Vercel deployment logs

### CORS Errors:
- Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check browser network tab for preflight requests

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- WhatsApp API: https://developers.facebook.com/docs/whatsapp

---

Good luck with your deployment! 🚀

