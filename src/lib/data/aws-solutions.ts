import type { IconName } from "@/lib/icon-map";

/**
 * The eight AWS SMB solutions that sit under /solutions/aws-cloud-solutions.
 * Copy is adapted from the AWS Partner Ready Content kit (kept in the repo's
 * AWS/ folder) into Tyflex's voice; stat claims keep AWS's global figures and
 * their published sources. Deep-dive implementation guides are gated behind the
 * contact form — see `gated`.
 */

export interface AwsStat {
  value: string;
  label: string;
  /** Footnote text kept verbatim from the AWS kit, shown under the stat band. */
  source?: string;
}

export interface AwsStep {
  title: string;
  detail: string;
}

export interface AwsSolution {
  slug: string;
  theme: string;
  name: string;
  /** The underlying AWS service(s), shown as a chip in the hero. */
  awsService: string;
  icon: IconName;
  /** One-line hero sub-heading. */
  tagline: string;
  /** ~80-word intro paragraph, Tyflex voice. */
  intro: string;
  /** "The problem" bullets — omitted where the kit has no one-pager. */
  problem?: string[];
  /** "What we deliver" bullets. */
  deliver: string[];
  /** "How it works" — 3–5 ordered steps. */
  howItWorks: AwsStep[];
  stats?: AwsStat[];
  faqs: { question: string; answer: string }[];
  /** Public one-page brief. */
  brief: string;
  /** Filenames of the gated deep-dive PDFs (implementation guides / SDDs). */
  gated?: string[];
}

export interface AwsTheme {
  name: string;
  blurb: string;
  icon: IconName;
  slugs: string[];
}

export const awsThemes: AwsTheme[] = [
  {
    name: "AI Productivity & CX",
    blurb:
      "Put AWS's AI and hosting services to work on customer experience and everyday productivity.",
    icon: "Sparkles",
    slugs: ["amazon-quick", "website-app-hosting"],
  },
  {
    name: "Migration & Modernization",
    blurb:
      "Move workloads, databases and files onto AWS in weeks — one operating model, minimal downtime.",
    icon: "Cloud",
    slugs: ["cloud-to-cloud-migration", "database-migration"],
  },
  {
    name: "Operations",
    blurb:
      "Keep the business protected and recoverable with automated backup and disaster recovery.",
    icon: "HardDrive",
    slugs: ["cloud-backup", "disaster-recovery"],
  },
  {
    name: "Security & Compliance",
    blurb:
      "A secure, governed cloud foundation and continuous threat detection — without a dedicated security team.",
    icon: "ShieldCheck",
    slugs: ["threat-detection", "secure-landing-zones"],
  },
];

export const awsSolutions: AwsSolution[] = [
  {
    slug: "amazon-quick",
    theme: "AI Productivity & CX",
    name: "Amazon Quick for SMB",
    awsService: "Amazon Quick",
    icon: "Sparkles",
    tagline:
      "Help customers and staff get answers faster — reduce repetitive work and free your team for higher-value tasks.",
    intro:
      "Amazon Quick gives customers and employees fast, self-service access to answers so they aren't waiting in a queue for routine questions. Chatbots handle common queries and simple tasks automatically, so everyday operations run smoother. Start with one focused use case — customer FAQs or internal helpdesk — and expand as you see value. Tyflex designs, implements and helps run it on AWS, so you get the benefit without a large technical team.",
    deliver: [
      "One focused Amazon Quick use case live first — customer FAQs or internal helpdesk — while your existing channels keep running",
      "Self-service answers on demand for customers and employees, in plain language",
      "A path to add more questions, tasks and channels over time as results come in",
      "Design, build and ongoing tuning handled by Tyflex as your AWS partner",
    ],
    howItWorks: [
      { title: "Pick one use case", detail: "We scope a single high-volume question set — the FAQs or tickets that eat the most time — and the channel it lives on." },
      { title: "Build and connect", detail: "The assistant is built on Amazon Quick and connected to your knowledge sources, with clear hand-off to a human when it's out of scope." },
      { title: "Launch alongside, not instead", detail: "It goes live next to your current channels so nothing breaks; you watch deflection and accuracy on real traffic." },
      { title: "Grow at your pace", detail: "Add topics, tasks and channels as the numbers justify it — Tyflex tunes responses and expands coverage." },
    ],
    faqs: [
      { question: "Do we have to replace our current support channels?", answer: "No. We launch one focused use case alongside your existing channels, with hand-off to a person for anything out of scope." },
      { question: "How small can we start?", answer: "A single question set — for example your top 20 customer FAQs or internal IT tickets. We expand from there once you see the deflection." },
      { question: "Who maintains it?", answer: "Tyflex, as your AWS partner — we tune responses, add topics and keep it aligned with your knowledge base." },
    ],
    brief: "/resources/aws/amazon-quick-brief.pdf",
  },
  {
    slug: "website-app-hosting",
    theme: "AI Productivity & CX",
    name: "Website & App Hosting for SMB",
    awsService: "AWS Lightsail / Amplify blueprints",
    icon: "Monitor",
    tagline:
      "A fast, seamless, always-on site that turns first-time visitors into loyal customers — launch in minutes, scale as you grow.",
    intro:
      "Your website can be your greatest competitive advantage. With the right hosting behind it, you get faster pages, smoother journeys and the reliability customers expect. Launch or upgrade in minutes with pre-configured blueprints, then scale as the business grows — no hardware, no rebuilds. Built-in enterprise-grade security keeps customer data safe without the complexity, and predictable pricing means you can invest in the experience without budget surprises.",
    deliver: [
      "Launch or migrate your site onto AWS using pre-configured blueprints — days, not a rebuild",
      "Faster page loads and smoother performance, with downtime cut significantly",
      "Effortless scaling as traffic grows — no re-architecting",
      "Built-in enterprise-grade security and predictable, usage-based pricing",
    ],
    howItWorks: [
      { title: "Assess the current site", detail: "We review your stack, traffic and pain points and pick the right AWS hosting blueprint (static, WordPress, containerised app, or full-stack)." },
      { title: "Stand it up on AWS", detail: "The blueprint deploys the environment — compute, CDN, TLS, backups — pre-configured to AWS best practice." },
      { title: "Migrate and cut over", detail: "Content and data move across, we test on a staging URL, then switch DNS with a rollback ready." },
      { title: "Hand over or manage", detail: "You run it, or Tyflex manages patching, scaling and monitoring on an ongoing plan." },
    ],
    stats: [
      { value: "69%", label: "less downtime", source: "AWS SMB hosting benchmarks" },
      { value: "46%", label: "infrastructure cost savings" },
      { value: "40%", label: "shorter development cycles" },
    ],
    faqs: [
      { question: "Will our site need to be rebuilt?", answer: "No. Pre-configured blueprints let us move most sites across as-is; a rebuild is only on the table if you specifically want one." },
      { question: "What about our domain and email?", answer: "The domain points at AWS after cutover; email stays with your current provider unless you ask us to move it too." },
      { question: "Can you keep managing it afterwards?", answer: "Yes — an ongoing plan covers patching, scaling, backups and monitoring." },
    ],
    brief: "/resources/aws/website-app-hosting-brief.pdf",
  },
  {
    slug: "cloud-to-cloud-migration",
    theme: "Migration & Modernization",
    name: "Cloud-to-Cloud Workload Migration",
    awsService: "AWS MGN · DataSync · DMS",
    icon: "Cloud",
    tagline:
      "Consolidate data, servers and databases onto AWS in weeks — one set of tools, one bill, total operational simplicity.",
    intro:
      "Consolidate your data, servers and databases onto AWS in weeks, not months. One set of tools to learn, one security model to implement, one bill to manage — total operational simplicity that gives your team time to innovate, not operate. Enterprise-grade security is built in from day one, so you scale without re-architecting. Tyflex runs the three-service consolidation pattern (MGN, DataSync, DMS) end to end, from planning through cutover.",
    problem: [
      "Fragmented multi-cloud management — different tools, bills and security models to juggle",
      "Redundant spend across providers that never gets consolidated",
      "Teams stuck operating infrastructure instead of building product",
      "Migrations stalled by fear of downtime and no clear rollback",
    ],
    deliver: [
      "Priority workloads moved first while the business keeps running",
      "Servers via AWS MGN, files and objects via DataSync, databases via DMS — one coordinated cutover",
      "A single AWS-native operating model: one console, one security model, one bill",
      "Validation and a rollback path at every step",
    ],
    howItWorks: [
      { title: "Discover and plan", detail: "We inventory workloads across your current clouds, map dependencies and sequence the move by priority and risk." },
      { title: "Replicate in the background", detail: "MGN streams servers, DataSync copies files and objects, DMS replicates databases and keeps them in sync — production keeps serving." },
      { title: "Test on AWS", detail: "Non-disruptive test cutovers prove each workload runs correctly on AWS before anything switches." },
      { title: "Cut over", detail: "A short, planned window flips traffic to AWS, with the source kept warm for rollback until you sign off." },
      { title: "Decommission and optimise", detail: "Old environments are retired; we right-size instances and review reserved capacity to cut the bill." },
    ],
    stats: [
      { value: "31%", label: "cost savings from removing redundant spend" },
      { value: "62%", label: "operational efficiency gain with one cloud to manage" },
      { value: "Weeks", label: "typical timeline, not months" },
    ],
    faqs: [
      { question: "How much downtime is involved?", answer: "Replication happens in the background with the source live. The actual cutover is a short planned window, and the source stays available for rollback until you confirm." },
      { question: "Can we move in phases?", answer: "Yes — we sequence by priority and risk, so critical workloads move first and the rest follow in waves." },
      { question: "What happens to our other cloud accounts?", answer: "They're decommissioned once each workload is verified on AWS, ending the duplicate spend." },
    ],
    brief: "/resources/aws/cloud-to-cloud-migration-brief.pdf",
    gated: [
      "Implementation_Guide_Server_Workload_LiftandShift_with_AWS_AMS.pdf",
      "Implementation_Guide_File_and_Object_Storage_Transfer_with_AWS_DataSync.pdf",
      "Implementation_Guide_Database_Migration_with_AWS_DMS.pdf",
      "Solution_Design_Document_CloudtoCloud_Workload_Migration_for_SMB.pdf",
    ],
  },
  {
    slug: "database-migration",
    theme: "Migration & Modernization",
    name: "Database Migration to AWS",
    awsService: "AWS Database Migration Service (DMS)",
    icon: "Database",
    tagline:
      "Move production databases to managed AWS databases with near-zero downtime, validated record by record.",
    intro:
      "More uptime, safer data and more time for growth. When you move databases from aging on-premises systems to managed AWS databases, the business keeps running while data is copied and kept in sync in the background. Every record is checked, so you move ahead with confidence — without a large IT team. Tyflex guides each step, from planning through go-live and beyond, so you spend less time on patching, backups and firefighting.",
    deliver: [
      "Priority databases moved while the business keeps running, data synced in the background",
      "Validated migration — records checked so nothing is lost",
      "Built-in backup, security and monitoring on the managed AWS database",
      "A clear rollback safety net if you need it",
    ],
    howItWorks: [
      { title: "Assess the estate", detail: "We catalogue your databases, engines and sizes and pick the target — same engine (homogeneous) or a managed AWS engine (heterogeneous)." },
      { title: "Replicate with DMS", detail: "AWS DMS performs the initial load and then streams ongoing changes, keeping source and target in sync with the application still live." },
      { title: "Validate", detail: "Row counts and data validation confirm the target matches the source before any cutover." },
      { title: "Cut over and hand off", detail: "The app repoints to the AWS database in a short window; the source stays available for rollback until you sign off. Backups and monitoring are on from day one." },
    ],
    faqs: [
      { question: "Do we have to change database engine?", answer: "Only if you want to. DMS handles same-engine moves as well as switches to a managed AWS engine — we recommend based on cost, licensing and effort." },
      { question: "How long is the application offline?", answer: "Just the final cutover window. The bulk copy and change-data-capture run while the app is live." },
      { question: "Is the old database kept?", answer: "Yes, until you've verified the AWS database in production and formally sign off." },
    ],
    brief: "/resources/aws/database-migration-brief.pdf",
  },
  {
    slug: "cloud-backup",
    theme: "Operations",
    name: "Cloud Backup for SMB",
    awsService: "AWS Backup",
    icon: "HardDrive",
    tagline:
      "One policy protects everything — servers, databases, file systems and storage — with ransomware-resilient recovery points.",
    intro:
      "With AWS Backup, your business data is always protected, recoverable and compliant. Hit by ransomware, a service outage or an accidental deletion, you can be back online in 5–20 minutes with only a few seconds' data loss. One policy protects everything — servers, databases, file systems and storage — with immutable, ransomware-resilient recovery points. Automated backup testing and continuous compliance monitoring free your team from manual backup maintenance. You only pay for what you protect.",
    problem: [
      "Backup scripts maintained by hand for each service — easy to miss, hard to see across the whole environment",
      "Inconsistent retention makes compliance audits reactive and error-prone",
      "No immutability controls, so ransomware can reach the backups too",
      "Missed backups often go undetected until a restore is needed",
    ],
    deliver: [
      "One backup policy across servers, databases, file systems and object storage",
      "Immutable, ransomware-resilient recovery points with enterprise-grade durability",
      "Automated backup testing and continuous compliance reporting — audit-ready",
      "Lifecycle rules that move older copies to lower-cost storage automatically",
    ],
    howItWorks: [
      { title: "Map what needs protecting", detail: "We inventory your AWS resources and agree recovery objectives (how much data loss, how fast a restore) per workload." },
      { title: "Set one policy", detail: "A single AWS Backup plan applies schedules, retention and immutability to everything, with tags so new resources are covered automatically." },
      { title: "Prove it restores", detail: "Automated restore testing runs on a schedule; you get evidence the recovery points actually work." },
      { title: "Monitor and report", detail: "Continuous compliance checks flag gaps, and cost reports show exactly what you're paying to protect." },
    ],
    stats: [
      { value: "99.999999999%", label: "data durability" },
      { value: "5–20 min", label: "recovery time, seconds of data loss", source: "AWS disaster recovery benchmarks" },
      { value: "67%", label: "operational cost savings on data protection", source: "TechAisle, cloud storage, backup and recovery for small businesses, 2026" },
    ],
    faqs: [
      { question: "What can it back up?", answer: "AWS compute, databases, file systems and object storage — all under one policy, including resources created after the policy is set." },
      { question: "How is this ransomware-resilient?", answer: "Recovery points can be made immutable (write-once), so an attacker who reaches your environment can't alter or delete the backups." },
      { question: "Do we need a backup admin?", answer: "No — automated testing and compliance monitoring run in the background. Tyflex sets it up and keeps an eye on it." },
    ],
    brief: "/resources/aws/cloud-backup-brief.pdf",
  },
  {
    slug: "disaster-recovery",
    theme: "Operations",
    name: "Disaster Recovery for SMB",
    awsService: "AWS Elastic Disaster Recovery (DRS)",
    icon: "Activity",
    tagline:
      "Replace idle DR infrastructure with continuous replication that costs pennies per hour and recovers the business in minutes.",
    intro:
      "Traditional disaster recovery means paying for idle infrastructure that sits unused until a crisis — and often fails when invoked because it was never tested. AWS Elastic Disaster Recovery continuously replicates your servers to a low-cost staging area, with a recovery point measured in seconds and a recovery time in the tens of minutes. Full recovery instances launch only during drills or an actual failover, so idle cost becomes usage-based spending. Tyflex sets it up, runs the drills and is on the line when it matters.",
    problem: [
      "Capital tied up in standby infrastructure that earns nothing until disaster strikes",
      "Failover that's never been tested — gaps only surface during a real incident",
      "A backwards cost model: you pay the most when nothing is going wrong",
      "Every hour of unplanned downtime hits revenue and customer trust directly",
    ],
    deliver: [
      "Continuous block-level replication of your servers to AWS — physical, VMware, Hyper-V or other-cloud sources",
      "Pilot Light strategy: RPO of seconds, RTO in the tens of minutes",
      "Point-in-time recovery to a state before a ransomware infection",
      "Non-disruptive drills, run at least quarterly, that prove recoverability without touching production",
    ],
    howItWorks: [
      { title: "Install the replication agent", detail: "A lightweight agent on each source server streams block-level changes to a low-cost staging area in an AWS Region." },
      { title: "Keep the staging area warm", detail: "Minimal-compute replication servers and low-cost EBS volumes hold a current replica; there's no standing recovery fleet to pay for." },
      { title: "Drill", detail: "On a schedule we launch recovery instances, verify the applications boot and connect, then terminate them — production is never affected." },
      { title: "Recover on demand", detail: "In an incident, full instances launch from the latest (or a pre-infection) point; AWS Systems Manager handles boot order and checks." },
    ],
    stats: [
      { value: "$0.028", label: "per protected server per hour, no upfront commitment", source: "AWS DRS pricing" },
      { value: "Seconds / minutes", label: "RPO / RTO with Pilot Light", source: "AWS DRS FAQs" },
      { value: "99.9%", label: "monthly uptime SLA", source: "AWS DRS SLA" },
    ],
    faqs: [
      { question: "What does it cost when nothing goes wrong?", answer: "Just the staging storage plus $0.028 per protected server per hour. Full recovery instances — the expensive part — only run during a drill or a real failover." },
      { question: "Does a drill affect our live servers?", answer: "No. Drills launch isolated recovery instances and don't touch the source servers or ongoing replication." },
      { question: "Can it recover from ransomware?", answer: "Yes — point-in-time snapshots let us launch recovery instances from a state before the infection, so there's no ransom to pay." },
    ],
    brief: "/resources/aws/disaster-recovery-brief.pdf",
    gated: [
      "Implementation_Guide_Disaster_Recovery_for_SMB_with_AWS_Elastic_DRS.pdf",
      "Solution_Design_Document_Disaster_Recovery_for_SMB.pdf",
    ],
  },
  {
    slug: "threat-detection",
    theme: "Security & Compliance",
    name: "AI-Powered Infrastructure Threat Detection",
    awsService: "Amazon GuardDuty · AWS Security Hub",
    icon: "ShieldCheck",
    tagline:
      "Automated, ML-driven security monitoring and response for teams with no dedicated cybersecurity staff.",
    intro:
      "Most SMBs face the same threats as large enterprises without the budget for a security operations team. A compromised server or stolen credential can go undetected for weeks. Amazon GuardDuty gives you continuous, machine-learning threat detection, AWS Security Hub consolidates findings and compliance checks into one score, and an automated response pipeline remediates common issues without human intervention. Tyflex deploys the full detect–aggregate–route–remediate–notify pipeline — typically within a business week.",
    problem: [
      "No budget for a dedicated security operations team, but enterprise-scale threats — 46% of breaches hit businesses under 1,000 staff",
      "Compromised servers or stolen credentials undetected for weeks",
      "Manual log review doesn't scale; traditional SIEM tools need specialist staff to run",
      "Small IT teams spend hours reacting to incidents they should have caught automatically",
    ],
    deliver: [
      "GuardDuty analysing account activity, network traffic and DNS for credential misuse and unauthorised access",
      "Security Hub consolidating findings plus CIS / AWS FSBP / NIST / PCI DSS checks into a single 0–100 score",
      "Automated remediation playbooks for common misconfigurations — no servers to manage",
      "Email or chat alerts on every finding, so nothing is missed",
    ],
    howItWorks: [
      { title: "Detect", detail: "GuardDuty continuously analyses CloudTrail events, VPC flow logs and DNS queries with ML and anomaly detection — no agents for foundational monitoring." },
      { title: "Aggregate", detail: "Security Hub collects the findings alongside automated compliance checks into one dashboard with a consolidated security score." },
      { title: "Route and remediate", detail: "EventBridge captures findings in near real time and routes them to Step Functions, which runs Lambda / Systems Manager playbooks from the Automated Security Response solution." },
      { title: "Notify", detail: "SNS delivers an alert via email or chat, closing the loop on every finding. Auto-remediation starts notification-only and expands as you gain confidence." },
    ],
    stats: [
      { value: "Minutes", label: "to first findings, zero configuration", source: "Getting started with GuardDuty" },
      { value: "90%", label: "less manual security review time", source: "AWS Security Hub features" },
      { value: "1–5 days", label: "partner-led deployment", source: "ASR deployment guide" },
    ],
    faqs: [
      { question: "Do we need to install agents everywhere?", answer: "Not for foundational monitoring — GuardDuty works from CloudTrail, VPC flow logs and DNS logs. Runtime monitoring with agents is optional, added after you've validated findings." },
      { question: "Will it start changing things automatically?", answer: "It starts notification-only so your team reviews findings. Auto-remediation is enabled for low-risk actions first, then expanded over about 30 days." },
      { question: "What does it cost?", answer: "GuardDuty and Security Hub are pay-as-you-go with 30-day free trials; the orchestration components sit largely in the free tier. Costs scale with your environment, not a fixed licence." },
    ],
    brief: "/resources/aws/threat-detection-brief.pdf",
    gated: [
      "Implementation_Guide_AIPowered_Infrastructure_Threat_Detection_for_SMBs.pdf",
      "Solution_Design_Document_Infrastructure_Threat_Detection_for_SMB.pdf",
    ],
  },
  {
    slug: "secure-landing-zones",
    theme: "Security & Compliance",
    name: "Secure Landing Zones for SMB",
    awsService: "AWS Control Tower · Organizations · IAM Identity Center",
    icon: "Lock",
    tagline:
      "A production-ready cloud governance foundation in days, not months — no manual configuration, no licensing fees.",
    intro:
      "Securing an AWS environment doesn't have to mean months of manual configuration or expensive licensing. With Tyflex and three zero-licence-cost AWS services, you can be secured and live in days: enterprise-grade compliance guardrails, continuous audit-readiness, consolidated billing and volume pricing, and AI workload governance from day one. The foundation scales as you grow — no costly rebuilds — so your team stays focused on the business.",
    problem: [
      "Lean IT teams without the specialist security skills — or time — to build cloud governance properly",
      "Up to 6 months to manually configure the accounts, policies and access controls one by one",
      "A presumed cost barrier — expensive third-party tools or large implementation teams",
      "Accidental multi-account sprawl that no one is governing",
    ],
    deliver: [
      "A production-ready landing zone: automated guardrails, centralised identity, continuous compliance monitoring",
      "AI workload governance built in — a foundation that safely supports AI accounts from day one",
      "Consolidated billing across all accounts, unlocking organisation-wide savings plans",
      "No licensing fees — underlying AWS costs are pay-as-you-go",
    ],
    howItWorks: [
      { title: "Design the account structure", detail: "We agree an organisational unit layout (workloads, security, shared services, sandbox) that fits how your teams and compliance needs are shaped." },
      { title: "Deploy with Control Tower", detail: "Control Tower stands up the landing zone — Organizations for the policy backbone, guardrails enforced across every account, logging and audit accounts included." },
      { title: "Wire up identity", detail: "IAM Identity Center gives one secure login to every account and app, with permissions managed centrally." },
      { title: "Turn on continuous compliance", detail: "Automated checks against your standards (e.g. ISO 27001, SOC 2) run continuously, cutting audit-prep time. Tyflex reviews the posture with you on a schedule." },
    ],
    stats: [
      { value: "~5 days", label: "to production-ready governance", source: "AWS landing zone deployment benchmarks" },
      { value: "up to 95%", label: "faster than a manual 6-month buildout" },
      { value: "up to 70%", label: "less audit preparation time", source: "Cyber Sierra, 2025" },
    ],
    faqs: [
      { question: "We already have a few AWS accounts — is it too late?", answer: "No. The landing zone can adopt existing accounts and bring the sprawl under one set of guardrails and one login." },
      { question: "What are the three zero-cost services?", answer: "AWS Control Tower, AWS Organizations and IAM Identity Center carry no licensing fees. You pay only for the underlying AWS usage, pay-as-you-go." },
      { question: "Does this help with AI adoption?", answer: "Yes — the foundation includes AI workload governance, so you can stand up AI accounts with data-trust controls already in place." },
    ],
    brief: "/resources/aws/secure-landing-zones-brief.pdf",
  },
];

export function getAwsSolution(slug: string): AwsSolution | undefined {
  return awsSolutions.find((s) => s.slug === slug);
}
