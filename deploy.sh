#!/bin/bash
set -e

DEPLOY_DIR="/var/www/tyflex/website"
APP_NAME="tyflex-web"

echo "==> Pulling latest code..."
cd "$DEPLOY_DIR"
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Building Next.js app..."
npm run build

echo "==> Restarting PM2 process..."
pm2 describe "$APP_NAME" > /dev/null 2>&1 \
  && pm2 restart "$APP_NAME" \
  || pm2 start npm --name "$APP_NAME" -- start

pm2 save

echo "==> Deploy complete. Running as: $(pm2 list | grep $APP_NAME)"
