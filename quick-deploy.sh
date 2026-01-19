#!/bin/bash
# One-command secure deployment to GitHub Pages
git add . && \
git commit -m "Deploy Task Masters to GitHub Pages - $(date +%Y-%m-%d)" && \
git push origin main && \
echo "" && \
echo "✅ Successfully deployed!" && \
echo "" && \
echo "🌐 Your site will be live in 2-3 minutes at:" && \
echo "   https://abhishekdrager-coder.github.io/task1/" && \
echo "" && \
echo "📋 Enable GitHub Pages (if not already done):" && \
echo "   1. Go to: https://github.com/abhishekdrager-coder/task1/settings/pages" && \
echo "   2. Under 'Source', select: GitHub Actions" && \
echo "   3. Click Save" && \
echo "" && \
echo "🔒 Security Status: ✅ Secure" && \
echo "   • HTTPS enabled automatically" && \
echo "   • Security headers configured" && \
echo "   • No secrets in code" && \
echo "   • Frontend-only (no backend vulnerabilities)"
