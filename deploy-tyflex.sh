#!/bin/bash
set -e

echo "==> Installing dependencies..."
npm ci || npm install

echo "==> Building static export..."
npm run build

echo "==> Deploying to projects.tyflex.co.zw/tyflex..."
PEM="$HOME/Tamuka/2026/tyflex_web.pem"
HOST="ec2-user@13.245.5.61"
REMOTE_DIR="/var/www/tyflex/tyflex"

# Create remote directory
ssh -i "$PEM" "$HOST" "sudo mkdir -p $REMOTE_DIR && sudo chown ec2-user:ec2-user $REMOTE_DIR"

# Upload static export
scp -i "$PEM" -r out/* "$HOST:$REMOTE_DIR/"

echo "==> Done! Site live at https://projects.tyflex.co.zw/tyflex/"
