#!/bin/bash
set -e

# Add /tyflex location to the projects.tyflex.co.zw nginx config
# Run this ON the server (ssh in first)

# Create the directory
sudo mkdir -p /var/www/tyflex/tyflex
sudo chown ec2-user:ec2-user /var/www/tyflex/tyflex

# The nginx config should already have projects.tyflex.co.zw serving from /var/www/tyflex/
# Static files at /tyflex/ will be served automatically since nginx typically has:
#   root /var/www/tyflex;
# Which means /tyflex/index.html maps to /var/www/tyflex/tyflex/index.html

# If it doesn't work, add this location block to the server config:
# location /tyflex/ {
#     alias /var/www/tyflex/tyflex/;
#     try_files $uri $uri/ /tyflex/index.html;
# }

echo "Directory created. If Nginx root is /var/www/tyflex, the site should work at /tyflex/ automatically."
echo "If not, add the location block above to your nginx config and run: sudo nginx -t && sudo systemctl reload nginx"
