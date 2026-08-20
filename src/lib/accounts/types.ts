export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";
export type Currency = "USD" | "ZWL";

export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  items: LineItem[];
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  currency: Currency;
  notes?: string;
}

/** Invoice with its client joined in — the shape most UI code actually wants. */
export interface InvoiceWithClient extends Invoice {
  client: Client;
}
