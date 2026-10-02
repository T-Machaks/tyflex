# Electrical Plan Designer — Pre-Build Audit

**Scope:** read-only audit of `tyflex` (public marketing site, this repo) and `office`
(`C:\Users\user\office`, the Tyflex Office ERP at office.tyflex.co.zw), ahead of a
proposed "Electrical Plan Designer" feature: client uploads a floor plan → AI extracts
the layout → a deterministic rules engine generates a basic residential electrical
design → client views it in 2D/3D → client submits an RFQ that becomes a draft quote
in Tyflex Office. No code was changed to produce this document.

---

## 1. Framework, routing, data layer, auth, file uploads — today

### 1a. tyflex (this repo)

- **Next.js ^14.2.0, App Router, React 18, TypeScript.** Deployed on AWS Amplify (full
  SSR, no static export).
- Routing: public marketing pages (`/`, `/solutions/*`, `/webstore/*`, `/resources/*`,
  etc.) are unauthenticated. A separate authenticated section exists under
  `/portal/*`, `/tracker/*`, `/accounts/*`, gated by `src/middleware.ts`
  (`next-auth/middleware` `withAuth`, JWT session, `tracker`/`accounts` restricted to
  `role === "admin"`, `portal` open to any signed-in user). `Header.tsx` hides the
  marketing chrome on these routes via `isProtectedPath()`.
- **Data layer: there is no database in this repo.** No `pg`, no `DATABASE_URL`, no ORM
  of any kind. The marketing content (products, solutions, brands, partners) is all
  static TypeScript data files under `src/lib/data/`.
- **Auth:** `next-auth@^4.24.15`, `CredentialsProvider`, JWT session strategy
  (`src/lib/auth.ts`). **Important:** the user store behind it
  (`src/lib/portal/users.ts`) is an **in-memory array seeded on module load**, with a
  comment in the code stating this plainly: *"stand-in for the real user store —
  production would read/write these through DynamoDB or Supabase... changes persist
  only for the lifetime of this server process — they reset on redeploy and aren't
  shared across serverless instances."* The same pattern — same comment, same caveat —
  repeats in `src/lib/portal/documents.ts`, `src/lib/accounts/clients.ts`,
  `src/lib/accounts/invoices.ts`, and `src/lib/tracker/projects.ts`. **The entire
  portal/tracker/accounts section of this repo is a demo/prototype, not a production
  system backed by real persistence.** It is not safe to treat any of it as reusable
  production infrastructure as-is.
- **File uploads:** `src/app/api/portal/upload/route.ts` (admin-only, 20MB cap) is the
  one real upload path, and it genuinely works: `src/lib/portal/storage.ts` uses
  `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` to write to S3 when
  `AWS_REGION` + `S3_BUCKET_NAME` are set, falling back to a local gitignored
  `.portal-uploads/` directory in dev. Download links are presigned S3 URLs (1h TTL)
  or, for bundled seed fixtures, a signed internal route. **This S3 plumbing is real
  and usable** — it's the document *metadata* (`addDocument()` → in-memory array) that
  isn't.
- **The closest existing "RFQ" precedent:** `/get-quote` — `useQuoteCart()`
  (`src/lib/quote-cart/QuoteCartContext.tsx`) is a `localStorage`-only cart (no
  server state) that a visitor builds while browsing `/webstore`, then submits via
  `src/app/api/quote/route.ts`. That route does **not** write to any database — it
  validates with `zod`, has a honeypot anti-bot field, and sends a **plain email**
  via `sendMail()` (Microsoft Graph, `src/lib/email.ts`) to Tyflex staff. Nothing is
  persisted; there is no draft-quote object created anywhere in this repo today.
- **Bedrock is already live here too:** `src/app/api/chat/route.ts` runs the public
  "Nyasha" chat widget — `@aws-sdk/client-bedrock-runtime`, `ConverseStreamCommand`,
  model `us.anthropic.claude-haiku-4-5-20251001-v1:0` (env-overridable via
  `BEDROCK_MODEL_ID`/`BEDROCK_REGION`, default region `us-east-1`), IAM-role auth (no
  API key), 1024 max tokens, **text-only** — no document or image content blocks are
  sent. Has a clean dev-mode canned-reply fallback when Bedrock isn't reachable
  locally.
- Relevant env vars present in this repo: `AWS_REGION`, `S3_BUCKET_NAME`,
  `BEDROCK_MODEL_ID`, `BEDROCK_REGION`, `NEXTAUTH_SECRET`, `GRAPH_CLIENT_ID`,
  `GRAPH_CLIENT_SECRET`, `GRAPH_SENDER`, `GRAPH_TENANT_ID`, `SES_FROM_EMAIL`,
  `SES_TO_EMAIL`.

### 1b. office

- **Next.js 14.2.15, App Router, React 18, TypeScript.** Deployed via GitHub Actions →
  SSM → `scripts/deploy.sh` → `pm2`.
- Routing: authenticated staff pages live under a route group `src/app/(app)/*`
  (billing, clients, contracts, inventory, ledger, hr, etc.). Three **public,
  token-scoped** route families sit outside auth entirely: `src/app/p/[token]` (client
  document portal — view/sign a sent document), `src/app/s/[token]` (secure file
  share), `src/app/setup/[token]` (staff invite setup). `src/middleware.ts` gates
  everything else behind a valid NextAuth JWT, with an explicit exclusion list for
  `login`, `setup/`, `verify`, `api/auth`, `api/group`, `api/docuseal`, `p/`, `s/`.
  Most writes go through **Server Actions** (`"use server"` files under
  `src/lib/*/actions.ts`); `route.ts` handlers are used only where a true HTTP
  endpoint is needed (streaming chat, PDF binary output, webhooks).
- **Data layer: real PostgreSQL via `pg`, no ORM.** `src/lib/db.ts` exposes a
  lazily-created pooled client (`query`, `queryOne`, `execute`, `withTransaction`).
  Migrations are flat, forward-only SQL files in `/migrations`, named
  `NNNN_description.sql` (currently 32 files, up to `0032_sms_overdue_reminder.sql`),
  run via `scripts/migrate.mjs`, tracked in a `schema_migrations` table. **No schema
  dump exists** — reconstructing current table shape means reading migrations in
  order (`billing_documents` alone is touched by ~15 of the 32 files).
- **Auth:** `next-auth@^4.24.15`, JWT session (12h), `CredentialsProvider` against a
  real `users` table (`bcryptjs` password check). Multi-tenant via a `companies`
  table (Tyflex group row + subsidiary rows via `parent_id`) and `company_id` on
  essentially every domain table. `session.user.companyId` is set at login and can be
  switched (subsidiary switcher) via `useSession().update()`, re-validated
  server-side against a membership table before being accepted.
- **File uploads: a completely different pattern from tyflex — no S3 anywhere in this
  repo.** Every upload (collateral, file shares, contract attachments, logos, chat
  attachments) is **base64-encoded directly into a Postgres `TEXT` column**. The
  collateral feature's cap is explicit: `MAX_DATA_LEN = 5_000_000` (~3.6MB binary),
  enforced via `zod`. File-share items follow the same shape with the same ballpark
  cap. List queries explicitly null out the `data` column (`NULL::text AS data`) to
  avoid shipping blobs on list views. **Hard upstream ceiling:** nginx
  `client_max_body_size 12m` on the whole app — a real constraint on any new upload
  flow unless that config is changed (per an in-code comment, that's a manual step on
  the box, not something that re-applies automatically on deploy).
- DocuSeal (`src/lib/docuseal.ts`) never *receives* an uploaded file from a browser —
  it only sends PDFs office has already rendered itself, and gets signing completion
  back asynchronously via an HMAC-verified webhook.

---

## 2. Do the public site and Tyflex Office share anything?

**No.** Confirmed in office: no `"workspaces"` field in `package.json`, no
`packages/`/`shared/` directory, no git submodules, no `file:`/`link:` local package
references. The only "sharing" that happens is **copy-paste convention** — e.g. the
Bedrock model-ID comment in office literally says *"Same ID proven working in the
Omniflex, ADMA and tyflex.co.zw projects"*, i.e., engineers hand-copy constants between
sibling repos rather than importing a shared package. Same conclusion holds from the
tyflex side: no reference to office's code, types, or package anywhere in this repo.

**They are two fully independent Next.js apps, each with their own deploy pipeline, and
(as of today) tyflex has no database at all while office has Postgres.** There is no
existing mechanism for one to call into or import from the other.

### Where should a shared rules-engine module live?

Given there's no shared-package infrastructure to build on, and no appetite implied by
either codebase's conventions for inventing one (no monorepo tooling, no private
registry, no publish step anywhere in either CI pipeline), I'd avoid trying to literally
share one module across both repos. Two realistic options:

**Option A — build the whole feature inside office, tyflex only links to it
(recommended).** Office already owns everything the deterministic rules engine needs to
be *useful*, not just correct: the `products` catalogue table (for real pricing), the
`billing_documents`/`billing_line_items` draft-quote model it needs to write into, a
working Bedrock client, and — critically — an **existing precedent for public,
token-scoped, unauthenticated client-facing pages** (`/p/[token]`, `/s/[token]`), which
is exactly the shape this feature needs (a client with no office login uploading a file
and getting something back). Host the uploader, the AI extraction call, the rules
engine, and the 2D/3D viewer all in office under a new public route family (e.g.
`/d/[token]`, following the existing single-letter-prefix convention), and have the
public tyflex.co.zw site do nothing more than link to it (e.g. a "Design Your Electrical
Plan" CTA on a new tyflex solutions page, pointing to `office.tyflex.co.zw/d/...` or a
start endpoint that issues a token). This avoids inventing any cross-repo data-sharing
problem, avoids needing a new public *write* API surface on office from an external
origin (the page and its actions are same-origin), and avoids needing S3/Postgres in
tyflex at all.

**Option B — build the client-facing UI in tyflex (better marketing/SEO integration,
consistent with the existing `/get-quote` cart UX), and have it call a new public API
endpoint on office that performs extraction + rules engine + draft-quote creation.**
This keeps the polished, SEO-indexed marketing experience on tyflex.co.zw where the
rest of the funnel already lives, but requires office to expose a **brand-new
unauthenticated write path into `billing_documents`** — a materially larger new attack
surface than anything in office today (the closest existing public write path,
`/s/[token]` upload-to-share, is still token-scoped to a specific pre-created share, not
an open intake form). It also means solving CORS, cross-origin rate limiting, and
duplicating or sharing the rules-engine logic, since it would need to run in two
different request contexts depending on which half of the flow needs it (tyflex side
for a live 2D/3D preview before RFQ submission vs. office side for the final
authoritative draft-quote generation) — real risk of the two drifting if they're not
literally the same code.

My recommendation is **Option A**. It costs some marketing polish (the tool lives on
office.tyflex.co.zw, not tyflex.co.zw) but removes an entire category of new security
surface and avoids a logic-duplication/drift risk, by reusing a pattern office already
has proven out twice.

---

## 3. Existing quote/RFQ and Catalogue models to reuse

- **`billing_documents` with `kind='quote', status='draft'` already *is* the target
  landing state** — there's no separate "RFQ" object to build in parallel; a
  client-submitted request should simply produce one of these, exactly like staff
  creating a quote by hand or the AI assistant's `create_quote` tool does today.
- The only "RFQ" concept that exists anywhere in office is **unrelated and points the
  opposite direction**: `procurement_documents.kind='rfq'` is Tyflex requesting a quote
  *from a supplier*, optionally generated *from* an existing client quote
  (`rfqFromQuoteAction`). There is **no precedent today for a client-submitted request
  landing as a draft** — this feature would be the first of its kind, so there's no
  existing guardrail pattern to copy for validating/trusting what comes in from an
  anonymous submitter.
- **Reuse path for creating the draft quote:** `saveDocumentAction()`
  (`src/lib/billing/actions.ts`) is the staff-facing function that inserts a new
  `billing_documents` row with `status` hard-coded to `'draft'` plus its
  `billing_line_items`, inside a transaction. I would **not** call this function
  directly from a public, unauthenticated flow as-is — it's designed to trust a signed-in
  staff member's input. Instead, write a new, narrower insert path (same table, same
  transactional shape) that only ever accepts a `designId`/`sessionId`-derived,
  server-computed bill of materials — never anything the client's browser sends
  directly as price/description/quantity.
- **Catalogue reuse:** office's `products` table (`sku`, `name`, `category`,
  `unit_price`, `hs_code`, `tax_*`, `qty_on_hand`) is distinct from tyflex's static
  product data and is what `billing_line_items.product_id` optionally references.
  Where the rules engine's output matches a real catalogue SKU (sockets, breakers, DB
  boards, cable by the meter), line items should resolve to a real `product_id` so
  pricing is live and consistent with everything else quoted through office. Where no
  SKU exists (e.g. generic labour line items), fall back to freeform
  `description`/`quantity`/`unit_price` — this is exactly what the AI assistant's
  `create_quote` tool already does (it never uses `product_id` at all), so there's a
  direct precedent for a hybrid catalogue-or-freeform line item.
- A client submitting a floor plan won't usually be an existing office `clients` row.
  Decide explicitly whether to create a `clients` row immediately on RFQ submission
  (matching `billing_documents.client_id NOT NULL`) or hold contact details only on
  the new design-session record until a staff member promotes it manually — see open
  question in §6.

---

## 4. Existing AWS SDK / Bedrock usage to extend

- Both repos already have working, IAM-role-authenticated Bedrock access — this part
  of the feature has real infrastructure to build on regardless of which repo hosts
  it. office's client (`src/lib/assistant/bedrock.ts`) is the more capable of the two:
  Converse**Stream** API, tool-calling (5 max rounds), 32,000 max tokens, and
  **multimodal document support** — but only for document-type attachments (PDF, CSV,
  DOC/DOCX, HTML, MD, TXT, XLS/XLSX via an explicit MIME allow-list in
  `src/app/api/assistant/chat/route.ts`), capped at ~4.3MB raw per file / ~7.9MB raw
  combined (chosen to stay under nginx's 12MB body cap), and **explicitly ephemeral**
  — attachments are never persisted, only attached to the single turn they arrive in.
- **No code path in either repo sends a raw image (PNG/JPEG) to Bedrock today.** A
  photographed or scanned floor-plan *image* (as opposed to a vector/PDF plan) would
  need new support: Bedrock's Converse API does accept `{ image: { format, source } }`
  content blocks, but nothing in either codebase currently builds one. If the uploaded
  floor plan is a PDF, the existing document-block pattern in office extends directly;
  if it's a photo/scan image, that's new ground.
  - I'd also plan for a **new, dedicated extraction call** rather than reusing the
    conversational assistant's tool-calling loop — the assistant's existing flow is
    built for a chat/tool-use conversation (multi-turn, free-form replies); floor-plan
    extraction is a one-shot structured-output task (room boundaries, wall
    coordinates, door/window positions as a strict schema) better served by a
    single-turn call with a tight JSON-schema prompt than by bolting onto the existing
    assistant tool set.
  - Model choice: Haiku 4.5 (the default everywhere today) is tuned for fast, cheap
    conversational replies, not necessarily for precise spatial/dimensional extraction
    from an image. Budget for evaluating Sonnet (or whichever current-generation
    multimodal-strong model) for this specific call, with its own `MODEL_ID` constant
    rather than reusing `BEDROCK_MODEL_ID`.
- Neither repo uses Textract, Rekognition, or any other dedicated computer-vision
  service — "AI extracts the layout" would rely entirely on a Bedrock multimodal model
  call unless a specialized floor-plan-parsing service is deliberately introduced.

---

## 5. Proposed folder structure, DB migrations, API routes

Assumes **Option A** (§2) — feature lives in `office`, tyflex only links to it. Numbers
below continue office's existing migration sequence (next free number as of this audit
is `0033`; confirm the actual next number at implementation time, since more
migrations may land before this is built).

### Migrations

```
migrations/0033_electrical_design_sessions.sql
```
- `electrical_design_sessions`
  - `id UUID PK DEFAULT gen_random_uuid()`
  - `company_id UUID NOT NULL REFERENCES companies(id)` — see open question in §6 on
    which company a public submission is scoped to
  - `public_token TEXT UNIQUE NOT NULL` — URL token, same shape as `billing_documents.public_token`
  - `status TEXT NOT NULL DEFAULT 'uploaded' CHECK (status IN ('uploaded','extracting','extraction_failed','extracted','reviewed','rfq_submitted','converted'))`
  - `contact_name TEXT`, `contact_email TEXT`, `contact_phone TEXT`, `site_address TEXT`
  - `uploaded_file_data TEXT` or an S3 key — **see open question in §6, storage approach is undecided**
  - `uploaded_file_name TEXT`, `uploaded_content_type TEXT`
  - `extracted_layout JSONB` — raw AI extraction output (rooms, walls, doors, windows, dimensions)
  - `design_output JSONB` — rules-engine output (circuits, DB board schedule, point positions, bill of materials)
  - `billing_document_id UUID REFERENCES billing_documents(id)` — set once the RFQ is submitted and a draft quote is created
  - `client_id UUID REFERENCES clients(id)` — set if/when promoted to a real client
  - `created_at`, `updated_at`, `expires_at` (mirrors the share-purge pattern — see §6)

Keep the extracted layout and generated design as JSONB rather than fully normalizing
into new tables — this matches existing precedent (`billing_documents.fiscal_payload
JSONB`, `seal_snapshot`) for semi-structured, evolving data that doesn't need
relational querying, and avoids over-committing to a schema shape before the rules
engine's real output is proven out.

### New lib modules (office)

```
src/lib/electrical-designer/
  types.ts        — Layout, Room, Wall, Opening, DesignOutput, Circuit, BOMLine types
  extraction.ts    — the dedicated Bedrock vision/document call + JSON-schema prompt + response parsing
  rules-engine.ts  — pure, deterministic: (Layout) => DesignOutput. No AI, no I/O — unit-testable in isolation
  catalogue.ts     — resolves rules-engine BOM lines to real `products` rows where a SKU match exists
  actions.ts       — "use server": submitRfqAction() creates the draft billing_documents + billing_line_items transactionally from design_output only (never trusts client-submitted pricing)
  queries.ts       — session lookups by token, staff-side listing
```

### Routes (office)

```
src/app/d/[token]/page.tsx            — upload (public, token issued on session create)
src/app/d/[token]/review/page.tsx     — 2D/3D viewer + edit extracted layout before RFQ
src/app/d/[token]/submitted/page.tsx  — confirmation after RFQ submit
src/app/api/electrical-designer/start/route.ts     — POST: creates a session + token (called from tyflex's CTA, or from a landing page in office itself)
src/app/api/electrical-designer/[token]/upload/route.ts    — POST: accepts the floor plan file
src/app/api/electrical-designer/[token]/extract/route.ts   — POST: triggers the Bedrock extraction call (true route.ts, not a server action — likely slow enough to want explicit loading/progress UI)
```
Add `d/`, `api/electrical-designer` to `src/middleware.ts`'s exclusion matcher
alongside the existing `p/`, `s/` public routes.

### tyflex side

Minimal — a new solutions-style marketing page (following the existing
`src/lib/data/solutions.ts` pattern already used for CommCare/Smartphone Financing)
describing the feature and linking out to office's `/api/electrical-designer/start` or
directly to a fresh `/d/[token]` once a session is created. No new data layer, auth, or
upload code needed in this repo under Option A.

### New dependencies

Neither repo has a 2D/3D rendering library today. Whichever repo hosts the viewer will
need to add one (e.g. `three` + `@react-three/fiber`/`@react-three/drei` for 3D; a 2D
canvas can likely be hand-rolled with SVG/Canvas given the layout data is already
structured). This is new dependency territory either way.

---

## 6. Risks, unknowns, and questions

**For you:**

1. **What's the actual rules basis for "deterministic rules engine"?** SANS 10142 (the
   South African wiring code, often referenced regionally), Zimbabwean wiring
   regulations specifically, or an internal Tyflex best-practice heuristic? This
   materially affects correctness and liability, not just implementation effort.
2. **Is this a quoting tool or a professional design tool?** An auto-generated
   residential electrical layout could easily be read by a client as a
   code-compliant, sign-off-ready design. Does a licensed electrician review/approve
   before any work proceeds, and does the UI say so explicitly ("preliminary design
   for quotation purposes only")?
3. **Which `company_id` does an anonymous public submission belong to** — the Tyflex
   group row, or does geography/branch matter? Every table in office requires one.
4. **Does a submission create a real `clients` row immediately**, or stay
   contact-info-only on the session until a staff member promotes it? Affects whether
   duplicate/spam submissions pollute the real client list.
5. **Storage approach for the uploaded floor plan and any derived 3D data**: follow
   office's existing base64-in-Postgres convention (simple, consistent, but a floor
   plan PDF/scan plus derived view data could realistically exceed the current ~5MB
   object / 12MB nginx body-size ceiling), or introduce real object storage in office
   for the first time (bigger infrastructure change, but the right shape for this kind
   of file) — and if so, is tyflex's already-working S3 setup (`S3_BUCKET_NAME`,
   `@aws-sdk/client-s3`) something to point office at too, rather than configuring a
   second bucket/IAM policy from scratch?
6. **Retention/privacy**: floor plans of someone's home are sensitive. Office already
   has a purge-after-grace-period pattern for secure shares
   (`SHARE_PURGE_GRACE_HOURS`) — should design sessions follow the same policy, and
   for how long?
7. **Abuse/spam**: this would be the first ever public, unauthenticated path that can
   trigger a Bedrock call (cost per request) and create rows toward a real quote
   pipeline. tyflex's `/get-quote` has a honeypot field and nothing else; nothing in
   either repo does rate limiting today. Worth deciding minimum bar (honeypot, a
   simple IP/session rate limit, maybe a CAPTCHA) before this ships.

**Technical risks, not requiring your input to flag but worth tracking:**

- **Extraction accuracy is the biggest unknown.** Hand-drawn, photographed, or scanned
  floor plans vary enormously in quality and convention. Precise spatial extraction
  (wall coordinates, room boundaries, scale, door/window positions) from an image is a
  genuinely hard problem even for dedicated floor-plan-parsing tools, and neither
  repo has any existing precedent to validate Bedrock's reliability at it. Strongly
  suggest a human-editable review step between "AI extracts" and "rules engine runs"
  (the `review` page in §5 already assumes this) rather than feeding raw AI output
  straight into a sellable design.
- **No cost/budget monitoring exists for Bedrock usage in either repo** — a public,
  unauthenticated entry point that triggers Bedrock calls needs that in place before
  launch, not after.
- **Pricing integrity**: the rules engine and catalogue price lookups must run
  entirely server-side from trusted data. The client should only ever be able to
  submit a *file* plus contact details — never a design or price value directly — or
  a manipulated request could submit an arbitrary "draft quote" at an arbitrary price.
- **Determinism is explicitly required by the brief** ("deterministic rules engine," not
  AI) for the design-generation step — keep `rules-engine.ts` a pure function with no
  model calls inside it, both for correctness/predictability and so it's realistically
  unit-testable, as distinct from the AI extraction step which is inherently
  non-deterministic.
