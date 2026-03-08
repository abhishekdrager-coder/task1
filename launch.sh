#!/bin/bash

# launch.sh - Start a local server and show the launch link
# Usage: ./launch.sh [port]
#
# If a server is already listening, shows its link.
# Otherwise, starts a new server on the first available port (default 8000).

REQUESTED_PORT=${1:-8000}
SCAN_PORTS=(8000 8080 3000 5000 5500 4200 8888 9000)

# Check if a port is in use (listening)
port_in_use() {
    lsof -Pi ":$1" -sTCP:LISTEN -t >/dev/null 2>&1 ||
    ss -tlnp 2>/dev/null | grep -q ":$1 " ||
    netstat -tlnp 2>/dev/null | grep -q ":$1 "
}

echo "🔍 Checking for a running local server..."

# First, scan common ports for an already-running server
for PORT in "${SCAN_PORTS[@]}"; do
    if port_in_use "$PORT"; then
        echo ""
        echo "✅ Server already running on port ${PORT}"
        echo ""
        echo "🔗 Launch link:"
        echo "   http://localhost:${PORT}"
        echo ""
        echo "Paste the link above into your browser to open the site."
        exit 0
    fi
done

echo "No running server found. Starting one..."
echo ""

# Find first available port starting at REQUESTED_PORT
PORT=$REQUESTED_PORT
while port_in_use "$PORT"; do
    PORT=$((PORT + 1))
done

echo "🚀 Starting Python HTTP server on port ${PORT}..."
python3 -m http.server "$PORT" &
SERVER_PID=$!
sleep 1

if kill -0 "$SERVER_PID" 2>/dev/null; then
    echo ""
    echo "✅ Server started successfully (PID: ${SERVER_PID})"
    echo ""
    echo "🔗 Launch link:"
    echo "   http://localhost:${PORT}"
    echo ""
    echo "Paste the link above into your browser to open the site."
    echo ""
    echo "To stop the server later, run:"
    echo "   kill ${SERVER_PID}"
    echo ""
    echo "Press Ctrl+C to stop the server now."
    wait "$SERVER_PID"
else
    echo "❌ Failed to start the server on port ${PORT}."
    echo "   Try: python3 -m http.server ${PORT}"
    exit 1
fi
