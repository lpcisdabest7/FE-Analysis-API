#!/bin/bash

echo "🚀 Deploying Princess 3D Bot to Vercel"

# Install Vercel CLI if needed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login if needed
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

# Build and deploy
echo "🔧 Building..."
npm run build

echo "🚀 Deploying..."
vercel --prod

echo "✅ Deployment completed!"
echo "Set environment variables: vercel env add API_BACKEND_URL production"
