# 9jaAgentsConnect 🇳🇬

**Nigeria's Premier Real Estate Platform** - Connect buyers, sellers, and verified agents across Lagos, Abuja, Port Harcourt, and 50+ cities.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Web-orange)

## 🏠 What is 9jaAgentsConnect?

9jaAgentsConnect is a full-featured real estate web application inspired by Zillow.com, specifically designed for the Nigerian market. It features:

- **Property Search**: Find homes, apartments, land, and commercial properties
- **Interactive Map**: View properties on a map with location markers
- **Verified Agents**: Connect with trusted real estate agents
- **Advanced Filters**: Filter by price, location, property type, and more
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktops
- **Nigeria-Focused**: Naira currency, Nigerian cities, local phone formats

## 🚀 Quick Start

### Option 1: Static Hosting (Free & Fast)

Deploy to Netlify in 30 seconds:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd 9jaagentsconnect
netlify login
netlify deploy --prod --dir=.
```

### Option 2: Full-Stack with Backend

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your MongoDB URI

# Start server
npm start
```

## 📁 Project Structure

```
9jaagentsconnect/
├── index.html          # Main frontend (32KB)
├── app.js             # Frontend JavaScript (18KB)
├── api/
│   └── server.js      # Express.js backend
├── package.json       # Dependencies
├── DEPLOYMENT.md      # Complete deployment guide
└── README.md          # This file
```

## ✨ Features

### For Buyers/Renters
- ✅ Search properties by location, price, type
- ✅ View high-quality property images
- ✅ See property details (bedrooms, bathrooms, area)
- ✅ Contact agents directly
- ✅ Save favorite properties
- ✅ Interactive map view

### For Agents
- ✅ List properties with images
- ✅ Manage listings dashboard
- ✅ Receive inquiries from buyers
- ✅ Build profile and reputation

### Technical Features
- ✅ Modern, responsive design
- ✅ Fast loading with lazy loading images
- ✅ Local storage for favorites
- ✅ JWT authentication ready
- ✅ MongoDB integration
- ✅ RESTful API
- ✅ Image upload support

## 🛠️ Built With

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with CSS Variables
- **Map**: Leaflet.js (OpenStreetMap)
- **Icons**: Font Awesome
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcryptjs

## 🌍 Nigerian Cities Covered

- Lagos (Lekki, Ikoyi, Victoria Island, Ikeja)
- Abuja (Maitama, Wuse, Gwarinpa)
- Port Harcourt
- Ibadan
- Kano
- Enugu
- And 40+ more cities

## 📱 Screenshots

*Screenshots will be added here after deployment*

## 🚀 Deployment Options

### Free Options
- **Netlify**: Drag & drop deployment
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Free hosting for static sites
- **Render**: Free tier with auto-deploy

### Paid Options (Production)
- **DigitalOcean**: $5-12/month
- **AWS**: Elastic Beanstalk or EC2
- **Heroku**: Easy deployment
- **Railway**: Modern hosting platform

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions.

## 🔧 Customization

### Change Brand Colors
Edit CSS variables in `index.html`:
```css
:root {
    --primary: #0066FF;      /* Main brand color */
    --secondary: #00C853;    /* Accent color */
    --accent: #FF6B35;       /* Call-to-action */
}
```

### Add More Properties
Edit `app.js` and add to `sampleProperties` array.

### Connect Real Backend
Update API calls in `app.js`:
```javascript
const API_URL = 'https://api.9jaagentsconnect.com';
```

## 📊 API Endpoints

When backend is deployed:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List all properties |
| GET | `/api/properties/:id` | Get single property |
| POST | `/api/properties` | Create property (auth) |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/agents` | List agents |
| GET | `/api/stats` | Platform statistics |

## 🧪 Testing

```bash
# Test API
curl http://localhost:5000/api/health

# Test search
curl "http://localhost:5000/api/properties?city=Lagos"

# Register test user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","phone":"+2348012345678"}'
```

## 📝 Environment Variables

Create `.env` file:

```bash
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/9jaagentsconnect
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- Design inspired by [Zillow](https://zillow.com)
- Map tiles by [OpenStreetMap](https://openstreetmap.org)
- Icons by [Font Awesome](https://fontawesome.com)

## 📞 Contact

For support or inquiries:
- Email: support@9jaagentsconnect.com
- Website: https://9jaagentsconnect.com
- Twitter: [@9jaAgentsConnect](https://twitter.com)

---

**Made with ❤️ for Nigeria** 🇳🇬

© 2026 9jaAgentsConnect. All rights reserved.
