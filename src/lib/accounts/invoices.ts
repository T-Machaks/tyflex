import type { Invoice, InvoiceWithClient, LineItem } from "@/lib/accounts/types";
import { getClientById } from "@/lib/accounts/clients";

const DEFAULT_TAX_RATE = 15; // Zimbabwe standard VAT rate

function lineItem(id: string, description: string, quantity: number, unitPrice: number): LineItem {
  return { id, description, quantity, unitPrice, total: Math.round(quantity * unitPrice * 100) / 100 };
}

function totalsFor(items: LineItem[], taxRate: number) {
  const subtotal = Math.round(items.reduce((sum, i) => sum + i.total, 0) * 100) / 100;
  const tax = Math.round(subtotal * (taxRate / 100) * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { subtotal, tax, total };
}

/**
 * In-memory demo invoice store, seeded on module load. Same DynamoDB/Supabase
 * stand-in caveat as the rest of the app's demo data stores. Line items are
 * drawn from the webstore catalog and tracker projects seeded in earlier
 * stages, so the numbers here describe the same fictional engagements.
 */
const invoices: Invoice[] = [];

function seedInvoice(
  id: string,
  invoiceNumber: string,
  clientId: string,
  status: Invoice["status"],
  issueDate: string,
  dueDate: string,
  currency: Invoice["currency"],
  items: LineItem[],
  notes?: string
): Invoice {
  const taxRate = DEFAULT_TAX_RATE;
  const { subtotal, tax, total } = totalsFor(items, taxRate);
  return { id, invoiceNumber, clientId, status, issueDate, dueDate, currency, items, taxRate, subtotal, tax, total, notes };
}

invoices.push(
  seedInvoice("inv_001", "INV-2026-001", "client_hlg", "paid", "2026-06-25", "2026-07-25", "USD", [
    lineItem("li_1", "UniFi 24-Port PoE Managed Switch (×3)", 3, 425),
    lineItem("li_2", "Cat6 UTP Cable Reel, 305m (×5)", 5, 135),
    lineItem("li_3", "Installation & Configuration Labor", 1, 1200),
  ]),
  seedInvoice("inv_002", "INV-2026-002", "client_zrd", "paid", "2026-04-10", "2026-05-10", "USD", [
    lineItem("li_4", "3CX Enterprise License — Unlimited Extensions", 1, 1290),
    lineItem("li_5", "Grandstream GXP2170 IP Phone (×40)", 40, 165),
    lineItem("li_6", "Deployment & Staff Training", 1, 2500),
  ]),
  seedInvoice("inv_003", "INV-2026-003", "client_crg", "sent", "2026-08-01", "2026-08-31", "USD", [
    lineItem("li_7", "All-in-One Touchscreen POS Terminal (×6)", 6, 599),
    lineItem("li_8", "Thermal Receipt Printer (×6)", 6, 129),
  ]),
  seedInvoice(
    "inv_004",
    "INV-2026-004",
    "client_blm",
    "overdue",
    "2026-06-01",
    "2026-07-01",
    "USD",
    [
      lineItem("li_9", "ERP Implementation Package", 1, 4500),
      lineItem("li_10", "Data Migration Services", 1, 1800),
    ],
    "Payment overdue — project currently on hold pending client budget approval."
  ),
  seedInvoice("inv_005", "INV-2026-005", "client_hlg", "paid", "2026-03-15", "2026-04-15", "USD", [
    lineItem("li_11", "Zebra MC3300 Rugged Mobile Computer (×8)", 8, 1450),
    lineItem("li_12", "Zebra ZD420 Thermal Label Printer (×3)", 3, 349),
  ]),
  seedInvoice("inv_006", "INV-2026-006", "client_amc", "sent", "2026-08-05", "2026-09-05", "ZWL", [
    lineItem("li_13", "Inverter & UPS System Supply", 1, 9500000),
    lineItem("li_14", "Installation Labor Deposit", 1, 1500000),
  ]),
  seedInvoice("inv_007", "INV-2026-007", "client_crg", "draft", "2026-08-14", "2026-09-14", "USD", [
    lineItem("li_15", "Counter-Mount Barcode Scanner, POS (×6)", 6, 110),
    lineItem("li_16", "Store-by-Store Rollout Labor", 1, 900),
  ]),
  seedInvoice(
    "inv_008",
    "INV-2026-008",
    "client_zrd",
    "overdue",
    "2026-05-01",
    "2026-06-01",
    "USD",
    [lineItem("li_17", "3CX Annual Support & Maintenance Renewal", 1, 1850)]
  )
);

let nextId = 100;
let nextInvoiceNumber = invoices.length;
function generateId(): string {
  nextId += 1;
  return `inv_${Date.now().toString(36)}${nextId}`;
}
function generateInvoiceNumber(): string {
  nextInvoiceNumber += 1;
  const year = new Date().getFullYear();
  return `INV-${year}-${String(nextInvoiceNumber).padStart(3, "0")}`;
}

function withClient(invoice: Invoice): InvoiceWithClient | undefined {
  const client = getClientById(invoice.clientId);
  if (!client) return undefined;
  return { ...invoice, client };
}

export function getAllInvoices(): InvoiceWithClient[] {
  return invoices
    .map(withClient)
    .filter((i): i is InvoiceWithClient => Boolean(i))
    .sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1));
}

export function getInvoiceById(id: string): InvoiceWithClient | undefined {
  const invoice = invoices.find((i) => i.id === id);
  return invoice ? withClient(invoice) : undefined;
}

export function getInvoicesForClient(clientId: string): InvoiceWithClient[] {
  return getAllInvoices().filter((i) => i.clientId === clientId);
}

export interface CreateInvoiceInput {
  clientId: string;
  status: Invoice["status"];
  issueDate: string;
  dueDate: string;
  currency: Invoice["currency"];
  items: Array<Omit<LineItem, "id" | "total">>;
  notes?: string;
}

export function createInvoice(input: CreateInvoiceInput): InvoiceWithClient | undefined {
  const items = input.items.map((item, i) =>
    lineItem(`li_${Date.now().toString(36)}_${i}`, item.description, item.quantity, item.unitPrice)
  );
  const invoice = seedInvoice(
    generateId(),
    generateInvoiceNumber(),
    input.clientId,
    input.status,
    input.issueDate,
    input.dueDate,
    input.currency,
    items,
    input.notes
  );
  invoices.unshift(invoice);
  return withClient(invoice);
}

export interface UpdateInvoiceInput {
  status?: Invoice["status"];
  issueDate?: string;
  dueDate?: string;
  currency?: Invoice["currency"];
  notes?: string;
  items?: Array<Omit<LineItem, "id" | "total"> & { id?: string }>;
}

export function updateInvoice(id: string, patch: UpdateInvoiceInput): InvoiceWithClient | undefined {
  const invoice = invoices.find((i) => i.id === id);
  if (!invoice) return undefined;

  if (patch.items) {
    invoice.items = patch.items.map((item, i) =>
      lineItem(item.id || `li_${Date.now().toString(36)}_${i}`, item.description, item.quantity, item.unitPrice)
    );
  }
  if (patch.status) invoice.status = patch.status;
  if (patch.issueDate) invoice.issueDate = patch.issueDate;
  if (patch.dueDate) invoice.dueDate = patch.dueDate;
  if (patch.currency) invoice.currency = patch.currency;
  if (patch.notes !== undefined) invoice.notes = patch.notes;

  const { subtotal, tax, total } = totalsFor(invoice.items, invoice.taxRate);
  invoice.subtotal = subtotal;
  invoice.tax = tax;
  invoice.total = total;

  return withClient(invoice);
}

export interface RevenueStats {
  byCurrency: Record<string, { paid: number; outstanding: number; overdue: number }>;
  counts: { draft: number; sent: number; paid: number; overdue: number; total: number };
}

export function getRevenueStats(list: InvoiceWithClient[] = getAllInvoices()): RevenueStats {
  const byCurrency: RevenueStats["byCurrency"] = {};
  const counts = { draft: 0, sent: 0, paid: 0, overdue: 0, total: list.length };

  for (const invoice of list) {
    counts[invoice.status] += 1;
    byCurrency[invoice.currency] ??= { paid: 0, outstanding: 0, overdue: 0 };
    if (invoice.status === "paid") byCurrency[invoice.currency].paid += invoice.total;
    if (invoice.status === "sent") byCurrency[invoice.currency].outstanding += invoice.total;
    if (invoice.status === "overdue") byCurrency[invoice.currency].overdue += invoice.total;
  }

  return { byCurrency, counts };
}
