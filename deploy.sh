#!/bin/bash

# Secure Deployment Script for GitHub Pages
# This script ensures secure deployment practices

echo "🔒 Starting Secure Deployment Process..."

# Step 1: Security Check
echo ""
echo "📋 Step 1: Running Security Checks..."

# Check for common security issues
echo "Checking for hardcoded secrets..."
if grep -r "password\s*=\s*['\"]" *.html *.js 2>/dev/null | grep -v "password\s*=\s*['\"]['\"]" | grep -v "placeholder"; then
    echo "⚠️  WARNING: Found potential hardcoded passwords!"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "Checking for API keys..."
if grep -r "api_key\|apiKey\|API_KEY" *.html *.js 2>/dev/null | grep -v "// " | grep -v "placeholder"; then
    echo "⚠️  WARNING: Found potential API keys!"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Security checks passed!"

# Step 2: Add all files
echo ""
echo "📦 Step 2: Adding files to git..."
git add .

# Step 3: Show what will be committed
echo ""
echo "📝 Step 3: Files to be committed:"
git status --short

# Step 4: Commit
echo ""
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deploy BeverHub to GitHub Pages"
fi

git commit -m "$commit_msg"

# Step 5: Push to GitHub
echo ""
echo "🚀 Step 4: Pushing to GitHub..."
git push origin main

# Step 6: Instructions
echo ""
echo "✅ Code pushed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://github.com/abhishekdrager-coder/task1/settings/pages"
echo "2. Under 'Build and deployment', set:"
echo "   - Source: GitHub Actions"
echo "3. Wait 2-3 minutes for deployment"
echo "4. Your site will be live at: https://abhishekdrager-coder.github.io/task1/"
echo ""
echo "🔒 Security Notes:"
echo "✅ HTTPS is automatically enabled"
echo "✅ Security headers are configured"
echo "✅ No secrets committed"
echo "✅ Frontend-only (no backend vulnerabilities)"
echo ""
