import type { IconName } from "@/lib/icon-map";

export const PARTNER_CATEGORIES = [
  "Communications",
  "Networking & Security",
  "Hardware & Devices",
  "Cloud & Software",
] as const;

export type PartnerCategory = (typeof PARTNER_CATEGORIES)[number];

export interface Partner {
  name: string;
  category: PartnerCategory;
  description: string;
  icon: IconName;
  /** Slug of the dedicated /brands/[slug] page, where one exists. */
  brandSlug?: string;
  /** Slug of the dedicated /solutions/[slug] page, for a service/platform partnership rather than a resold hardware brand. */
  solutionSlug?: string;
  /** Path to the partner's logo under /public/partners, shown instead of the icon. */
  logo?: string;
}

export const partners: Partner[] = [
  {
    name: "3CX",
    category: "Communications",
    description:
      "Certified 3CX partner — we license, deploy and support 3CX phone systems in the cloud or on-premise, with video, live chat and mobile apps.",
    icon: "PhoneCall",
    brandSlug: "3cx",
    logo: "/partners/3cx.svg",
  },
  {
    name: "Yeastar",
    category: "Communications",
    description:
      "Yeastar P-Series IP-PBX, cloud PBX and VoIP gateways — the platform behind the multi-province call centres we run in Zimbabwe.",
    icon: "PhoneOutgoing",
    brandSlug: "yeastar",
    logo: "/partners/yeastar.png",
  },
  {
    name: "Yealink",
    category: "Communications",
    description:
      "Yealink IP desk phones, DECT cordless, headsets and Teams/Zoom room systems — supplied and provisioned for VoIP and 3CX deployments.",
    icon: "Phone",
    brandSlug: "yealink",
    logo: "/partners/yealink.png",
  },
  {
    name: "Fanvil",
    category: "Communications",
    description:
      "Fanvil IP phones, SIP video door intercoms and paging speakers — cost-effective endpoints that auto-provision with 3CX and Yeastar.",
    icon: "Phone",
    brandSlug: "fanvil",
    logo: "/partners/fanvil.png",
  },
  {
    name: "Grandstream",
    category: "Communications",
    description: "IP phones, gateways and PBX hardware supporting our UCaaS and 3CX installations.",
    icon: "Phone",
    logo: "/partners/grandstream.png",
  },
  {
    name: "Microsoft",
    category: "Cloud & Software",
    description: "Microsoft Teams calling and Direct Routing integration for businesses standardizing on Microsoft 365.",
    icon: "Video",
    logo: "/partners/microsoft.svg",
  },
  {
    name: "AWS",
    category: "Cloud & Software",
    description:
      "AWS Partner — cloud migration, hosting, backup, disaster recovery and secure landing zones on Amazon Web Services.",
    icon: "Cloud",
    brandSlug: "aws",
    logo: "/partners/aws.svg",
  },
  {
    name: "Ubiquiti",
    category: "Networking & Security",
    description: "UniFi switches and access points forming the backbone of the enterprise networks we install.",
    icon: "Wifi",
    logo: "/partners/ubiquiti.svg",
  },
  {
    name: "Fortinet",
    category: "Networking & Security",
    description: "FortiGate firewalls and security appliances protecting the networks we design and manage.",
    icon: "Lock",
    logo: "/partners/fortinet.svg",
  },
  {
    name: "Hikvision",
    category: "Networking & Security",
    description:
      "Hikvision IP cameras, NVRs, PoE switches, access control and displays — designed, installed and maintained by Tyflex.",
    icon: "Camera",
    brandSlug: "hikvision",
    logo: "/partners/hikvision.svg",
  },
  {
    name: "Zebra Technologies",
    category: "Hardware & Devices",
    description: "Barcode scanners, rugged mobile computers and label printers for warehousing and retail.",
    icon: "Barcode",
    logo: "/partners/zebra.svg",
  },
  {
    name: "Urovo",
    category: "Hardware & Devices",
    description:
      "Urovo Android rugged handheld computers, mobile terminals and mPOS for warehouse, retail and field teams.",
    icon: "ScanLine",
    brandSlug: "urovo",
    logo: "/partners/urovo.png",
  },
  {
    name: "Honeywell",
    category: "Hardware & Devices",
    description: "Scanning and data capture hardware supplied for retail and logistics deployments.",
    icon: "ScanLine",
    logo: "/partners/honeywell.svg",
  },
  {
    name: "TSC Auto ID",
    category: "Hardware & Devices",
    description:
      "TSC thermal barcode and label printers — desktop, industrial, mobile and RFID — with ribbons, media and datasheets.",
    icon: "Printer",
    brandSlug: "tsc",
    logo: "/partners/tsc.svg",
  },
  {
    name: "Printronix",
    category: "Hardware & Devices",
    description:
      "Printronix line-matrix printers and Printronix Auto ID industrial thermal/RFID printers for the toughest print rooms.",
    icon: "Printer",
    brandSlug: "printronix",
    logo: "/partners/printronix.jpg",
  },
  {
    name: "TallyGenicom",
    category: "Hardware & Devices",
    description:
      "TallyGenicom line-matrix and serial-matrix impact printers for multipart forms, logistics and ERP print rooms.",
    icon: "Printer",
    brandSlug: "tallygenicom",
    logo: "/partners/tallygenicom.svg",
  },
  {
    name: "CommCare (Dimagi)",
    category: "Cloud & Software",
    description:
      "Dimagi-certified CommCare Provider — we deploy, build and support CommCare mobile data collection and case management for NGOs and health programs.",
    icon: "Smartphone",
    solutionSlug: "commcare",
    logo: "/partners/commcare.svg",
  },
  {
    name: "Smart Mobile Finance",
    category: "Cloud & Software",
    description:
      "EMI device-lock platform we deploy so Zimbabwean phone retailers can finance smartphones to customers on flexible installments, even without a bank account.",
    icon: "Lock",
    solutionSlug: "smartphone-financing",
    logo: "/partners/smartmobilefinance.png",
  },
];
