# 🎯 Princess 3D Bot

Interactive 3D princess character with AI-powered animations. Built with Three.js.

## ✨ Features

- 🎭 3D princess character with 20+ animations
- 🤖 AI-powered text commands
- 📱 Responsive design
- 🌐 REST API integration

## 🚀 Quick Deploy to Vercel

```bash
# Clone and deploy
git clone <your-repo-url>
cd FE-Analysis-API
./vercel-deploy.sh
```

**Or manual deploy:**
```bash
npm install -g vercel
vercel login
npm run build
vercel --prod
```

## ⚙️ Environment Variables

Set these in Vercel dashboard:
```
API_BASE_URL=https://your-api.com
API_BACKEND_URL=https://your-backend.com
NODE_ENV=production
```

## 🎭 Available Actions

**Movement:** nhảy múa, vẫy tay, cúi chào, quay tròn, nhảy lên, chạy  
**Emotions:** cười, vui vẻ, buồn, giận  
**Positions:** nằm xuống, ngồi, đứng, ngủ

## 📁 Project Structure

```
FE-Analysis-API/
├── index.html          # Main HTML
├── css/style.css       # Styles
├── js/                 # JavaScript files
├── package.json        # Dependencies
├── vercel.json         # Vercel config
├── build.js            # Build script
└── vercel-deploy.sh    # Deploy script
```

## 🔧 Development

```bash
# Local development
npm install
npm run build
# Open index.html in browser
```

## 📜 License

MIT License