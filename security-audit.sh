#!/bin/bash

# Security Audit Script
# Run this before every deployment

echo "🔍 Running Security Audit..."
echo ""

ISSUES=0

# Check 1: Search for email addresses
echo "1. Checking for personal email addresses..."
if grep -r "@gmail.com\|@yahoo.com\|@hotmail.com" *.html *.js 2>/dev/null | grep -v "example@" | grep -v "user@" | grep -v "your-email@"; then
    echo "   ⚠️  Found personal email addresses"
    ISSUES=$((ISSUES + 1))
else
    echo "   ✅ No personal emails found"
fi

# Check 2: Search for phone numbers
echo "2. Checking for phone numbers..."
if grep -rE "\+?[0-9]{10,}" *.html *.js 2>/dev/null | grep -v "example" | grep -v "555-"; then
    echo "   ⚠️  Found potential phone numbers"
    ISSUES=$((ISSUES + 1))
else
    echo "   ✅ No phone numbers found"
fi

# Check 3: Check for API keys pattern
echo "3. Checking for API key patterns..."
if grep -rE "['\"]?[A-Za-z0-9]{32,}['\"]?" *.html *.js 2>/dev/null | grep -i "key\|token\|secret" | grep -v "example"; then
    echo "   ⚠️  Found potential API keys"
    ISSUES=$((ISSUES + 1))
else
    echo "   ✅ No API keys found"
fi

# Check 4: Check for .env files
echo "4. Checking for environment files..."
if ls .env* 2>/dev/null; then
    echo "   ⚠️  Found .env files (ensure they're in .gitignore)"
    ISSUES=$((ISSUES + 1))
else
    echo "   ✅ No .env files found"
fi

# Check 5: Verify .gitignore exists
echo "5. Checking .gitignore..."
if [ -f ".gitignore" ]; then
    echo "   ✅ .gitignore exists"
else
    echo "   ⚠️  .gitignore missing"
    ISSUES=$((ISSUES + 1))
fi

# Check 6: Verify security headers
echo "6. Checking security headers file..."
if [ -f "_headers" ]; then
    echo "   ✅ Security headers file exists"
else
    echo "   ⚠️  _headers file missing"
    ISSUES=$((ISSUES + 1))
fi

# Check 7: Check for console.log in production
echo "7. Checking for debug code..."
DEBUG_COUNT=$(grep -r "console.log\|debugger" *.js 2>/dev/null | wc -l)
if [ "$DEBUG_COUNT" -gt 0 ]; then
    echo "   ⚠️  Found $DEBUG_COUNT console.log/debugger statements"
    echo "   (Consider removing for production)"
else
    echo "   ✅ No debug code found"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ISSUES -eq 0 ]; then
    echo "✅ Security audit passed! Safe to deploy."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 0
else
    echo "⚠️  Found $ISSUES potential security issues."
    echo "   Review the warnings above before deploying."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 1
fi
