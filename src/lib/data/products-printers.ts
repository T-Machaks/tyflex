import type { Product } from "@/lib/data/products";

// Impact / line-matrix / industrial-laser printers Tyflex supplies.
// Pricing on request. Product photos sourced from manufacturer / distributor
// listings and squared into public/webstore/printers/.
export const printerProducts: Product[] = [
  {
    id: "compuprint-2056en",
    name: "Compuprint 2056EN Dot Matrix Printer",
    category: "Printers",
    brand: "Compuprint",
    image: "/webstore/printers/compuprint-2056en.png",
    shortDescription:
      "24-pin 80-column serial dot matrix printer, ~350 cps, with parallel, USB, serial and Ethernet — built for multi-part forms and POS.",
    description:
      "An industrial 24-pin dot matrix printer for continuous and cut-sheet multi-part stationery — invoices, waybills, counter slips. Handles 1+5 carbon copies and offers parallel, USB 2.0, serial and 10/100 Ethernet out of the box.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin serial impact dot matrix" },
      { label: "Columns", value: "80 (10 cpi)" },
      { label: "Print speed", value: "Up to ~350 cps (draft)" },
      { label: "Copies", value: "Original + 5" },
      { label: "Interfaces", value: "Parallel (IEEE 1284), USB 2.0, Serial RS-232, Ethernet 10/100" },
      { label: "SKU", value: "PRTN2056EN" },
    ],
  },
  {
    id: "compuprint-3056",
    name: "Compuprint 3056 Dot Matrix Printer",
    category: "Printers",
    brand: "Compuprint",
    image: "/webstore/printers/compuprint-3056.png",
    shortDescription:
      "24-pin 136-column dot matrix printer, 480 cps high-speed draft, fanfold and cut-sheet — heavy-duty back-office and logistics printing.",
    description:
      "A rugged wide-carriage 24-pin printer for high-volume multi-part work: invoices, shipping manifests, pick lists. 480 cps in high-speed draft, 360 × 180 dpi, 1+5 copies, automatic paper parking and zero tear-off, with a metal chassis and long-life ribbon.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin serial impact dot matrix" },
      { label: "Columns", value: "136 (10 cpi)" },
      { label: "Print speed", value: "480 cps (high-speed draft)" },
      { label: "Resolution", value: "360 × 180 dpi" },
      { label: "Copies", value: "Original + 5" },
      { label: "Media", value: "Fanfold + cut sheet, auto park / zero tear-off" },
      { label: "Interfaces", value: "Parallel, Serial, USB (LAN on 3056N)" },
      { label: "SKU", value: "PRTN3056" },
    ],
  },
  {
    id: "printronix-s809",
    name: "Printronix S809 Serial Dot Matrix Printer",
    category: "Printers",
    brand: "Printronix",
    image: "/webstore/printers/printronix-s809.png",
    shortDescription:
      "Industrial 24-pin serial dot matrix printer up to ~900 cps, with Ethernet, USB 2.0, serial and parallel — long printhead life and high duty cycle.",
    description:
      "Sets the standard for industrial-strength high-speed impact printing: 24-pin printhead, up to roughly 900 cps at 10 cpi, best-in-class printhead life and workload capacity. Ethernet, USB 2.0, serial and parallel interfaces are all standard.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin serial impact dot matrix" },
      { label: "Print speed", value: "Up to ~900 cps (10 cpi)" },
      { label: "Interfaces", value: "Ethernet, USB 2.0, Serial, Parallel" },
      { label: "Class", value: "Industrial, high duty cycle" },
      { label: "SKU", value: "SM-809-EMEA" },
    ],
  },
  {
    id: "printronix-p8005-p8p05",
    name: "Printronix P8005 (P8P05) Line Matrix Printer — 500 lpm",
    category: "Printers",
    brand: "Printronix",
    image: "/webstore/printers/printronix-p8005-p8p05.png",
    shortDescription:
      "500 lpm open-pedestal line matrix printer on casters, cartridge ribbon, 13.6\" print width — high-volume reports, manifests and green-bar.",
    description:
      "A P8000-series line matrix printer in a compact open-pedestal form factor with casters for mobility. 500 lpm, cartridge-style ribbons for maximum uptime, sheet-metal construction, and a large graphical LCD with remote diagnostics.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "Line matrix (impact)" },
      { label: "Print speed", value: "500 lpm" },
      { label: "Form factor", value: "Open pedestal, casters" },
      { label: "Max print width", value: "13.6 in" },
      { label: "Interfaces", value: "USB 2.0, Serial, Parallel, Ethernet" },
      { label: "Ribbon", value: "Cartridge" },
      { label: "SKU", value: "P8P05-1213-0" },
    ],
  },
  {
    id: "printronix-p8215-p8c15",
    name: "Printronix P8215 (P8C15) Plus Line Matrix Printer — 1500 lpm",
    category: "Printers",
    brand: "Printronix",
    image: "/webstore/printers/printronix-p8215-p8c15.png",
    shortDescription:
      "1500 lpm line matrix printer in a quiet full cabinet — large unattended print runs in noise-sensitive offices.",
    description:
      "A P8000-series line matrix printer in an enclosed acoustic cabinet, rated at 1500 lpm. Modular design and a wide range of paper-handling options suit noise-adverse areas running large unattended jobs.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "Line matrix (impact)" },
      { label: "Print speed", value: "1500 lpm" },
      { label: "Form factor", value: "Enclosed acoustic cabinet" },
      { label: "Ribbon", value: "Cartridge" },
      { label: "SKU", value: "P8C15-1213-0" },
    ],
  },
  {
    id: "printronix-lp654c",
    name: "Printronix LP654C Industrial Colour Printer — A4",
    category: "Printers",
    brand: "Printronix",
    image: "/webstore/printers/printronix-lp654c.png",
    shortDescription:
      "Compact A4 industrial colour LED printer up to 35 ppm at 1200 × 1200 dpi — labels, envelopes and thick stock with a straight paper path.",
    description:
      "Billed as the world's smallest A4 colour printer, the LP654C needs only ~20 mm clearance at the sides and offers full front access. Up to 35 ppm HD colour on media up to 256 gsm or 1.32 m long, with a straight paper path for labels and envelopes.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "Colour LED / laser" },
      { label: "Max media", value: "A4" },
      { label: "Print speed", value: "Up to 35 ppm" },
      { label: "Resolution", value: "1200 × 1200 dpi" },
      { label: "Media weight", value: "64–256 gsm, up to 1.32 m long" },
      { label: "Class", value: "Industrial" },
      { label: "SKU", value: "U1023G019" },
    ],
  },
  {
    id: "printronix-lp844c",
    name: "Printronix LP844C Industrial Colour Printer — A3",
    category: "Printers",
    brand: "Printronix",
    image: "/webstore/printers/printronix-lp844c.png",
    shortDescription:
      "Compact A3 (11 × 17\") industrial colour LED printer up to 36 ppm at 1200 × 1200 dpi — durable, water- and tear-proof media for warehouse and signage.",
    description:
      "The world's smallest A3 colour printer, capable of up to 36 ppm HD colour on the broadest range of media. Paper trays hold up to 2,540 sheets; separate HD toners and long-life drums support a high duty cycle. Prints ultra-durable water/tear-proof stock for indoor and outdoor use.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "Colour LED / laser" },
      { label: "Max media", value: "A3 (11 × 17 in), up to 1.32 m long" },
      { label: "Print speed", value: "Up to 36 ppm" },
      { label: "Resolution", value: "1200 × 1200 dpi" },
      { label: "Input capacity", value: "Up to 2,540 sheets" },
      { label: "Media weight", value: "64–256 gsm" },
      { label: "Class", value: "Industrial" },
      { label: "SKU", value: "U47074329" },
    ],
  },
  {
    id: "fujitsu-dl3100",
    name: "Fujitsu DL3100 Dot Matrix Printer",
    category: "Printers",
    brand: "Fujitsu",
    image: "/webstore/printers/fujitsu-dl3100.png",
    shortDescription:
      "24-pin 80-column serial dot matrix printer with USB and LAN — compact, low-noise multi-part and professional printing.",
    description:
      "A compact 24-pin serial impact dot matrix printer for professional and multi-part work. Ships with USB plus LAN interface and UK/Continental AC cables.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin serial impact dot matrix" },
      { label: "Columns", value: "80" },
      { label: "Interfaces", value: "USB, LAN" },
      { label: "SKU", value: "KA02100-B711" },
    ],
  },
  {
    id: "fujitsu-dl3850-plus-parallel-usb",
    name: "Fujitsu DL3850+ Dot Matrix Printer (Parallel + USB)",
    category: "Printers",
    brand: "Fujitsu",
    image: "/webstore/printers/fujitsu-dl3850-plus-parallel-usb.png",
    shortDescription:
      "24-pin 136-column serial dot matrix printer with Centronics parallel and USB — high-speed draft, auto paper parking, barcode and multi-part printing.",
    description:
      "A high-performance 136-column 24-pin printer with a platen winding system for low noise in a compact body. Automatic paper parking and loading, auto tear-off, barcode printing and a High Speed Draft mode. Mono, 200–240 V, Centronics parallel + USB.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin serial impact dot matrix" },
      { label: "Columns", value: "136" },
      { label: "Interfaces", value: "Centronics parallel, USB" },
      { label: "Features", value: "High Speed Draft, auto park / load / tear-off, barcode" },
      { label: "Power", value: "200–240 V, mono" },
      { label: "SKU", value: "KA02014-B511" },
    ],
  },
  {
    id: "fujitsu-dl3850-plus-serial-parallel",
    name: "Fujitsu DL3850+ Dot Matrix Printer (Serial + Parallel)",
    category: "Printers",
    brand: "Fujitsu",
    image: "/webstore/printers/fujitsu-dl3850-plus-serial-parallel.png",
    shortDescription:
      "24-pin 136-column serial dot matrix printer with serial and parallel interfaces — high-speed draft, auto paper parking and multi-part printing.",
    description:
      "The serial/parallel variant of the DL3850+: a 136-column 24-pin printer with a low-noise platen winding system, automatic paper parking and loading, auto tear-off, barcode printing and High Speed Draft mode. Mono, 200–240 V.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin serial impact dot matrix" },
      { label: "Columns", value: "136" },
      { label: "Interfaces", value: "Serial, Parallel" },
      { label: "Features", value: "High Speed Draft, auto park / load / tear-off, barcode" },
      { label: "Power", value: "200–240 V, mono" },
      { label: "SKU", value: "KA02014-B611" },
    ],
  },
  {
    id: "aui-sp-330",
    name: "AUI SP-330 Dot Matrix Printer",
    category: "Printers",
    brand: "AUI",
    image: "/webstore/printers/aui-sp-330.png",
    shortDescription:
      "Compact 9-pin impact printer up to 337 cps, original + 3 copies, EPSON ESC/P emulation — invoices, waybills and counter slips.",
    description:
      "A compact, reliable 9-pin impact dot matrix printer for multi-part forms and continuous stationery. Up to 337 cps in super-draft, original + 3 copies, EPSON ESC/P emulation for easy integration, nine built-in barcode types, and a printhead rated at 400 million strokes per wire.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "9-pin impact dot matrix" },
      { label: "Print speed", value: "337 cps super-draft / 270 draft / 67 NLQ" },
      { label: "Copies", value: "Original + 3" },
      { label: "Emulation", value: "EPSON ESC/P" },
      { label: "Printhead life", value: "400 million strokes / wire" },
      { label: "SKU", value: "AUI SP330" },
    ],
  },
  {
    id: "aui-bp9000e",
    name: "AUI BP9000E Industrial Dot Matrix Printer",
    category: "Printers",
    brand: "AUI",
    image: "/webstore/printers/aui-bp9000e.png",
    shortDescription:
      "24-pin wide-carriage industrial dot matrix printer up to 1000 cps, 1+8 multi-part, with parallel, Ethernet, USB 2.0 and RS-232C.",
    description:
      "A robust 24-pin wide-carriage printer for high-volume multi-part documents in manufacturing, logistics, retail and healthcare. Up to 1000 cps, 1+8 carbon copies, seven built-in LQ fonts, 132 KB buffer, printhead rated at 5 million dots per pin, with Centronics parallel, Ethernet, USB 2.0 and RS-232C.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "24-pin wide-carriage impact dot matrix" },
      { label: "Print speed", value: "Up to 1000 cps" },
      { label: "Copies", value: "Original + 8" },
      { label: "Interfaces", value: "Centronics parallel, Ethernet, USB 2.0, RS-232C" },
      { label: "Printhead life", value: "5 million dots / pin" },
      { label: "SKU", value: "BP9000E" },
    ],
  },
  {
    id: "aui-fb-7600",
    name: "AUI FB-7600 Dot Matrix Printer",
    category: "Printers",
    brand: "AUI",
    image: "/webstore/printers/aui-fb-7600.png",
    shortDescription:
      "AUI FB-7600 impact dot matrix printer for multi-part forms and continuous stationery. Full specification on request.",
    description:
      "An AUI impact dot matrix printer for back-office and counter printing of multi-part forms and continuous stationery. Detailed specifications available on request.",
    icon: "Printer",
    price: 0,
    featured: false,
    specs: [
      { label: "Technology", value: "Impact dot matrix" },
      { label: "SKU", value: "FB-7600" },
    ],
  },
];
