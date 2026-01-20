#!/bin/bash

# Local Development Server
# This runs your website on http://localhost:8000
# Make all your changes and test them locally
# Only run deploy.sh when you're ready to push to production

echo "🚀 Starting local development server..."
echo "📍 Your website will be available at: http://localhost:8000"
echo "🔄 Any changes you make to files will be visible on refresh"
echo "⚠️  This is LOCAL ONLY - your live website is NOT affected"
echo ""
echo "To stop the server, press Ctrl+C"
echo "To deploy to production, run: ./deploy.sh"
echo ""
echo "Opening browser in 2 seconds..."
sleep 2

# Open browser (works in dev container to open on host)
"$BROWSER" http://localhost:8000 &

# Start Python HTTP server on port 8000
python3 -m http.server 8000
