export const COMPANY = {
  name: "Tyflex Investments",
  legalName: "Tyflex Investments (Pvt) Ltd",
  phone: "+2638677174838",
  phoneDisplay: "+263 867 717 4838",
  email: "info@tyflex.co.zw",
  address: "40 St Athans Drive, Bluffhill, Harare, Zimbabwe",
  founded: 2009,
  url: "https://tyflex.co.zw",
} as const;

export const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const;

/**
 * URL prefixes for authenticated app sections (document portal, project
 * tracker, billing). These get their own chrome (see src/app/portal/layout.tsx
 * and friends) instead of the public marketing Header/Footer, and are hidden
 * from the public chat widget.
 */
export const PROTECTED_PATH_PREFIXES = ["/portal", "/tracker", "/accounts"] as const;

export function isProtectedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
