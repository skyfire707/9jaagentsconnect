#!/bin/bash
# Create a public tunnel to the local web server

cd "$(dirname "$0")"

# Start local server if not running
if ! curl -s http://localhost:8888/ > /dev/null; then
    echo "Starting local server..."
    python3 -m http.server 8888 > /dev/null 2>&1 &
    sleep 2
fi

echo "====================================="
echo "9jaAgentsConnect - Going LIVE!"
echo "====================================="
echo ""
echo "Your website is running locally on port 8888"
echo ""
echo "To make it public, choose one of these options:"
echo ""
echo "OPTION 1 - Cloudflare Tunnel (Recommended):"
echo "  Install: wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O /tmp/cf && chmod +x /tmp/cf"
echo "  Run: /tmp/cf tunnel --url http://localhost:8888"
echo ""
echo "OPTION 2 - LocalTunnel (Free):"
echo "  Install: npm install -g localtunnel"
echo "  Run: lt --port 8888"
echo ""
echo "OPTION 3 - Serveo.net (SSH):"
echo "  Run: ssh -R 80:localhost:8888 serveo.net"
echo ""
echo "OPTION 4 - ngrok (Requires token):"
echo "  Install: npm install -g ngrok"
echo "  Run: ngrok http 8888"
echo ""
echo "OPTION 5 - Direct Access (if firewall allows):"
echo "  Try: http://34.173.213.129:8888"
echo ""
echo "Once you get a public URL, share it!"
echo "====================================="
