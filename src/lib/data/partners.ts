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
}

export const partners: Partner[] = [
  {
    name: "3CX",
    category: "Communications",
    description: "Business phone systems — we deploy and support 3CX for cloud-hosted and on-premise voice, video, and live chat.",
    icon: "PhoneCall",
  },
  {
    name: "Yealink",
    category: "Communications",
    description: "IP desk phones and video conferencing hardware we supply and provision for VoIP and 3CX deployments.",
    icon: "Phone",
  },
  {
    name: "Grandstream",
    category: "Communications",
    description: "IP phones, gateways, and PBX hardware supporting our UCaaS and 3CX installations.",
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
    description: "Cloud hosting, migration, and managed infrastructure built on Amazon Web Services.",
    icon: "Cloud",
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
    name: "Zebra Technologies",
    category: "Hardware & Devices",
    description: "Barcode scanners, rugged mobile computers, and label printers for warehousing and retail.",
    icon: "Barcode",
  },
  {
    name: "Honeywell",
    category: "Hardware & Devices",
    description: "Scanning and data capture hardware supplied for retail and logistics deployments.",
    icon: "ScanLine",
  },
  {
    name: "TSC",
    category: "Hardware & Devices",
    description: "Thermal label printers used across our barcode and retail labeling solutions.",
    icon: "Printer",
  },
];
