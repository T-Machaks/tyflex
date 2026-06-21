# Deploy Tyflex website to projects.tyflex.co.zw/tyflex
# Builds static export and uploads to EC2

$ErrorActionPreference = "Stop"
$PEM = "C:\Users\USER\Tamuka\2026\tyflex_web.pem"
$SERVER = "ec2-user@13.245.5.61"
$REMOTE_PATH = "/var/www/tyflex/tyflex"

Write-Host "==> Installing dependencies..." -ForegroundColor Cyan
npm ci

Write-Host "==> Building static export..." -ForegroundColor Cyan
npm run build

Write-Host "==> Uploading to server..." -ForegroundColor Cyan
# Create remote directory
ssh -i $PEM $SERVER "sudo mkdir -p $REMOTE_PATH && sudo chown ec2-user:ec2-user $REMOTE_PATH"

# Upload the /out directory contents
scp -i $PEM -r out/* ${SERVER}:${REMOTE_PATH}/

Write-Host "==> Done! Site live at https://projects.tyflex.co.zw/tyflex/" -ForegroundColor Green
