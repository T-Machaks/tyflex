import type { IconName } from "@/lib/icon-map";

/**
 * Priority brands Tyflex supplies and supports in Zimbabwe. Each gets a
 * dedicated, indexable landing page at /brands/[slug] — these are the terms
 * we most want to rank for (barcode/label printing, enterprise mobility,
 * VoIP, AWS cloud, video security). The `productBrandKeys` tie a brand page
 * to matching items in the webstore catalogue (src/lib/data/products.ts);
 * brands with no catalogue items yet still get a page for search coverage.
 */
export interface Brand {
  slug: string;
  /** Display name, also shown in the H1. */
  name: string;
  /** Short category label, e.g. "Barcode & Label Printing". */
  category: string;
  tagline: string;
  /** Intro paragraphs — plain strings, rendered as <p>. */
  intro: string[];
  /** What Tyflex does with this brand — bulleted. */
  highlights: string[];
  icon: IconName;
  /** `product.brand` values to pull into the catalogue grid on the page. */
  productBrandKeys: string[];
  /** Related /solutions slugs surfaced as cross-links. */
  solutionSlugs: string[];
  /** Optional "see also" link shown under the tagline (e.g. a brand that was merged/renamed). */
  seeAlso?: { label: string; href: string };
  /** Points the primary CTA at the AWS hub instead of /get-quote. */
  awsHub?: boolean;
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const brands: Brand[] = [
  {
    slug: "tsc",
    name: "TSC Auto ID",
    category: "Barcode & Label Printing",
    tagline: "Desktop, industrial and mobile thermal label printers — supplied, installed and supported across Zimbabwe.",
    intro: [
      "TSC Auto ID (TSC Printronix) builds thermal barcode and label printers for retail, warehousing, manufacturing and healthcare. Tyflex supplies the full range — compact desktop units, high-duty industrial printers, mobile printers and RFID-capable models — with the ribbons, media and BarTender or ERP integration to match.",
      "We attended the inaugural TSC Printronix Connect partner event and specify TSC hardware to the duty cycle so operators just press print.",
    ],
    highlights: [
      "Desktop printers for steady label volumes in receiving, dispatch and point-of-work",
      "Industrial printers (RE310, MH/MX series) for high-throughput, multi-shift printing",
      "Linerless and mobile printing (DA220, Alpha series) for pick-and-pack and stock takes",
      "RFID encoding on TH/TE series for tagged inventory and asset tracking",
      "Genuine ribbons and label media, plus datasheets and configuration support",
    ],
    icon: "Printer",
    productBrandKeys: ["TSC"],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Which TSC printer is right for my volume?",
        answer:
          "Desktop models suit a few hundred labels a day; industrial models are built for continuous multi-shift printing. Tell us your daily label count, label size and environment and we will spec the right model, ribbon and media.",
      },
      {
        question: "Do you supply TSC ribbons and labels in Zimbabwe?",
        answer:
          "Yes — we supply genuine wax, wax-resin and resin ribbons plus label stock sized to your application, so print quality and printhead life stay predictable.",
      },
      {
        question: "Can TSC printers encode RFID tags?",
        answer:
          "TSC's TH and TE series print and encode UHF RFID labels in one pass. It is the practical entry point for asset registers, returnable containers and work-in-progress tracking.",
      },
    ],
    metaTitle: "TSC Barcode & Label Printers in Zimbabwe | Tyflex",
    metaDescription:
      "TSC Auto ID thermal barcode and label printers supplied and supported by Tyflex in Zimbabwe — desktop, industrial, mobile and RFID models, with ribbons, media and datasheets. Pricing on request.",
    keywords: [
      "TSC printers Zimbabwe",
      "TSC label printer",
      "TSC barcode printer Harare",
      "thermal label printer Zimbabwe",
      "TSC Auto ID reseller Zimbabwe",
      "barcode printing Zimbabwe",
    ],
  },
  {
    slug: "printronix",
    name: "Printronix",
    category: "Industrial & Line-Matrix Printing",
    tagline: "Line-matrix and industrial thermal printers built for the toughest print rooms — supplied and serviced by Tyflex.",
    intro: [
      "Printronix is the reference name in line-matrix printing — printers designed to run for years in manufacturing plants, logistics hubs and utilities where impact printing on multipart forms still matters. Printronix Auto ID adds heavy-duty industrial thermal and RFID printers for high-volume labelling.",
      "Tyflex supplies both lines, along with consumables and the datasheets and support to keep them in production.",
    ],
    highlights: [
      "P8000 series line-matrix printers for continuous forms, reports and labels",
      "Industrial thermal printers (T6000, T8000) for high-volume, high-duty labelling",
      "RFID-capable models for compliance and supply-chain tagging",
      "Ribbons, printheads and spares held or sourced on short lead times",
      "Fleet configuration and integration with ERP and WMS print streams",
    ],
    icon: "Printer",
    productBrandKeys: ["Printronix"],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Why choose line-matrix over laser or thermal?",
        answer:
          "Line-matrix printers handle multipart forms, run in dusty and hot environments, and have a very low cost per page at high volume — which is why they persist in manufacturing and logistics.",
      },
      {
        question: "Do you service existing Printronix printers?",
        answer:
          "Yes — we supply ribbons and spare parts and can support installed P-series and T-series units, not just new hardware.",
      },
    ],
    metaTitle: "Printronix Line-Matrix & Industrial Printers in Zimbabwe | Tyflex",
    metaDescription:
      "Printronix line-matrix and Printronix Auto ID industrial thermal/RFID printers from Tyflex in Zimbabwe — P8000, T6000/T8000, ribbons, printheads and support. Pricing on request.",
    keywords: [
      "Printronix Zimbabwe",
      "line matrix printer Zimbabwe",
      "Printronix P8000",
      "industrial barcode printer Zimbabwe",
      "Printronix reseller Zimbabwe",
      "barcode printing Zimbabwe",
    ],
  },
  {
    slug: "tallygenicom",
    name: "TallyGenicom",
    category: "Line-Matrix & Laser Printing — Now Printronix",
    tagline:
      "TallyGenicom is now Printronix. Order from Tyflex and you get genuine dual-branded Printronix / TallyGenicom hardware, parts and supplies — fully backward compatible with your existing TallyGenicom fleet.",
    seeAlso: { label: "See Printronix", href: "/brands/printronix" },
    intro: [
      "If you're looking for TallyGenicom printers, you're in the right place. TallyGenicom was formed in 2003 when Tally and GENICOM, two names in industrial printing, joined forces. In 2009 Printronix acquired TallyGenicom and took over all of the line matrix and laser printer products, parts, ribbons and consumables. The standalone TallyGenicom brand has since been discontinued — the products carry the Printronix name.",
      "Order TallyGenicom from Tyflex and you receive a dual-branded Printronix / TallyGenicom product. The printers, parts and supplies are marked under both names, so you can be confident you are getting the genuine successor to the TallyGenicom line you know.",
      "Already running TallyGenicom printers? During configuration you choose either TallyGenicom or Printronix settings, so a new unit slots straight into your current environment — no need to overhaul your host systems or worry about compatibility. Whether you are replacing an older TallyGenicom unit or expanding, you get the same rugged, industrial-grade performance with full backward compatibility built in.",
    ],
    highlights: [
      "Dual-branded Printronix / TallyGenicom printers — the genuine continuation of the TallyGenicom line",
      "Line matrix printers for high-volume forms, picking lists, labels and reports",
      "Laser printers, parts and consumables formerly sold under TallyGenicom, now under Printronix",
      "Backward-compatible setup — select TallyGenicom or Printronix configuration during install",
      "Genuine ribbons, printheads and spare parts for both new and installed units",
      "Integration with SAP, Sage and other host and ERP print streams",
    ],
    icon: "Printer",
    productBrandKeys: [],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Is TallyGenicom still available?",
        answer:
          "The standalone TallyGenicom brand was discontinued after Printronix acquired it in 2009. Every TallyGenicom line matrix and laser printer, part and supply is now manufactured by Printronix.",
      },
      {
        question: "What will I receive when I order TallyGenicom?",
        answer:
          "A dual-branded product carrying both the Printronix and TallyGenicom names — the same quality and technology, now under the Printronix umbrella — so there is no confusion about what you are getting.",
      },
      {
        question: "Will it work with my current TallyGenicom printers?",
        answer:
          "Yes. During setup you can choose either TallyGenicom or Printronix configuration settings. If you are integrating with an existing TallyGenicom environment, select the TallyGenicom option and the new printer works right alongside your current equipment — no host or workflow changes.",
      },
      {
        question: "Do you supply TallyGenicom ribbons and parts in Zimbabwe?",
        answer:
          "Yes — Tyflex supplies the genuine ribbons, printheads and spare parts (now Printronix-branded) for both new and installed units, to order. Send us your model and we will quote availability and lead time.",
      },
    ],
    metaTitle: "TallyGenicom Printers — Now Printronix | Tyflex Zimbabwe",
    metaDescription:
      "TallyGenicom line matrix and laser printers are now Printronix. Tyflex supplies genuine dual-branded Printronix / TallyGenicom hardware, ribbons and parts in Zimbabwe — fully backward compatible. Pricing on request.",
    keywords: [
      "TallyGenicom Zimbabwe",
      "TallyGenicom now Printronix",
      "TallyGenicom line matrix printer",
      "TallyGenicom ribbons Zimbabwe",
      "Printronix TallyGenicom",
      "line matrix printer Zimbabwe",
      "barcode printing Zimbabwe",
    ],
  },
  {
    slug: "urovo",
    name: "Urovo",
    category: "Enterprise Mobility Devices",
    tagline: "Android rugged handheld computers, mobile terminals and mPOS for teams that work away from a desk.",
    intro: [
      "Urovo builds Android enterprise mobility devices — rugged handheld computers, PDAs with integrated barcode scanning, wearable scanners and mobile point-of-sale terminals — for warehousing, retail, field service and delivery.",
      "Tyflex supplies Urovo devices with accessories, charging and the mobile-device management and application integration to put them to work.",
    ],
    highlights: [
      "Rugged Android handheld computers with 1D/2D scanning for warehouse and retail",
      "Mobile POS terminals for queue-busting and on-the-move payments",
      "Wearable and ring scanners for hands-free picking",
      "Cradles, spare batteries and screen protection for fleet deployment",
      "MDM enrolment and integration with your WMS, ERP or retail app",
    ],
    icon: "ScanLine",
    productBrandKeys: [],
    solutionSlugs: ["autoid", "pos-systems"],
    faqs: [
      {
        question: "What do businesses use Urovo devices for?",
        answer:
          "Stock receiving and put-away, cycle counts, order picking, proof of delivery, price checks and mobile checkout — anywhere staff need to scan and capture data on the move.",
      },
      {
        question: "Can Urovo devices run our existing warehouse or retail app?",
        answer:
          "They run standard Android, so most web or Android line-of-business apps work. We help with enrolment, lock-down and app deployment across the fleet.",
      },
    ],
    metaTitle: "Urovo Rugged Mobility Devices & Handheld Terminals in Zimbabwe | Tyflex",
    metaDescription:
      "Urovo Android rugged handheld computers, mobile terminals and mPOS from Tyflex in Zimbabwe — barcode scanning, accessories, MDM and app integration for warehouse and retail. Pricing on request.",
    keywords: [
      "Urovo Zimbabwe",
      "rugged handheld computer Zimbabwe",
      "Android mobile computer Zimbabwe",
      "warehouse scanner Zimbabwe",
      "mobility devices Zimbabwe",
      "mobile POS terminal Harare",
    ],
  },
  {
    slug: "aws",
    name: "AWS",
    category: "Cloud Infrastructure",
    tagline: "Amazon Web Services cloud — migration, backup, disaster recovery and secure foundations, delivered by an AWS Partner.",
    intro: [
      "Tyflex is an AWS Partner. We design, build and help run workloads on Amazon Web Services for small and mid-sized businesses in Zimbabwe — website and application hosting, database and cloud-to-cloud migration, backup and disaster recovery, threat detection and secure landing zones.",
      "Our venture Vekta was on the ground at AWS Summit 2026 in Johannesburg, and we attended the First Distribution 2026 AWS Business Partner Conference — the AWS practice is a core part of what Tyflex does.",
    ],
    highlights: [
      "AWS migration — servers and databases moved with the business kept running",
      "Cloud backup and disaster recovery with fast, tested recovery",
      "Secure landing zones — guardrails, identity and compliance from day one",
      "Threat detection and continuous security monitoring",
      "Ongoing managed support so you get the benefit without a large cloud team",
    ],
    icon: "Cloud",
    productBrandKeys: [],
    solutionSlugs: ["aws-cloud-solutions"],
    awsHub: true,
    faqs: [
      {
        question: "Is Tyflex an AWS Partner?",
        answer:
          "Yes. Tyflex is a member of the AWS Partner Network and delivers the eight AWS SMB solutions — see our AWS Cloud Solutions section for the full set.",
      },
      {
        question: "Can you help us move off on-premise servers to AWS?",
        answer:
          "Yes — that is one of our most common projects. We plan, migrate and validate the move, keeping your systems running while data is copied and kept in sync.",
      },
    ],
    metaTitle: "AWS Cloud Partner in Zimbabwe — Migration & Hosting | Tyflex",
    metaDescription:
      "Tyflex is an AWS Partner in Zimbabwe delivering Amazon Web Services migration, hosting, backup, disaster recovery and secure landing zones for small and mid-sized businesses.",
    keywords: [
      "AWS partner Zimbabwe",
      "AWS cloud Zimbabwe",
      "AWS migration Zimbabwe",
      "cloud hosting Zimbabwe",
      "Amazon Web Services Harare",
      "cloud backup Zimbabwe",
    ],
  },
  {
    slug: "3cx",
    name: "3CX",
    category: "Business Phone Systems",
    tagline: "Certified 3CX partner in Zimbabwe — cloud-hosted or on-premise VoIP with video, live chat and mobile apps.",
    intro: [
      "3CX is an all-in-one business phone system — voice, video meetings, live chat and WhatsApp in one platform, hosted in the cloud or on your own server. Tyflex is a certified 3CX partner and handles licensing, deployment, number porting and ongoing support.",
      "We pair 3CX with certified Yealink and Fanvil handsets and SIP trunking so the whole system is provisioned and supported by one team.",
    ],
    highlights: [
      "Cloud-hosted or on-premise 3CX — you choose where it runs",
      "Free video conferencing for up to 250 participants",
      "Website live chat, Facebook and WhatsApp in the same console",
      "iOS and Android apps so staff keep their extension anywhere",
      "Certified partner licensing, deployment and support",
    ],
    icon: "PhoneCall",
    productBrandKeys: ["3CX"],
    solutionSlugs: ["3cx", "ucaas", "sip-trunking"],
    faqs: [
      {
        question: "Is Tyflex a certified 3CX partner?",
        answer:
          "Yes — Tyflex holds 3CX partner certification and manages licensing, installation and support for cloud-hosted and on-premise deployments.",
      },
      {
        question: "Which phones work with 3CX?",
        answer:
          "We supply 3CX-certified Yealink and Fanvil IP phones that auto-provision with your system, plus the softphone and mobile apps at no extra cost.",
      },
    ],
    metaTitle: "3CX Phone System — Certified Partner in Zimbabwe | Tyflex",
    metaDescription:
      "Tyflex is a certified 3CX partner in Zimbabwe — cloud or on-premise 3CX VoIP with video, live chat, mobile apps, certified handsets and SIP trunking. Pricing on request.",
    keywords: [
      "3CX Zimbabwe",
      "3CX partner Zimbabwe",
      "3CX phone system Harare",
      "VoIP Zimbabwe",
      "business phone system Zimbabwe",
      "3CX hosting Zimbabwe",
    ],
  },
  {
    slug: "yeastar",
    name: "Yeastar",
    category: "IP-PBX & VoIP Gateways",
    tagline: "Yeastar P-Series PBX, cloud PBX and VoIP gateways — supplied, deployed and supported by Tyflex.",
    intro: [
      "Yeastar builds IP-PBX systems and VoIP gateways for businesses that want a full-featured phone system without enterprise complexity. The P-Series covers call queues, IVR, call recording, reporting and a call-centre console; the gateway range bridges analogue lines, ISDN and GSM into VoIP.",
      "Tyflex runs national call centres on Yeastar infrastructure — including the Legal Resources Foundation's advice line covering all ten provinces of Zimbabwe.",
    ],
    highlights: [
      "Yeastar P-Series PBX — appliance, software or Yeastar Cloud",
      "Call queues, IVR, recording, wallboards and call-centre reporting",
      "TA, TG and NeoGate gateways for analogue, ISDN PRI and GSM",
      "Linkus mobile and desktop clients for extensions on the move",
      "Multi-site deployment, number porting and ongoing support",
    ],
    icon: "PhoneOutgoing",
    productBrandKeys: ["Yeastar"],
    solutionSlugs: ["cloud-pbx", "ucaas", "3cx"],
    faqs: [
      {
        question: "Can Yeastar run a call centre?",
        answer:
          "Yes — the P-Series includes queues, agent controls, live wallboards and reporting. Tyflex has deployed Yeastar call centres spanning every province of Zimbabwe.",
      },
      {
        question: "Can Yeastar keep our existing analogue or PRI lines?",
        answer:
          "Yes — Yeastar gateways bridge analogue extensions, ISDN PRI trunks and even GSM into the IP-PBX, so you can migrate in stages.",
      },
    ],
    metaTitle: "Yeastar PBX & VoIP Gateways in Zimbabwe | Tyflex",
    metaDescription:
      "Yeastar P-Series IP-PBX, cloud PBX and VoIP gateways from Tyflex in Zimbabwe — call queues, IVR, recording, call-centre reporting and multi-site support. Pricing on request.",
    keywords: [
      "Yeastar Zimbabwe",
      "Yeastar PBX Zimbabwe",
      "IP PBX Zimbabwe",
      "call centre solution Zimbabwe",
      "VoIP gateway Zimbabwe",
      "Yeastar reseller Harare",
    ],
  },
  {
    slug: "fanvil",
    name: "Fanvil",
    category: "IP Phones & SIP Intercoms",
    tagline: "Fanvil IP desk phones, SIP door intercoms and paging — cost-effective endpoints for VoIP and 3CX.",
    intro: [
      "Fanvil makes IP phones, SIP video door intercoms, paging speakers and emergency call points that pair with any SIP platform — 3CX, Yeastar, cloud PBX or SIP trunk. The range runs from entry-level desk phones to executive and colour-screen models.",
      "Tyflex supplies and provisions Fanvil endpoints alongside the phone systems we deploy, and uses Fanvil intercoms and paging in smart-building and access projects.",
    ],
    highlights: [
      "Entry-level to executive IP desk phones, all SIP-standard",
      "i-Series SIP video door intercoms and access call points",
      "SIP paging speakers and public-address for warehouses and campuses",
      "Auto-provisioning with 3CX, Yeastar and other SIP platforms",
      "PoE-powered, so no separate power supplies to run",
    ],
    icon: "Phone",
    productBrandKeys: ["Fanvil"],
    solutionSlugs: ["ucaas", "cloud-pbx", "smart-building"],
    faqs: [
      {
        question: "Do Fanvil phones work with 3CX and Yeastar?",
        answer:
          "Yes — Fanvil endpoints are SIP-standard and auto-provision with 3CX, Yeastar and other platforms. We stage them so they register on first boot.",
      },
      {
        question: "Can Fanvil intercoms open gates and doors?",
        answer:
          "Fanvil i-Series video intercoms include relay outputs for electric strikes and gate motors, and register as SIP extensions so calls ring your phones or mobile app.",
      },
    ],
    metaTitle: "Fanvil IP Phones & SIP Intercoms in Zimbabwe | Tyflex",
    metaDescription:
      "Fanvil IP desk phones, SIP video door intercoms and paging speakers from Tyflex in Zimbabwe — auto-provisioning with 3CX and Yeastar, PoE-powered. Pricing on request.",
    keywords: [
      "Fanvil Zimbabwe",
      "Fanvil IP phone Zimbabwe",
      "SIP intercom Zimbabwe",
      "VoIP phone Harare",
      "Fanvil door phone",
      "SIP paging Zimbabwe",
    ],
  },
  {
    slug: "yealink",
    name: "Yealink",
    category: "IP Phones & Video Conferencing",
    tagline: "Yealink IP phones, video bars, headsets and room systems — supplied and provisioned by Tyflex.",
    intro: [
      "Yealink is the volume leader in IP desk phones and a major name in video conferencing. The range covers entry-level SIP phones, colour-screen and executive handsets, DECT cordless, USB and Bluetooth headsets, and all-in-one video bars and room systems for Microsoft Teams and Zoom.",
      "Tyflex supplies Yealink hardware for VoIP, 3CX and meeting-room projects, staged and provisioned so it registers on first boot.",
    ],
    highlights: [
      "T3 and T4 series SIP desk phones for every desk in the building",
      "DECT cordless handsets for warehouse, retail and roaming staff",
      "UH and BH series USB and Bluetooth headsets for softphone users",
      "MeetingBar and room systems for Teams and Zoom spaces",
      "Auto-provisioning with 3CX, Yeastar and other SIP platforms",
    ],
    icon: "Phone",
    productBrandKeys: ["Yealink"],
    solutionSlugs: ["ucaas", "3cx", "meeting-rooms"],
    faqs: [
      {
        question: "Are Yealink phones certified for 3CX and Teams?",
        answer:
          "Yealink handsets are 3CX-certified and auto-provision with it; the MeetingBar and room range is Microsoft Teams and Zoom certified. We match the model to your platform.",
      },
      {
        question: "Do you supply Yealink headsets for remote staff?",
        answer:
          "Yes — the UH (USB) and BH (Bluetooth) series work with any softphone. We can drop-ship to home-based staff as part of a rollout.",
      },
    ],
    metaTitle: "Yealink IP Phones & Video Conferencing in Zimbabwe | Tyflex",
    metaDescription:
      "Yealink IP desk phones, DECT cordless, headsets and Teams/Zoom room systems from Tyflex in Zimbabwe — 3CX-certified, auto-provisioned. Pricing on request.",
    keywords: [
      "Yealink Zimbabwe",
      "Yealink IP phone Zimbabwe",
      "Yealink headset Zimbabwe",
      "video conferencing Zimbabwe",
      "VoIP phone Harare",
      "Yealink reseller Zimbabwe",
    ],
  },
  {
    slug: "hikvision",
    name: "Hikvision",
    category: "Video Security, Networking & Displays",
    tagline: "Hikvision cameras, NVRs, PoE switches, access control and displays — supplied, installed and maintained by Tyflex.",
    intro: [
      "Hikvision is the largest catalogue Tyflex carries: IP and analogue cameras, network and digital video recorders, PoE switches, UPS units, SFP modules, video intercoms, access control, and interactive and digital-signage displays.",
      "We design, install and maintain Hikvision systems for offices, retail, industrial sites and campuses, and hold datasheets for every SKU we supply.",
    ],
    highlights: [
      "IP and Turbo HD cameras — bullet, turret, dome, PTZ and specialist optics",
      "NVRs and DVRs sized from a few channels to enterprise recording",
      "PoE and enterprise switches, UPS units and SFP modules for the supporting network",
      "Video intercoms and access control for doors, gates and turnstiles",
      "Interactive flat panels and digital-signage screens for boardrooms and retail",
    ],
    icon: "Camera",
    productBrandKeys: ["Hikvision"],
    solutionSlugs: ["networking", "smart-building"],
    faqs: [
      {
        question: "Does Tyflex install and maintain Hikvision, or only supply it?",
        answer:
          "Both. We design and install complete Hikvision systems — cameras, recording, network and power — and offer maintenance agreements to keep them running.",
      },
      {
        question: "Can you supply the switches and UPS for a Hikvision install?",
        answer:
          "Yes — our Hikvision catalogue includes the PoE switches, UPS units and SFP modules that support a camera deployment, so the whole system comes from one supplier.",
      },
    ],
    metaTitle: "Hikvision Cameras, NVRs & Switches in Zimbabwe | Tyflex",
    metaDescription:
      "Hikvision IP cameras, NVRs/DVRs, PoE switches, UPS, access control and displays from Tyflex in Zimbabwe — designed, installed and maintained, with datasheets. Pricing on request.",
    keywords: [
      "Hikvision Zimbabwe",
      "Hikvision cameras Zimbabwe",
      "CCTV Zimbabwe",
      "NVR Zimbabwe",
      "Hikvision distributor Zimbabwe",
      "PoE switch Zimbabwe",
    ],
  },
  {
    slug: "argox",
    name: "Argox",
    category: "Barcode & Label Printing",
    tagline: "Desktop and industrial thermal barcode & label printers — supplied, configured and supported by Tyflex across Zimbabwe.",
    intro: [
      "Argox builds dependable thermal barcode and label printers for retail, warehousing, manufacturing and logistics. Tyflex carries the full PRO range — 2- and 4-inch desktop units, 4- and 6-inch industrial printers, and the wide-format iX6 — along with the printheads, cutters, ribbons and label media to keep them running.",
      "We size the printer to your daily label count, label size and environment, load the emulation your system already speaks (PPLA / PPLB / PPLZ), and stock the consumables so print quality and printhead life stay predictable.",
    ],
    highlights: [
      "Desktop printers (OS-214EX Pro, D4-250, O4-250, CP-2140EX Pro) for steady retail and dispatch volumes",
      "Industrial printers (iX4-250, iX4-280, XM4-200) for high-throughput, multi-shift printing",
      "6-inch iX6-250 / iX6-350 Pro for pallet, drum and wide-format labels — the G6000 successor",
      "Genuine printheads, guillotine cutters, Wi-Fi modules and label rewinders held or sourced on short lead times",
      "Brochures, driver downloads and configuration support for every model",
    ],
    icon: "Printer",
    productBrandKeys: ["Argox"],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Which Argox printer is right for my volume?",
        answer:
          "Desktop models (OS, D4, O4, CP series) suit a few hundred labels a day; the iX4 and iX6 industrial printers are built for continuous multi-shift printing. Tell us your daily label count, label size and environment and we will spec the model, ribbon and media.",
      },
      {
        question: "Do you supply Argox printheads, cutters and ribbons in Zimbabwe?",
        answer:
          "Yes — we hold or source genuine printheads, guillotine cutters, Wi-Fi modules and wax / wax-resin / resin ribbons plus label stock sized to your application.",
      },
      {
        question: "Can Argox printers replace an older label printer without changing our software?",
        answer:
          "Usually. Argox printers auto-detect PPLA, PPLB and PPLZ (Zebra ZPL-compatible) emulation, so they can often drop into an existing print stream with only a driver change.",
      },
    ],
    metaTitle: "Argox Barcode & Label Printers in Zimbabwe | Tyflex",
    metaDescription:
      "Argox thermal barcode and label printers supplied and supported by Tyflex in Zimbabwe — OS, D4, O4, CP desktop and iX4 / iX6 industrial models, with printheads, cutters, ribbons and brochures. Pricing on request.",
    keywords: [
      "Argox Zimbabwe",
      "Argox label printer",
      "Argox barcode printer Harare",
      "Argox iX4-250 Zimbabwe",
      "Argox OS-214EX Pro",
      "thermal label printer Zimbabwe",
    ],
  },
  {
    slug: "honeywell",
    name: "Honeywell",
    category: "Barcode & Label Printing",
    tagline: "Honeywell desktop and industrial barcode printers — from the value PC42e-T to the print-and-verify PX940 — supplied and supported by Tyflex.",
    intro: [
      "Honeywell (formerly Intermec) builds barcode and label printers for retail, healthcare, manufacturing and transport & logistics. Tyflex supplies the desktop PC42e-T and PC45, the mainstream PM45 / PM65 industrial range that replaced the PM43, the compact PD45S, and the high-performance PX45 / PX65 — plus the PX940 with integrated inline barcode verification.",
      "We match the printer to the duty cycle, supply the ribbons and media, and support installed units — not just new hardware.",
    ],
    highlights: [
      "PC42e-T — a low-cost, easy-to-deploy 4-inch desktop printer for retail and office labelling",
      "PM45 / PM65 industrial printers with full-colour touch displays — the modern PM43 replacement",
      "PX45 / PX65 all-metal high-performance printers for the most demanding production lines",
      "PX940 with an integrated verifier that grades every barcode to ISO/ANSI as it prints",
      "Ribbons, printheads and spares, plus the Honeywell warranty matrix and support",
    ],
    icon: "Printer",
    productBrandKeys: ["Honeywell"],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Is the Honeywell PM45 a drop-in replacement for our PM43?",
        answer:
          "Effectively yes — the PM45 is the current-generation replacement for the PM43, with the same 4-inch industrial footprint, a full-colour touch display and broad emulation so it slots into an existing PM43 print stream.",
      },
      {
        question: "What does the PX940 verifier actually do?",
        answer:
          "It prints and grades each label in one pass: an integrated verifier scores every barcode to ISO/ANSI standards as it is printed, so unreadable labels never leave the printer. It is used where a failed scan downstream is expensive — automotive, aerospace, pharma and retail compliance.",
      },
      {
        question: "Do you supply Honeywell ribbons and support existing printers?",
        answer:
          "Yes — we supply genuine ribbons, printheads and spares, and can support installed PC, PM and PX units in Zimbabwe, not only new hardware.",
      },
    ],
    metaTitle: "Honeywell Barcode & Label Printers in Zimbabwe | Tyflex",
    metaDescription:
      "Honeywell (Intermec) barcode and label printers from Tyflex in Zimbabwe — PC42e-T, PC45, PM45 / PM65, PD45S, PX45 / PX65 and the PX940 verifier, with ribbons, printheads and support. Pricing on request.",
    keywords: [
      "Honeywell printers Zimbabwe",
      "Honeywell PM45 Zimbabwe",
      "Honeywell PC42e-T",
      "Intermec printer Zimbabwe",
      "barcode label printer Harare",
      "Honeywell PX940 verifier",
    ],
  },
  {
    slug: "godex",
    name: "Godex",
    category: "Barcode & Label Printing",
    tagline: "Godex thermal label printers and Godex / Tautron label rewinders — supplied and supported by Tyflex in Zimbabwe.",
    intro: [
      "Godex builds thermal barcode and label printers with a strong line in wide-format industrial models. Tyflex supplies the 8-inch HD830i for pallet placards, banners and RFID inlays, plus the Godex and Tautron external label rewinders — the T10, T20 and T30, and the popular Tautron KEM RW155 — that pair with any desktop or industrial printer.",
      "We match the printer and rewinder to your media width and volume, and supply the free GoLabel design software and driver downloads.",
    ],
    highlights: [
      "HD830i — a true 8-inch wide-format thermal-transfer industrial printer, 300 dpi, with a 24-month warranty",
      "Godex external rewinders (T10 4-inch, T20 6-inch, T30 8.46-inch) for tidy printed-label rolls",
      "Tautron KEM RW155 — the most popular 4-inch label rewinder, inside / outside winding",
      "GoLabel label design software included; ZPL / EPL / GPL auto-switching emulation",
      "Printheads, cutters and interface modules held or sourced on short lead times",
    ],
    icon: "Printer",
    productBrandKeys: ["Godex", "Tautron"],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Do I need a label rewinder?",
        answer:
          "A rewinder winds printed labels back into a neat roll as they leave the printer — useful for storage, transport, or feeding a label applicator. Match the rewinder width to your label width; the RW155 covers 4-inch media and the Godex T20 covers 6-inch.",
      },
      {
        question: "How wide can the Godex HD830i print?",
        answer:
          "The HD830i is a true 8-inch wide-format printer — it handles media wider than a 4- or 6-inch printer can take, which suits pallet placards, chemical drum labels and RFID inlays.",
      },
    ],
    metaTitle: "Godex Printers & Label Rewinders in Zimbabwe | Tyflex",
    metaDescription:
      "Godex thermal label printers and Godex / Tautron label rewinders from Tyflex in Zimbabwe — the 8-inch HD830i, T10 / T20 / T30 rewinders and the Tautron KEM RW155. Pricing on request.",
    keywords: [
      "Godex Zimbabwe",
      "Godex HD830i",
      "label rewinder Zimbabwe",
      "Tautron RW155",
      "Godex reseller Zimbabwe",
      "barcode printer Harare",
    ],
  },
  {
    slug: "zebra",
    name: "Zebra Technologies",
    category: "Barcode & Label Printing",
    tagline: "Zebra thermal printers, barcode scanners and mobile computers — supplied, integrated and supported by Tyflex in Zimbabwe.",
    intro: [
      "Zebra Technologies is the global reference name in barcode printing, scanning and enterprise mobility. Tyflex specifies and supports Zebra hardware for retail, warehousing, manufacturing, healthcare and transport & logistics — desktop and industrial ZD / ZT thermal printers, DS and LI series barcode scanners, TC and MC series mobile computers, and genuine Zebra ribbons and label media.",
      "Where a Zebra printer is the right fit we supply and configure it; where an Argox, Honeywell or Godex model does the same job for less, we will tell you. Zebra ZPL is the de-facto label language, and the printers we supply from every brand speak it.",
    ],
    highlights: [
      "ZD-series desktop printers (ZD230, ZD421, ZD621) for retail and dispatch labelling",
      "ZT-series industrial printers (ZT231, ZT411, ZT610) for high-duty, multi-shift printing",
      "Barcode scanners — corded and cordless 1D/2D imagers for POS, receiving and stock takes",
      "TC and MC series mobile computers for pick-and-pack, delivery and field service",
      "Genuine Zebra ribbons, label media and Certified Supplies, plus ZPL integration support",
    ],
    icon: "Barcode",
    productBrandKeys: [],
    solutionSlugs: ["autoid", "networking"],
    faqs: [
      {
        question: "Does Tyflex supply Zebra hardware in Zimbabwe?",
        answer:
          "Yes — we source and support Zebra thermal printers, barcode scanners and mobile computers, along with genuine Zebra ribbons and label media. Contact us with your application and we will quote the right model.",
      },
      {
        question: "Zebra or Argox / Honeywell — which should I choose?",
        answer:
          "Zebra has the widest range and the deepest ecosystem; Argox, Honeywell and Godex often match it on core desktop and industrial labelling for a lower price. All of them speak ZPL, so the label software rarely has to change. We will recommend the best value for your volume and environment.",
      },
      {
        question: "Can you support an existing Zebra printer fleet?",
        answer:
          "Yes — we supply Zebra ribbons, printheads and spares and can help configure and integrate installed ZD, ZT and older GK / GX / ZT units with your ERP or WMS print streams.",
      },
    ],
    metaTitle: "Zebra Printers, Scanners & Mobile Computers in Zimbabwe | Tyflex",
    metaDescription:
      "Zebra Technologies thermal printers, barcode scanners and mobile computers supplied and supported by Tyflex in Zimbabwe — ZD / ZT printers, DS / LI scanners, TC / MC mobile computers, ribbons and media. Pricing on request.",
    keywords: [
      "Zebra Zimbabwe",
      "Zebra printer Zimbabwe",
      "Zebra barcode scanner Zimbabwe",
      "Zebra ZT411 Zimbabwe",
      "Zebra reseller Zimbabwe",
      "barcode printing Zimbabwe",
    ],
  },
  {
    slug: "mikrotik",
    name: "MikroTik",
    category: "Routers, Switches & Wireless",
    tagline: "MikroTik RouterOS routers, CRS / CSS switches, wireless and SFP modules — supplied and configured by Tyflex in Zimbabwe.",
    intro: [
      "MikroTik builds carrier-grade routing and switching at a price that changed the market. The range runs from hEX and RB edge routers and CCR aggregation routers, through CRS and CSS managed and smart switches, to hAP / cAP / wAP wireless and LTE gateways — all on RouterOS, with enterprise features like BGP, MPLS, VLANs, VPN, firewall, QoS and hotspot built in.",
      "Tyflex supplies MikroTik for ISPs, WISPs and business networks, and configures RouterOS so the box arrives doing its job — routing, failover, VPN and segmentation documented and handed over.",
    ],
    highlights: [
      "CRS and CSS managed / smart switches — Gigabit copper with SFP and SFP+ uplinks",
      "hEX, RB and CCR routers on RouterOS for edge, VPN, BGP and multi-WAN",
      "hAP, cAP and wAP wireless for indoor coverage and outdoor point-to-point",
      "LTE routers for automatic failover and sites with no fixed line",
      "SFP / SFP+ modules and the accessories to match, plus RouterOS configuration",
    ],
    icon: "Router",
    productBrandKeys: ["MikroTik"],
    solutionSlugs: ["networking"],
    faqs: [
      {
        question: "Does Tyflex configure MikroTik, or only supply it?",
        answer:
          "Both. We supply the hardware and set up RouterOS — firewall, VPN, VLANs, QoS and WAN failover — then hand over a documented configuration so your team can maintain it.",
      },
      {
        question: "MikroTik or a mainstream brand?",
        answer:
          "MikroTik gives you enterprise routing and switching features — BGP, MPLS, VLAN, VPN, hotspot — for a fraction of the usual price. The trade-off is that it rewards someone who knows RouterOS, which is the gap we cover on supply and support.",
      },
      {
        question: "Can you supply MikroTik for an ISP or WISP?",
        answer:
          "Yes — CCR routers for aggregation and BGP, CRS switches for the core, and the wireless and SFP kit for last-mile and backhaul, all from one supplier.",
      },
    ],
    metaTitle: "MikroTik Routers, Switches & Wireless in Zimbabwe | Tyflex",
    metaDescription:
      "MikroTik RouterOS routers, CRS / CSS switches, wireless and SFP modules supplied and configured by Tyflex in Zimbabwe — for ISPs, WISPs and business networks. Pricing on request.",
    keywords: [
      "MikroTik Zimbabwe",
      "MikroTik router Zimbabwe",
      "RouterOS Zimbabwe",
      "MikroTik switch Harare",
      "MikroTik reseller Zimbabwe",
      "WISP equipment Zimbabwe",
    ],
  },
  {
    slug: "tp-link",
    name: "TP-Link",
    category: "Omada Networking, Wi-Fi & VIGI Security",
    tagline: "TP-Link Omada switches, business Wi-Fi, Deco mesh and VIGI cameras — supplied and deployed by Tyflex in Zimbabwe.",
    intro: [
      "TP-Link's business line covers cloud-managed networking and surveillance for SMEs, retail chains, schools and hospitality: Omada SDN switches, access points and controllers, Deco whole-site mesh, LTE and 5G routers, and the VIGI range of IP cameras and NVRs — all manageable from a single Omada dashboard, on-premise or in the cloud.",
      "Tyflex specifies, supplies and deploys TP-Link, sizing the controller, VLANs and Wi-Fi coverage to the building and handing over a managed network rather than a box of parts.",
    ],
    highlights: [
      "Omada managed and smart switches — Gigabit and 10G, PoE+ where the APs and cameras need it",
      "Omada EAP ceiling, wall-plate and outdoor access points under one controller",
      "Deco mesh for fast whole-office or multi-building coverage",
      "LTE and 5G routers for failover and sites without a fixed line",
      "VIGI IP cameras and NVRs — cloud or on-prem, alongside the network in the same ecosystem",
    ],
    icon: "Wifi",
    productBrandKeys: ["TP-Link"],
    solutionSlugs: ["networking", "smart-building"],
    faqs: [
      {
        question: "Is TP-Link Omada a proper managed / SDN platform?",
        answer:
          "Yes. One controller — hardware, software or cloud — runs the switches, access points and gateways together, with VLANs, seamless roaming, captive portal and central firmware. We size it and set it up.",
      },
      {
        question: "Can VIGI cameras and the network run from one place?",
        answer:
          "VIGI NVRs and cameras sit in the same TP-Link ecosystem as Omada, so a small or mid-size site can run its network and its cameras without two separate management stacks.",
      },
      {
        question: "TP-Link or a more expensive brand?",
        answer:
          "Omada matches the cloud-managed model at a lower entry price and is well stocked in Zimbabwe. For very large or SLA-critical deployments we will tell you where a different platform earns its cost.",
      },
    ],
    metaTitle: "TP-Link Omada Networking, Wi-Fi & VIGI Cameras in Zimbabwe | Tyflex",
    metaDescription:
      "TP-Link Omada switches, access points and controllers, Deco mesh, LTE routers and VIGI IP cameras / NVRs from Tyflex in Zimbabwe — supplied and deployed. Pricing on request.",
    keywords: [
      "TP-Link Zimbabwe",
      "TP-Link Omada Zimbabwe",
      "business WiFi Zimbabwe",
      "VIGI camera Zimbabwe",
      "TP-Link switch Harare",
      "TP-Link reseller Zimbabwe",
    ],
  },
  {
    slug: "samsung",
    name: "Samsung",
    category: "Professional & Large-Format Displays",
    tagline: "Samsung professional signage, interactive panels and video-wall displays — supplied and installed by Tyflex in Zimbabwe.",
    intro: [
      "Samsung's commercial display range covers professional signage panels (QB, QM, QE and QH series) from 24\" to 98\", 16/7 and 24/7 duty ratings for always-on retail and wayfinding, interactive whiteboards for meeting rooms and classrooms, and video-wall and fine-pitch options for control rooms and lobbies. Most panels carry the Tizen SoC media player, so they schedule content with MagicINFO without an external PC.",
      "Tyflex supplies, mounts and commissions Samsung displays for boardrooms, reception areas, retail, control rooms and campuses — the right size and duty rating for the room, on the wall and working.",
    ],
    highlights: [
      "QB / QM / QE / QH professional signage panels, FHD to 4K UHD, 24\" to 98\"",
      "16/7 and 24/7 duty ratings for retail, wayfinding and always-on displays",
      "Interactive whiteboards (WAC / WAD series) for Microsoft Teams and classroom use",
      "Tizen SoC media player on board — schedule with MagicINFO, no separate PC",
      "Wall mounts, trolleys and installation, plus video-wall and fine-pitch LED options",
    ],
    icon: "Monitor",
    productBrandKeys: ["Samsung"],
    solutionSlugs: ["meeting-rooms", "smart-building"],
    faqs: [
      {
        question: "Do Samsung professional displays need a separate media player?",
        answer:
          "Most don't — the Tizen SoC player is built in. Schedule content with MagicINFO and skip the external PC. We configure it as part of the install.",
      },
      {
        question: "Does Tyflex mount and commission the displays?",
        answer:
          "Yes — we supply the correct wall mount or trolley, install the screen, and hand it over working: source switching and scheduling for signage, or Teams-ready for an interactive panel.",
      },
      {
        question: "Why is there no fixed price on the display models?",
        answer:
          "Large-format Samsung is quoted per project — size, duty rating, mount and installation all move the number. Send us the room and we will spec and price it.",
      },
    ],
    metaTitle: "Samsung Professional & Large-Format Displays in Zimbabwe | Tyflex",
    metaDescription:
      "Samsung professional signage panels, interactive whiteboards and video-wall displays from Tyflex in Zimbabwe — supplied, mounted and commissioned with the Tizen SoC player. Pricing on request.",
    keywords: [
      "Samsung display Zimbabwe",
      "Samsung signage Zimbabwe",
      "large format display Zimbabwe",
      "interactive whiteboard Zimbabwe",
      "video wall Harare",
      "Samsung reseller Zimbabwe",
    ],
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** Map a `product.brand` string to its brand-page slug, if one exists. */
export function brandSlugForProductBrand(productBrand: string | undefined): string | undefined {
  if (!productBrand) return undefined;
  return brands.find((b) => b.productBrandKeys.includes(productBrand))?.slug;
}
