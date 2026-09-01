import type { IconName } from "@/lib/icon-map";

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  icon: IconName;
  /** Omitted when the underlying solution is no longer a standalone /solutions page (e.g. ERP, retired as a top-level solution). */
  solutionSlug?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "harare-logistics-group-networking",
    client: "Harare Logistics Group",
    industry: "Logistics & Warehousing",
    title: "Re-cabling a Three-Depot Warehouse Network Without a Day of Downtime",
    challenge:
      "Aging, undocumented cabling across three depots meant frequent outages and no visibility into where faults were occurring, slowing down picking and dispatch.",
    solution:
      "FlexTech re-cabled all three sites with structured Cat6 cabling and managed switches, then rolled out handheld barcode scanning across every depot.",
    result:
      "All three depots were migrated in phased overnight windows with zero disruption to daytime operations, and IT now has full visibility into network health across every site.",
    metric: "0",
    metricLabel: "days of downtime during migration",
    icon: "Network",
    solutionSlug: "networking",
  },
  {
    slug: "zimbank-retail-division-3cx",
    client: "Zimbank Retail Division",
    industry: "Financial Services",
    title: "Cutting Branch Phone Costs in Half with a 3CX Rollout",
    challenge:
      "Each branch ran its own analog phone lines with no call routing between them, making it impossible to run a shared call center or track call volumes.",
    solution:
      "vFlex deployed a centralized 3CX system across every branch, with shared call queues, call recording, and a unified call center for customer support.",
    result:
      "Branch phone costs dropped significantly within the first year, and the new call center now handles support requests from every branch through one system.",
    metric: "50%+",
    metricLabel: "reduction in monthly phone costs",
    icon: "PhoneCall",
    solutionSlug: "3cx",
  },
  {
    slug: "cranborne-retail-group-pos",
    client: "Cranborne Retail Group",
    industry: "Retail",
    title: "Standardizing POS Across a Growing Retail Chain",
    challenge:
      "Different stores ran different till systems, making it impossible to see consolidated sales or stock data across the group.",
    solution:
      "FlexPOS installed matching POS terminals, receipt printers, and barcode scanners across every store, with inventory synced centrally in real time.",
    result:
      "Management now has live, consolidated sales and stock visibility across all locations, and new stores can be onboarded with a standard hardware kit in days.",
    metric: "100%",
    metricLabel: "of stores on one unified system",
    icon: "CreditCard",
    solutionSlug: "pos-systems",
  },
  {
    slug: "bluffhill-manufacturing-erp",
    client: "Bluffhill Manufacturing",
    industry: "Manufacturing",
    title: "Replacing Spreadsheets with a Single ERP System",
    challenge:
      "Finance, inventory, and payroll were managed in disconnected spreadsheets, leading to reconciliation delays and no real-time view of stock or costs.",
    solution:
      "MacFlex implemented an integrated ERP covering financial management, inventory control, and payroll, migrating historical data from existing spreadsheets.",
    result:
      "Month-end reconciliation time dropped substantially, and leadership now has a live dashboard across finance, inventory, and production costs.",
    metric: "6 wks",
    metricLabel: "from kickoff to go-live",
    icon: "Database",
    // ERP Software is no longer a standalone top-level solution — this
    // implementation work still happens (via MacFlex), just not as a
    // dedicated /solutions page to link to.
  },
];
