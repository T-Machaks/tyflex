import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  subject: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a few more details").max(4000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

export const INDUSTRIES = [
  "Retail",
  "Manufacturing",
  "Financial Services",
  "Logistics & Transport",
  "Healthcare",
  "Hospitality",
  "Education",
  "Government & NGO",
  "Other",
] as const;

export const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Just exploring",
] as const;

/** A single line on a quote request built from the webstore cart. */
export const quoteItemSchema = z.object({
  name: z.string().trim().min(1).max(200),
  brand: z.string().trim().max(80).optional().or(z.literal("")),
  quantity: z.coerce.number().int().min(1).max(9999).default(1),
});

export const quoteSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(40),
  company: z.string().trim().min(1, "Company name is required").max(160),
  companySize: z.string().trim().min(1, "Please select a company size"),
  industry: z.string().trim().min(1, "Please select an industry"),
  timeline: z.string().trim().min(1, "Please select a timeline"),
  solutions: z.array(z.string()).default([]),
  items: z.array(quoteItemSchema).max(100).default([]),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

/** Honeypot field name shared by both forms — real users never see or fill it. */
export const HONEYPOT_FIELD = "hp_website";

/** Chat widget: max user-sent messages allowed in a single conversation. */
export const MAX_CHAT_USER_MESSAGES = 10;

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
});

// Generous upper bound — a sanity/DoS guard only. The real, user-facing limit
// is MAX_CHAT_USER_MESSAGES, enforced separately in the route so a visitor
// who hits it gets the friendly rate-limit message instead of a generic 400.
export const chatSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(MAX_CHAT_USER_MESSAGES * 4),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
