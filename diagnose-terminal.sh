#!/bin/bash
# Terminal Diagnostic Script
# Tests terminal connectivity and provides fix recommendations

echo "🔍 TERMINAL DIAGNOSTIC TOOL"
echo "=========================================="
echo ""

# Test 1: Basic command
echo "Test 1: Basic shell command"
if command -v whoami &> /dev/null; then
    echo "✅ Shell commands working"
    echo "   User: $(whoami)"
else
    echo "❌ Basic commands not working"
fi
echo ""

# Test 2: File system access
echo "Test 2: File system access"
if [ -d "/workspaces/task1" ]; then
    echo "✅ Workspace directory accessible"
    echo "   Path: /workspaces/task1"
else
    echo "❌ Workspace directory not found"
fi
echo ""

# Test 3: Git availability
echo "Test 3: Git availability"
if command -v git &> /dev/null; then
    echo "✅ Git is available"
    echo "   Version: $(git --version)"
else
    echo "❌ Git not found"
fi
echo ""

# Test 4: Git repository
echo "Test 4: Git repository status"
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "✅ Git repository detected"
    echo "   Branch: $(git branch --show-current)"
    echo "   Remote: $(git remote get-url origin)"
else
    echo "❌ Not a git repository"
fi
echo ""

# Test 5: Modified files
echo "Test 5: Checking for uncommitted changes"
if git diff --quiet; then
    echo "✅ No uncommitted changes in tracked files"
else
    echo "⚠️  Uncommitted changes detected:"
    git diff --name-only
fi
echo ""

# Test 6: Staged files
echo "Test 6: Checking staged files"
if git diff --cached --quiet; then
    echo "ℹ️  No staged changes"
else
    echo "📦 Staged files:"
    git diff --cached --name-only
fi
echo ""

# Summary
echo "=========================================="
echo "DIAGNOSTIC SUMMARY"
echo "=========================================="
echo ""

# Count tests passed
tests_passed=0
if command -v whoami &> /dev/null; then ((tests_passed++)); fi
if [ -d "/workspaces/task1" ]; then ((tests_passed++)); fi
if command -v git &> /dev/null; then ((tests_passed++)); fi
if git rev-parse --git-dir > /dev/null 2>&1; then ((tests_passed++)); fi

echo "Tests passed: $tests_passed / 4"
echo ""

if [ $tests_passed -eq 4 ]; then
    echo "✅ Terminal is fully functional!"
    echo ""
    echo "You can now deploy with:"
    echo "   ./deploy-fixes.sh"
    echo ""
    echo "Or manually:"
    echo "   git add location.js"
    echo "   git commit -m 'Fix postal codes'"
    echo "   git push origin main"
else
    echo "⚠️  Terminal has connectivity issues"
    echo ""
    echo "RECOMMENDED FIXES:"
    echo "1. Reload VS Code Window:"
    echo "   • Press Ctrl+Shift+P"
    echo "   • Type: 'Developer: Reload Window'"
    echo "   • Press Enter"
    echo ""
    echo "2. Rebuild Dev Container:"
    echo "   • Press Ctrl+Shift+P"
    echo "   • Type: 'Dev Containers: Rebuild Container'"
    echo "   • Wait for rebuild"
    echo ""
    echo "3. Check container logs:"
    echo "   • Press Ctrl+Shift+P"
    echo "   • Type: 'Dev Containers: Show Container Log'"
    echo ""
    echo "See TERMINAL_FIX_INSTRUCTIONS.md for detailed help"
fi

echo ""
echo "=========================================="
