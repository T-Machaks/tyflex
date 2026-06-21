#!/bin/bash
set -e

PEM="C:/Users/USER/Tamuka/2026/tyflex_web.pem"
SERVER="ec2-user@13.245.5.61"
REMOTE_PATH="/var/www/tyflex/tyflex"

echo "==> Installing dependencies..."
npm ci

echo "==> Building static export..."
npm run build

echo "==> Uploading to server..."
ssh -i "$PEM" "$SERVER" "sudo mkdir -p $REMOTE_PATH && sudo chown ec2-user:ec2-user $REMOTE_PATH"
scp -i "$PEM" -r out/* "${SERVER}:${REMOTE_PATH}/"

echo "==> Done! Site live at https://projects.tyflex.co.zw/tyflex/"
