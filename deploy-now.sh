#!/bin/bash
echo "Pushing changes..."
git add .
git commit -m "Update welcome message to show professional name"
git push origin main
echo ""
echo "✅ Done! Your website will update in 2-3 minutes."
echo "🌐 Visit: https://abhishekdrager-coder.github.io/task1/"
echo ""
echo "📋 After deployment:"
echo "   1. Clear your browser cache (Ctrl+Shift+R)"
echo "   2. Or open in incognito/private window"
echo "   3. Your profile name should now appear!"
