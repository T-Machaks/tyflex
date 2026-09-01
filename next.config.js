/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed on AWS Amplify in full SSR mode — no static export, no basePath.
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Barcode & Scanning renamed to AutoID (expanded scope: mobile computing,
      // rugged devices, line matrix printing) — Phase 1 content restructure.
      {
        source: "/solutions/barcode-scanning",
        destination: "/solutions/autoid",
        permanent: true,
      },
      // Microsoft Teams Integration removed; its slot in the solution set is
      // now IoT & Smart Buildings content, merged into the existing
      // Smart Building Solutions page rather than a separate duplicate page.
      {
        source: "/solutions/microsoft-teams",
        destination: "/solutions/smart-building",
        permanent: true,
      },
      // Enterprise Printing was published in error — Tyflex does not offer
      // managed print/MFP/toner services. No direct successor page, so this
      // sends visitors to the solutions hub rather than a 404.
      {
        source: "/solutions/enterprise-printing",
        destination: "/solutions",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
