#!/bin/bash

echo "🚀 Starting deployment..."
echo ""

# Add all changes
echo "📦 Adding files..."
git add .

# Show what will be committed
echo ""
echo "📝 Files to be committed:"
git status --short

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "Fix: Hide debug banner and improve login persistence - $(date +'%Y-%m-%d %H:%M:%S')"

# Check if commit was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Commit successful!"
    
    # Push to GitHub
    echo ""
    echo "🌐 Pushing to GitHub..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅"
        echo ""
        echo "🌐 Your site will be live in 2-3 minutes at:"
        echo "   https://abhishekdrager-coder.github.io/task1/"
        echo ""
        echo "🔄 Changes deployed:"
        echo "   • Hidden debug notification banner"
        echo "   • Fixed login persistence"
        echo "   • Dark mode improvements"
        echo ""
        echo "⏰ Wait 2-3 minutes, then hard refresh (Ctrl+Shift+R)"
    else
        echo ""
        echo "❌ Push failed. Trying again..."
        sleep 2
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Push successful on retry!"
        else
            echo "❌ Push failed again. Check your internet connection or GitHub authentication."
            exit 1
        fi
    fi
else
    echo "❌ Commit failed or no changes to commit"
    git status
fi
