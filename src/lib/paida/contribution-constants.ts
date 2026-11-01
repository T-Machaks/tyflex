// Shared by server code and client components — keep free of server-only imports.

export const CURRENCIES = ["USD", "ZWG", "ZAR", "GBP", "Other"] as const;

export const METHODS = [
  { id: "ecocash", label: "EcoCash (to Rufaro)" },
  { id: "mukuru", label: "Mukuru" },
  { id: "worldremit", label: "WorldRemit" },
  { id: "bank", label: "Bank transfer" },
  { id: "cash", label: "Cash" },
  { id: "other", label: "Other" },
] as const;

export type MethodId = (typeof METHODS)[number]["id"];
export type ContributionStatus = "pending" | "confirmed" | "rejected";

export const methodLabel = (id: string) => METHODS.find((m) => m.id === id)?.label ?? id;

/** Private record: never sent to visitors. Only confirmed + opted-in names are ever published. */
export interface Contribution {
  id: string;
  name: string;
  phone: string;
  amount: number;
  currency: string; // ISO-ish code, upper-case
  method: MethodId;
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
