import type { IconName } from "@/lib/icon-map";
import type { EntityStatus } from "@/components/ui/StatusBadge";

export interface BusinessUnit {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  icon: IconName;
  focus: string[];
  /** Omitted for divisions that are fully up and running. */
  status?: EntityStatus;
}

export const businessUnits: BusinessUnit[] = [
  {
    name: "FlexTech",
    tagline: "Enterprise IT & Networking",
    description:
      "Our founding division — networking infrastructure, cloud solutions, and enterprise IT support for businesses across Zimbabwe.",
    founded: 2016,
    icon: "Network",
    focus: ["Networking & Structured Cabling", "AWS Cloud Solutions", "Smart Building Systems"],
  },
  {
    name: "MacFlex",
    tagline: "Imports & OEM Relationships",
    description:
      "Sister company facilitating imports and OEM relationships for organisations based in South Africa.",
    founded: 2017,
    icon: "Truck",
    focus: ["Import Facilitation", "OEM Partnerships", "South Africa Operations"],
  },
  {
    name: "vFlex",
    tagline: "Virtual Cloud Communications",
    description:
      "Established for virtual cloud communications as an MTN SIP Trunk reseller. That specific reseller arrangement is currently paused — VoIP, 3CX, and SIP trunking solutions are still delivered directly through our core solutions catalog.",
    founded: 2022,
    icon: "Phone",
    focus: ["VoIP & UCaaS", "3CX Phone Systems", "SIP Trunking & Cloud PBX"],
    status: "on-hold",
  },
  {
    name: "FlexPOS",
    tagline: "Retail & Point of Sale",
    description:
      "Established to formalize our retail technology division. Not yet fully operational as a standalone unit — POS and AutoID solutions are delivered through our core solutions catalog in the meantime.",
    founded: 2024,
    icon: "CreditCard",
    focus: ["POS Systems", "AutoID Solutions", "Hardware-as-a-Service"],
    status: "in-development",
  },
  {
    name: "Getsiman",
    tagline: "Electrical & Networking Installations",
    description:
      "Established for smart electrical and networking installations, serving both businesses and homes.",
    founded: 2022,
    icon: "Zap",
    focus: ["Electrical Supplies", "Backup Power Systems", "Networking Installations"],
  },
  {
    name: "OmniFlex",
    tagline: "Business Messaging",
    description:
      "Our bulk messaging platform. Standalone at omniflex.co.zw for bulk SMS and OTP, with single sign-on to omniflex.telerivet.com for advanced features and additional channels. Tyflex is an official Telerivet affiliate partner.",
    founded: 2025,
    icon: "MessageSquare",
    focus: ["Bulk SMS Campaigns", "OTP & Transactional SMS", "Telerivet SSO for Advanced Channels"],
  },
];

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  /** Omitted for milestones that are fully active/complete. */
  status?: EntityStatus;
  /** Click-to-load video reference — see YouTubeThumb, no auto-embedded iframe. */
  videoEmbed?: { youtubeId: string; label: string };
}

export const timeline: TimelineMilestone[] = [
  {
    year: "2016",
    title: "Tyflex Investments Registered",
    description:
      "Tyflex Investments (Pvt) Ltd registered in Zimbabwe, laying the foundation for enterprise technology services with FlexTech as our founding division.",
  },
  {
    year: "2017",
    title: "Macflex Technologies Registered",
    description:
      "Registered as a sister company, facilitating imports and OEM relationships for organisations based in South Africa.",
  },
  {
    year: "2020",
    title: "Rwanda Branch Office Registered",
    description:
      "A Tyflex foreign branch office registered in Rwanda through the Rwandan Embassy in Harare.",
    status: "in-development",
  },
  {
    year: "2022",
    title: "vFlex Established",
    description:
      "Established for virtual cloud communications as an MTN SIP Trunk reseller.",
    status: "on-hold",
  },
  {
    year: "2022",
    title: "Getsiman Established",
    description:
      "Established for smart electrical and networking installations, serving both businesses and homes.",
  },
  {
    year: "2024",
    title: "FlexPOS Established",
    description: "Established to formalize our retail technology division.",
    status: "in-development",
  },
  {
    year: "2025",
    title: "Omniflex Launches",
    description:
      "Launched on omniflex.telerivet.com as an official Telerivet affiliate partner, bringing bulk SMS and WhatsApp messaging to market.",
  },
  {
    year: "2026",
    title: "Omniflex Goes Standalone",
    description:
      "Omniflex launches as a standalone product at omniflex.co.zw, focused on bulk SMS and OTP, with single sign-on through to omniflex.telerivet.com for advanced features and additional channels.",
  },
  {
    year: "2026",
    title: "AWS Partnership Concluded",
    description:
      "Tyflex concluded a partnership with AWS. Omniflex, ADMA Digital, and Vekta are all being developed and improved with AWS support.",
  },
  {
    year: "2026",
    title: "Vekta Announced",
    description:
      "Vekta — Tyflex's digital commerce and fulfilment platform for Zimbabwe — announced ahead of its September 2026 launch and previewed at the AWS Summit in Johannesburg.",
    status: "launching-soon",
    videoEmbed: { youtubeId: "EbnNNRx1wEY", label: "Vekta at AWS Summit 2026, Johannesburg" },
  },
];
