import type { Client } from "@/lib/accounts/types";

/**
 * In-memory demo client store, seeded on module load. Stands in for a real
 * clients table (DynamoDB/Supabase) — same persistence caveat as the other
 * in-memory stores in this app (src/lib/portal/users.ts, src/lib/tracker/projects.ts).
 *
 * Deliberately reuses the same fictional companies (and, where established,
 * the same named contacts) already seeded across the document portal and
 * project tracker, so the three internal tools describe one consistent set
 * of clients rather than three disconnected demo datasets.
 */
const clients: Client[] = [
  {
    id: "client_hlg",
    companyName: "Harare Logistics Group",
    contactName: "Tendai Moyo",
    email: "tendai@hararelogistics.co.zw",
    phone: "+263 77 123 4567",
    address: "14 Coventry Road, Workington, Harare, Zimbabwe",
  },
  {
    id: "client_zrd",
    companyName: "Zimbank Retail Division",
    contactName: "Rutendo Chikafu",
    email: "rutendo@zimbankretail.co.zw",
    phone: "+263 77 234 5678",
    address: "Zimbank Centre, 60 Kwame Nkrumah Ave, Harare, Zimbabwe",
  },
  {
    id: "client_crg",
    companyName: "Cranborne Retail Group",
    contactName: "Farai Ndlovu",
    email: "farai@cranborneretail.co.zw",
    phone: "+263 77 345 6789",
    address: "122 Chiremba Road, Cranborne, Harare, Zimbabwe",
  },
  {
    id: "client_blm",
    companyName: "Bluffhill Manufacturing",
    contactName: "Chipo Mutasa",
    email: "chipo@bluffhillmfg.co.zw",
    phone: "+263 77 456 7890",
    address: "8 Enterprise Road, Bluffhill, Harare, Zimbabwe",
  },
  {
    id: "client_amc",
    companyName: "Avondale Medical Centre",
    contactName: "Melody Chitiyo",
    email: "melody@avondalemedical.co.zw",
    phone: "+263 77 567 8901",
    address: "21 King George Road, Avondale, Harare, Zimbabwe",
  },
];

let nextId = 100;
function generateId(): string {
  nextId += 1;
  return `client_${Date.now().toString(36)}${nextId}`;
}

export function getAllClients(): Client[] {
  return [...clients].sort((a, b) => a.companyName.localeCompare(b.companyName));
}

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

export type CreateClientInput = Omit<Client, "id">;

export function createClient(input: CreateClientInput): Client {
  const client: Client = { id: generateId(), ...input };
  clients.push(client);
  return client;
}

export type UpdateClientInput = Partial<CreateClientInput>;

export function updateClient(id: string, patch: UpdateClientInput): Client | undefined {
  const client = getClientById(id);
  if (!client) return undefined;
  Object.assign(client, patch);
  return client;
}
