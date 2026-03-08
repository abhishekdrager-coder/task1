#!/bin/bash

# Quick launch script - Starts server and opens browser automatically
# Usage: ./quick-launch.sh [port]
# If no port specified or port is busy, will auto-find an available port

PORT=${1:-8000}  # Default to port 8000 if not specified

# Function to find an available port
find_available_port() {
    local start_port=$1
    local test_port=$start_port
    
    while [ $test_port -lt 9000 ]; do
        if ! lsof -Pi :${test_port} -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo $test_port
            return 0
        fi
        test_port=$((test_port + 1))
    done
    
    echo $start_port
}

echo "🚀 Starting local server..."
echo ""

# Check if port is already in use
if lsof -Pi :${PORT} -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port ${PORT} is already in use!"
    
    # Find what's running on that port
    PROCESS=$(lsof -Pi :${PORT} -sTCP:LISTEN -t | xargs ps -p 2>/dev/null | tail -n 1)
    echo "Currently running: ${PROCESS}"
    echo ""
    
    # Auto-find available port
    NEW_PORT=$(find_available_port $((PORT + 1)))
    echo "🔍 Found available port: ${NEW_PORT}"
    PORT=$NEW_PORT
    echo ""
fi

# Start the server
if true; then

# Start the server
if true; then
    # Start the server in background
    echo "Starting Python HTTP server on port ${PORT}..."
    python3 -m http.server ${PORT} > /dev/null 2>&1 &
    SERVER_PID=$!
    
    # Wait a moment for server to start
    sleep 2
    
    # Check if server started successfully
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Server started successfully (PID: ${SERVER_PID})"
        URL="http://localhost:${PORT}"
        echo "🌐 URL: ${URL}"
        echo ""
        
        # Open in browser
        "$BROWSER" "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || open "$URL" 2>/dev/null || echo "Please open: ${URL}"
        
        echo ""
        echo "📝 Server is running in background"
        echo "   Port: ${PORT}"
        echo "   To stop: kill ${SERVER_PID}"
        echo "   Or run: pkill -f 'python3 -m http.server'"
        echo ""
        echo "Press Ctrl+C to keep server running and exit this script"
        
        # Keep script running to show logs
        tail -f /dev/null
    else
        echo "❌ Failed to start server"
        exit 1
    fi
fi
