# 9jaAgentsConnect - Complete Deployment Guide

## 📋 Overview

**9jaAgentsConnect** is a full-featured real estate platform for Nigeria, modeled after Zillow.com. This guide covers everything needed to deploy and make the site live.

## 🏗️ Architecture

```
9jaAgentsConnect/
├── index.html          # Main frontend (React-like SPA)
├── app.js             # Frontend JavaScript
├── styles.css         # Styles (embedded in HTML)
├── api/
│   └── server.js      # Express.js backend API
├── package.json       # Node.js dependencies
├── .env              # Environment variables
└── DEPLOYMENT.md     # This guide
```

## 🚀 Quick Start - Option 1: Static Hosting (Simplest)

For immediate deployment without a backend:

### Step 1: Prepare Files
```bash
cd 9jaagentsconnect
# The index.html and app.js are already ready for static hosting
```

### Step 2: Deploy to Netlify (Recommended)

1. **Create Netlify Account**: Go to https://www.netlify.com and sign up

2. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

3. **Deploy**:
```bash
netlify login
netlify init
netlify deploy --prod --dir=.
```

4. **Configure Custom Domain**:
```bash
netlify dns:create --name 9jaagentsconnect.com
netlify sites:create --name 9jaagentsconnect
```

### Step 3: Deploy to Vercel (Alternative)

```bash
npm install -g vercel
vercel --prod
```

### Step 4: Deploy to GitHub Pages (Free)

1. Create GitHub repository: `9jaagentsconnect`
2. Push code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/9jaagentsconnect.git
git push -u origin main
```
3. Enable GitHub Pages in repository settings

---

## 🖥️ Option 2: Full-Stack Deployment (Production)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Domain name (9jaagentsconnect.com)
- VPS/Cloud server (AWS, DigitalOcean, Linode, etc.)

### Step 1: Set Up Backend

```bash
# Create project directory
mkdir 9jaagentsconnect-api
cd 9jaagentsconnect-api

# Initialize
npm init -y

# Install dependencies
npm install express mongoose cors bcryptjs jsonwebtoken multer dotenv

# Create server.js (copy from api/server.js)
# Create .env file
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/9jaagentsconnect
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=production
EOF
```

### Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist your IP
5. Get connection string
6. Update MONGODB_URI in .env

### Step 3: Deploy Backend to VPS

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Clone/deploy your code
git clone https://github.com/YOUR_USERNAME/9jaagentsconnect.git
cd 9jaagentsconnect/api

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "9ja-api"
pm2 startup
pm2 save

# Configure Nginx as reverse proxy
apt install -y nginx

# Create Nginx config
cat > /etc/nginx/sites-available/9jaagents << 'EOF'
server {
    listen 80;
    server_name api.9jaagentsconnect.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -s /etc/nginx/sites-available/9jaagents /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 4: Set Up SSL with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.9jaagentsconnect.com -d 9jaagentsconnect.com
```

### Step 5: Deploy Frontend

```bash
# Option A: Serve frontend from same server
mkdir -p /var/www/9jaagentsconnect
cp -r /path/to/9jaagentsconnect/* /var/www/9jaagentsconnect/

# Update Nginx for frontend
cat > /etc/nginx/sites-available/9jaagents-frontend << 'EOF'
server {
    listen 80;
    server_name 9jaagentsconnect.com www.9jaagentsconnect.com;
    root /var/www/9jaagentsconnect;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -s /etc/nginx/sites-available/9jaagents-frontend /etc/nginx/sites-enabled/
certbot --nginx -d 9jaagentsconnect.com -d www.9jaagentsconnect.com
```

---

## ☁️ Option 3: Cloud Platform Deployment

### AWS Deployment

```bash
# 1. Create EC2 instance (t3.medium recommended)
# 2. Configure Security Group: Ports 22, 80, 443, 5000
# 3. Follow VPS steps above

# AWS Elastic Beanstalk (Easier)
eb init -p node.js 9jaagentsconnect
eb create 9jaagentsconnect-env
eb open
```

### Heroku Deployment

```bash
# Create Heroku app
heroku create 9jaagentsconnect

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Railway/Render/Fly.io

```bash
# Railway
railway login
railway init
railway up

# Render - use render.yaml
# Fly.io
fly launch
fly deploy
```

---

## 🌍 Domain Configuration

### Step 1: Register Domain

Register `9jaagentsconnect.com` at:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### Step 2: Configure DNS

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: 9jaagentsconnect.netlify.app
```

**For VPS:**
```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP

Type: A
Name: api
Value: YOUR_SERVER_IP
```

### Step 3: Wait for Propagation

```bash
# Check DNS propagation
dig 9jaagentsconnect.com
nslookup 9jaagentsconnect.com
```

---

## 📱 Features Included

### Frontend Features
- ✅ Property search with filters
- ✅ Interactive map integration (Leaflet)
- ✅ Property listing cards
- ✅ Agent profiles
- ✅ Favorites system (localStorage)
- ✅ Responsive design
- ✅ Mobile-optimized
- ✅ Location-based browsing
- ✅ Price filtering

### Backend Features (when deployed)
- ✅ User authentication (JWT)
- ✅ Property CRUD operations
- ✅ Agent management
- ✅ Image uploads
- ✅ Search & filtering API
- ✅ MongoDB database
- ✅ RESTful API

### Nigeria-Specific Features
- ✅ Naira (₦) currency formatting
- ✅ Nigerian cities (Lagos, Abuja, Port Harcourt, etc.)
- ✅ Local phone number format
- ✅ Nigerian property types (Duplex, Bungalow, etc.)

---

## 🔧 Environment Variables

Create `.env` file:

```bash
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/9jaagentsconnect

# Security
JWT_SECRET=your-super-secret-random-string
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend URL
CLIENT_URL=https://9jaagentsconnect.com
```

---

## 🧪 Testing

```bash
# Test API locally
curl http://localhost:5000/api/health

# Test property search
curl "http://localhost:5000/api/properties?location=Lagos&page=1"

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"+2348012345678"}'
```

---

## 📊 Monitoring & Maintenance

### Set up PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Set up Log Rotation
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 10
```

### Database Backups
```bash
# MongoDB Atlas has automatic backups
# For self-hosted MongoDB:
mongodump --uri="mongodb://localhost/9jaagentsconnect" --out=/backup/$(date +%Y%m%d)
```

---

## 🔒 Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] JWT tokens secure
- [ ] Password hashing (bcrypt)
- [ ] Input validation
- [ ] Rate limiting
- [ ] CORS configured
- [ ] Helmet.js headers
- [ ] Environment variables hidden
- [ ] No exposed secrets in code

Add security middleware:
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));
```

---

## 💰 Cost Breakdown

| Component | Option | Monthly Cost |
|-----------|--------|--------------|
| Domain | Namecheap | ~$10/year |
| Static Hosting | Netlify | Free |
| Backend VPS | DigitalOcean 2GB | $12/month |
| Database | MongoDB Atlas | Free tier |
| CDN | Cloudflare | Free |
| **Total** | | **~$13/month** |

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check IP whitelist in Atlas
- Verify connection string
- Check network/firewall

### "CORS errors"
- Update CORS origin in server.js
- Check API URL in frontend

### "Images not uploading"
- Check upload directory permissions
- Verify multer configuration
- Check file size limits

### "Site not loading"
- Check DNS propagation
- Verify server is running: `pm2 status`
- Check Nginx config: `nginx -t`
- Check logs: `pm2 logs`

---

## 📞 Support

For issues:
1. Check logs: `pm2 logs` or `journalctl -u nginx`
2. Verify environment variables
3. Test API endpoints with curl/Postman
4. Check browser console for frontend errors

---

## 🎉 You're Live!

After deployment:
1. Visit https://9jaagentsconnect.com
2. Test all features
3. Submit to Google Search Console
4. Set up Google Analytics
5. Create social media pages
6. Start marketing!

**Congratulations!** Your Nigerian real estate platform is now live and ready for business! 🏠🇳🇬
