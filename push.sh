#!/bin/bash
# Quick push script - just type: ./push.sh
git add . && git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
echo "✅ Deployed! Live in 1-2 minutes at: https://abhishekdrager-coder.github.io/task1/"
