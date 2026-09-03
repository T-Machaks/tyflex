import type { IconName } from "@/lib/icon-map";

export const PRODUCT_CATEGORIES = [
  "Phone Systems",
  "Barcode Scanners",
  "Label Printers",
  "Networking",
  "POS",
  "3CX Licenses",
  "Accessories",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  icon: IconName;
  /**
   * USD reference price. Currently NOT surfaced anywhere in the UI — catalog
   * pricing is stubbed while ordering is inquiry-based (demo figures). Kept as
   * reference data for when real pricing is wired back in.
   */
  price: number;
  featured: boolean;
  specs: ProductSpec[];
  /** Manufacturer, when the product is a branded third-party item (e.g. "Hikvision"). */
  brand?: string;
  /** Product photo under /public (falls back to the icon when absent). */
  image?: string;
  /** Public path to a downloadable datasheet PDF, when one is published. */
  datasheet?: string;
}

export const products: Product[] = [
  // Phone Systems
  {
    id: "yealink-t54w-ip-desk-phone",
    name: "Yealink T54W IP Desk Phone",
    category: "Phone Systems",
    shortDescription: "HD-voice Wi-Fi desk phone with a color touchscreen, built for UCaaS and 3CX deployments.",
    description:
      "A premium IP desk phone for busy desks and executive offices. Pairs Gigabit Ethernet with built-in Wi-Fi and Bluetooth so it drops into almost any office layout, and supports up to 16 SIP accounts for multi-line setups.",
    icon: "Phone",
    price: 145,
    featured: true,
    specs: [
      { label: "Display", value: "4.3\" color touchscreen" },
      { label: "Connectivity", value: "Wi-Fi, Bluetooth, Gigabit Ethernet" },
      { label: "Lines", value: "Up to 16 SIP accounts" },
      { label: "Audio", value: "HD voice, full-duplex speakerphone" },
    ],
  },
  {
    id: "grandstream-gxp2170-ip-phone",
    name: "Grandstream GXP2170 IP Phone",
    category: "Phone Systems",
    shortDescription: "12-line executive IP phone with dual Gigabit ports and a large backlit display.",
    description:
      "Built for high-call-volume roles like reception and support desks, with 12 configurable line keys, a built-in PoE port, and a large backlit LCD for at-a-glance call status.",
    icon: "Phone",
    price: 165,
    featured: false,
    specs: [
      { label: "Display", value: "4.3\" backlit LCD" },
      { label: "Lines", value: "Up to 12 SIP accounts" },
      { label: "Ports", value: "Dual Gigabit, PoE" },
      { label: "Audio", value: "HD voice, 3-way conferencing" },
    ],
  },
  {
    id: "sip-gateway-4-port",
    name: "4-Port SIP/FXO Gateway",
    category: "Phone Systems",
    shortDescription: "Bridges existing analog phone lines into your SIP trunk, 3CX, or cloud PBX.",
    description:
      "Keep legacy fax machines and analog handsets working while you move your core system to SIP. Four FXO ports connect directly to PSTN lines and route calls into your VoIP system.",
    icon: "Radio",
    price: 220,
    featured: false,
    specs: [
      { label: "Ports", value: "4x FXO" },
      { label: "Protocol", value: "SIP" },
      { label: "Compatibility", value: "3CX, most cloud PBX platforms" },
      { label: "Management", value: "Web-based configuration" },
    ],
  },
  {
    id: "pbx-server-appliance",
    name: "On-Premise PBX Server Appliance",
    category: "Phone Systems",
    shortDescription: "Rack-mountable server pre-loaded for on-premise 3CX or PBX deployments, up to 100 extensions.",
    description:
      "A right-sized rack server for businesses that want full control of their phone system on-site. Comes pre-configured and ready for our engineers to deploy your PBX software.",
    icon: "Server",
    price: 890,
    featured: true,
    specs: [
      { label: "Form Factor", value: "1U rack-mountable" },
      { label: "Capacity", value: "Up to 100 extensions" },
      { label: "Storage", value: "2x 480GB SSD (RAID 1)" },
      { label: "Warranty", value: "3-year hardware warranty" },
    ],
  },

  // Barcode Scanners
  {
    id: "zebra-ds2208-handheld-scanner",
    name: "Zebra DS2208 Handheld Scanner",
    category: "Barcode Scanners",
    shortDescription: "Corded 1D/2D scanner for fast, reliable checkout and back-office scanning.",
    description:
      "A dependable entry-level scanner for retail counters and receiving desks. Reads damaged and low-quality barcodes as well as barcodes on phone screens.",
    icon: "ScanLine",
    price: 95,
    featured: true,
    specs: [
      { label: "Scan Type", value: "1D/2D imager" },
      { label: "Connectivity", value: "USB (corded)" },
      { label: "Scan Rate", value: "Up to 60 scans/sec" },
      { label: "Durability", value: "1.5m drop resistant" },
    ],
  },
  {
    id: "honeywell-voyager-1250g-scanner",
    name: "Honeywell Voyager 1250g Scanner",
    category: "Barcode Scanners",
    shortDescription: "Compact single-line laser scanner built for high-volume retail checkout.",
    description:
      "A proven, budget-friendly 1D laser scanner for retail and light warehouse use, with a snappy scan engine and an ergonomic grip for all-day comfort.",
    icon: "ScanLine",
    price: 89,
    featured: false,
    specs: [
      { label: "Scan Type", value: "1D laser" },
      { label: "Connectivity", value: "USB (corded)" },
      { label: "Scan Angle", value: "47° skew tolerance" },
      { label: "Weight", value: "99g" },
    ],
  },
  {
    id: "zebra-mc3300-rugged-mobile-computer",
    name: "Zebra MC3300 Rugged Mobile Computer",
    category: "Barcode Scanners",
    shortDescription: "Android rugged handheld terminal combining scanning with inventory apps for the warehouse floor.",
    description:
      "A full Android handheld computer built for warehousing and logistics, combining a long-range scan engine with a large touchscreen for running inventory and picking apps.",
    icon: "Smartphone",
    price: 1450,
    featured: true,
    specs: [
      { label: "OS", value: "Android, GMS certified" },
      { label: "Scan Range", value: "Standard to long-range options" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5" },
      { label: "Durability", value: "IP54, 1.8m drop rating" },
    ],
  },
  {
    id: "bluetooth-wireless-barcode-scanner",
    name: "Bluetooth Wireless Barcode Scanner",
    category: "Barcode Scanners",
    shortDescription: "Cordless 2D scanner with a charging cradle, ideal for mobile stocktaking.",
    description:
      "Break free of the counter with a cordless 2D scanner that pairs over Bluetooth and returns to its cradle to charge and sync captured data.",
    icon: "ScanLine",
    price: 120,
    featured: false,
    specs: [
      { label: "Scan Type", value: "2D imager" },
      { label: "Connectivity", value: "Bluetooth + charging cradle" },
      { label: "Battery Life", value: "Up to 12 hours" },
      { label: "Memory", value: "Offline storage for 5,000+ scans" },
    ],
  },

  // Label Printers
  {
    id: "zebra-zd420-thermal-label-printer",
    name: "Zebra ZD420 Thermal Label Printer",
    category: "Label Printers",
    shortDescription: "Desktop thermal transfer printer for barcode, shelf, and shipping labels.",
    description:
      "A reliable desktop label printer for retail and warehouse teams, supporting both direct thermal and thermal transfer printing for long-lasting labels.",
    icon: "Printer",
    price: 349,
    featured: true,
    specs: [
      { label: "Print Method", value: "Direct thermal / thermal transfer" },
      { label: "Print Width", value: "Up to 4 inches" },
      { label: "Speed", value: "Up to 152mm/sec" },
      { label: "Connectivity", value: "USB, Ethernet" },
    ],
  },
  {
    id: "tsc-te244-label-printer",
    name: "TSC TE244 Label Printer",
    category: "Label Printers",
    shortDescription: "Affordable, compact label printer for small retail and warehouse setups.",
    description:
      "An entry-level thermal label printer that covers the essentials — reliable print quality at a price that works for smaller operations.",
    icon: "Printer",
    price: 279,
    featured: false,
    specs: [
      { label: "Print Method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Speed", value: "Up to 127mm/sec" },
      { label: "Connectivity", value: "USB, Serial" },
    ],
  },
  {
    id: "portable-bluetooth-label-printer",
    name: "Portable Bluetooth Label Printer",
    category: "Label Printers",
    shortDescription: "Battery-powered handheld label printer for on-the-go labeling and asset tagging.",
    description:
      "Print labels anywhere on the warehouse floor without hunting for a power outlet — pairs with a phone or handheld computer over Bluetooth.",
    icon: "Printer",
    price: 199,
    featured: false,
    specs: [
      { label: "Power", value: "Rechargeable battery" },
      { label: "Connectivity", value: "Bluetooth" },
      { label: "Print Width", value: "Up to 2 inches" },
      { label: "Weight", value: "420g" },
    ],
  },

  // Networking
  {
    id: "unifi-24-port-poe-switch",
    name: "UniFi 24-Port PoE Managed Switch",
    category: "Networking",
    shortDescription: "Layer 2/3 managed switch with 24 PoE ports for phones, cameras, and access points.",
    description:
      "The backbone of a modern office network — powers IP phones, cameras, and Wi-Fi access points directly over Ethernet, with VLAN support and a browser-based management console.",
    icon: "Server",
    price: 425,
    featured: true,
    specs: [
      { label: "Ports", value: "24x Gigabit PoE+" },
      { label: "Uplinks", value: "2x SFP+" },
      { label: "PoE Budget", value: "400W" },
      { label: "Management", value: "VLAN, QoS, remote management" },
    ],
  },
  {
    id: "unifi-6-access-point",
    name: "UniFi 6 Long-Range Access Point",
    category: "Networking",
    shortDescription: "Wi-Fi 6 access point delivering fast, reliable coverage across large office floors.",
    description:
      "A ceiling-mounted access point built for dense office environments, supporting the latest Wi-Fi 6 standard for faster speeds and better performance with many connected devices.",
    icon: "Wifi",
    price: 179,
    featured: true,
    specs: [
      { label: "Standard", value: "Wi-Fi 6 (802.11ax)" },
      { label: "Coverage", value: "Up to 140m² per unit" },
      { label: "Power", value: "PoE+ (injector or switch)" },
      { label: "Clients", value: "300+ concurrent devices" },
    ],
  },
  {
    id: "fortigate-60f-firewall",
    name: "FortiGate 60F Next-Gen Firewall",
    category: "Networking",
    shortDescription: "Enterprise-grade firewall with intrusion prevention and VPN for small-to-mid networks.",
    description:
      "Protects your network perimeter with next-generation firewall features — intrusion prevention, application control, and site-to-site VPN for connecting branch offices securely.",
    icon: "Lock",
    price: 650,
    featured: false,
    specs: [
      { label: "Throughput", value: "Up to 10 Gbps firewall" },
      { label: "VPN", value: "IPsec & SSL VPN" },
      { label: "Ports", value: "10x GE RJ45" },
      { label: "Security", value: "IPS, antivirus, web filtering" },
    ],
  },
  {
    id: "cat6-cable-reel-305m",
    name: "Cat6 UTP Cable Reel (305m)",
    category: "Networking",
    shortDescription: "Bulk certified Cat6 cabling for structured cabling and office network installs.",
    description:
      "Full 305-meter reel of certified Cat6 UTP cable, sized for structured cabling projects, patch panel runs, and new office fit-outs.",
    icon: "Plug",
    price: 135,
    featured: false,
    specs: [
      { label: "Category", value: "Cat6 UTP" },
      { label: "Length", value: "305m (1000ft) reel" },
      { label: "Rating", value: "Up to 10 Gbps / 55m" },
      { label: "Jacket", value: "PVC, indoor rated" },
    ],
  },

  // POS
  {
    id: "all-in-one-touchscreen-pos-terminal",
    name: "All-in-One Touchscreen POS Terminal",
    category: "POS",
    shortDescription: "Touchscreen POS terminal with built-in card reader support for fast checkout.",
    description:
      "A complete point-of-sale terminal in one unit — touchscreen, built-in printer connectivity, and card payment support — ready to run your POS software out of the box.",
    icon: "CreditCard",
    price: 599,
    featured: true,
    specs: [
      { label: "Display", value: "15.6\" capacitive touchscreen" },
      { label: "Processor", value: "Quad-core, 4GB RAM" },
      { label: "Ports", value: "USB x4, Ethernet, serial" },
      { label: "OS", value: "Windows or Android" },
    ],
  },
  {
    id: "thermal-receipt-printer",
    name: "Thermal Receipt Printer",
    category: "POS",
    shortDescription: "Fast, reliable thermal receipt printer that integrates with major POS software.",
    description:
      "A high-speed thermal receipt printer built for busy checkout counters, with auto-cutter and drawer-kick support for a complete till setup.",
    icon: "Printer",
    price: 129,
    featured: false,
    specs: [
      { label: "Print Speed", value: "Up to 250mm/sec" },
      { label: "Paper Width", value: "80mm thermal roll" },
      { label: "Connectivity", value: "USB, Ethernet, Bluetooth" },
      { label: "Extras", value: "Auto-cutter, cash drawer kick-out" },
    ],
  },
  {
    id: "heavy-duty-cash-drawer",
    name: "Heavy-Duty Cash Drawer",
    category: "POS",
    shortDescription: "Steel-framed, POS-triggered cash drawer for secure till management.",
    description:
      "A durable steel cash drawer that opens automatically when triggered by your POS or receipt printer, with removable coin and note compartments.",
    icon: "Package",
    price: 85,
    featured: false,
    specs: [
      { label: "Compartments", value: "5 note / 8 coin" },
      { label: "Trigger", value: "RJ11 printer-triggered" },
      { label: "Build", value: "Steel frame, lockable" },
      { label: "Size", value: "410 x 420 x 100mm" },
    ],
  },
  {
    id: "barcode-scanner-for-pos",
    name: "Counter-Mount Barcode Scanner (POS)",
    category: "POS",
    shortDescription: "Hands-free presentation scanner built for fast retail checkout lanes.",
    description:
      "A stand-mounted, always-on scanner for the checkout counter — just present the barcode, no trigger needed, keeping the lane moving during busy periods.",
    icon: "ScanLine",
    price: 110,
    featured: false,
    specs: [
      { label: "Scan Type", value: "2D omnidirectional" },
      { label: "Mode", value: "Hands-free presentation" },
      { label: "Connectivity", value: "USB" },
      { label: "Mount", value: "Adjustable counter stand" },
    ],
  },

  // 3CX Licenses
  {
    id: "3cx-standard-license-20",
    name: "3CX Standard License — 20 Extensions",
    category: "3CX Licenses",
    shortDescription: "Annual 3CX license covering up to 20 extensions, ideal for small offices.",
    description:
      "The right starting point for small teams — voice calling, video conferencing, and mobile apps for up to 20 users, deployed and supported by our certified 3CX team.",
    icon: "PhoneCall",
    price: 245,
    featured: true,
    specs: [
      { label: "Extensions", value: "Up to 20" },
      { label: "Term", value: "Annual license" },
      { label: "Includes", value: "Video conferencing, mobile apps" },
      { label: "Support", value: "Tyflex-managed deployment" },
    ],
  },
  {
    id: "3cx-pro-license-50",
    name: "3CX Pro License — 50 Extensions",
    category: "3CX Licenses",
    shortDescription: "Annual 3CX license with CRM integration, covering up to 50 extensions.",
    description:
      "Built for growing teams that need CRM integration and call center queues, licensed for up to 50 extensions with a full year of updates.",
    icon: "PhoneCall",
    price: 545,
    featured: false,
    specs: [
      { label: "Extensions", value: "Up to 50" },
      { label: "Term", value: "Annual license" },
      { label: "Includes", value: "CRM integration, call queues" },
      { label: "Support", value: "Tyflex-managed deployment" },
    ],
  },
  {
    id: "3cx-enterprise-license-unlimited",
    name: "3CX Enterprise License — Unlimited Extensions",
    category: "3CX Licenses",
    shortDescription: "Annual 3CX license with unlimited extensions for large or multi-branch organizations.",
    description:
      "Full-scale 3CX licensing for large organizations — unlimited extensions, advanced call center features, and priority support from our certified team.",
    icon: "PhoneCall",
    price: 1290,
    featured: true,
    specs: [
      { label: "Extensions", value: "Unlimited" },
      { label: "Term", value: "Annual license" },
      { label: "Includes", value: "Advanced call center, reporting" },
      { label: "Support", value: "Priority support included" },
    ],
  },

  // Accessories
  {
    id: "usb-conference-speakerphone",
    name: "USB Conference Speakerphone",
    category: "Accessories",
    shortDescription: "Plug-and-play speakerphone for meeting rooms and huddle spaces.",
    description:
      "Clear, 360° pickup speakerphone that plugs straight into a laptop or meeting room PC over USB — no drivers or setup required.",
    icon: "Headphones",
    price: 159,
    featured: true,
    specs: [
      { label: "Pickup Range", value: "360°, up to 4m" },
      { label: "Connectivity", value: "USB-A / USB-C" },
      { label: "Compatibility", value: "Teams, Zoom, 3CX, Google Meet" },
      { label: "Room Size", value: "Up to 6 people" },
    ],
  },
  {
    id: "sip-headset-noise-cancelling",
    name: "SIP Headset (Noise-Cancelling)",
    category: "Accessories",
    shortDescription: "Noise-cancelling headset built for busy call center and sales environments.",
    description:
      "A comfortable, all-day headset with active noise cancellation on the microphone, so your voice stays clear even in a noisy open-plan office.",
    icon: "Headphones",
    price: 79,
    featured: true,
    specs: [
      { label: "Type", value: "Mono or stereo, over-ear" },
      { label: "Microphone", value: "Noise-cancelling boom mic" },
      { label: "Connectivity", value: "USB or RJ9 (desk phone)" },
      { label: "Compatibility", value: "Most IP phones & softphones" },
    ],
  },
  {
    id: "ups-battery-backup-600va",
    name: "UPS Battery Backup (600VA)",
    category: "Accessories",
    shortDescription: "Compact battery backup keeping phones, routers, and POS terminals running through outages.",
    description:
      "Protects critical equipment like desk phones, routers, and POS terminals from power cuts and surges, buying enough runtime to finish a transaction or shut down safely.",
    icon: "Battery",
    price: 95,
    featured: false,
    specs: [
      { label: "Capacity", value: "600VA / 360W" },
      { label: "Outlets", value: "4x surge-protected" },
      { label: "Runtime", value: "Up to 20 minutes at half load" },
      { label: "Extras", value: "Automatic voltage regulation" },
    ],
  },
  {
    id: "poe-injector-gigabit",
    name: "Gigabit PoE Injector",
    category: "Accessories",
    shortDescription: "Adds Power over Ethernet to a single access point, phone, or camera without a PoE switch.",
    description:
      "The simplest way to power a single PoE device — IP phone, access point, or camera — from a non-PoE switch or router port.",
    icon: "Router",
    price: 35,
    featured: false,
    specs: [
      { label: "Speed", value: "Gigabit (10/100/1000)" },
      { label: "Standard", value: "802.3af/at" },
      { label: "Output", value: "Up to 30W" },
      { label: "Use Case", value: "Single-device PoE power" },
    ],
  },

  // --- Hikvision (partner catalogue — pricing on request) ---
  {
    id: "hikvision-ds-3wru9x",
    name: "Hikvision DS-3WRU9X AX900 Wi-Fi 6 USB Adapter",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ds-3wru9x.png",
    datasheet: "/datasheets/hikvision/hikvision-ds-3wru9x.pdf",
    shortDescription:
      "Nano-size Wi-Fi 6 USB adapter — adds AX900 dual-band wireless to any desktop or laptop, up to 886 Mbps.",
    description:
      "A pocket-sized way to bring Wi-Fi 6 to machines that shipped without it. The DS-3WRU9X plugs into a single USB port and delivers AX900 dual-band throughput of up to 886 Mbps, with driver support for Windows 7/10/11 and Linux.",
    icon: "Wifi",
    price: 0,
    featured: false,
    specs: [
      { label: "Wireless standard", value: "Wi-Fi 6 (802.11ax), dual-band" },
      { label: "Max throughput", value: "Up to 886 Mbps" },
      { label: "Interface", value: "USB" },
      { label: "Operating systems", value: "Windows 7 / 10 / 11, Linux" },
      { label: "Form factor", value: "Nano USB adapter" },
    ],
  },
  {
    id: "hikvision-ds-ups1000-sa",
    name: "Hikvision DS-UPS1000/SA Line-Interactive UPS — 1000 VA",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ds-ups1000-sa.png",
    datasheet: "/datasheets/hikvision/hikvision-ds-ups1000-sa.pdf",
    shortDescription:
      "1000 VA / 600 W line-interactive UPS with built-in AVR and South-African socket outlets — backup power for routers, NVRs and POS.",
    description:
      "Keeps a small rack, reception desk or POS lane running through outages and voltage swings. Built-in AVR corrects a wide 140–290 VAC input window without draining the battery, and the sealed lead-acid pack transfers in under 10 ms.",
    icon: "Battery",
    price: 0,
    featured: false,
    specs: [
      { label: "Capacity", value: "1000 VA / 600 W" },
      { label: "Topology", value: "Line-interactive with AVR" },
      { label: "Input range", value: "140–290 VAC, 50/60 Hz" },
      { label: "Battery", value: "12 V / 9 Ah × 1 (sealed lead-acid)" },
      { label: "Outlets", value: "2 × South African (Type M)" },
      { label: "Transfer time", value: "≤ 10 ms" },
      { label: "Runtime", value: "≈ 60 min at 60 W" },
    ],
  },
  {
    id: "hikvision-ds-ups3000-sa",
    name: "Hikvision DS-UPS3000/SA Line-Interactive UPS — 3000 VA",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ds-ups3000-sa.png",
    datasheet: "/datasheets/hikvision/DS-UPS3000_SA_Datasheet_202507.pdf",
    shortDescription:
      "3000 VA / 1800 W line-interactive UPS with LCD, built-in AVR and fast charging — backup for servers, network cores and CCTV.",
    description:
      "A 3000 VA line-interactive UPS for the main comms rack. An LCD panel reports input/output voltage, battery capacity and load level; four sealed lead-acid batteries recharge to 90% in 6–8 hours, and the wide input window rides out unstable mains without switching to battery.",
    icon: "Battery",
    price: 0,
    featured: true,
    specs: [
      { label: "Capacity", value: "3000 VA / 1800 W" },
      { label: "Topology", value: "Line-interactive with AVR" },
      { label: "Input range", value: "140–290 VAC, 50/60 Hz" },
      { label: "Battery", value: "12 V / 9 Ah × 4 (sealed lead-acid)" },
      { label: "Outlets", value: "2 × RZ-02 + 2 × IEC C13" },
      { label: "Display", value: "LCD (voltage, battery, load)" },
      { label: "Transfer time", value: "10 ms" },
      { label: "Runtime", value: "≈ 15 min at 600 W" },
    ],
  },
  {
    id: "hikvision-hk-sfp-1g-20-1310-df",
    name: "Hikvision HK-SFP-1.25G-20-1310-DF Gigabit SFP Module",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-hk-sfp-1g-20-1310-df.png",
    datasheet: "/datasheets/hikvision/HK-SFP-1.25G-20-1310-DF_Datasheet.pdf",
    shortDescription:
      "1.25G single-mode SFP transceiver, 1310 nm duplex LC, up to 20 km — fibre uplinks for Hikvision and third-party switches.",
    description:
      "A hot-pluggable 1.25 Gbps SFP transceiver for single-mode duplex fibre runs of up to 20 km. MSA-compliant and 3.3 V, so it drops into any standard SFP slot on a Hikvision or third-party switch.",
    icon: "Zap",
    price: 0,
    featured: false,
    specs: [
      { label: "Data rate", value: "1.25 Gbps (Gigabit Ethernet)" },
      { label: "Wavelength", value: "1310 nm TX / 1310 nm RX" },
      { label: "Connector", value: "Duplex LC" },
      { label: "Fibre", value: "Single-mode 9/125 µm" },
      { label: "Reach", value: "Up to 20 km" },
      { label: "Form factor", value: "SFP (MSA), hot-pluggable, 3.3 V" },
      { label: "Operating temp.", value: "0 °C to 70 °C" },
    ],
  },
  {
    id: "hikvision-ns-0108d",
    name: "Hikvision NS-0108D 8-Port 100 Mbps Desktop Switch",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ns-0108d.png",
    datasheet: "/datasheets/hikvision/hikvision-ns-0108d.pdf",
    shortDescription:
      "Unmanaged 8-port 10/100 Mbps desktop switch — silent, fanless plug-and-play connectivity for small offices.",
    description:
      "A no-configuration 8-port Fast Ethernet switch for expanding wired connectivity at a desk, reception or back office. Fanless and plastic-housed with LINK/ACT and power indicators, powered by an external adapter.",
    icon: "Network",
    price: 0,
    featured: false,
    specs: [
      { label: "Ports", value: "8 × 10/100 Mbps RJ45" },
      { label: "Management", value: "Unmanaged (plug and play)" },
      { label: "Switching mode", value: "Store-and-forward" },
      { label: "Housing", value: "Desktop, fanless" },
      { label: "Power", value: "External adapter" },
    ],
  },
  {
    id: "hikvision-ns-0318p-130b",
    name: "Hikvision NS-0318P-130(B) 16-Port PoE Switch",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ns-0318p-130b.png",
    datasheet: "/datasheets/hikvision/NS-0318P-130B_Datasheet.pdf",
    shortDescription:
      "18-port unmanaged PoE switch — 16 × 100 Mbps PoE ports (130 W budget, up to 250 m) plus Gigabit RJ45 and SFP uplinks for cameras and APs.",
    description:
      "Built for CCTV and access-point rollouts. Sixteen 802.3af/at PoE ports share a 130 W budget, with an extend mode pushing ports 9–16 to 250 m, 6 kV surge protection, and Gigabit RJ45 plus SFP uplinks in a fanless metal chassis.",
    icon: "Network",
    price: 0,
    featured: true,
    specs: [
      { label: "PoE ports", value: "16 × 100 Mbps (802.3af/at)" },
      { label: "Uplinks", value: "1 × Gigabit RJ45 + 1 × Gigabit SFP" },
      { label: "PoE budget", value: "130 W" },
      { label: "Long-range mode", value: "Up to 250 m (ports 9–16)" },
      { label: "Switching capacity", value: "7.2 Gbps" },
      { label: "Surge protection", value: "6 kV on PoE ports" },
      { label: "Housing", value: "Metal, fanless" },
    ],
  },
  {
    id: "hikvision-ns-0505d",
    name: "Hikvision NS-0505D 5-Port Gigabit Desktop Switch",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ns-0505d.png",
    datasheet: "/datasheets/hikvision/hikvision-ns-0505d.pdf",
    shortDescription:
      "Unmanaged 5-port Gigabit desktop switch — fanless plug-and-play wired networking for homes and small offices.",
    description:
      "A compact 5-port Gigabit switch that needs no setup — plug in and every port negotiates 10/100/1000 Mbps. Fanless and silent, powered by an external adapter.",
    icon: "Network",
    price: 0,
    featured: false,
    specs: [
      { label: "Ports", value: "5 × 10/100/1000 Mbps RJ45" },
      { label: "Management", value: "Unmanaged (plug and play)" },
      { label: "Switching mode", value: "Store-and-forward" },
      { label: "Housing", value: "Desktop, fanless" },
      { label: "Power", value: "External adapter" },
    ],
  },
  {
    id: "hikvision-ns-0508d",
    name: "Hikvision NS-0508D 8-Port Gigabit Desktop Switch",
    category: "Networking",
    brand: "Hikvision",
    image: "/webstore/hikvision/hikvision-ns-0508d.png",
    datasheet: "/datasheets/hikvision/hikvision-ns-0508d.pdf",
    shortDescription:
      "Unmanaged 8-port Gigabit desktop switch — silent, fanless plug-and-play for expanding wired connectivity.",
    description:
      "An 8-port Gigabit switch for offices that have outgrown the ports on their router. No configuration, no fan, external-adapter powered, with per-port LINK/ACT indication.",
    icon: "Network",
    price: 0,
    featured: false,
    specs: [
      { label: "Ports", value: "8 × 10/100/1000 Mbps RJ45" },
      { label: "Management", value: "Unmanaged (plug and play)" },
      { label: "Switching mode", value: "Store-and-forward" },
      { label: "Housing", value: "Desktop, fanless" },
      { label: "Power", value: "External adapter" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}
