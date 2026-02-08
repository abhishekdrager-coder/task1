#!/bin/bash

# Quick launch script - Starts server and opens browser automatically
# Usage: ./quick-launch.sh [port]

PORT=${1:-8000}  # Default to port 8000 if not specified

echo "🚀 Starting local server on port ${PORT}..."
echo ""

# Check if port is already in use
if lsof -Pi :${PORT} -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port ${PORT} is already in use!"
    echo ""
    
    # Find what's running on that port
    PROCESS=$(lsof -Pi :${PORT} -sTCP:LISTEN -t | xargs ps -p | tail -n 1)
    echo "Currently running: ${PROCESS}"
    echo ""
    
    read -p "Do you want to open it anyway? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        URL="http://localhost:${PORT}"
        echo "🌐 Opening: ${URL}"
        "$BROWSER" "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || open "$URL" 2>/dev/null || echo "Please open: ${URL}"
    fi
else
    # Start the server in background
    echo "Starting Python HTTP server..."
    python3 -m http.server ${PORT} > /dev/null 2>&1 &
    SERVER_PID=$!
    
    # Wait a moment for server to start
    sleep 2
    
    # Check if server started successfully
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Server started successfully (PID: ${SERVER_PID})"
        URL="http://localhost:${PORT}"
        echo "🌐 Opening: ${URL}"
        echo ""
        
        # Open in browser
        "$BROWSER" "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || open "$URL" 2>/dev/null || echo "Please open: ${URL}"
        
        echo ""
        echo "📝 Server is running in background"
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
