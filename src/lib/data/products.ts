import type { IconName } from "@/lib/icon-map";
import { hikvisionCatalog } from "@/lib/data/products-hikvision-catalog";

export const PRODUCT_CATEGORIES = [
  "Networking",
  "Displays",
  "Entrance Control",
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

const curatedProducts: Product[] = [
  // Hand-curated Hikvision items (with photos + datasheets). The rest of the
  // Hikvision range is generated in products-hikvision-catalog.ts.
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
    featured: true,
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
    featured: true,
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

/**
 * Full catalogue = the hand-curated core products above, then the Hikvision
 * partner catalogue generated from the pricelist
 * (src/lib/data/products-hikvision-catalog.ts). All inquiry-based — no pricing.
 */
export const products: Product[] = [...curatedProducts, ...hikvisionCatalog];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}
