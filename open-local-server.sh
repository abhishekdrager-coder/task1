#!/bin/bash

# Script to find and open the working local server port
# Tests common development ports and opens browser automatically

echo "🔍 Scanning for active local server..."
echo ""

# List of common development ports to check
PORTS=(8000 8080 3000 5000 5500 4200 8888 9000)

# Function to check if a port is active
check_port() {
    local port=$1
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:${port}" | grep -q "200\|301\|302\|304"; then
        return 0
    else
        return 1
    fi
}

# Find the first active port
ACTIVE_PORT=""
for port in "${PORTS[@]}"; do
    echo -n "Checking port ${port}... "
    if check_port $port; then
        echo "✅ ACTIVE"
        ACTIVE_PORT=$port
        break
    else
        echo "❌ Not active"
    fi
done

echo ""

if [ -n "$ACTIVE_PORT" ]; then
    URL="http://localhost:${ACTIVE_PORT}"
    echo "✅ Found active server on port ${ACTIVE_PORT}"
    echo "🌐 Opening: ${URL}"
    echo ""
    
    # Open in browser (works in dev container with $BROWSER variable)
    if [ -n "$BROWSER" ]; then
        "$BROWSER" "$URL"
    else
        # Fallback methods
        if command -v xdg-open > /dev/null; then
            xdg-open "$URL"
        elif command -v open > /dev/null; then
            open "$URL"
        else
            echo "⚠️  Could not auto-open browser"
            echo "📋 Please manually open: ${URL}"
        fi
    fi
else
    echo "❌ No active server found on common ports"
    echo ""
    echo "💡 To start a server, run one of these commands:"
    echo "   python3 -m http.server 8000"
    echo "   python -m http.server 8080"
    echo "   npx http-server -p 5500"
    echo ""
    echo "Then run this script again!"
fi
