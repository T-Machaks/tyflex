/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tyflex',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
