// Shared by server code and client components — keep free of server-only imports.

export const CURRENCIES = ["USD", "NZD", "AUD", "ZWG", "ZAR", "GBP", "Other"] as const;

/** Always available alongside the saved payment methods. */
export const FIXED_METHODS = [
  { id: "cash", label: "Cash" },
  { id: "other", label: "Other" },
] as const;

export type ContributionStatus = "pending" | "confirmed" | "rejected";


/** Private record: never sent to visitors. Only confirmed + opted-in names are ever published. */
export interface Contribution {
  id: string;
  name: string;
  phone: string;
  amount: number;
  currency: string; // ISO-ish code, upper-case
  method: string; // a saved payment method id, or "cash" / "other"
  methodLabel: string; // its name when it was sent, e.g. "FNB (Allan)"
  reference: string;
  dateSent: string; // YYYY-MM-DD
  relationship: string;
  message: string;
  showName: boolean;
  status: ContributionStatus;
  source: "web" | "manual";
  note: string; // internal, admin only
  createdAt: string; // ISO
  confirmedAt?: string; // ISO, set when first confirmed (used for the public "x hours ago")
  feedHidden?: boolean; // admin removed this person from the public notification feed
}
