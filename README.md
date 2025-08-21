# 🎯 Princess 3D Bot - Interactive AI Animation System

A beautiful 3D interactive princess character powered by AI that responds to text commands with dynamic animations. Built with Three.js and modern web technologies.

## ✨ Features

- 🎭 **Dynamic 3D Princess Character** - Fully animated 3D princess with detailed body parts
- 🤖 **AI-Powered Actions** - Responds to natural language commands
- 🎨 **Rich Animation System** - Over 20 different animations including dance, emotions, and actions
- 🌐 **API Communication** - REST API support with backend integration
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎮 **Interactive Controls** - Click buttons or type commands
- 🔧 **Simple Configuration** - Environment-based domain setup
- 🐳 **Docker Ready** - Easy deployment with Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ (for development)
- Docker (for deployment)
- Modern web browser with WebGL support

### 🏃‍♂️ Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FE-Analysis-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env
   # Edit .env file with your API domains
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

### 🐳 Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Or build manually**
   ```bash
   docker build -t princess-3d-bot .
   docker run -p 8080:80 princess-3d-bot
   ```

### ⚡ Vercel Deployment (Recommended)

1. **Push to GitHub and connect to Vercel**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables:
     - `API_BASE_URL`
     - `API_BACKEND_URL` 
     - `NODE_ENV=production`
   - Deploy!

   📖 **Detailed guide:** See [DEPLOY.md](DEPLOY.md)

## ⚙️ Configuration

The application uses environment variables for API domains only. Other settings are hardcoded for simplicity.

### 🔧 Environment Settings

```bash
# API Configuration (only configurable settings)
API_BASE_URL=http://localhost:3000
API_BACKEND_URL=http://localhost:3005
NODE_ENV=development
```

### ⚙️ Fixed Settings (Hardcoded)

All other settings are fixed in the code:
- Animation duration: 3000ms
- Mock data interval: 7000ms  
- Max history items: 10
- Camera FOV: 75°
- Scene background: #87ceeb
- Auto-connect: enabled
- Console logs: enabled

## 🎭 Available Actions

The princess can perform various actions based on text input:

### 🕺 Movement Actions
- **Nhảy múa / Dance** - Beautiful dance animation
- **Vẫy tay / Wave** - Friendly waving gesture  
- **Cúi chào / Bow** - Polite bowing
- **Quay tròn / Spin** - Spinning around
- **Nhảy lên / Jump** - Jumping animation
- **Chạy / Run** - Running movement

### 😊 Emotional Actions
- **Cười / Laugh** - Happy laughing
- **Vui vẻ / Happy** - Joyful expression
- **Buồn / Sad** - Sad expression
- **Giận / Angry** - Angry animation

### 🏃‍♀️ Position Actions
- **Nằm xuống / Lie down** - Lying position
- **Ngồi / Sit** - Sitting position
- **Đứng / Stand** - Standing position
- **Ngủ / Sleep** - Sleeping animation

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │
│   (This App)    │◄──►│   Server        │
│                 │    │                 │
│ • Three.js      │    │ • Action        │
│ • Animation     │    │   Analysis      │
│ • UI Controls   │    │ • AI Processing │
└─────────────────┘    └─────────────────┘
```

### 📁 Project Structure

```
FE-Analysis-API/
├── 📄 index.html              # Main HTML file
├── 📁 css/
│   └── style.css              # Styling
├── 📁 js/
│   ├── config.js              # Simple configuration
│   ├── env-loader.js          # Environment loader
│   ├── main.js                # Main application controller
│   ├── princess3d.js          # 3D princess model & animations
│   ├── animations.js          # Animation management
│   └── api-client.js          # API communication
├── 📄 package.json            # Dependencies & scripts
├── 📄 Dockerfile              # Docker configuration
├── 📄 docker-compose.yml      # Docker Compose setup
├── 📄 env.example             # Environment template
└── 📄 README.md              # This file
```

## 🔧 Development

### 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with auto-open
npm run start        # Start production server

# Build & Deploy
npm run build        # Build for production (generates env.js)
npm run vercel-build # Build specifically for Vercel
npm run setup        # Install dependencies

# Maintenance
npm run clean        # Clean build artifacts
```

## 🌐 Deployment

### 🚀 Production Deployment

1. **Environment Setup**
   ```bash
   # Create production environment file
   cp env.example .env
   
   # Edit with production values
   NODE_ENV=production
   API_BASE_URL=https://your-api-domain.com
   API_BACKEND_URL=https://your-backend-domain.com
   ```

2. **Docker Deployment**
   ```bash
   # Production build
   docker build -t princess-3d-bot .
   
   # Run with environment variables
   docker run -d \
     --name princess-bot \
     -p 80:80 \
     -e NODE_ENV=production \
     -e API_BASE_URL=https://your-api.com \
     princess-3d-bot
   ```

3. **Docker Compose Deployment**
   ```bash
   # Edit docker-compose.yml with your settings
   # Then deploy
   docker-compose up -d
   ```

## 🐛 Troubleshooting

### Common Issues

1. **3D Model Not Loading**
   - Check browser console for WebGL errors
   - Ensure browser supports WebGL

2. **API Connection Failed**
   - Verify API_BACKEND_URL in environment
   - Check backend server is running

3. **Animations Not Working**
   - Check console for animation errors
   - Verify action mapping in animations.js

## 📜 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **WebGL** - 3D rendering technology
- **Modern browsers** - For WebGL support

---

<div align="center">

**Made with ❤️ for Princess 3D Bot**

</div>