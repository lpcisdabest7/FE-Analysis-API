#!/bin/bash

echo "🚀 Deploying Princess 3D Bot to Vercel"

# Install Vercel CLI if needed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login if needed
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel:"
    vercel login
fi

# Check if project is linked
if ! vercel project ls &> /dev/null; then
    echo "🔗 Linking project to Vercel..."
    vercel link
fi

# Set environment variables
echo "⚙️ Setting environment variables..."
vercel env add API_BACKEND_URL production <<< "https://3d-model.earnai.art"
vercel env add NODE_ENV production <<< "production"

# Build and deploy
echo "🔧 Building project..."
if [ -f "package.json" ] && grep -q "build" package.json; then
    npm run build
else
    echo "📁 No build script found, deploying static files directly..."
fi

echo "🚀 Deploying to production..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your app is now live at: https://your-project-name.vercel.app"
echo "🔗 Backend API: https://3d-model.earnai.art"
echo ""
echo "📋 Next steps:"
echo "1. Update your custom domain in Vercel dashboard if needed"
echo "2. Configure CORS on your backend if required"
echo "3. Test the production deployment"
