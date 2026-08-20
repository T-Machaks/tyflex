import { PHASE_PRODUCTION_BUILD } from "next/constants";

/**
 * Shared signing secret for NextAuth sessions and the portal's own signed
 * tokens (password reset links, local-storage download links).
 *
 * In production, set NEXTAUTH_SECRET. The fallback below applies outside
 * production (so `npm run dev` works with no setup) and during `next build`
 * — NODE_ENV is "production" then too, but there's no real request to sign
 * anything for yet, and the build must be able to complete on a machine
 * that doesn't hold runtime secrets. The check that matters is at actual
 * runtime: a production server started without NEXTAUTH_SECRET set throws
 * here on first use rather than silently signing sessions with a fallback.
 */
export function getAppSecret(): string {
  if (process.env.NEXTAUTH_SECRET) return process.env.NEXTAUTH_SECRET;

  const isProductionBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
  if (process.env.NODE_ENV === "production" && !isProductionBuild) {
    throw new Error("NEXTAUTH_SECRET must be set in production.");
  }

  return "dev-only-insecure-secret-change-me";
}
