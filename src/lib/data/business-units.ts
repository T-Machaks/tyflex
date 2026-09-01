import type { IconName } from "@/lib/icon-map";

export interface BusinessUnit {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  icon: IconName;
  focus: string[];
}

export const businessUnits: BusinessUnit[] = [
  {
    name: "FlexTech",
    tagline: "Enterprise IT & Networking",
    description:
      "Our founding division — networking infrastructure, cloud solutions, and enterprise IT support for businesses across Zimbabwe.",
    founded: 2009,
    icon: "Network",
    focus: ["Networking & Structured Cabling", "AWS Cloud Solutions", "Smart Building Systems"],
  },
  {
    name: "vFlex",
    tagline: "Unified Communications",
    description:
      "Voice and unified communications division, delivering VoIP, 3CX, SIP trunking, and cloud PBX systems to businesses of every size.",
    founded: 2012,
    icon: "Phone",
    focus: ["VoIP & UCaaS", "3CX Phone Systems", "SIP Trunking & Cloud PBX"],
  },
  {
    name: "FlexPOS",
    tagline: "Retail & Point of Sale",
    description:
      "Retail technology division, equipping shops, restaurants, and service businesses with POS terminals, barcode scanning, and printing hardware.",
    founded: 2014,
    icon: "CreditCard",
    focus: ["POS Systems", "AutoID Solutions", "Hardware-as-a-Service"],
  },
  {
    name: "Getsiman",
    tagline: "Electrical & Power Solutions",
    description:
      "Electrical supplies and backup power division, sourcing cabling, distribution boards, and inverter systems for commercial installations.",
    founded: 2016,
    icon: "Zap",
    focus: ["Electrical Supplies", "Backup Power Systems", "Commercial Lighting"],
  },
  {
    name: "OmniFlex",
    tagline: "Business Messaging",
    description:
      "Our bulk messaging platform, sending millions of SMS and WhatsApp messages a year to help businesses reach customers at scale.",
    founded: 2018,
    icon: "MessageSquare",
    focus: ["Bulk SMS Campaigns", "WhatsApp Business API", "Customer Engagement"],
  },
  {
    name: "MacFlex",
    tagline: "Enterprise Software & Hardware",
    description:
      "ERP software and enterprise hardware distribution division, connecting finance, HR, and inventory for growing businesses.",
    founded: 2020,
    icon: "Database",
    focus: ["ERP Software", "Microsoft Teams Integration", "Enterprise Hardware"],
  },
];

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineMilestone[] = [
  {
    year: "2009",
    title: "Tyflex Investments Founded",
    description: "Founded in Harare with FlexTech, laying the foundation for enterprise technology services in Zimbabwe.",
  },
  {
    year: "2012",
    title: "vFlex Launches",
    description: "Unified communications division launches, bringing VoIP and business phone systems to local companies.",
  },
  {
    year: "2014",
    title: "FlexPOS Launches",
    description: "Retail technology division launches, equipping shops and restaurants with point-of-sale hardware.",
  },
  {
    year: "2016",
    title: "Getsiman Launches",
    description: "Expansion into electrical supplies and backup power to meet growing infrastructure demand.",
  },
  {
    year: "2018",
    title: "OmniFlex Launches",
    description: "Bulk messaging platform launches, scaling to reach millions of customers on behalf of clients.",
  },
  {
    year: "2020",
    title: "MacFlex Launches",
    description: "ERP software and enterprise hardware distribution division rounds out the group's offering.",
  },
  {
    year: "2023",
    title: "50+ Active Clients",
    description: "Crossed 50 active clients and expanded the solutions catalog across six divisions.",
  },
  {
    year: "Today",
    title: "Tyflex Digital Platform",
    description: "Launched our webstore, client document portal, and project tracker — bringing the business online.",
  },
];
