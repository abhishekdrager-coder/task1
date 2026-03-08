#!/bin/bash

# start-local-link.sh
# Detects which port is currently listening and opens a local link.
# If no server is running, starts one on the first available port.
#
# Usage:
#   ./start-local-link.sh           # auto-detect or start on port 8000
#   ./start-local-link.sh 3000      # prefer port 3000
#   ./start-local-link.sh --list    # list all listening dev ports

# ── Configuration ────────────────────────────────────────────────────────────
DEV_PORTS=(8000 8080 3000 5000 5500 4200 8888 9000)
# Seconds to wait for the server socket to bind after launching
SERVER_STARTUP_DELAY=2

# ── Helpers ───────────────────────────────────────────────────────────────────

# Returns 0 if the given port has a TCP LISTEN socket
port_is_listening() {
    local port=$1
    # Try ss first (faster, always available on Linux); fall back to lsof
    if command -v ss &>/dev/null; then
        ss -tlnp 2>/dev/null | awk '{print $4}' | grep -qE ":${port}$"
    elif command -v lsof &>/dev/null; then
        lsof -iTCP:"${port}" -sTCP:LISTEN -t &>/dev/null
    elif command -v netstat &>/dev/null; then
        netstat -tlnp 2>/dev/null | awk '{print $4}' | grep -qE ":${port}$"
    else
        # Last resort: try a TCP connection
        (echo > /dev/tcp/127.0.0.1/"${port}") &>/dev/null
    fi
}

# Open a URL in the best available browser
open_url() {
    local url=$1
    if [ -n "${BROWSER}" ]; then
        "${BROWSER}" "${url}" &>/dev/null &
    elif command -v xdg-open &>/dev/null; then
        xdg-open "${url}" &>/dev/null &
    elif command -v open &>/dev/null; then
        open "${url}" &>/dev/null &
    else
        echo "  ⚠️  Could not auto-open browser. Please visit the URL above manually."
    fi
}

# ── --list mode ───────────────────────────────────────────────────────────────
if [[ "${1}" == "--list" ]]; then
    echo "🔍 Scanning common development ports..."
    echo ""
    any_found=0
    for port in "${DEV_PORTS[@]}"; do
        if port_is_listening "${port}"; then
            echo "  ✅  Port ${port} → http://localhost:${port}"
            any_found=1
        else
            echo "  ❌  Port ${port} – not listening"
        fi
    done
    echo ""
    if [[ "${any_found}" -eq 0 ]]; then
        echo "No active dev server found on any of the checked ports."
        echo "Run this script without --list to start one automatically."
    fi
    exit 0
fi

# ── Main ──────────────────────────────────────────────────────────────────────
PREFERRED_PORT=${1:-""}   # optional first argument

echo ""
echo "🔍 Checking for a running local server..."
echo ""

ACTIVE_PORT=""

# 1. If a port was specified, check that one first
if [[ -n "${PREFERRED_PORT}" ]]; then
    if port_is_listening "${PREFERRED_PORT}"; then
        ACTIVE_PORT="${PREFERRED_PORT}"
        echo "  ✅  Found server already listening on preferred port ${ACTIVE_PORT}"
    fi
fi

# 2. Otherwise scan the default dev port list
if [[ -z "${ACTIVE_PORT}" ]]; then
    for port in "${DEV_PORTS[@]}"; do
        if port_is_listening "${port}"; then
            ACTIVE_PORT="${port}"
            echo "  ✅  Found server listening on port ${ACTIVE_PORT}"
            break
        fi
    done
fi

# 3. No server found – start one
if [[ -z "${ACTIVE_PORT}" ]]; then
    START_PORT=${PREFERRED_PORT:-8000}

    echo "  ℹ️  No active server found."
    echo "  🚀  Starting Python HTTP server on port ${START_PORT}..."
    echo ""

    python3 -m http.server "${START_PORT}" &>/dev/null &
    SERVER_PID=$!

    # Wait for the server socket to bind; the delay is tunable via SERVER_STARTUP_DELAY
    sleep "${SERVER_STARTUP_DELAY}"

    if ! port_is_listening "${START_PORT}"; then
        echo "  ❌  Failed to start server on port ${START_PORT}."
        echo "     Try: python3 -m http.server ${START_PORT}"
        exit 1
    fi

    ACTIVE_PORT="${START_PORT}"
    # Note: the server process is intentionally left running in the background
    # after this script exits so the site remains accessible.
    echo "  ✅  Server started (PID ${SERVER_PID})"
    echo "     To stop it later: kill ${SERVER_PID}"
fi

# ── Print and open the link ───────────────────────────────────────────────────
URL="http://localhost:${ACTIVE_PORT}"
echo ""
echo "  🌐  Local link: ${URL}"
echo ""

open_url "${URL}"

echo "  Press Ctrl+C to exit (the server keeps running in the background)."
echo ""
