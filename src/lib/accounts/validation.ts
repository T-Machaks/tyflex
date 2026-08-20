import { z } from "zod";

export const INVOICE_STATUSES = ["draft", "sent", "paid", "overdue"] as const;
export const CURRENCIES = ["USD", "ZWL"] as const;

const lineItemSchema = z.object({
  id: z.string().trim().max(60).optional(),
  description: z.string().trim().min(1, "Line item description is required").max(200),
  quantity: z.coerce.number().min(0.01, "Quantity must be greater than 0").max(100000),
  unitPrice: z.coerce.number().min(0, "Unit price cannot be negative").max(100000000),
});

export const createClientSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(160),
  contactName: z.string().trim().min(1, "Contact name is required").max(160),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().min(1, "Phone number is required").max(40),
  address: z.string().trim().min(1, "Address is required").max(300),
});

export const updateClientSchema = z.object({
  companyName: z.string().trim().min(1).max(160).optional(),
  contactName: z.string().trim().min(1).max(160).optional(),
  email: z.string().trim().email().max(200).optional(),
  phone: z.string().trim().min(1).max(40).optional(),
  address: z.string().trim().min(1).max(300).optional(),
});

export const createInvoiceSchema = z.object({
  clientId: z.string().trim().min(1, "Client is required"),
  status: z.enum(INVOICE_STATUSES).default("draft"),
  issueDate: z.string().trim().min(1, "Issue date is required"),
  dueDate: z.string().trim().min(1, "Due date is required"),
  currency: z.enum(CURRENCIES).default("USD"),
  items: z.array(lineItemSchema).min(1, "Add at least one line item").max(50),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const updateInvoiceSchema = z.object({
  status: z.enum(INVOICE_STATUSES).optional(),
  issueDate: z.string().trim().min(1).optional(),
  dueDate: z.string().trim().min(1).optional(),
  currency: z.enum(CURRENCIES).optional(),
  items: z.array(lineItemSchema).min(1).max(50).optional(),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});
