#!/bin/bash
# Auto-push on file changes - runs in background
# Press Ctrl+C to stop

echo "🚀 Auto-deploy enabled!"
echo "Watching for file changes every 10 seconds..."
echo "Press Ctrl+C to stop"
echo ""

# Store last commit hash
LAST_COMMIT=$(git rev-parse HEAD)

while true; do
    sleep 10
    
    # Check if there are uncommitted changes
    if [[ -n $(git status -s) ]]; then
        echo ""
        echo "📝 Changes detected, deploying..."
        git add .
        git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null
        
        # Check if commit was successful (not just whitespace changes)
        CURRENT_COMMIT=$(git rev-parse HEAD)
        if [[ "$CURRENT_COMMIT" != "$LAST_COMMIT" ]]; then
            git push origin main
            echo "✅ Deployed! Live in 1-2 minutes at: https://abhishekdrager-coder.github.io/task1/"
            LAST_COMMIT=$CURRENT_COMMIT
        fi
        echo "Watching for more changes..."
        echo ""
    fi
done
