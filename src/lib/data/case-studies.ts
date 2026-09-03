import type { IconName } from "@/lib/icon-map";

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  icon: IconName;
  /** Omitted when the underlying solution is no longer a standalone /solutions page (e.g. ERP, retired as a top-level solution). */
  solutionSlug?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "legal-resources-foundation-call-centre",
    client: "Legal Resources Foundation",
    industry: "Legal Aid / NGO",
    title: "A National Legal-Advice Call Centre Reaching All Ten Provinces",
    challenge:
      "The Legal Resources Foundation runs advice offices across Zimbabwe, but callers seeking legal help had no single number to reach and provincial offices could not see or share call load. Reaching people in every province through one service meant replacing scattered analogue lines with a system the Foundation's own staff could run.",
    solution:
      "Tyflex designed and installed a centralised call centre on Yeastar infrastructure, tying the Foundation's provincial offices into shared inbound queues with call routing, recording for quality and training, and reporting on volumes and response times. Tyflex continues to maintain the platform and support the Foundation's team.",
    result:
      "Advice calls from anywhere in the country now land in one queue and are answered by the next available officer, wherever they are based. Supervisors can see call volumes across all ten provinces from a single dashboard, and Tyflex keeps the system running under an ongoing support agreement.",
    metric: "10",
    metricLabel: "provinces served from one Yeastar call-centre platform",
    icon: "PhoneCall",
    solutionSlug: "ucaas",
  },
  {
    slug: "sally-mugabe-central-hospital-cabling",
    client: "Sally Mugabe Central Hospital",
    industry: "Healthcare",
    title: "Re-Cabling the Administration Department Without Interrupting the Desk",
    challenge:
      "The administration department at Sally Mugabe Central Hospital ran on years of added-on network cabling — undocumented runs, failing links and no reliable record of what was installed where — making faults slow to trace and safe upgrades hard to plan.",
    solution:
      "Tyflex carried out a phased structured-cabling upgrade of the administration department: surveying and labelling the existing infrastructure, replacing end-of-life runs with certified cabling and managed switching, and recording every drop in an asset register so cabling and network hardware can be tracked, traced and replaced on a planned schedule rather than only after a failure.",
    result:
      "The upgrade was completed office by office with admin staff kept working throughout. Every drop is now documented and tested, and hospital IT has a live asset record showing what is installed and what is due for replacement next.",
    metric: "Complete",
    metricLabel: "admin department re-cabled — no interruption to the desk",
    icon: "Network",
    solutionSlug: "networking",
  },
];
