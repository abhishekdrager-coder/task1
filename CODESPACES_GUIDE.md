# GitHub Codespaces Development Guide

## Managing Context Window Limits

When your Codespaces VS Code context window reaches its limit, you have several options to continue working with a fresh environment:

### Option 1: Commit and Start Fresh Codespace (Recommended)

1. **Save your current work:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin your-branch-name
   ```

2. **Stop the current Codespace:**
   - Go to https://github.com/codespaces
   - Find your active Codespace
   - Click the three dots (...) → "Stop codespace"

3. **Create a new Codespace:**
   - Go back to your repository
   - Click "Code" → "Codespaces" → "Create codespace on [branch]"
   - Your code will be fresh from your latest commit

### Option 2: Rebuild Container

1. **In VS Code Command Palette (Ctrl+Shift+P):**
   - Type: "Codespaces: Rebuild Container"
   - This will restart with a clean environment
   - Your uncommitted changes will be preserved

### Option 3: Clear Terminal History

If the issue is terminal history:
```bash
clear
history -c
```

### Option 4: Close Unnecessary Files

- Close all editor tabs you're not actively using
- Use "Close All Editors" from Command Palette
- Keep only essential files open

### Option 5: Use Multiple Codespaces

- Create separate Codespaces for different features
- Each gets its own context window
- Switch between them as needed

### Best Practices

1. **Commit Frequently:**
   - Make small, atomic commits
   - Push regularly to preserve work
   - Makes creating fresh Codespaces safe

2. **Clean Up Regularly:**
   - Delete old/unused Codespaces
   - Each repository can have multiple Codespaces

3. **Use .gitignore:**
   - Ensure build artifacts aren't cluttering your workspace
   - Keep the working directory clean

4. **Organize Your Work:**
   - Use feature branches
   - One Codespace per major feature
   - Easy to start fresh when needed

## Quick Reference Commands

```bash
# Check current branch
git branch

# Save all changes
git add .
git commit -m "Work in progress"
git push

# View Codespace info
gh codespace list

# Create new Codespace from CLI
gh codespace create

# Stop current Codespace
gh codespace stop
```

## For This Project (HomeServe)

Since this is a static website project:
- Files are small and load quickly
- Creating fresh Codespaces is fast
- No complex build process to wait for

**Recommended workflow:**
1. Make changes
2. Test locally with `python3 -m http.server 8000`
3. Commit when feature is complete
4. Create fresh Codespace for next feature

## Need Help?

- Check [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)
- Use GitHub CLI: `gh codespace --help`
- Repository README.md has local development setup
