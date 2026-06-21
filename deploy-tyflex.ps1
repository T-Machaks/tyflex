$ErrorActionPreference = "Stop"

Write-Host "==> Installing dependencies..." -ForegroundColor Cyan
npm ci
if ($LASTEXITCODE -ne 0) { npm install }

Write-Host "==> Building static export..." -ForegroundColor Cyan
npm run build

Write-Host "==> Deploying to projects.tyflex.co.zw/tyflex..." -ForegroundColor Cyan
$PEM = "$env:USERPROFILE\Tamuka\2026\tyflex_web.pem"
$HOST = "ec2-user@13.245.5.61"
$REMOTE_DIR = "/var/www/tyflex/tyflex"

# Create remote directory
ssh -i $PEM $HOST "sudo mkdir -p $REMOTE_DIR && sudo chown ec2-user:ec2-user $REMOTE_DIR"

# Upload static export
scp -i $PEM -r out/* "${HOST}:${REMOTE_DIR}/"

Write-Host "==> Done! Site live at https://projects.tyflex.co.zw/tyflex/" -ForegroundColor Green
