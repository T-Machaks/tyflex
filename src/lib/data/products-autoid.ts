import type { Product } from "@/lib/data/products";

/**
 * Barcode / label printers, printheads, cutters and rewinders Tyflex supplies
 * through the Kemtek AutoID channel (Argox, Godex, Honeywell).
 *
 * Sourced from "AutoID Reseller Price — Sep v1" (Argox / Godex / Honeywell).
 * The webstore is inquiry-based, so `price` stays 0; the distributor "Major
 * Dealer" trade price (South African Rand) is kept in a comment on each item
 * as internal reference only — never surface it publicly. Part numbers go in
 * the SKU spec. Brochure PDFs and squared product photos are not yet on the
 * site: drop photos in public/webstore/autoid/ and brochures in
 * public/datasheets/autoid/, then set `image` / `datasheet` here.
 */
export const autoIdProducts: Product[] = [
  // ---------------------------------------------------------------------------
  // Argox — desktop thermal label printers
  // ---------------------------------------------------------------------------
  {
    id: "argox-os-2130d-pro",
    name: "Argox OS-2130D Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-d2-250.png",
    resources: [
      { label: "OS-2130D Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/OS-2130D_Pro_brochure_en_v1.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Compact 2-inch direct-thermal desktop label printer for retail shelf-edge, POS and light dispatch labelling.",
    description:
      "An entry 2-inch direct-thermal desktop printer for steady low-to-mid label volumes — price tags, shelf labels, small parcel and address labels. Simple media loading and Argox PPLA/PPLB emulation for quick integration with retail and ERP systems.",
    icon: "Barcode",
    price: 0, // trade: R 2,957.00 (Major Dealer)
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal" },
      { label: "Print width", value: '2 in (54 mm)' },
      { label: "Emulation", value: "PPLA / PPLB" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-20302-015" },
    ],
  },
  {
    id: "argox-os-d2-250-pro",
    name: "Argox OS D2-250 Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-d2-250.png",
    resources: [
      { label: "D2 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/D2_Pro_brochure_en_v1.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "2-inch direct-thermal desktop printer, 203 dpi at 7 ips, with USB, USB host and Ethernet — retail and small-parcel labelling.",
    description:
      "A 2-inch direct-thermal desktop printer built for reception desks, pharmacies and small dispatch benches. 203 dpi at up to 7 ips, standard USB, USB host and Ethernet, and PPLA/PPLB/PPLZ auto-detect so it drops into existing label workflows.",
    icon: "Barcode",
    price: 0, // trade: R 2,908.00
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 7 ips" },
      { label: "Print width", value: "2 in" },
      { label: "Interfaces", value: "USB, USB host, Ethernet" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-D2202-006" },
    ],
  },
  {
    id: "argox-os-214d-pro",
    name: "Argox OS-214D Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-os-214.jpg",
    resources: [
      { label: "OS-214D brochure (PDF)", url: "https://www.argox.com/docfile/brochure/OS-214D_brochure_en_v1.1.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch direct-thermal desktop printer, 203 dpi at 6 ips, with USB, RS-232 and Ethernet — general-purpose retail and dispatch labelling.",
    description:
      "The 4-inch direct-thermal workhorse of the OS PRO desktop range: 203 dpi at up to 6 ips, USB, serial and Ethernet as standard, and PPLA/PPLB/PPLZ auto-detect. Suits stock rooms, back-office and mid-volume shipping bays.",
    icon: "Barcode",
    price: 0, // trade: R 3,160.00
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Interfaces", value: "USB, RS-232, Ethernet" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-20402-105" },
    ],
  },
  {
    id: "argox-os-214ex-pro",
    name: "Argox OS-214EX Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-os-214.jpg",
    resources: [
      { label: "OS-214EX Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/OS-214EX_Pro_OS-200_Pro_brochure_en_v1.5.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Popular 4-inch DT/TT desktop printer, 203 dpi at 6 ips, with RS-232, USB and LAN — thermal-transfer durability for warehouse and asset labels.",
    description:
      "A best-selling 4-inch desktop printer that adds thermal-transfer capability (92 m ribbon) to the OS PRO line, so labels survive abrasion, chemicals and outdoor exposure. 203 dpi at 6 ips, RS-232, USB and LAN, PPLA/PPLB/PPLZ — the default choice for warehouse, asset and compliance labelling.",
    icon: "Barcode",
    price: 0, // trade: R 2,711.00
    featured: true,
    specs: [
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "92 m" },
      { label: "Interfaces", value: "RS-232, USB, LAN" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-21402-115" },
    ],
  },
  {
    id: "argox-d4-250-pro",
    name: "Argox D4-250 Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-d4-250.jpg",
    resources: [
      { label: "D4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/D4-pro_brochure_en_v3.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Popular 4-inch direct-thermal desktop printer, 203 dpi at 6 ips, with Ethernet, USB host, USB and RS-232 — fast, quiet retail and dispatch labelling.",
    description:
      "A modern 4-inch direct-thermal desktop printer with a clamshell design for one-hand media loading. 203 dpi at up to 6 ips, a full interface set (Ethernet, USB host, USB, RS-232) and A/B/Z emulation. A popular pick for shipping desks, receiving and click-and-collect.",
    icon: "Barcode",
    price: 0, // trade: R 3,752.00
    featured: true,
    specs: [
      { label: "Print method", value: "Direct thermal" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Interfaces", value: "Ethernet, USB host, USB, RS-232" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ (A/B/Z)" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-D4202-006" },
    ],
  },
  {
    id: "argox-d4-280-plus-pro",
    name: "Argox D4-280 Plus Pro Linerless Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-o4-250.jpg",
    resources: [
      { label: "D4-280 Plus Pro product page", url: "https://www.argox.com/products-detail/d4-280plus_pro/" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch direct-thermal linerless desktop printer, 203 dpi at 6 ips, with built-in cutter — no backing waste for shipping and grocery labels.",
    description:
      "A linerless variant of the D4 PRO: prints on adhesive media with no release liner, so there is no backing paper to strip or discard. Includes a cutter for variable-length labels. 203 dpi at 6 ips with USB, RS-232 and Ethernet. For linerless material only.",
    icon: "Barcode",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal (linerless)" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Cutter", value: "Built-in" },
      { label: "Interfaces", value: "USB, RS-232, Ethernet" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-D4202-008" },
    ],
  },
  {
    id: "argox-o4-250-pro",
    name: "Argox O4-250 Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-o4-250.jpg",
    resources: [
      { label: "O4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/O4_Pro_brochure_en_v1.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Popular 4-inch DT/TT desktop printer, 203 dpi at 7 ips, with RS-232, USB, USB host and Ethernet — thermal-transfer labelling with a 110 m ribbon.",
    description:
      "A fast 4-inch DT/TT desktop printer with A/B/Z auto-detect and a 110 m ribbon on a 12.7 mm core. 203 dpi at up to 7 ips and a complete interface set. A popular all-rounder for warehouse, manufacturing and asset labels that need thermal-transfer durability.",
    icon: "Barcode",
    price: 0, // trade: R 3,847.00
    featured: true,
    specs: [
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 7 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "12.7 mm core, max 110 m" },
      { label: "Interfaces", value: "RS-232, USB, USB host, Ethernet" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ auto-detect" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-O4202-003" },
    ],
  },
  {
    id: "argox-o4-350-pro",
    name: "Argox O4-350 Pro Desktop Label Printer — 300 dpi",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-cp2140ex.jpg",
    resources: [
      { label: "O4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/O4_Pro_brochure_en_v1.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch DT/TT desktop printer at 300 dpi, 6 ips, with RS-232, USB, USB host and Ethernet — fine text, small labels and 2D barcodes.",
    description:
      "The 300 dpi version of the O4 PRO for small labels, dense 2D barcodes and fine print — electronics, laboratory, jewellery and pharmaceutical labelling. 6 ips, A/B/Z auto-detect, 110 m ribbon on a 12.7 mm core, full interface set.",
    icon: "Barcode",
    price: 0, // trade: R 4,568.00
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "300 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "12.7 mm core, max 110 m" },
      { label: "Interfaces", value: "RS-232, USB, USB host, Ethernet" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ auto-detect" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "ARG 99-O4302-003" },
    ],
  },
  {
    id: "argox-cp2140ex-pro",
    name: "Argox CP-2140EX Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-cp2140ex.jpg",
    resources: [
      { label: "CP-EX Pro series brochure (PDF)", url: "https://www.argox.com/docfile/brochure/CP-EX_Pro_series_brochure_en_v2.1.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Popular 4-inch DT/TT desktop printer, 203 dpi at 6 ips, with USB, LAN and RS-232 — 300 m ribbon on a 25 mm core for long unattended runs.",
    description:
      "The CP-EX PRO series 4-inch desktop printer built for higher label volumes: a 300 m ribbon on a 25 mm core means far fewer changes between runs. 203 dpi at 6 ips, USB, LAN and RS-232, PPLA/PPLB. A popular choice where a desktop unit needs near-industrial ribbon capacity.",
    icon: "Barcode",
    price: 0, // trade: R 3,203.00
    featured: true,
    specs: [
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "25 mm core, 300 m" },
      { label: "Interfaces", value: "USB, LAN, RS-232" },
      { label: "Emulation", value: "PPLA / PPLB" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "OS 99-C2102-114" },
    ],
  },
  {
    id: "argox-cp2240-pro",
    name: "Argox CP-2240 Pro Desktop Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-cp3140ex.jpg",
    resources: [
      { label: "CP-2240 / CP-2140L product page", url: "https://www.argox.com/products-detail/cp-2240-cp-2140l/" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch DT/TT desktop printer, 203 dpi at 7 ips, with a 6-inch OD media capacity — mid-volume retail and warehouse labelling.",
    description:
      "A 4-inch DT/TT desktop printer that takes a 6-inch outer-diameter media roll for longer runs between reloads. 203 dpi at up to 7 ips. A step up in capacity from the standard CP PRO desktop units.",
    icon: "Barcode",
    price: 0, // trade: R 3,716.00
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 7 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Media capacity", value: "6 in OD roll" },
      { label: "SKU", value: "OS 99-C2202-104" },
    ],
  },
  {
    id: "argox-cp3140ex-pro",
    name: "Argox CP-3140EX Pro Desktop Label Printer — 300 dpi",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-cp3140ex.jpg",
    resources: [
      { label: "CP-EX Pro series brochure (PDF)", url: "https://www.argox.com/docfile/brochure/CP-EX_Pro_series_brochure_en_v2.1.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch DT/TT desktop printer at 300 dpi, 4 ips, with USB, USB host, RS-232 and Ethernet — high-resolution labels with high ribbon capacity.",
    description:
      "The 300 dpi model in the CP-EX PRO series: fine text and dense 2D codes combined with the series' large ribbon capacity for long unattended jobs. 4 ips, full interface set, PPLA/PPLB (PPLZ optional).",
    icon: "Barcode",
    price: 0, // trade: R 4,087.00
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "300 dpi" },
      { label: "Print speed", value: "Up to 4 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Interfaces", value: "USB, USB host, RS-232, Ethernet" },
      { label: "Emulation", value: "PPLA / PPLB (PPLZ optional)" },
      { label: "Warranty", value: "2 years" },
      { label: "SKU", value: "OS 99-C3002-102" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Argox — industrial thermal label printers
  // ---------------------------------------------------------------------------
  {
    id: "argox-ix4-240-pro",
    name: "Argox iX4-240 Pro Industrial Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix4-240.jpg",
    resources: [
      { label: "iX4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX4%20Pro%20brochure%20en%20v4.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch DT/TT industrial printer, 203 dpi at 6 ips, 450 m ribbon on a 25 mm core, with Ethernet, USB host, USB and RS-232.",
    description:
      "The entry point to the Argox iX4 PRO industrial line: a metal-chassis 4-inch DT/TT printer for multi-shift labelling in manufacturing, logistics and distribution. 203 dpi at 6 ips, 450 m ribbon capacity, full interface set, PPLA/PPLB/PPLZ. No LCD display on this model.",
    icon: "Printer",
    price: 0, // trade: R 7,373.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "25 mm core, 450 m" },
      { label: "Interfaces", value: "Ethernet, USB host, USB, RS-232" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "OS IX4-240 PRO" },
    ],
  },
  {
    id: "argox-ix4-250-pro",
    name: "Argox iX4-250 Pro Industrial Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix4-250.jpg",
    resources: [
      { label: "iX4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX4%20Pro%20brochure%20en%20v4.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Popular 4-inch DT/TT industrial printer, 203 dpi at 8 ips, 450 m ribbon, with RTC, Ethernet, USB host, USB and RS-232.",
    description:
      "The flagship 4-inch Argox industrial printer for high-throughput, multi-shift environments: 203 dpi at up to 8 ips, a real-time clock, 450 m ribbon capacity on a 25 mm core, and PPLA/PPLB/PPLZ. The default recommendation for warehouses and production lines that print all day.",
    icon: "Printer",
    price: 0, // trade: R 7,948.00
    featured: true,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 8 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "25 mm core, 450 m" },
      { label: "Interfaces", value: "Ethernet, USB host, USB, RS-232; RTC" },
      { label: "Emulation", value: "PPLA / PPLB / PPLZ" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-IX402-014" },
    ],
  },
  {
    id: "argox-ix4-250-pro-cutter",
    name: "Argox iX4-250 Pro Industrial Label Printer with Cutter",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix4-250-cutter.jpg",
    resources: [
      { label: "iX4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX4%20Pro%20brochure%20en%20v4.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "iX4-250 Pro industrial printer factory-fitted with a guillotine cutter — 4-inch DT/TT, 203 dpi at 8 ips, 450 m ribbon, RTC.",
    description:
      "The iX4-250 PRO supplied with an integrated guillotine cutter for tag and ticket work, kit labels and any application that needs individually cut labels straight off the printer. Otherwise identical to the standard iX4-250 PRO.",
    icon: "Printer",
    price: 0, // trade: R 10,206.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 8 ips" },
      { label: "Cutter", value: "Integrated guillotine" },
      { label: "Ribbon", value: "25 mm core, 450 m" },
      { label: "Interfaces", value: "Ethernet, USB host, USB, RS-232; RTC" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-IX402-024" },
    ],
  },
  {
    id: "argox-ix4-350-pro",
    name: "Argox iX4-350 Pro Industrial Label Printer — 300 dpi",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix4-350.jpg",
    resources: [
      { label: "iX4 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX4%20Pro%20brochure%20en%20v4.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch DT/TT industrial printer at 300 dpi, 6 ips, 450 m ribbon, with Ethernet, USB host, USB and RS-232.",
    description:
      "The 300 dpi iX4 PRO for small industrial labels, dense 2D barcodes and fine legal text at multi-shift volumes. 6 ips, 450 m ribbon capacity, PPLA/PPLB/PPLZ, full interface set.",
    icon: "Printer",
    price: 0, // trade: R 11,014.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "300 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon", value: "25 mm core, 450 m" },
      { label: "Interfaces", value: "Ethernet, USB host, USB, RS-232" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-IX302-004" },
    ],
  },
  {
    id: "argox-ix4-280",
    name: "Argox iX4-280 Industrial Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix4-280.jpg",
    resources: [
      { label: "iX4-280 / 380 brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX4-280_380_brochure_en_v1.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "Popular high-speed 4-inch industrial printer, 203 dpi at 10 ips, with USB, RS-232 and Ethernet — fast throughput for busy dispatch lines.",
    description:
      "A high-speed 4-inch industrial printer rated at 10 ips at 203 dpi — for dispatch and production lines where label throughput is the bottleneck. USB, RS-232 and Ethernet as standard.",
    icon: "Printer",
    price: 0, // trade: R 8,742.00
    featured: true,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 10 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Interfaces", value: "USB, RS-232, Ethernet" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-LK202-001" },
    ],
  },
  {
    id: "argox-xm4-200",
    name: "Argox XM4-200 Industrial Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-xm4-200.jpg",
    resources: [
      { label: "XM4-200 / 300 brochure (PDF)", url: "https://www.argox.com/docfile/brochure/XM4-200_300_brochure_en_v1.0.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "4-inch industrial printer, 203 dpi at 12 ips, with a 3.5-inch colour display and USB, RS-232 and Ethernet — very high-speed labelling.",
    description:
      "The fastest 4-inch printer in the Argox industrial range at 12 ips, with a 3.5-inch colour touch display for standalone setup and diagnostics. For high-volume, high-tempo production and distribution labelling.",
    icon: "Printer",
    price: 0, // trade: R 10,315.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 12 ips" },
      { label: "Print width", value: "4 in" },
      { label: "Display", value: '3.5" colour' },
      { label: "Interfaces", value: "USB, RS-232, Ethernet" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-XM402-000" },
    ],
  },
  {
    id: "argox-ix6-250-pro",
    name: "Argox iX6-250 Pro 6-inch Industrial Label Printer",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix6.png",
    resources: [
      { label: "iX6 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX6%20Pro%20brochure%20en%20v1.5.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "6-inch DT/TT industrial printer, 203 dpi at 6 ips, 168 mm max print width, 450 m ribbon — pallet, drum and wide-format labels. Replaces G6000.",
    description:
      "A 6-inch industrial printer for pallet placards, chemical drum labels, tyres and other wide media up to 168 mm. 203 dpi at 6 ips, 450 m ribbon, USB, RS-232, LAN and USB host, PPLA/PPLB/PPLZ auto-detect. The successor to the Argox G6000.",
    icon: "Printer",
    price: 0, // trade: R 16,063.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial (6 in)" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Max print width", value: "168 mm" },
      { label: "Ribbon", value: "450 m" },
      { label: "Interfaces", value: "USB, RS-232, LAN, USB host" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-IX602-003" },
    ],
  },
  {
    id: "argox-ix6-350-pro",
    name: "Argox iX6-350 Pro 6-inch Industrial Label Printer — 300 dpi",
    category: "Printers",
    brand: "Argox",
    image: "/webstore/autoid/argox-ix6.png",
    resources: [
      { label: "iX6 Pro brochure (PDF)", url: "https://www.argox.com/docfile/brochure/iX6%20Pro%20brochure%20en%20v1.5.pdf" },
      { label: "Argox printer drivers", url: "https://www.argox.com/download/drivers/" },
    ],
    shortDescription:
      "6-inch DT/TT industrial printer at 300 dpi, 6 ips, 168 mm max print width, 450 m ribbon — high-resolution wide-format labelling.",
    description:
      "The 300 dpi iX6 PRO for wide labels that also need fine detail — GHS chemical labels, compliance placards, high-density 2D codes on large media up to 168 mm. 6 ips, 450 m ribbon, full interface set.",
    icon: "Printer",
    price: 0, // trade: R 18,357.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial (6 in)" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "300 dpi" },
      { label: "Print speed", value: "Up to 6 ips" },
      { label: "Max print width", value: "168 mm" },
      { label: "Ribbon", value: "450 m" },
      { label: "Interfaces", value: "USB, RS-232, LAN, USB host" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 99-IX602-006" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Godex — industrial thermal label printer
  // ---------------------------------------------------------------------------
  {
    id: "godex-hd830i",
    name: "Godex HD830i 8-inch Industrial Label Printer",
    category: "Printers",
    brand: "Godex",
    shortDescription:
      "8-inch wide-format TT industrial printer, 300 dpi at 4 ips, 300 m ribbon, with RTC and USB, RS-232, LAN and USB host — placards and wide labels.",
    description:
      "A true 8-inch wide-format thermal-transfer industrial printer for pallet placards, banners, RFID inlays and any label wider than a 6-inch printer can handle. 300 dpi at 4 ips, 300 m ribbon, a real-time clock, and auto-switching ZPL/EPL/GPL emulation with USB, RS-232, LAN and USB host.",
    icon: "Printer",
    price: 0, // trade: R 36,249.00 — printer 24-month warranty
    featured: false,
    specs: [
      { label: "Class", value: "Industrial (8 in wide format)" },
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "300 dpi" },
      { label: "Print speed", value: "Up to 4 ips" },
      { label: "Ribbon", value: "300 m" },
      { label: "Emulation", value: "ZPL / EPL / GPL auto-switch" },
      { label: "Interfaces", value: "USB, RS-232, LAN, USB host; RTC" },
      { label: "Warranty", value: "24 months (printhead 6 months / 50 km)" },
      { label: "SKU", value: "GODEX 011-H83022-A00" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Honeywell — desktop and industrial thermal label printers
  // ---------------------------------------------------------------------------
  {
    id: "honeywell-pc42e-t",
    name: "Honeywell PC42e-T Desktop Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pc42e-t.jpg",
    resources: [
      { label: "PC42e-T product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/desktop/pc42t-plus-desktop-thermal-transfer-barcode-printer" },
    ],
    shortDescription:
      "Popular 4-inch thermal-transfer desktop printer, 203 dpi, with USB and Ethernet — a low-cost, easy-to-deploy label printer for retail and office.",
    description:
      "Honeywell's value 4-inch DT/TT desktop printer: straightforward media loading, a 1-inch and 0.5-inch ribbon core adapter in the box, USB and Ethernet, and broad emulation for drop-in replacement of older desktop units. A popular choice for retail back-office, clinics and light warehouse use. Ships without a power cord (order separately).",
    icon: "Barcode",
    price: 0, // trade: R 2,739.00
    featured: true,
    specs: [
      { label: "Print method", value: "Thermal transfer / direct thermal" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print width", value: "4 in" },
      { label: "Ribbon core", value: '1" and 0.5"' },
      { label: "Interfaces", value: "USB, Ethernet" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PC42E-TB02200" },
    ],
  },
  {
    id: "honeywell-pc45t",
    name: "Honeywell PC45-T Desktop Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pc45.jpg",
    resources: [
      { label: "PC45 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/desktop/pc45t-desktop-thermal-transfer-barcode-printer" },
    ],
    shortDescription:
      "4-inch thermal-transfer desktop printer, 203 dpi, with Ethernet and a full-touch screen — a modern desktop unit for retail and healthcare.",
    description:
      "A current-generation Honeywell 4-inch DT/TT desktop printer with a full-colour touchscreen for standalone configuration, Ethernet as standard and a Latin-font, RTC-equipped firmware option. Ships without a power cord (order separately).",
    icon: "Barcode",
    price: 0, // trade: R 7,904.00
    featured: false,
    specs: [
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print width", value: "4 in" },
      { label: "Display", value: "Full-touch colour" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PC45T000000200" },
    ],
  },
  {
    id: "honeywell-pc45d",
    name: "Honeywell PC45-D Desktop Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pc45.jpg",
    resources: [
      { label: "PC45 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/desktop/pc45t-desktop-thermal-transfer-barcode-printer" },
    ],
    shortDescription:
      "4-inch direct-thermal desktop printer, 203 dpi, with Ethernet and a full-touch screen — shipping and receiving labels with no ribbon to manage.",
    description:
      "The direct-thermal version of the PC45 desktop printer: no ribbon, lower running cost, ideal for shipping labels, receiving and short-life labelling. Full-touch colour display and Ethernet as standard. Ships without a power cord (order separately).",
    icon: "Barcode",
    price: 0, // trade: R 4,268.00
    featured: false,
    specs: [
      { label: "Print method", value: "Direct thermal" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print width", value: "4 in" },
      { label: "Display", value: "Full-touch colour" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PC45D000000200" },
    ],
  },
  {
    id: "honeywell-pm45",
    name: "Honeywell PM45 Industrial Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pm45.png",
    resources: [
      { label: "PM45 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/pm45" },
    ],
    shortDescription:
      "Popular 4-inch thermal-transfer industrial printer, 203 dpi, with a full-touch display and Ethernet — the modern replacement for the PM43.",
    description:
      "Honeywell's mainstream 4-inch industrial printer and the successor to the well-known PM43. A full-colour touch display, fixed hanger, standard Ethernet and a rugged metal chassis for multi-shift labelling in manufacturing, distribution and healthcare. Ships without a power cord (order separately). Also available at 300 dpi and with a rewinder + label-taken sensor.",
    icon: "Printer",
    price: 0, // trade: R 14,818.00 (PM45A, TT, 203 dpi)
    featured: true,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "203 dpi (300 dpi option)" },
      { label: "Print width", value: "4 in" },
      { label: "Display", value: "Full-touch colour" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Options", value: "Rewinder + label-taken sensor; compact body" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PM45A10000000200" },
    ],
  },
  {
    id: "honeywell-pm45-rewind-lts",
    name: "Honeywell PM45 Industrial Label Printer with Rewinder + LTS",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pm45.png",
    resources: [
      { label: "PM45 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/pm45" },
    ],
    shortDescription:
      "PM45A industrial printer factory-fitted with an internal rewinder and label-taken sensor — peel-and-present applications at 203 or 300 dpi.",
    description:
      "The PM45A supplied with an integrated rewinder and label-taken sensor for peel-and-present workflows — the operator takes one label and the next is presented. Available at 203 dpi and 300 dpi. Ships without a power cord (order separately).",
    icon: "Printer",
    price: 0, // trade: R 15,073.00 (203 dpi) / R 24,529.00 (300 dpi)
    featured: false,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "203 dpi / 300 dpi" },
      { label: "Media handling", value: "Internal rewinder + label-taken sensor" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PM45A10000030200" },
    ],
  },
  {
    id: "honeywell-pm65",
    name: "Honeywell PM65 6-inch Industrial Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pm65.png",
    resources: [
      { label: "PM45 / PM65 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/pm45" },
    ],
    shortDescription:
      "6-inch thermal-transfer industrial printer, 203 dpi, with a full-touch display and Ethernet — wide labels, placards and drum labelling.",
    description:
      "The 6-inch member of the PM series for wide media — pallet placards, chemical and GHS labels, tyre and cable labels. Full-touch display, standard roller, Ethernet/USB. Ships without a power cord (order separately).",
    icon: "Printer",
    price: 0, // trade: R 19,658.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial (6 in)" },
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print width", value: "6 in" },
      { label: "Display", value: "Full-touch colour" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PM65A10000000200" },
    ],
  },
  {
    id: "honeywell-pd45s",
    name: "Honeywell PD45S Industrial Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-pd45s.png",
    resources: [
      { label: "PD45S / PD45 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/pd45s-pd45" },
    ],
    shortDescription:
      "4-inch DT/TT industrial printer, 203 dpi, with a colour LCD and Ethernet — the replacement for the PM42, for mid-volume industrial labelling.",
    description:
      "A compact 4-inch DT/TT industrial printer with a colour LCD and standard Ethernet, positioned as the successor to the popular PM42. For mid-volume manufacturing, warehouse and transport labelling. Ships without a power cord (order separately).",
    icon: "Printer",
    price: 0, // trade: R 10,102.00
    featured: false,
    specs: [
      { label: "Class", value: "Industrial" },
      { label: "Print method", value: "Direct thermal / thermal transfer" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Print width", value: "4 in" },
      { label: "Display", value: "Colour LCD" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PD45S0C001000020" },
    ],
  },
  {
    id: "honeywell-px45",
    name: "Honeywell PX45 High-Performance Industrial Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-px45.jpg",
    resources: [
      { label: "PX65 / PX45 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/px65-industrial-printer" },
    ],
    shortDescription:
      "4-inch thermal-transfer high-performance industrial printer, 203 or 300 dpi, with a rewinder + label-taken sensor and Ethernet — heavy-duty, all-metal.",
    description:
      "The PX45 is Honeywell's high-performance 4-inch industrial printer: an all-metal enclosure, large media and ribbon capacity, and a duty cycle for the most demanding production and distribution lines. Supplied with an internal rewinder and label-taken sensor, Ethernet, and US & EU power cords. Available at 203 dpi and 300 dpi.",
    icon: "Printer",
    price: 0, // trade: R 34,583.00
    featured: false,
    specs: [
      { label: "Class", value: "High-performance industrial" },
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "203 dpi / 300 dpi" },
      { label: "Print width", value: "4 in" },
      { label: "Media handling", value: "Internal rewinder + label-taken sensor" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PX45A00000020200" },
    ],
  },
  {
    id: "honeywell-px65",
    name: "Honeywell PX65 6-inch High-Performance Industrial Label Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-px65.jpg",
    resources: [
      { label: "PX65 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/px65-industrial-printer" },
    ],
    shortDescription:
      "6-inch thermal-transfer high-performance industrial printer, 203 or 300 dpi, with Ethernet — wide-format labelling at the highest duty cycles.",
    description:
      "The 6-inch PX65 pairs the PX-series all-metal build and high duty cycle with wide media support for pallet, drum, chemical and compliance labelling. Ethernet as standard, US & EU power cords in the box. Available at 203 dpi and 300 dpi.",
    icon: "Printer",
    price: 0, // trade: R 35,395.00 (203 dpi) / R 37,547.00 (300 dpi)
    featured: false,
    specs: [
      { label: "Class", value: "High-performance industrial (6 in)" },
      { label: "Print method", value: "Thermal transfer" },
      { label: "Resolution", value: "203 dpi / 300 dpi" },
      { label: "Print width", value: "6 in" },
      { label: "Interfaces", value: "Ethernet, USB" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PX65A00000000200" },
    ],
  },
  {
    id: "honeywell-px940-verifier",
    name: "Honeywell PX940 Barcode Verification Industrial Printer",
    category: "Printers",
    brand: "Honeywell",
    image: "/webstore/autoid/honeywell-px940.jpg",
    resources: [
      { label: "PX940 product page", url: "https://sps.honeywell.com/us/en/products/productivity/printers/industrial/px940-industrial-printer" },
    ],
    shortDescription:
      "4-inch industrial printer with integrated inline barcode verification, 203 dpi, full-touch display, internal rewinder and peel-off — print-and-grade in one pass.",
    description:
      "The PX940 prints and verifies every label inline: an integrated verifier grades each barcode to ISO/ANSI as it is printed, so unreadable labels never leave the printer — critical for automotive, aerospace, pharmaceutical and retail-compliance labelling. Perpetual verification licence, universal firmware, internal rewinder, peel-off and label-taken sensor. Ships without a power cord.",
    icon: "ScanLine",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Class", value: "Industrial with inline verification" },
      { label: "Resolution", value: "203 dpi" },
      { label: "Verification", value: "Integrated, ISO/ANSI grading, perpetual licence" },
      { label: "Media handling", value: "Internal rewinder, peel-off, label-taken sensor" },
      { label: "Media core", value: '3" (1.5" option)' },
      { label: "Interfaces", value: "Ethernet, USB, Serial, Bluetooth" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "PX940V30100060200" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Label rewinders
  // ---------------------------------------------------------------------------
  {
    id: "kem-rw155-tautron-rewinder",
    name: "Tautron KEM RW155 4-inch Label Rewinder",
    category: "Accessories",
    brand: "Tautron",
    image: "/webstore/autoid/tautron-rw155.jpg",
    shortDescription:
      "Most popular label rewinder — 4-inch external rewinder that winds printed labels into a tidy roll as they leave the printer.",
    description:
      "The go-to external label rewinder for desktop and industrial printers: takes the printed web straight off the printer and winds it into a neat roll for storage, transport or an applicator. Adjustable speed to match the printer, and inside/outside winding. Pairs well with the Argox OS/O4/D4 and Honeywell PC/PM ranges.",
    icon: "Boxes",
    price: 0, // trade: R 4,063.00
    featured: true,
    specs: [
      { label: "Type", value: "External label rewinder" },
      { label: "Max width", value: "4 in" },
      { label: "Winding", value: "Inside / outside" },
      { label: "Warranty", value: "3 months (accessory)" },
      { label: "SKU", value: "KEM RW155" },
    ],
  },
  {
    id: "kemtek-t10-rewinder",
    name: "Kemtek T10 4-inch Label Rewinder",
    category: "Accessories",
    brand: "Godex",
    image: "/webstore/autoid/kemtek-t10-rewinder.png",
    shortDescription:
      "4-inch external label rewinder, up to 14 ips auto-mode rewind, 8-inch label roll capacity, inside/outside winding.",
    description:
      "A 4-inch external rewinder for Godex and other desktop/industrial printers: automatic rewind mode up to 14 ips keeps pace with fast printers, holds an 8-inch roll, and winds inside or outside. Universal PSU shared with the T20.",
    icon: "Boxes",
    price: 0, // trade: R 4,749.00
    featured: false,
    specs: [
      { label: "Type", value: "External label rewinder" },
      { label: "Max width", value: "4.72 in" },
      { label: "Rewind speed", value: "Up to 14 ips (auto)" },
      { label: "Roll capacity", value: "8 in" },
      { label: "Winding", value: "Inside / outside" },
      { label: "SKU", value: "KEMTEK T10" },
    ],
  },
  {
    id: "kemtek-t20-rewinder",
    name: "Kemtek T20 6-inch Label Rewinder",
    category: "Accessories",
    brand: "Godex",
    image: "/webstore/autoid/kemtek-t20-rewinder.png",
    shortDescription:
      "6-inch external label rewinder, roll OD up to 152.4 mm, 1\"/1.5\"/3\" core, inside or outside winding — for wide-format printers.",
    description:
      "A 6-inch external rewinder for wide-format label printers such as the Godex HD830i and Argox iX6. Handles media up to 177 mm wide and a 152.4 mm outer-diameter roll, winds inside or outside on 1-, 1.5- or 3-inch cores. Universal PSU shared with the T10.",
    icon: "Boxes",
    price: 0, // trade: R 6,374.00
    featured: false,
    specs: [
      { label: "Type", value: "External label rewinder" },
      { label: "Max width", value: "177 mm" },
      { label: "Roll OD", value: "Up to 152.4 mm" },
      { label: "Core", value: '1" / 1.5" / 3"' },
      { label: "Winding", value: "Inside / outside" },
      { label: "SKU", value: "KEMTEK T20" },
    ],
  },
  {
    id: "kemtek-t30-rewinder",
    name: "Kemtek T30 8.46-inch Label Rewinder",
    category: "Accessories",
    brand: "Godex",
    shortDescription:
      "Light-duty 8.46-inch external label rewinder, up to 4-inch roll and 5 kg, 12 ips — wide media at moderate volumes.",
    description:
      "A light-duty wide external rewinder for occasional wide-format work: takes an 8.46-inch web, up to a 4-inch roll and 5 kg, at 12 ips.",
    icon: "Boxes",
    price: 0, // trade: R 6,874.00
    featured: false,
    specs: [
      { label: "Type", value: "External label rewinder (light duty)" },
      { label: "Max width", value: "8.46 in" },
      { label: "Roll", value: "Up to 4 in / 5 kg" },
      { label: "Rewind speed", value: "12 ips" },
      { label: "SKU", value: "KEMTEK T30" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Argox — printheads (consumable; 6 months or 20,000 m warranty)
  // ---------------------------------------------------------------------------
  {
    id: "argox-tph-os214ex",
    name: "Argox Printhead — OS-214EX / OS-214EX Pro",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Genuine 203 dpi replacement printhead for the Argox OS-214EX and OS-214EX Pro desktop label printers.",
    description:
      "A genuine Argox thermal printhead for the OS-214EX family. Fitting a new printhead also carries a fitment charge; book it with the printer so print quality and warranty are preserved.",
    icon: "Wrench",
    price: 0, // trade: R 1,238.82 (+ R 515.00 fitment)
    featured: false,
    specs: [
      { label: "Type", value: "Thermal printhead (203 dpi)" },
      { label: "Fits", value: "Argox OS-214EX, OS-214EX Pro" },
      { label: "Warranty", value: "6 months or 20,000 m" },
      { label: "SKU", value: "ARG 59-214A2-001" },
    ],
  },
  {
    id: "argox-tph-o4-250",
    name: "Argox Printhead — O4-250",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Genuine 203 dpi replacement printhead for the Argox O4-250 and O4-250 Pro desktop label printers.",
    description:
      "A genuine Argox thermal printhead for the O4-250. A fitment charge applies; book it with the printer.",
    icon: "Wrench",
    price: 0, // trade: R 1,579.50 (+ R 515.00 fitment)
    featured: false,
    specs: [
      { label: "Type", value: "Thermal printhead (203 dpi)" },
      { label: "Fits", value: "Argox O4-250 / O4-250 Pro" },
      { label: "Warranty", value: "6 months or 20,000 m" },
      { label: "SKU", value: "ARG 59-O42A1-001" },
    ],
  },
  {
    id: "argox-tph-d4-250",
    name: "Argox Printhead — D4-250",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Genuine 203 dpi replacement printhead for the Argox D4-250 and D4-250 Pro desktop label printers.",
    description:
      "A genuine Argox thermal printhead for the D4-250. A fitment charge applies; book it with the printer.",
    icon: "Wrench",
    price: 0, // trade: R 1,579.50 (+ R 515.00 fitment)
    featured: false,
    specs: [
      { label: "Type", value: "Thermal printhead (203 dpi)" },
      { label: "Fits", value: "Argox D4-250 / D4-250 Pro" },
      { label: "Warranty", value: "6 months or 20,000 m" },
      { label: "SKU", value: "ARG 59-D42A1-001" },
    ],
  },
  {
    id: "argox-tph-cp2140ex",
    name: "Argox Printhead — CP-2140EX",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Genuine 203 dpi replacement printhead for the Argox CP-2140EX / CP-2140E desktop label printers.",
    description:
      "A genuine Argox thermal printhead for the CP-2140EX and CP-2140E. A fitment charge applies; book it with the printer.",
    icon: "Wrench",
    price: 0, // trade: R 1,447.88 (+ R 515.00 fitment)
    featured: false,
    specs: [
      { label: "Type", value: "Thermal printhead (203 dpi)" },
      { label: "Fits", value: "Argox CP-2140EX, CP-2140E" },
      { label: "Warranty", value: "6 months or 20,000 m" },
      { label: "SKU", value: "ARG 59-C21A2-011" },
    ],
  },
  {
    id: "argox-tph-ix4-250",
    name: "Argox Printhead — iX4-250",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Genuine 203 dpi replacement printhead for the Argox iX4-250 Pro industrial label printer.",
    description:
      "A genuine Argox thermal printhead for the iX4-250 industrial printer. A fitment charge applies; book it with the printer.",
    icon: "Wrench",
    price: 0, // trade: R 2,369.25 (+ R 515.00 fitment)
    featured: false,
    specs: [
      { label: "Type", value: "Thermal printhead (203 dpi)" },
      { label: "Fits", value: "Argox iX4-250 Pro" },
      { label: "Warranty", value: "6 months or 20,000 m" },
      { label: "SKU", value: "ARG 59-IX402-001" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Argox — cutters and modules (1-year / 3-month warranty)
  // ---------------------------------------------------------------------------
  {
    id: "argox-cutter-os214ex-pro",
    name: "Argox Guillotine Cutter — OS-214EX Pro",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Field-fit guillotine cutter for the Argox OS-214EX Pro desktop label printer — individually cut labels, tags and tickets.",
    description:
      "A guillotine cutter that mounts to the front of the OS-214EX Pro for tag, ticket and kit-label work where each label needs to be cut off individually.",
    icon: "Settings",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Type", value: "Guillotine cutter" },
      { label: "Fits", value: "Argox OS-214EX Pro" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 59-21404-052" },
    ],
  },
  {
    id: "argox-cutter-d4",
    name: "Argox Guillotine Full Cutter — D4 series",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Full guillotine cutter with black-mark sensor for the Argox D4-250 / D4 PRO desktop label printers.",
    description:
      "A full-cut guillotine module for the D4 series with a black-mark (BB) sensor for accurate cut positioning on tags and pre-printed stock.",
    icon: "Settings",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Type", value: "Guillotine full cutter with black-mark sensor" },
      { label: "Fits", value: "Argox D4-250 / D4 PRO" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 59-D4202-001" },
    ],
  },
  {
    id: "argox-cutter-ix4",
    name: "Argox Guillotine Full Cutter — iX4 series (heavy duty)",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Heavy-duty full guillotine cutter with black-mark sensor for the Argox iX4 industrial label printers, media up to 0.20 mm.",
    description:
      "A heavy-duty full-cut guillotine for the iX4 industrial range, rated for continuous cutting of tag and label stock up to 0.20 mm thick, with a black-mark sensor for registration.",
    icon: "Settings",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Type", value: "Heavy-duty guillotine full cutter" },
      { label: "Media thickness", value: "Up to 0.20 mm" },
      { label: "Fits", value: "Argox iX4 series" },
      { label: "Warranty", value: "1 year" },
      { label: "SKU", value: "ARG 59-IX401-001" },
    ],
  },
  {
    id: "argox-wifi-ix4-ix6-pro",
    name: "Argox Wi-Fi Module — iX4 Pro / iX6 Pro",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Factory Wi-Fi module for the Argox iX4 Pro and iX6 Pro industrial printers — cable-free placement on the shop floor.",
    description:
      "An internal Wi-Fi module for the iX4 Pro and iX6 Pro industrial printers, so a printer can be sited where power is available without running a network cable.",
    icon: "Wifi",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Type", value: "Internal Wi-Fi module" },
      { label: "Fits", value: "Argox iX4 Pro, iX6 Pro" },
      { label: "SKU", value: "ARG 59-IX406-011" },
    ],
  },
  {
    id: "argox-wifi-o4-250-pro",
    name: "Argox Wi-Fi Module — O4-250 Pro",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Factory Wi-Fi module for the Argox O4-250 Pro desktop label printer.",
    description:
      "An internal Wi-Fi module for the O4-250 Pro desktop printer for cable-free placement at a counter or bench.",
    icon: "Wifi",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Type", value: "Internal Wi-Fi module" },
      { label: "Fits", value: "Argox O4-250 Pro" },
      { label: "SKU", value: "ARG 59-O4203-011" },
    ],
  },
  {
    id: "argox-as-9400-scanner",
    name: "Argox AS-9400 2D Barcode Scanner Kit",
    category: "Accessories",
    brand: "Argox",
    shortDescription:
      "Corded 2D imaging barcode scanner with USB and a hands-free scan stand — reads 1D and 2D codes off paper and screens.",
    description:
      "A general-purpose 2D imaging scanner supplied as a kit with a USB cable and a hands-free stand for presentation scanning at a counter or bench. Reads 1D and 2D barcodes from printed labels and from phone and monitor screens.",
    icon: "ScanLine",
    price: 0, // trade: on request
    featured: false,
    specs: [
      { label: "Type", value: "Corded 2D imager" },
      { label: "Interface", value: "USB" },
      { label: "Included", value: "Scanner, USB cable, scan stand" },
      { label: "SKU", value: "OS 00-99940-102" },
    ],
  },
];
