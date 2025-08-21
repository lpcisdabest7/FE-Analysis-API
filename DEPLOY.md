# 🚀 Deploy Princess 3D Bot to Vercel

This guide will help you deploy the Princess 3D Bot to Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Your backend API already deployed and accessible

## 🔧 Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "New Project"**

3. **Import your GitHub repository:**
   - Select your `FE-Analysis-API` repository
   - Click "Import"

4. **Configure the project:**
   - **Project Name:** `princess-3d-bot` (or your preferred name)
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `./` (leave as default)
   - **Install Command:** `npm install`

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   API_BASE_URL = https://your-api-domain.com
   API_BACKEND_URL = https://your-backend-api-domain.com  
   NODE_ENV = production
   ```

6. **Click "Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables:**
   ```bash
   vercel env add API_BASE_URL
   vercel env add API_BACKEND_URL  
   vercel env add NODE_ENV
   ```

## ⚙️ Step 3: Configure Environment Variables

In your Vercel dashboard:

1. Go to your project
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add these variables:

| Name | Value | Environment |
|------|--------|-------------|
| `API_BASE_URL` | `https://your-api-domain.com` | Production |
| `API_BACKEND_URL` | `https://your-backend-domain.com` | Production |
| `NODE_ENV` | `production` | Production |

## 🔄 Step 4: Redeploy

After setting environment variables, trigger a new deployment:

1. Go to "Deployments" tab
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"

## ✅ Step 5: Test Your Deployment

1. **Open your Vercel URL** (something like `https://princess-3d-bot-xxx.vercel.app`)

2. **Check the browser console** to verify environment variables are loaded:
   ```javascript
   // You should see:
   🌍 Environment loaded from Vercel: {API_BASE_URL: "...", API_BACKEND_URL: "...", NODE_ENV: "production"}
   ```

3. **Test the functionality:**
   - 3D princess should load
   - Try typing commands like "nhảy múa" or "vẫy tay"
   - Check if API calls to your backend work

## 🔧 Troubleshooting

### Common Issues:

1. **3D Model not loading:**
   - Check browser console for WebGL errors
   - Ensure HTTPS is working properly

2. **API calls failing:**
   - Verify your backend API supports CORS
   - Check environment variables are set correctly
   - Ensure your backend API is accessible from the internet

3. **Environment variables not working:**
   - Make sure you've set them in Vercel dashboard
   - Trigger a new deployment after adding env vars
   - Check the build logs in Vercel

### Debug Commands:

```bash
# Check if build script works locally
npm run build

# Test locally with production-like setup
npm run start
```

## 🔄 Auto-Deploy Setup

Vercel automatically deploys when you push to your main branch. To customize:

1. Go to project settings
2. Click "Git" tab  
3. Configure auto-deploy settings

## 📊 Performance Tips

1. **Enable Analytics:**
   - Go to project settings
   - Enable Vercel Analytics
   - Monitor performance and user interactions

2. **Custom Domain:**
   - Go to project settings
   - Click "Domains" tab
   - Add your custom domain

## 🎉 Success!

Your Princess 3D Bot should now be live at your Vercel URL! 

**Example URL:** `https://princess-3d-bot-abc123.vercel.app`

## 📝 Next Steps

- Set up a custom domain
- Enable Vercel Analytics  
- Monitor performance
- Set up GitHub Actions for advanced CI/CD

---

Need help? Check the [Vercel Documentation](https://vercel.com/docs) or open an issue in the repository.
