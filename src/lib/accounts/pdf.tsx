import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from "@react-pdf/renderer";
import type { InvoiceWithClient } from "@/lib/accounts/types";
import { INVOICE_STATUS_LABELS, formatCurrency } from "@/lib/accounts/ui";

// Avoid @react-pdf/renderer's default remote-font fetch at render time —
// stick to its built-in Helvetica core font, which needs no network access
// and works reliably in a serverless Route Handler.
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  brand: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#dc2626" },
  brandSub: { fontSize: 9, color: "#666666", marginTop: 2 },
  invoiceTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", textAlign: "right" },
  invoiceMeta: { fontSize: 9, color: "#666666", textAlign: "right", marginTop: 2 },
  statusBadge: { fontSize: 9, fontFamily: "Helvetica-Bold", textAlign: "right", marginTop: 6 },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 8, color: "#888888", textTransform: "uppercase", marginBottom: 4, letterSpacing: 1 },
  billTo: { fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  billLine: { fontSize: 9, color: "#333333", marginBottom: 1 },
  datesRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  dateBlock: { flexDirection: "column" },
  table: { borderTop: "1 solid #e2e2e2", marginBottom: 16 },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottom: "1 solid #1a1a1a",
    paddingVertical: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #e2e2e2",
    paddingVertical: 6,
  },
  colDescription: { flex: 4 },
  colQty: { flex: 1, textAlign: "right" },
  colUnitPrice: { flex: 1.5, textAlign: "right" },
  colTotal: { flex: 1.5, textAlign: "right" },
  tableHeaderText: { fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase", color: "#666666" },
  totalsBlock: { alignSelf: "flex-end", width: 220, marginBottom: 24 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  totalsLabel: { color: "#666666" },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1 solid #1a1a1a",
    paddingTop: 6,
    marginTop: 4,
  },
  grandTotalLabel: { fontFamily: "Helvetica-Bold" },
  grandTotalValue: { fontFamily: "Helvetica-Bold", color: "#dc2626" },
  notes: { fontSize: 9, color: "#666666", marginTop: 8, lineHeight: 1.4 },
  footer: { position: "absolute", bottom: 32, left: 40, right: 40, fontSize: 8, color: "#999999", textAlign: "center" },
});

const STATUS_COLORS: Record<string, string> = {
  draft: "#64748b",
  sent: "#3b82f6",
  paid: "#10b981",
  overdue: "#dc2626",
};

function InvoicePdfDocument({ invoice }: { invoice: InvoiceWithClient }) {
  const { client } = invoice;
  return (
    <Document title={`Tyflex — ${invoice.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>TYFLEX INVESTMENTS</Text>
            <Text style={styles.brandSub}>tyflex.co.zw</Text>
            <Text style={styles.brandSub}>Harare, Zimbabwe</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>{invoice.invoiceNumber}</Text>
            <Text style={[styles.statusBadge, { color: STATUS_COLORS[invoice.status] }]}>
              {INVOICE_STATUS_LABELS[invoice.status].toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Bill To</Text>
          <Text style={styles.billTo}>{client.companyName}</Text>
          <Text style={styles.billLine}>{client.contactName}</Text>
          <Text style={styles.billLine}>{client.email}</Text>
          <Text style={styles.billLine}>{client.phone}</Text>
          <Text style={styles.billLine}>{client.address}</Text>
        </View>

        <View style={styles.datesRow}>
          <View style={styles.dateBlock}>
            <Text style={styles.sectionLabel}>Issue Date</Text>
            <Text>{invoice.issueDate}</Text>
          </View>
          <View style={styles.dateBlock}>
            <Text style={styles.sectionLabel}>Due Date</Text>
            <Text>{invoice.dueDate}</Text>
          </View>
          <View style={styles.dateBlock}>
            <Text style={styles.sectionLabel}>Currency</Text>
            <Text>{invoice.currency}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colDescription, styles.tableHeaderText]}>Description</Text>
            <Text style={[styles.colQty, styles.tableHeaderText]}>Qty</Text>
            <Text style={[styles.colUnitPrice, styles.tableHeaderText]}>Unit Price</Text>
            <Text style={[styles.colTotal, styles.tableHeaderText]}>Total</Text>
          </View>
          {invoice.items.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colUnitPrice}>{formatCurrency(item.unitPrice, invoice.currency)}</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.total, invoice.currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Tax ({invoice.taxRate}%)</Text>
            <Text>{formatCurrency(invoice.tax, invoice.currency)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total Due</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(invoice.total, invoice.currency)}</Text>
          </View>
        </View>

        {invoice.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text style={styles.notes}>{invoice.notes}</Text>
          </View>
        ) : null}

        <Text style={styles.footer}>
          Tyflex Investments (Pvt) Ltd · billing@tyflex.co.zw · Generated {new Date().toISOString().slice(0, 10)}
        </Text>
      </Page>
    </Document>
  );
}

/** Renders an invoice to a PDF buffer, for both direct download and email attachment. */
export async function renderInvoicePdf(invoice: InvoiceWithClient): Promise<Buffer> {
  return renderToBuffer(<InvoicePdfDocument invoice={invoice} />);
}
