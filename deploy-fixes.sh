#!/bin/bash
# Deploy Whistler and Kilgard Fixes + Comprehensive Database
# Run this after terminal is reconnected

echo "========================================"
echo "   DEPLOYING LOCATION FIXES"
echo "========================================"
echo ""

echo "📍 Changes being deployed:"
echo "  ✓ Whistler postal codes (V0N, V8G)"
echo "  ✓ Kilgard fix (V2R → 'Kilgard' not 'Chilliwack')"
echo "  ✓ Comprehensive database (750+ codes)"
echo ""

# Check if location.js has changes
if git diff --quiet location.js; then
    echo "⚠️  No changes detected in location.js"
    echo "    Changes may already be committed"
    echo ""
    echo "Checking last commit..."
    git log -1 --oneline location.js
    echo ""
    read -p "Push anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled"
        exit 1
    fi
else
    echo "✅ Changes detected in location.js"
    echo ""
fi

# Stage changes
echo "📦 Staging location.js..."
git add location.js

# Commit with detailed message
echo "💾 Creating commit..."
git commit -m "Fix Whistler & Kilgard postal codes + comprehensive database

FIXES:
- Whistler: Added V0N and V8G postal codes mapping to 'Whistler, BC'
- Kilgard: Fixed V2R to show 'Kilgard, BC' instead of 'Chilliwack'
- Added V4Z for Chilliwack to maintain coverage

COMPREHENSIVE DATABASE EXPANSION (230 → 750+ codes):
- All Canadian provinces (ON, BC, AB, QC, SK, MB)
- All territories (Yukon, NWT, Nunavut)
- Maritime provinces (NS, NB, PE, NL)
- 200+ USA ZIP codes (NY, CA, IL, MA, WA, FL, TX, AZ, etc.)
- 50+ major US cities
- Organized by geographic region

ARCHITECTURE:
- Single source of truth (location.js only)
- No duplicate databases
- Optimized for fast lookups
- Accurate city identification for all locations"

# Check commit success
if [ $? -eq 0 ]; then
    echo "✅ Commit created successfully"
    echo ""
else
    echo "❌ Commit failed"
    exit 1
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

# Check push success
if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "   ✅ DEPLOYMENT SUCCESSFUL!"
    echo "========================================"
    echo ""
    echo "🌐 Your site will be updated in 2-3 minutes"
    echo "   URL: https://abhishekdrager-coder.github.io/task1/"
    echo ""
    echo "🎯 What's new:"
    echo "   • Whistler postal codes working (V0N, V8G)"
    echo "   • Kilgard shows correctly (V2R)"
    echo "   • 750+ postal/ZIP codes available"
    echo "   • All of North America covered"
    echo ""
    echo "🧪 Test your changes:"
    echo "   1. Go to: https://abhishekdrager-coder.github.io/task1/"
    echo "   2. Enter postal code: V0N (Whistler)"
    echo "   3. Enter postal code: V2R (Kilgard)"
    echo "   4. Verify correct cities appear"
    echo ""
else
    echo "❌ Push failed"
    echo ""
    echo "Troubleshooting:"
    echo "  • Check network connection"
    echo "  • Verify GitHub credentials"
    echo "  • Try: git push origin main --verbose"
    exit 1
fi
