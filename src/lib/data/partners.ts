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
}

export const partners: Partner[] = [
  {
    name: "3CX",
    category: "Communications",
    description:
      "Certified 3CX partner — we license, deploy and support 3CX phone systems in the cloud or on-premise, with video, live chat and mobile apps.",
    icon: "PhoneCall",
    brandSlug: "3cx",
  },
  {
    name: "Yeastar",
    category: "Communications",
    description:
      "Yeastar P-Series IP-PBX, cloud PBX and VoIP gateways — the platform behind the multi-province call centres we run in Zimbabwe.",
    icon: "PhoneOutgoing",
    brandSlug: "yeastar",
  },
  {
    name: "Yealink",
    category: "Communications",
    description:
      "Yealink IP desk phones, DECT cordless, headsets and Teams/Zoom room systems — supplied and provisioned for VoIP and 3CX deployments.",
    icon: "Phone",
    brandSlug: "yealink",
  },
  {
    name: "Fanvil",
    category: "Communications",
    description:
      "Fanvil IP phones, SIP video door intercoms and paging speakers — cost-effective endpoints that auto-provision with 3CX and Yeastar.",
    icon: "Phone",
    brandSlug: "fanvil",
  },
  {
    name: "Grandstream",
    category: "Communications",
    description: "IP phones, gateways and PBX hardware supporting our UCaaS and 3CX installations.",
    icon: "Phone",
  },
  {
    name: "Microsoft",
    category: "Cloud & Software",
    description: "Microsoft Teams calling and Direct Routing integration for businesses standardizing on Microsoft 365.",
    icon: "Video",
  },
  {
    name: "AWS",
    category: "Cloud & Software",
    description:
      "AWS Partner — cloud migration, hosting, backup, disaster recovery and secure landing zones on Amazon Web Services.",
    icon: "Cloud",
    brandSlug: "aws",
  },
  {
    name: "Ubiquiti",
    category: "Networking & Security",
    description: "UniFi switches and access points forming the backbone of the enterprise networks we install.",
    icon: "Wifi",
  },
  {
    name: "Fortinet",
    category: "Networking & Security",
    description: "FortiGate firewalls and security appliances protecting the networks we design and manage.",
    icon: "Lock",
  },
  {
    name: "Hikvision",
    category: "Networking & Security",
    description:
      "Hikvision IP cameras, NVRs, PoE switches, access control and displays — designed, installed and maintained by Tyflex.",
    icon: "Camera",
    brandSlug: "hikvision",
  },
  {
    name: "Zebra Technologies",
    category: "Hardware & Devices",
    description: "Barcode scanners, rugged mobile computers and label printers for warehousing and retail.",
    icon: "Barcode",
  },
  {
    name: "Urovo",
    category: "Hardware & Devices",
    description:
      "Urovo Android rugged handheld computers, mobile terminals and mPOS for warehouse, retail and field teams.",
    icon: "ScanLine",
    brandSlug: "urovo",
  },
  {
    name: "Honeywell",
    category: "Hardware & Devices",
    description: "Scanning and data capture hardware supplied for retail and logistics deployments.",
    icon: "ScanLine",
  },
  {
    name: "TSC Auto ID",
    category: "Hardware & Devices",
    description:
      "TSC thermal barcode and label printers — desktop, industrial, mobile and RFID — with ribbons, media and datasheets.",
    icon: "Printer",
    brandSlug: "tsc",
  },
  {
    name: "Printronix",
    category: "Hardware & Devices",
    description:
      "Printronix line-matrix printers and Printronix Auto ID industrial thermal/RFID printers for the toughest print rooms.",
    icon: "Printer",
    brandSlug: "printronix",
  },
  {
    name: "TallyGenicom",
    category: "Hardware & Devices",
    description:
      "TallyGenicom line-matrix and serial-matrix impact printers for multipart forms, logistics and ERP print rooms.",
    icon: "Printer",
    brandSlug: "tallygenicom",
  },
];
