# Deploy to Railway (Recommended) - 5 Minutes Setup

## What is Railway?
Railway is a cloud platform that gives you **$5/month free credit** (never expires). Perfect for full-stack apps like 9jaAgentsConnect.

---

## Step 1: Create Accounts (Free)

1. **GitHub Account** (if you don't have one)
   - https://github.com/signup

2. **Railway Account**
   - Go to https://railway.app
   - Click "Login" → "Continue with GitHub"
   - Done! No credit card needed

---

## Step 2: Push Code to GitHub

```bash
cd /root/.openclaw/workspace/9jaagentsconnect

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "9jaAgentsConnect v1.0 - Full backend"

# Create GitHub repo and push
# Go to https://github.com/new
# Name: 9jaagentsconnect
# Then:
git remote add origin https://github.com/YOUR_USERNAME/9jaagentsconnect.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Railway

### Option A: Web Dashboard (Easiest)

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `9jaagentsconnect` repository
5. Railway auto-detects Node.js and deploys!

### Option B: Railway CLI (Hacker Way)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project from your code
cd 9jaagentsconnect
railway init

# Add PostgreSQL database
railway add --database postgres

# Deploy
railway up

# Open your app
railway open
```

---

## Step 4: Environment Variables

In Railway Dashboard:
1. Go to your project → Variables tab
2. Add these:

```
NODE_ENV=production
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
CLIENT_URL=https://9jaagentsconnect.surge.sh  (or your frontend URL)
```

Database URL is added automatically when you add PostgreSQL!

---

## Step 5: Get Your API URL

After deployment:
1. Go to your Railway project
2. Click on the service
3. Find the URL (like `https://9jaagentsconnect-api.up.railway.app`)
4. Copy this URL - this is your **backend API endpoint**

---

## Step 6: Connect Frontend to Backend

Update your frontend `app.js` to use the Railway API:

```javascript
const API_BASE_URL = 'https://YOUR-RAILWAY-URL/api';
// Example: 'https://9jaagentsconnect-api.up.railway.app/api'
```

---

## Features Included

✅ **Authentication**: JWT tokens, email verification, password reset  
✅ **Database**: PostgreSQL with proper schema  
✅ **Security**: Rate limiting, Helmet, CORS, bcrypt passwords  
✅ **File Uploads**: Ready for Cloudinary integration  
✅ **Email**: Resend integration (3,000 emails/month free)  
✅ **API Endpoints**: Properties, Agents, Users, Inquiries, Admin  

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/verify-email` | Verify email |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/properties/search` | Search properties |
| GET | `/api/properties/:id` | Get property details |
| POST | `/api/properties` | Create property (agent) |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |
| GET | `/api/agents` | List agents |
| GET | `/api/agents/:id` | Get agent profile |
| POST | `/api/inquiries` | Contact agent |
| GET | `/api/users/me` | Get profile |
| PUT | `/api/users/me` | Update profile |
| GET | `/api/users/favorites` | Get favorites |

---

## Free Limits (Railway)

- **$5/month** credit (never expires)
- 512 MB RAM, 1 CPU
- 1 GB disk space
- PostgreSQL included
- **No credit card required**

After $5: ~$5/month for hobby plan

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

**Your backend will be live in 5 minutes! 🚀**
