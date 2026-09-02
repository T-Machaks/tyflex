import type { IconName } from "@/lib/icon-map";
import type { EntityStatus } from "@/components/ui/StatusBadge";

export interface Venture {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  highlights: string[];
  /** External site, when the venture has its own domain. */
  url?: string;
  /**
   * Short attribution line for platforms Tyflex co-developed rather than
   * owns outright, e.g. "Developed with ADMA & Mediaserv".
   */
  partners?: string;
  /** Omitted entirely for ventures that are fully active/live. */
  status?: EntityStatus;
  /** Shown alongside a "launching-soon" status, e.g. "September 2026". */
  launchDate?: string;
}

/**
 * "Built by Tyflex" — platforms Tyflex has built or co-developed, distinct
 * from the solutions we sell to clients (see src/lib/data/solutions.ts).
 * Not all are Tyflex-owned: ADMA Digital is a partnership build. Single
 * source for both /projects and the homepage ventures teaser.
 *
 * Note: I couldn't verify vekta.co.zw or admadigital.co.zw's own copy
 * directly — both were behind a bot-verification wall my fetch tool
 * couldn't get past — so the copy below is grounded only in what was
 * confirmed directly, not scraped from either landing page.
 */
export const ventures: Venture[] = [
  {
    slug: "adma-digital",
    name: "ADMA Digital",
    tagline: "Year-Round Agricultural Virtual Exhibition",
    description:
      "A virtual exhibition platform for agriculture, open year-round rather than a single show — connecting suppliers, buyers, and exhibitors across the region in one place. Tyflex developed the platform in partnership with ADMA (the Agricultural Dealers and Manufacturers Association) and Mediaserv; it is not a Tyflex-owned property.",
    icon: "Sprout",
    url: "https://admadigital.co.zw",
    partners: "Developed with ADMA & Mediaserv",
    highlights: [
      "Virtual exhibitor booths, open year-round",
      "Connects agricultural suppliers with buyers",
      "Built in partnership with ADMA & Mediaserv",
      "Being developed and improved with AWS support",
    ],
  },
  {
    slug: "omniflex",
    name: "Omniflex",
    tagline: "Bulk Messaging Platform",
    description:
      "Tyflex's bulk messaging platform. It began in 2025 on omniflex.telerivet.com; today it runs as a standalone product at omniflex.co.zw focused on bulk SMS and OTP, with single sign-on through to omniflex.telerivet.com for advanced features and additional channels. Tyflex remains an official Telerivet affiliate partner. Bulk messaging hasn't left the business — it's moved from being a solution we sell to a platform we own.",
    icon: "MessageSquare",
    url: "https://omniflex.co.zw",
    highlights: [
      "Standalone bulk SMS & OTP at omniflex.co.zw",
      "Single sign-on to Telerivet for advanced features & channels",
      "Official Telerivet affiliate partner",
      "Being developed and improved with AWS support",
    ],
  },
  {
    slug: "vekta",
    name: "Vekta",
    tagline: "Digital Commerce & Fulfilment Platform",
    description:
      "Vekta will be Tyflex's digital commerce and fulfilment platform for Zimbabwe, connecting businesses with delivery and order fulfilment infrastructure. It has not launched yet.",
    icon: "Truck",
    url: "https://vekta.co.zw",
    status: "launching-soon",
    launchDate: "September 2026",
    highlights: [
      "Digital commerce and order fulfilment",
      "Built for the Zimbabwean market",
      "Being developed with AWS support ahead of launch",
    ],
  },
];

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug);
}
