import { z } from "zod";
import { TZ_IDS } from "./time";

const text = (max = 500) => z.string().max(max).default("");
const isoDate = z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/, "Use YYYY-MM-DD").default("");
const clock = z.string().regex(/^(\d{2}:\d{2})?$/, "Use HH:MM (24-hour)").default("");
// Only http(s) or same-site paths — blocks javascript: and data: links.
const link = z
  .string()
  .max(2000)
  .refine((v) => v === "" || /^https?:\/\//i.test(v) || v.startsWith("/"), "Links must start with https://")
  .default("");

const method = z.object({
  id: text(64),
  label: text(80),
  details: text(500),
  copyText: text(200),
  link,
  linkLabel: text(60),
  phone: text(30),
});

const paymentMethod = z.object({
  id: text(64),
  flag: text(2), // ISO country code, e.g. "NZ"
  label: text(80), // e.g. "NZ bank (Kudzi)", "FNB (Allan)", "EcoCash (Rufaro)"
  bank: text(80),
  accountName: text(100),
  number: text(60),
  branchSwift: text(60),
  type: text(40),
  details: text(800), // free text (how the family first entered it); shown line by line
  link,
  linkLabel: text(60),
  phone: text(30), // adds Call / WhatsApp buttons
  confirmerId: text(64), // team member who confirms contributions sent via this method (internal)
  verifiedBy: text(80), // set by the server when the Owner saves or re-verifies
  verifiedAt: text(40),
});

export const paidaContentSchema = z.object({
  name: text(100),
  nickname: text(60),
  born: isoDate,
  died: isoDate,
  tagline: text(200),
  heroImage: link,
  ogImage: link,
  shareText: text(300),

  updates: z
    .array(z.object({ id: text(64), date: isoDate, title: text(150), body: text(1500), visibility: z.enum(["public", "family"]).default("public") }))
    .max(100)
    .default([]),

  program: z
    .array(
      z.object({
        id: text(64),
        title: text(100),
        date: isoDate,
        time: clock,
        endTime: clock,
        timezone: z.enum(TZ_IDS).default("Africa/Harare"),
        venue: text(150),
        address: text(250),
        mapsUrl: link,
        livestreamUrl: link,
        notes: text(500),
      })
    )
    .max(30)
    .default([]),

  supportIntro: text(600),
  paymentMethods: z.array(paymentMethod).max(20).default([]),
  // Legacy (pre-structured) lists: read once for migration into paymentMethods, never written back.
  supportLocal: z.array(method).max(10).default([]),
  supportAbroad: z.array(method).max(15).default([]),

  aboutText: text(700),
  aboutPhoto: link,
  storyText: text(8000),
  timeline: z.array(z.object({ id: text(64), year: text(10), caption: text(300) })).max(60).default([]),

  channelName: text(80),
  channelUrl: link,
  videos: z.array(z.object({ id: text(64), url: link, title: text(150) })).max(24).default([]),
  social: z.array(z.object({ id: text(64), label: text(60), url: link })).max(12).default([]),
  alsoShared: z.array(z.object({ id: text(64), label: text(60), url: link })).max(8).default([]),

  gallery: z
    .array(
      z.object({
        id: text(64),
        src: link,
        thumb: link,
        caption: text(200),
        w: z.number().int().min(0).max(10000).default(0),
        h: z.number().int().min(0).max(10000).default(0),
      })
    )
    .max(200)
    .default([]),

  contacts: z.array(z.object({ id: text(64), name: text(80), role: text(100), phone: text(30) })).max(20).default([]),
});

export type PaidaContent = z.infer<typeof paidaContentSchema>;
export type PaymentMethod = PaidaContent["paymentMethods"][number];
export type ProgramEvent = PaidaContent["program"][number];

export interface Tribute {
  id: string;
  name: string;
  relationship: string;
  message: string;
  photo: string; // media URL or ""
  createdAt: string; // ISO
  status: "pending" | "approved" | "hidden";
  flag?: string; // why it was held for review, if it was
}
