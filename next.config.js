/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed on AWS Amplify in full SSR mode — no static export, no basePath.
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
