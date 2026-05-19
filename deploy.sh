#!/bin/bash
# Quick deployment script for 9jaAgentsConnect

echo "🚀 9jaAgentsConnect Deployment Script"
echo "======================================"

# Kill existing servers
pkill -f "python.*http.server" 2>/dev/null
pkill -f "ssh.*serveo" 2>/dev/null

# Start local server
PORT=${1:-8765}
echo "📦 Starting local server on port $PORT..."
cd "$(dirname "$0")"
python3 -m http.server $PORT > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 2

# Check if server started
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "❌ Failed to start server"
    exit 1
fi

echo "✅ Server running on http://localhost:$PORT"
echo ""
echo "🔗 To make it publicly accessible, run:"
echo "   ssh -R 80:localhost:$PORT serveo.net"
echo ""
echo "📱 Or deploy to Netlify:"
echo "   npx netlify-cli deploy --prod --dir=."
echo ""
echo "🌐 Or deploy to Vercel:"
echo "   npx vercel --prod"
echo ""
echo "Press Ctrl+C to stop the server"
wait $SERVER_PID
