# Vercel Deployment Guide

This guide will help you deploy the Finance Tracker application on Vercel.

## Quick Start (Recommended)

The easiest way to deploy is using the Vercel CLI or Vercel Dashboard.

### Method 1: Using Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Sign in with GitHub
   - Click "Import Project"
   - Select your repository
   - **Important:** Set the Root Directory to `frontend`
   - Click "Deploy"

3. **That's it!** Vercel will automatically:
   - Detect Next.js
   - Install dependencies
   - Build the project
   - Deploy it

### Method 2: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Configuration

### Root Directory

When deploying from the repository root, make sure to set:
- **Root Directory:** `frontend`

This tells Vercel where your Next.js app is located.

### Environment Variables (Optional)

If you want to connect to a backend API, set this in Vercel Dashboard → Project Settings → Environment Variables:

- `NEXT_PUBLIC_API_URL` - Your backend API URL
  - **Leave empty** for local storage mode (recommended for MVP)
  - Set to backend URL if you deploy the backend separately

**Note:** The app works perfectly without a backend using local storage!

## How It Works

1. **Local Storage Mode (Default):**
   - When `NEXT_PUBLIC_API_URL` is not set, the app uses browser localStorage
   - All data (profiles, transactions) is stored locally
   - Works offline
   - Perfect for personal use or MVP

2. **API Mode (Optional):**
   - When `NEXT_PUBLIC_API_URL` is set, the app connects to your backend
   - Falls back to local storage if backend is unavailable
   - Requires separate backend deployment (Railway, Render, etc.)

## Post-Deployment Checklist

- [ ] Visit your Vercel URL
- [ ] Test adding a profile
- [ ] Test adding transactions
- [ ] Verify charts and summaries work
- [ ] Test on mobile device (responsive design)

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build Fails

**Issue:** Build command fails
**Solution:** 
- Ensure Root Directory is set to `frontend`
- Check that all dependencies are in `frontend/package.json`
- Review build logs in Vercel dashboard

### App Shows "Failed to fetch"

**Issue:** API connection errors
**Solution:**
- This is normal if backend is not deployed
- App will automatically use local storage
- To use backend, deploy it separately and set `NEXT_PUBLIC_API_URL`

### Local Storage Not Persisting

**Issue:** Data disappears on refresh
**Solution:**
- Local storage is per domain
- Data persists across sessions on the same domain
- Clearing browser data will clear local storage

## Recommended Setup for MVP

For the MVP, we recommend:

1. ✅ Deploy frontend only on Vercel
2. ✅ Leave `NEXT_PUBLIC_API_URL` empty (use local storage)
3. ✅ No backend deployment needed
4. ✅ Works immediately after deployment

The app is fully functional with local storage and works offline!

## Deploying Backend Separately (Optional)

If you want to deploy the backend:

1. **Deploy on Railway:**
   - Go to https://railway.app
   - Create new project
   - Connect GitHub repo
   - Set root directory to `backend`
   - Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variable: `CORS_ORIGINS=https://your-vercel-app.vercel.app`

2. **Deploy on Render:**
   - Go to https://render.com
   - Create new Web Service
   - Connect GitHub repo
   - Set root directory to `backend`
   - Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. **Update Frontend:**
   - In Vercel, set `NEXT_PUBLIC_API_URL` to your backend URL

## Support

For issues:
- Check Vercel deployment logs
- Review browser console for errors
- Verify environment variables are set correctly
