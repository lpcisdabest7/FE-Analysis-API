#!/bin/bash

echo "🚀 Princess 3D Bot - Vercel Deployment Setup"
echo "============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Setup for Vercel deployment" || echo "ℹ️ No changes to commit"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "⚠️  Please add your GitHub repository as remote:"
    echo "   git remote add origin https://github.com/yourusername/your-repo.git"
    echo ""
    echo "📋 Next steps:"
    echo "1. Create a GitHub repository"
    echo "2. Add remote: git remote add origin <your-repo-url>"
    echo "3. Push: git push -u origin main"
    echo "4. Go to vercel.com and import your repository"
    echo "5. Set environment variables in Vercel dashboard:"
    echo "   - API_BASE_URL"
    echo "   - API_BACKEND_URL"
    echo "   - NODE_ENV=production"
else
    echo "🔄 Pushing to GitHub..."
    git push origin main
    echo ""
    echo "✅ Code pushed to GitHub successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Click 'New Project'"
    echo "3. Import your GitHub repository"
    echo "4. Set environment variables:"
    echo "   - API_BASE_URL = https://your-api-domain.com"
    echo "   - API_BACKEND_URL = https://your-backend-domain.com"
    echo "   - NODE_ENV = production"
    echo "5. Deploy!"
fi

echo ""
echo "📖 For detailed instructions, see DEPLOY.md"
echo "🎉 Happy deploying!"
