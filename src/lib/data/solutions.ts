import type { IconName } from "@/lib/icon-map";

export interface SolutionFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface SolutionUseCase {
  title: string;
  description: string;
}

export interface RelatedProduct {
  name: string;
  description: string;
  /** Links to a specific /webstore/product/[id] when a matching catalog item exists. */
  productId?: string;
}

export interface SolutionFAQ {
  question: string;
  answer: string;
}

export interface Solution {
  slug: string;
  name: string;
  /** Short blurb used on the hub card + as the SEO meta description. */
  shortDescription: string;
  /** Longer hero subheading on the detail page. */
  tagline: string;
  icon: IconName;
  /** Four short badges shown on the hub card. */
  badges: [string, string, string, string];
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  relatedProducts: RelatedProduct[];
  faqs: SolutionFAQ[];
}

export const solutions: Solution[] = [
  {
    slug: "ucaas",
    name: "UCaaS & VoIP",
    shortDescription:
      "Enterprise voice communications with HD calls, auto-attendants, call recording, and unified messaging.",
    tagline:
      "Enterprise-grade unified communications and Voice over IP solutions for businesses of all sizes.",
    icon: "Phone",
    badges: ["HD Voice", "Auto-Attendant", "Call Recording", "Mobile Apps"],
    features: [
      { icon: "Phone", title: "HD Voice Quality", description: "Crystal-clear calls over your existing internet connection — no dedicated phone lines required." },
      { icon: "Settings", title: "Auto-Attendant & IVR", description: "Route callers automatically with customizable menus, business hours, and call queues." },
      { icon: "Activity", title: "Call Recording & Analytics", description: "Record calls for training and compliance, with a dashboard tracking volume and performance." },
      { icon: "Smartphone", title: "Mobile & Desktop Apps", description: "Take your business line anywhere with softphone apps for iOS, Android, Windows, and Mac." },
      { icon: "Video", title: "Video Conferencing", description: "Built-in video meetings for internal and client calls — no extra subscription needed." },
      { icon: "Mail", title: "Voicemail to Email", description: "Voicemails transcribed and delivered straight to your inbox so nothing gets missed." },
    ],
    useCases: [
      { title: "Growing Sales Teams", description: "Give every rep a professional business line and call analytics without new hardware." },
      { title: "Multi-Branch Operations", description: "Unify branches on one phone system with shared extensions and call routing." },
      { title: "Remote & Hybrid Teams", description: "Staff working from anywhere stay reachable on their business number via mobile apps." },
    ],
    relatedProducts: [
      { name: "IP Desk Phones", description: "HD desk handsets pre-configured for your UCaaS extension.", productId: "yealink-t54w-ip-desk-phone" },
      { name: "USB Conference Speakerphones", description: "Plug-and-play speakerphones for meeting rooms and huddle spaces.", productId: "usb-conference-speakerphone" },
      { name: "SIP Headsets", description: "Noise-cancelling headsets for busy call center and sales environments.", productId: "sip-headset-noise-cancelling" },
    ],
    faqs: [
      { question: "Do I need new phone lines to switch to VoIP?", answer: "No — our UCaaS platform runs over your existing internet connection, so there's no need for traditional analog phone lines." },
      { question: "Can I keep my existing business numbers?", answer: "Yes, we handle number porting from your current provider with no downtime during the switch." },
      { question: "What happens if the internet goes down?", answer: "Calls automatically fail over to mobile apps or a backup number you configure, so you stay reachable." },
    ],
  },
  {
    slug: "3cx",
    name: "3CX Phone Systems",
    shortDescription:
      "Award-winning business phone system — hosted in the cloud or on-premise with video, live chat, and messaging.",
    tagline:
      "An all-in-one communications platform combining voice, video, and messaging — deployed the way that suits your business.",
    icon: "PhoneCall",
    badges: ["Cloud or On-Prem", "Video Meetings", "Live Chat", "Certified Partner"],
    features: [
      { icon: "PhoneCall", title: "All-in-One Platform", description: "Voice calls, video meetings, and messaging in a single system — no juggling separate tools." },
      { icon: "Video", title: "Free Video Conferencing", description: "Host video meetings for up to 250 participants with screen sharing, at no extra cost." },
      { icon: "Users", title: "Live Chat & Social Integration", description: "Answer website live chat, Facebook, and WhatsApp messages from the same 3CX console." },
      { icon: "Smartphone", title: "iOS & Android Apps", description: "Full-featured mobile apps keep your team connected to the office system on the move." },
      { icon: "Settings", title: "Simple Management Console", description: "A web-based admin panel makes adding extensions, queues, and routing rules straightforward." },
      { icon: "ShieldCheck", title: "Certified Local Support", description: "Tyflex is a certified 3CX partner, handling deployment, licensing, and ongoing support." },
    ],
    useCases: [
      { title: "Businesses Wanting Full Control", description: "Choose on-premise deployment for full ownership of your PBX and data." },
      { title: "Fast-Growing Companies", description: "Scale extensions and video licenses up as headcount grows, with no hardware swap." },
      { title: "Customer Support Teams", description: "Route calls, chats, and social messages into shared queues agents can pick up from one screen." },
    ],
    relatedProducts: [
      { name: "3CX-Compatible IP Phones", description: "Certified handsets that auto-provision with your 3CX system.", productId: "grandstream-gxp2170-ip-phone" },
      { name: "SIP Gateways", description: "Bridge existing analog lines or PSTN trunks into your 3CX deployment.", productId: "sip-gateway-4-port" },
      { name: "PBX Server Hardware", description: "On-premise server hardware sized for your extension count.", productId: "pbx-server-appliance" },
    ],
    faqs: [
      { question: "Should I choose cloud-hosted or on-premise 3CX?", answer: "Cloud-hosted suits businesses wanting zero server maintenance; on-premise suits those needing full data control. We'll help you decide based on your infrastructure." },
      { question: "How many participants can join a video call?", answer: "3CX video conferencing supports up to 250 participants per meeting, included in your license." },
      { question: "Can 3CX integrate with our existing CRM?", answer: "Yes, 3CX integrates with popular CRMs to pop up caller details and log call activity automatically." },
    ],
  },
  {
    slug: "barcode-scanning",
    name: "Barcode & Scanning",
    shortDescription:
      "Complete barcode solutions for warehousing, retail, and asset management with handheld and fixed scanners.",
    tagline:
      "End-to-end barcode and scanning solutions for warehousing, retail, and asset management.",
    icon: "Barcode",
    badges: ["Handheld Scanners", "Label Printing", "Inventory Sync", "Asset Tracking"],
    features: [
      { icon: "ScanLine", title: "Handheld & Fixed Scanners", description: "Rugged handheld and mounted scanners for warehouses, checkout counters, and production lines." },
      { icon: "Printer", title: "Label Printing", description: "Thermal label printers and design software for product, shelf, and shipping labels." },
      { icon: "Boxes", title: "Inventory Management", description: "Scan-in, scan-out workflows that sync stock counts in real time across locations." },
      { icon: "Package", title: "Asset Tracking", description: "Tag and track equipment and fixed assets across sites with barcode or QR-based audits." },
      { icon: "Wifi", title: "Wireless Data Capture", description: "Wi-Fi and Bluetooth scanners feed data straight into your systems without cables." },
      { icon: "BadgeCheck", title: "Rugged, Industrial-Grade", description: "Drop-tested, dust and water-resistant devices built for demanding environments." },
    ],
    useCases: [
      { title: "Warehousing & Logistics", description: "Speed up picking, packing, and receiving with mobile scanning at every step." },
      { title: "Retail Stock Control", description: "Keep shelf and back-of-store stock counts accurate with regular barcode audits." },
      { title: "Manufacturing & Assets", description: "Track work-in-progress and fixed assets from the production floor to dispatch." },
    ],
    relatedProducts: [
      { name: "Handheld 1D/2D Scanners", description: "Cordless scanners for retail counters and mobile stocktaking.", productId: "zebra-ds2208-handheld-scanner" },
      { name: "Thermal Label Printers", description: "Desktop and industrial label printers for barcode and shipping labels.", productId: "zebra-zd420-thermal-label-printer" },
      { name: "Rugged Mobile Computers", description: "Android-based handheld terminals combining scanning with inventory apps.", productId: "zebra-mc3300-rugged-mobile-computer" },
    ],
    faqs: [
      { question: "Can barcode scanners integrate with our existing POS or ERP?", answer: "Yes, our scanning solutions integrate with most POS and ERP systems, including the ones we deploy directly." },
      { question: "Do you supply both hardware and labels?", answer: "Yes — we supply scanners, printers, and consumables like labels and ribbons, all sourced and stocked locally." },
      { question: "What if a scanner is dropped or damaged?", answer: "We stock rugged, industrial-grade devices and offer repair and replacement support under our service plans." },
    ],
  },
  {
    slug: "enterprise-printing",
    name: "Enterprise Printing",
    shortDescription:
      "High-volume printers, managed print services, and document solutions for enterprise environments.",
    tagline:
      "High-volume printers, managed print services, and document workflow solutions built for enterprise output.",
    icon: "Printer",
    badges: ["Managed Print", "High-Volume", "Cost Tracking", "Document Workflow"],
    features: [
      { icon: "Printer", title: "High-Volume Printers", description: "Enterprise-grade laser printers and MFPs built for heavy daily print volumes." },
      { icon: "Activity", title: "Managed Print Services", description: "We monitor toner, service, and uptime so printing just works, without IT overhead." },
      { icon: "Receipt", title: "Cost Per Page Tracking", description: "Detailed reporting on print costs by department, user, or device to control spend." },
      { icon: "FileText", title: "Document Workflow", description: "Scan-to-email, scan-to-folder, and secure print release integrated into your network." },
      { icon: "ShieldCheck", title: "Secure Print Release", description: "Pull printing keeps sensitive documents off the output tray until you badge in." },
      { icon: "Wrench", title: "On-Site Maintenance", description: "Local technicians and genuine consumables keep devices running with minimal downtime." },
    ],
    useCases: [
      { title: "Corporate Offices", description: "Centralize printing fleets with predictable, tracked costs across departments." },
      { title: "Banks & Financial Services", description: "Secure print release and audit trails for sensitive customer documentation." },
      { title: "Schools & Institutions", description: "High-volume, low-cost-per-page printers built to handle daily academic output." },
    ],
    relatedProducts: [
      { name: "Enterprise Laser MFPs", description: "Multi-function print, copy, and scan devices for busy offices." },
      { name: "Managed Print Toner Plans", description: "Auto-replenished toner and consumables bundled into a monthly plan." },
      { name: "Document Scanners", description: "High-speed scanners for digitizing paper archives and daily workflows." },
    ],
    faqs: [
      { question: "What is managed print, and does it cost more?", answer: "Managed print bundles the device, consumables, and service into one predictable monthly cost — most clients pay less overall than buying toner ad hoc." },
      { question: "Can you support a mixed fleet of printer brands?", answer: "Yes, our managed print service covers most major printer brands, not just the units we supply." },
      { question: "Do you offer secure printing for confidential documents?", answer: "Yes, we deploy secure pull-printing so documents only print once the user authenticates at the device." },
    ],
  },
  {
    slug: "networking",
    name: "Networking",
    shortDescription:
      "Enterprise networking infrastructure — structured cabling, managed switches, firewalls, and Wi-Fi.",
    tagline:
      "Enterprise networking infrastructure built for performance and security, from the server room to the shop floor.",
    icon: "Network",
    badges: ["Structured Cabling", "Managed Switches", "Firewalls", "Wi-Fi Coverage"],
    features: [
      { icon: "Network", title: "Structured Cabling", description: "Certified copper and fiber cabling designed for reliability and future expansion." },
      { icon: "Server", title: "Managed Switches", description: "VLAN-segmented, monitored switching for predictable, secure network performance." },
      { icon: "Lock", title: "Firewalls & Security", description: "Next-generation firewalls with intrusion prevention to protect your perimeter." },
      { icon: "Wifi", title: "Enterprise Wi-Fi Coverage", description: "Site-surveyed access point deployment for reliable coverage across every floor." },
      { icon: "Activity", title: "Network Monitoring", description: "Proactive monitoring flags issues before they cause downtime." },
      { icon: "HardDrive", title: "Server Room Setup", description: "Racking, power, and cooling design for a clean, reliable server room." },
    ],
    useCases: [
      { title: "New Office Fit-Outs", description: "Cable and network a new site from the ground up, ready for day-one occupancy." },
      { title: "Multi-Site Businesses", description: "Connect branches securely with site-to-site VPNs and centralized management." },
      { title: "Warehouses & Factories", description: "Extend reliable Wi-Fi and wired coverage across large industrial floor plans." },
    ],
    relatedProducts: [
      { name: "Managed Network Switches", description: "Layer 2/3 switches for segmented, monitored enterprise networks.", productId: "unifi-24-port-poe-switch" },
      { name: "Enterprise Access Points", description: "High-density Wi-Fi access points for offices and warehouses.", productId: "unifi-6-access-point" },
      { name: "Firewall Appliances", description: "Next-gen firewalls with VPN and intrusion prevention built in.", productId: "fortigate-60f-firewall" },
    ],
    faqs: [
      { question: "Do you handle both cabling and equipment?", answer: "Yes, we design, cable, and supply the switches, firewalls, and access points, end to end." },
      { question: "Can you assess our existing network first?", answer: "Yes, we start most projects with a site survey and network audit to identify gaps before recommending equipment." },
      { question: "Do you offer ongoing network monitoring?", answer: "Yes, our managed network plans include proactive monitoring and alerting so issues are caught before they cause downtime." },
    ],
  },
  {
    slug: "pos-systems",
    name: "POS Systems",
    shortDescription:
      "Point-of-sale hardware and software for retail, hospitality, and services businesses.",
    tagline:
      "Point-of-sale systems designed for retail, hospitality, and services — fast, reliable, and easy to train staff on.",
    icon: "CreditCard",
    badges: ["Touch Terminals", "Receipt Printers", "Inventory Sync", "Offline Mode"],
    features: [
      { icon: "CreditCard", title: "Touch Screen Terminals", description: "Fast, intuitive checkout terminals built for high-traffic retail and hospitality." },
      { icon: "Printer", title: "Receipt Printers", description: "Reliable thermal receipt printers integrated directly with your POS software." },
      { icon: "Package", title: "Cash Drawers", description: "Secure, POS-triggered cash drawers for accurate till management." },
      { icon: "Boxes", title: "Inventory Sync", description: "Stock levels update automatically with every sale, across single or multi-store setups." },
      { icon: "BarChart", title: "Sales Reporting", description: "Real-time dashboards on sales, best-sellers, and staff performance." },
      { icon: "Wifi", title: "Offline Mode", description: "Keep selling during internet outages — transactions sync once you're back online." },
    ],
    useCases: [
      { title: "Retail Stores", description: "Fast checkout with barcode scanning and live inventory across one or many branches." },
      { title: "Restaurants & Cafés", description: "Table and order management paired with kitchen printer integration." },
      { title: "Service Businesses", description: "Combine sales, bookings, and invoicing in a single point-of-sale workflow." },
    ],
    relatedProducts: [
      { name: "All-in-One POS Terminals", description: "Touchscreen terminals with built-in card reader support.", productId: "all-in-one-touchscreen-pos-terminal" },
      { name: "Receipt & Kitchen Printers", description: "Thermal printers for receipts, tickets, and kitchen orders.", productId: "thermal-receipt-printer" },
      { name: "Barcode Scanners for POS", description: "Handheld and counter-mounted scanners for fast checkout.", productId: "barcode-scanner-for-pos" },
    ],
    faqs: [
      { question: "Does the POS work without internet?", answer: "Yes, our POS systems support offline mode, queuing transactions and syncing automatically once connectivity returns." },
      { question: "Can it handle multiple store locations?", answer: "Yes, inventory and sales reporting can be centralized across as many branches as you operate." },
      { question: "Is staff training included?", answer: "Yes, on-site training is included with every POS deployment so your team is confident from day one." },
    ],
  },
  {
    slug: "erp-software",
    name: "ERP Software",
    shortDescription:
      "Unified business management — finance, HR, inventory, and operations in one integrated platform.",
    tagline:
      "Unified business management software connecting finance, HR, inventory, and operations in one platform built for African businesses.",
    icon: "Database",
    badges: ["Financial Mgmt", "HR & Payroll", "Inventory Control", "Custom Modules"],
    features: [
      { icon: "Receipt", title: "Financial Management", description: "General ledger, accounts payable/receivable, and reporting in one system." },
      { icon: "Users", title: "HR & Payroll", description: "Employee records, leave, and payroll processing aligned to local regulations." },
      { icon: "Boxes", title: "Inventory Control", description: "Multi-warehouse stock tracking with automatic reorder alerts." },
      { icon: "Settings", title: "Custom Modules", description: "Extend the platform with modules tailored to your specific industry workflows." },
      { icon: "BarChart", title: "Real-Time Reporting", description: "Dashboards give leadership a live view across finance, stock, and operations." },
      { icon: "Lock", title: "Role-Based Access", description: "Granular permissions keep sensitive financial and HR data restricted appropriately." },
    ],
    useCases: [
      { title: "Multi-Branch Retailers", description: "Consolidate financials and stock across branches into one source of truth." },
      { title: "Manufacturers", description: "Track raw materials through to finished goods with integrated costing." },
      { title: "Growing SMEs", description: "Replace disconnected spreadsheets with one system as the business scales." },
    ],
    relatedProducts: [
      { name: "ERP Implementation Package", description: "Configuration, data migration, and training for your ERP rollout." },
      { name: "Barcode Integration Add-On", description: "Connect warehouse scanning directly into ERP inventory records." },
      { name: "Custom Reporting Module", description: "Tailored dashboards and exports built around your KPIs." },
    ],
    faqs: [
      { question: "How long does an ERP implementation take?", answer: "Most implementations take 6-12 weeks depending on modules and data migration complexity — we scope this with you upfront." },
      { question: "Can it replace our current accounting software?", answer: "Yes, the financial management module is built to fully replace standalone accounting software, with migration support included." },
      { question: "Is training included for staff?", answer: "Yes, role-based training is included so finance, HR, and warehouse teams are each confident in the modules they use." },
    ],
  },
  {
    slug: "bulk-messaging",
    name: "Bulk Messaging",
    shortDescription:
      "Reach thousands instantly with bulk SMS and WhatsApp. Smart scheduling, personalization, and analytics.",
    tagline:
      "Reach thousands of customers instantly with bulk SMS and WhatsApp messaging, powered by our OmniFlex platform.",
    icon: "MessageSquare",
    badges: ["Bulk SMS", "WhatsApp API", "Scheduled Sends", "Delivery Reports"],
    features: [
      { icon: "Mail", title: "Bulk SMS Campaigns", description: "Send personalized SMS campaigns to thousands of contacts in seconds." },
      { icon: "Smartphone", title: "WhatsApp Business API", description: "Reach customers on WhatsApp with templated, verified business messaging." },
      { icon: "Calendar", title: "Scheduled Delivery", description: "Queue campaigns for the optimal send time, including recurring messages." },
      { icon: "BarChart", title: "Delivery Reports", description: "Track delivery, opens, and responses in real time from one dashboard." },
      { icon: "Settings", title: "Contact Segmentation", description: "Target campaigns by customer group, location, or purchase history." },
      { icon: "Lock", title: "Compliant & Secure", description: "Opt-out handling and secure contact storage built into every campaign." },
    ],
    useCases: [
      { title: "Retail Promotions", description: "Announce sales and restocks directly to customers' phones for instant reach." },
      { title: "Appointment Reminders", description: "Cut no-shows with automated SMS/WhatsApp reminders ahead of bookings." },
      { title: "Banking & Utilities", description: "Send transactional alerts and notices at scale with reliable delivery." },
    ],
    relatedProducts: [
      { name: "OmniFlex SMS Credits", description: "Prepaid bulk SMS bundles for ongoing campaign sending." },
      { name: "WhatsApp API Onboarding", description: "Business verification and template setup for WhatsApp messaging." },
      { name: "Campaign Management Add-On", description: "Advanced segmentation and automation tools for larger senders." },
    ],
    faqs: [
      { question: "What's the difference between bulk SMS and WhatsApp messaging?", answer: "SMS reaches any phone with no app required; WhatsApp messaging offers richer media and higher engagement but requires recipients to have WhatsApp." },
      { question: "Do I need approval to send WhatsApp campaigns?", answer: "Yes, WhatsApp Business API requires template approval — we handle that verification process as part of onboarding." },
      { question: "Can I see who opened or responded to a campaign?", answer: "Yes, the dashboard shows delivery status and responses in real time for every campaign you send." },
    ],
  },
  {
    slug: "sip-trunking",
    name: "SIP Trunking",
    shortDescription:
      "Connect your existing PBX to the cloud with reliable, cost-effective SIP trunk lines.",
    tagline:
      "Connect your existing phone system to the cloud with reliable, cost-effective SIP trunk lines.",
    icon: "Radio",
    badges: ["PBX Connectivity", "Local & Int'l Rates", "Redundant Routing", "Easy Migration"],
    features: [
      { icon: "Radio", title: "Direct PBX Connectivity", description: "Bring SIP trunks straight into your existing PBX — no need to replace hardware." },
      { icon: "Receipt", title: "Competitive Local & International Rates", description: "Lower call costs than traditional lines, with transparent per-minute billing." },
      { icon: "ShieldCheck", title: "Redundant Routing", description: "Automatic failover between routes keeps calls connecting even during outages." },
      { icon: "Settings", title: "Flexible Channel Scaling", description: "Add or remove concurrent call channels as your call volume changes." },
      { icon: "Activity", title: "Real-Time Call Monitoring", description: "A portal for tracking call quality, usage, and billing in one place." },
      { icon: "Wrench", title: "Easy Migration", description: "We handle number porting and configuration for a smooth cutover from your current provider." },
    ],
    useCases: [
      { title: "Businesses with Existing PBX", description: "Keep your current phone system while cutting call costs with SIP trunks." },
      { title: "Call Centers", description: "Scale concurrent call channels up during peak periods without new hardware." },
      { title: "Multi-Branch Offices", description: "Centralize trunking for all branches through one provider and one invoice." },
    ],
    relatedProducts: [
      { name: "SIP Trunk Channel Bundles", description: "Prepaid or postpaid channel plans sized to your call volume." },
      { name: "SIP Gateways", description: "Hardware gateways to bridge legacy PBX systems onto SIP trunks." },
      { name: "Session Border Controllers", description: "Secure your SIP trunk connection at the network edge." },
    ],
    faqs: [
      { question: "Will SIP trunking work with our current PBX?", answer: "In most cases yes — we assess your PBX compatibility during onboarding and configure the trunk to match." },
      { question: "How many concurrent calls can a SIP trunk handle?", answer: "Channel count is flexible and based on your needs — we size it to your typical and peak concurrent call volume." },
      { question: "What happens if our internet connection drops?", answer: "Redundant routing and optional failover to mobile numbers keep you reachable during an outage." },
    ],
  },
  {
    slug: "electrical-supplies",
    name: "Electrical Supplies",
    shortDescription:
      "Quality electrical components, cabling, and backup power equipment for commercial installations.",
    tagline:
      "Quality electrical components, cabling, and backup power equipment sourced and supplied for commercial installations.",
    icon: "Zap",
    badges: ["Cabling & Conduit", "Backup Power", "Certified Components", "Bulk Supply"],
    features: [
      { icon: "Zap", title: "Backup Power Equipment", description: "Inverters, UPS units, and generator accessories to keep operations running through outages." },
      { icon: "Plug", title: "Cabling & Conduit", description: "Certified electrical cable, trunking, and conduit for commercial and industrial installs." },
      { icon: "ShieldCheck", title: "Certified Components", description: "Breakers, distribution boards, and switchgear from reputable, compliant manufacturers." },
      { icon: "Boxes", title: "Bulk Supply", description: "Volume pricing and stock reservations for contractors and large installations." },
      { icon: "Lightbulb", title: "Commercial Lighting", description: "Energy-efficient LED fittings for offices, warehouses, and retail spaces." },
      { icon: "Wrench", title: "Installation Support", description: "Access to vetted electrical contractors for supply-and-install projects." },
    ],
    useCases: [
      { title: "Office & Retail Fit-Outs", description: "Source cabling, distribution boards, and lighting for a new fit-out in one order." },
      { title: "Backup Power Projects", description: "Equip sites with inverters and UPS systems to ride through load-shedding." },
      { title: "Contractors & Installers", description: "Reliable bulk supply and stock availability for ongoing electrical projects." },
    ],
    relatedProducts: [
      { name: "Inverters & UPS Units", description: "Backup power systems sized for offices, shops, and server rooms." },
      { name: "Distribution Boards", description: "Certified DBs and breakers for commercial electrical installations." },
      { name: "LED Lighting Fittings", description: "Energy-efficient commercial and industrial lighting fixtures." },
    ],
    faqs: [
      { question: "Do you supply electrical components in bulk for contractors?", answer: "Yes, we offer volume pricing and stock reservations for contractors and large commercial installations." },
      { question: "Can you recommend backup power sizing for our site?", answer: "Yes, our team will assess your load requirements and recommend the right inverter or generator capacity." },
      { question: "Do you offer installation, or supply only?", answer: "We primarily supply equipment, and can connect you with vetted electrical contractors for installation." },
    ],
  },
  {
    slug: "cloud-pbx",
    name: "Cloud PBX",
    shortDescription:
      "A fully hosted phone system — no on-site hardware, managed and maintained entirely in the cloud.",
    tagline:
      "A fully hosted phone system with no on-site hardware — managed, maintained, and backed up entirely in the cloud.",
    icon: "PhoneOutgoing",
    badges: ["Zero Hardware", "Instant Scaling", "99.9% Uptime", "Managed by Tyflex"],
    features: [
      { icon: "Cloud", title: "Zero On-Site Hardware", description: "Your PBX runs entirely in the cloud, removing the need for a physical server or box on-site." },
      { icon: "Settings", title: "Instant Extension Scaling", description: "Add new users and extensions in minutes as your team grows — no hardware order needed." },
      { icon: "ShieldCheck", title: "Built-In Redundancy", description: "Geographically redundant infrastructure backs a 99.9% uptime SLA." },
      { icon: "Smartphone", title: "Anywhere Access", description: "Staff connect from office desk phones, mobile apps, or softphones with the same extension." },
      { icon: "Activity", title: "Usage Dashboards", description: "Admins get visibility into call volumes, queues, and extension activity." },
      { icon: "Wrench", title: "Fully Managed by Tyflex", description: "We handle updates, backups, and maintenance so your team never has to think about it." },
    ],
    useCases: [
      { title: "Businesses Avoiding CapEx", description: "Skip the upfront cost of PBX hardware with a predictable monthly subscription." },
      { title: "Rapid Expansion", description: "Open a new branch and have phones live within days, not weeks." },
      { title: "Disaster Recovery", description: "Cloud PBX keeps your phone system running even if an office site goes offline." },
    ],
    relatedProducts: [
      { name: "Cloud PBX Extension Plans", description: "Per-user monthly plans covering hosting, support, and updates." },
      { name: "IP Desk Phones", description: "Pre-provisioned handsets that connect straight to your cloud PBX." },
      { name: "SIP Trunk Add-On", description: "Bring your own trunk lines into your cloud-hosted PBX." },
    ],
    faqs: [
      { question: "What happens if our internet connection fails?", answer: "Calls can automatically forward to mobile numbers you configure, so you stay reachable even during an outage." },
      { question: "Is Cloud PBX cheaper than an on-premise system?", answer: "There's no upfront hardware cost, so most businesses see a lower total cost of ownership over a few years, paid as a predictable monthly fee." },
      { question: "Can we migrate from our current PBX without losing numbers?", answer: "Yes, we handle number porting so your business numbers move over with no disruption." },
    ],
  },
  {
    slug: "smart-building",
    name: "Smart Building Solutions",
    shortDescription:
      "Access control, CCTV, and building automation systems that make properties smarter and more secure.",
    tagline:
      "Access control, CCTV, and building automation systems that make commercial properties smarter, safer, and more efficient.",
    icon: "Building2",
    badges: ["Access Control", "CCTV & Monitoring", "Automation", "Remote Management"],
    features: [
      { icon: "Lock", title: "Access Control", description: "Card, biometric, and app-based access control for doors, gates, and turnstiles." },
      { icon: "Video", title: "CCTV & Video Monitoring", description: "HD IP cameras with remote viewing and motion-triggered alerts." },
      { icon: "Settings", title: "Building Automation", description: "Automate lighting, HVAC, and power systems for efficiency and comfort." },
      { icon: "Activity", title: "Centralized Monitoring", description: "Manage access, cameras, and alarms from a single dashboard across sites." },
      { icon: "ShieldCheck", title: "Intrusion & Fire Alarms", description: "Integrated alarm systems that notify security teams the moment something's wrong." },
      { icon: "Smartphone", title: "Remote Management", description: "Grant access, view footage, and adjust settings remotely from a mobile app." },
    ],
    useCases: [
      { title: "Corporate Campuses", description: "Manage access and surveillance across multiple buildings from one system." },
      { title: "Warehouses & Depots", description: "Monitor perimeter security and control vehicle/staff access after hours." },
      { title: "Retail Chains", description: "Standardize security systems across branches with central monitoring." },
    ],
    relatedProducts: [
      { name: "IP CCTV Camera Kits", description: "HD camera systems with NVR recording and remote viewing." },
      { name: "Access Control Readers", description: "Card and biometric readers for doors and gates." },
      { name: "Building Automation Controllers", description: "Smart controllers for lighting, HVAC, and power scheduling." },
    ],
    faqs: [
      { question: "Can access control and CCTV be managed from one system?", answer: "Yes, we deploy integrated platforms that combine access control, CCTV, and alarms into a single dashboard." },
      { question: "Can I view camera footage remotely from my phone?", answer: "Yes, our systems include mobile apps for live viewing and footage playback from anywhere." },
      { question: "Do you support multi-site deployments?", answer: "Yes, our smart building systems are built to manage multiple properties centrally, with per-site permissions." },
    ],
  },
  {
    slug: "meeting-rooms",
    name: "Meeting Room Solutions",
    shortDescription:
      "Video conferencing, screen sharing, and audio equipment that turn any room into a smart meeting space.",
    tagline:
      "Video conferencing, screen sharing, and audio equipment that turn any room into a smart, easy-to-use meeting space.",
    icon: "Presentation",
    badges: ["Video Conferencing", "Wireless Sharing", "Room Booking", "One-Touch Join"],
    features: [
      { icon: "Video", title: "Video Conferencing Kits", description: "Camera, speaker, and microphone bundles tuned for clear meeting room audio and video." },
      { icon: "ScreenShare", title: "Wireless Screen Sharing", description: "Present from any laptop or phone without hunting for the right cable." },
      { icon: "Calendar", title: "Room Booking Displays", description: "Touch-panel displays outside rooms show availability and let staff book on the spot." },
      { icon: "Presentation", title: "Interactive Displays", description: "Touchscreen displays for whiteboarding and presentations, in person or remote." },
      { icon: "Settings", title: "One-Touch Meeting Join", description: "Join scheduled Teams, Zoom, or Google Meet calls with a single tap." },
      { icon: "Wrench", title: "Room Design & Install", description: "We design AV layouts and handle full installation for new or refurbished rooms." },
    ],
    useCases: [
      { title: "Hybrid Meeting Rooms", description: "Equip rooms so in-person and remote attendees can collaborate seamlessly." },
      { title: "Boardrooms", description: "Premium video and audio setups for executive meetings and client presentations." },
      { title: "Training & Huddle Spaces", description: "Flexible, affordable AV kits for smaller collaboration spaces." },
    ],
    relatedProducts: [
      { name: "All-in-One Video Bars", description: "Compact camera, speaker, and mic units for small to mid-size rooms." },
      { name: "Wireless Presentation Systems", description: "Plug-and-play wireless screen sharing devices." },
      { name: "Room Booking Panels", description: "Touch displays showing live room availability and booking." },
    ],
    faqs: [
      { question: "Will the equipment work with Teams, Zoom, and Google Meet?", answer: "Yes, our meeting room kits are certified for all major platforms including Microsoft Teams, Zoom, and Google Meet." },
      { question: "Do you handle installation and cabling?", answer: "Yes, we design the AV layout and handle full installation, from mounting displays to running cabling." },
      { question: "Can we add room booking displays later?", answer: "Yes, room booking panels can be added to any meeting room setup at any time and integrate with your calendar system." },
    ],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams Integration",
    shortDescription:
      "Direct Routing and certified devices that bring calling, meetings, and telephony into Microsoft Teams.",
    tagline:
      "Direct Routing and certified devices that bring business calling, meetings, and telephony into Microsoft Teams.",
    icon: "Video",
    badges: ["Direct Routing", "Certified Devices", "PSTN Calling", "Single App"],
    features: [
      { icon: "Video", title: "Teams Direct Routing", description: "Connect your existing phone numbers to Teams so calls work natively inside the app." },
      { icon: "Radio", title: "PSTN Calling", description: "Make and receive external calls from Teams without a separate phone system." },
      { icon: "Monitor", title: "Certified Teams Devices", description: "Desk phones, headsets, and meeting room hardware certified for Microsoft Teams." },
      { icon: "LayoutGrid", title: "Single App for Everything", description: "Chat, meetings, files, and phone calls all in the one app your team already uses." },
      { icon: "Settings", title: "Admin Center Management", description: "Manage calling policies and numbers directly from the Microsoft Teams admin center." },
      { icon: "Wrench", title: "Migration & Onboarding", description: "We handle number porting and configuration for a smooth move to Teams calling." },
    ],
    useCases: [
      { title: "Microsoft 365 Businesses", description: "Add phone calling to an existing Microsoft 365 and Teams subscription." },
      { title: "Remote-First Teams", description: "Give distributed staff one app for chat, meetings, and calling anywhere." },
      { title: "Businesses Consolidating Tools", description: "Retire a separate phone system and unify communications inside Teams." },
    ],
    relatedProducts: [
      { name: "Teams-Certified Desk Phones", description: "Handsets that run the native Teams calling app." },
      { name: "Teams-Certified Headsets", description: "Headsets optimized for Teams calls and meetings." },
      { name: "Direct Routing Setup", description: "Configuration service connecting your numbers to Teams via SIP trunking." },
    ],
    faqs: [
      { question: "What is Direct Routing?", answer: "Direct Routing connects Microsoft Teams to the public phone network through a certified SIP trunk, letting you make and receive external calls inside Teams." },
      { question: "Do we need a Microsoft 365 license that includes calling?", answer: "You'll need a Teams Phone-enabled Microsoft 365 license; we can advise on the right plan for your organization." },
      { question: "Can we keep our existing business numbers?", answer: "Yes, we port your existing numbers into Teams Direct Routing with no disruption to service." },
    ],
  },
  {
    slug: "aws-cloud-solutions",
    name: "AWS Cloud Solutions",
    shortDescription:
      "Cloud hosting, migration, and managed AWS infrastructure for businesses moving off on-premise servers.",
    tagline:
      "Cloud hosting, migration, and managed AWS infrastructure for businesses moving off on-premise servers.",
    icon: "Cloud",
    badges: ["Cloud Migration", "Managed Hosting", "Backup & DR", "Cost Optimization"],
    features: [
      { icon: "Cloud", title: "Cloud Migration", description: "Move servers, applications, and storage from on-premise into AWS with minimal downtime." },
      { icon: "Server", title: "Managed Hosting", description: "We manage your AWS environment — patching, scaling, and monitoring included." },
      { icon: "HardDrive", title: "Backup & Disaster Recovery", description: "Automated backups and recovery plans keep your data safe and restorable." },
      { icon: "Lock", title: "Cloud Security", description: "Identity management, encryption, and network security configured to best practice." },
      { icon: "BarChart", title: "Cost Optimization", description: "Right-sizing and reserved capacity reviews to keep your AWS bill under control." },
      { icon: "Activity", title: "24/7 Infrastructure Monitoring", description: "Proactive alerts on performance and availability across your cloud environment." },
    ],
    useCases: [
      { title: "Businesses Retiring On-Premise Servers", description: "Move off aging hardware into scalable, managed cloud infrastructure." },
      { title: "Applications Needing Scale", description: "Handle traffic spikes with auto-scaling cloud infrastructure instead of fixed hardware." },
      { title: "Disaster Recovery Planning", description: "Keep a cloud-based recovery environment ready in case of an on-premise outage." },
    ],
    relatedProducts: [
      { name: "AWS Migration Assessment", description: "A scoped review of your current infrastructure and migration plan." },
      { name: "Managed AWS Support Plan", description: "Ongoing monitoring, patching, and support for your AWS environment." },
      { name: "Cloud Backup Configuration", description: "Automated backup and disaster recovery setup on AWS." },
    ],
    faqs: [
      { question: "Is our data safe moving to AWS?", answer: "Yes, AWS operates to enterprise-grade security and compliance standards, and we configure encryption, access control, and backups as part of every migration." },
      { question: "How long does a typical cloud migration take?", answer: "Most migrations take 2-8 weeks depending on the number of systems and complexity — we scope this during the assessment phase." },
      { question: "Will you manage our AWS environment after migration?", answer: "Yes, our managed support plans handle ongoing monitoring, patching, and cost optimization after go-live." },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
