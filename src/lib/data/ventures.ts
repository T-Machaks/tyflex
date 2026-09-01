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
  /** Omitted entirely for ventures that are fully active/live. */
  status?: EntityStatus;
  /** Shown alongside a "launching-soon" status, e.g. "September 2026". */
  launchDate?: string;
}

/**
 * "Built by Tyflex" — platforms Tyflex owns and operates, distinct from the
 * solutions we sell to clients (see src/lib/data/solutions.ts). Single
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
      "A virtual exhibition platform for agriculture, open year-round rather than a single show — connecting suppliers, buyers, and exhibitors across the region in one place.",
    icon: "Sprout",
    url: "https://admadigital.co.zw",
    highlights: [
      "Virtual exhibitor booths, open year-round",
      "Connects agricultural suppliers with buyers",
      "Being developed and improved with AWS support",
    ],
  },
  {
    slug: "omniflex",
    name: "Omniflex",
    tagline: "Bulk Messaging Platform",
    description:
      "Tyflex's bulk messaging platform — bulk SMS and WhatsApp at scale. Launched in 2025 in partnership with Telerivet; as of September 1, 2026 it runs fully on its own dashboard, independent of Telerivet infrastructure. Bulk messaging hasn't left the business — it's moved from being a solution we sell to a platform we own.",
    icon: "MessageSquare",
    highlights: [
      "Bulk SMS campaigns with smart scheduling",
      "WhatsApp Business API messaging",
      "Now fully independent of Telerivet infrastructure",
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
