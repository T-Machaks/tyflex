import { withAuth } from "next-auth/middleware";
import { getAppSecret } from "@/lib/portal/secret";

// The login page itself (/portal) stays public — only the authenticated
// sub-pages are protected.
export default withAuth({
  // Must match authOptions.secret in src/lib/auth.ts — withAuth defaults to
  // reading NEXTAUTH_SECRET directly and doesn't know about our dev fallback,
  // so without this it fails closed with a Configuration error whenever that
  // env var is unset (e.g. local dev).
  secret: getAppSecret(),
  pages: {
    signIn: "/portal",
  },
  callbacks: {
    // Portal routes: any signed-in user (admin or client).
    // Tracker and accounts routes: admin only — a signed-in client hitting
    // either is sent back to the sign-in page just like an unauthenticated visitor.
    authorized: ({ token, req }) => {
      if (!token) return false;
      const { pathname } = req.nextUrl;
      if (pathname.startsWith("/tracker") || pathname.startsWith("/accounts")) {
        return token.role === "admin";
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/portal/dashboard/:path*", "/portal/documents/:path*", "/tracker/:path*", "/accounts/:path*"],
};
