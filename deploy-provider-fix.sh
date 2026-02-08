#!/bin/bash
cd /workspaces/task1
git add service-provider-login.html
git commit -m "Remove insurance section and hide dashboard button until logged in"
git push origin main
echo ""
echo "✅ Deployed successfully!"
echo "Changes will be live in 2-3 minutes"
