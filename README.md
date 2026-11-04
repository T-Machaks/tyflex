# Tyflex Investments — Web Platform

Corporate website, webstore, document portal, project tracker, and billing
system for Tyflex Investments (tyflex.co.zw), built with Next.js 14 (App
Router, SSR).

## Sections

| Path | Description | Auth |
|---|---|---|
| `/` and marketing pages | Home, solutions (15 pages), webstore, about, contact, resources, etc. | Public |
| `/portal` | Client document portal | Any signed-in user |
| `/tracker` | Internal project tracker | Admin only |
| `/accounts` | Billing & invoicing | Admin only |

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything degrades gracefully in dev
npm run dev
```

Without AWS credentials configured, the app runs fully in dev-fallback mode:
- Contact/quote emails and the AI chat assistant log to the console / return a
  canned reply instead of calling AWS SES / Anthropic.
- Document portal uploads write to a local `.portal-uploads/` directory
  instead of S3.
- `NEXTAUTH_SECRET` falls back to an insecure placeholder outside production.

**Demo accounts** (portal/tracker/accounts login) — remove before real launch:

| Email | Password | Role |
|---|---|---|
| `admin@tyflex.co.zw` | `Admin123!` | Admin (portal + tracker + accounts) |
| `tendai@hararelogistics.co.zw` | `Client123!` | Client |
| `rutendo@zimbankretail.co.zw` | `Client123!` | Client |

## Testing a Production Build Locally

`next dev` has module-isolation quirks that can make the in-memory demo
data stores behave inconsistently across routes. Test stateful features
(auth, password reset, tracker/accounts CRUD) against a real production
build instead:

```bash
rm -rf .next
npx tsc --noEmit
npm run build
NEXTAUTH_SECRET="some-random-string" npm start
```

## Deploying to AWS Amplify (SSR Hosting)

This app deploys as a full SSR **compute** app on Amplify Hosting — not a
static export. `amplify.yml` at the repo root is the build spec Amplify
reads automatically.

1. **Connect the repo** — in the Amplify Console, "New app" → "Host web app"
   → connect this GitHub repository and the `main` branch. Amplify will
   detect `amplify.yml` and the Next.js SSR framework automatically.
2. **Environment variables** — set these in the Amplify Console under
   App settings → Environment variables (see `.env.example` for full
   descriptions of each):
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `https://tyflex.co.zw`
   - `AWS_REGION` — region for SES/S3 (e.g. `us-east-1`)
   - `SES_FROM_EMAIL`, `SES_TO_EMAIL`
   - `S3_BUCKET_NAME`
   - `BEDROCK_MODEL_ID`, `BEDROCK_REGION` — the chat widget calls AWS Bedrock
     directly using the compute role's IAM permissions, not an API key
   
   Prefer **not** setting `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` at all —
   grant the Amplify compute role's IAM policy `ses:SendEmail`,
   `s3:GetObject`/`s3:PutObject` on the bucket, and the SDK clients will pick
   up those permissions automatically via the execution role.
3. **Custom domain** — attach `tyflex.co.zw` under App settings → Domain
   management once the first build succeeds.
4. **First deploy** — push to `main` (or trigger a build from the console).
   Amplify builds via `npm ci && npm run build` and provisions SSR compute
   automatically from the `.next` output — no additional server config.

### Required AWS resources (provision before first real-traffic deploy)

- An **SES** sending identity (domain or `no-reply@tyflex.co.zw`) verified
  and out of the SES sandbox.
- An **S3 bucket** for document portal uploads, private by default (files
  are served through the app's own signed/expiring download route, not
  public bucket URLs).
- An **Anthropic API key** for the chat widget (Claude Haiku).

None of these are required for the site to build or for public marketing
pages to work — they're only needed for the forms, chat widget, and document
portal to function against live services instead of their dev fallbacks.

## Notes

- `/projects` is a leftover page from an earlier scaffold, unlinked from
  navigation and excluded from the sitemap — a decision on whether to keep,
  redesign, or remove it is still pending.
- Images use `next/image` for the logo (the only raster asset in the UI);
  everything else is inline SVG icons (Lucide).

## `/paida` — family memorial page

A private, self-contained page (own root layout under `src/app/(paida)/`; no Tyflex header, footer, chat or branding), marked `noindex,nofollow` and left out of the sitemap. Existing site pages live unchanged under `src/app/(site)/` — the route group only exists so `/paida` can have its own layout; URLs are the same.

**Where content lives.** `content/paida.json` is the bundled starter content (sample placeholders). Once you save from the admin page, your edits are stored in S3 (`paida/content.json` in `S3_BUCKET_NAME`) and take over; the seed is only used until then. Tributes (`paida/tributes/*.json`, plus `paida/approved.json`) and uploaded photos (`paida/media/…`) use the same bucket. In local dev with no S3 configured, everything is written to a gitignored `.paida-data/` folder instead. **Empty fields and empty sections hide themselves**, so publish now and fill in later.

**Sign in (owner).** Set `PAIDA_ADMIN_PASSWORD` in `.env.local` on the server and restart (see `.env.example`); it is the **owner's bootstrap login only**. Go to `/paida/admin`, type **owner** as the phone/email and that password. In local dev with it unset the owner password is `paida-dev`. Rotating the variable signs the owner out everywhere. The compute role needs `s3:GetObject`, `PutObject`, `DeleteObject` and `ListBucket` on `paida/*` in the bucket.

**Team and roles.** The owner's **Team** tab adds people (name, phone and/or email, role) and creates a one-time invite link that expires in 48 hours; send it on WhatsApp and they set their own password (10+ characters, bcrypt-hashed). Everyone signs in with their own phone or email. The owner can change roles, **reset access** (clears the password, ends their sessions, new invite link) or **remove** someone (their sessions stop working immediately). Users, invites and the activity log live in S3 under `paida/admin/`.

| Role | Can do |
|---|---|
| Owner | Everything, plus managing the team |
| Admin | Everything except the team, including contributions, amounts, totals and the CSV export, and the Activity log |
| Editor | Program, updates, her story, gallery, approving/hiding tributes, posting notifications. **Never** sees contribution amounts, phones, references, totals or the export; cannot change payment details, contacts, hero or links |

Every role rule is enforced in the API routes (`requireRole`), not just by hiding tabs. Sign-ins lock out for 15 minutes after 5 failures (per account name and per address; the counters are in memory, so they reset if the server restarts). The **Activity** tab (Owner and Admin) records who did what and when, e.g. "Rufaro confirmed a contribution from Tendai Moyo", without amounts.

**Notifications ("love and support" feed).** Instead of a thank-you list, the page shows soft lines like "💗 Tendai sent love and support to the family · 2 hours ago" (latest 5, "See all" for the rest, plus one quiet line under the tagline that cycles gently; no popups or sound, and no cycling with reduced motion). Nothing shows until approved: a contribution appears only once it is confirmed **and** the person chose to be named. In **Notifications** you can also post one directly (a name or group such as "The Moyo family", with an optional short line; not linked to any payment), and hide or delete any entry. Amounts, methods, phones, references and messages are never published.

**Edit content.** Go to `/paida/admin`, sign in, edit any tab (Basics, Updates, Program, Support, Her Story, Her Voice, Gallery, Contacts), then press **Save changes** — the live page updates immediately. "Advanced" shows the whole document as JSON for bulk edits/backup.

**Upload photos.** Hero photo: Basics tab (also generates the 1200×630 WhatsApp link-preview image), or replace `public/paida/hero.jpg` in the repo (a placeholder is included). Gallery photos: Gallery tab; photos are resized in the browser and again on the server (WebP, EXIF stripped).

**Approve tributes.** Visitors' tributes (name, relationship, message, optional photo) stay hidden until you open **Tributes** in the admin and press **Approve**. You can also Hide or Delete. Spam protection: hidden honeypot field, per-IP and global rate limits (in-memory, per server instance), link filtering, and a cap on the pending queue.

**Contributions.** In "Support the Family", visitors can tap "I've sent my contribution" and submit their name, amount/currency, method, reference, date sent, relationship, an optional message and phone, and whether to appear on the thank-you list. Spam protection matches tributes (honeypot, rate limits, pending cap). Each submission is stored privately as `paida/contributions/<id>.json`. The public page only ever receives display names from the notification feed (`paida/feed.json`) for **confirmed** contributors who opted in — never amounts, methods, phones, references, messages or totals. In `/paida/admin` → **Contributions** you can filter by status/method, search by name or reference, Confirm / Reject / edit, **Add manually** (cash handed over in person), see confirmed totals per currency (admin only; pending shown as a count), and **Export CSV** (UTF-8 with BOM; text cells starting with `=`, `+`, `-` or `@` are neutralised, and phone/reference digits are kept as text so Excel keeps leading zeros).

**About Paida.** A short 2–4 sentence note with a small portrait appears just above "Ways to help"; edit it in the **About** tab (Owner, Admin and Editor can all edit it). It stays hidden while empty; the portrait defaults to her main photo. The full story stays in **Her Story**.

**Printable program.** `/paida/program` is a clean print view (browser Print → Save as PDF).

**`paida.tyflex.co.zw`.** `next.config.js` 301-redirects that host to `https://tyflex.co.zw/paida`. The request has to reach this app first: in Amplify → Hosting → Domain management, add the `paida` subdomain to this app (Amplify shows the CNAME record to create), or create a `CNAME paida → <this app's CloudFront/Amplify domain>`.

**Funeral-week additions.** Payment methods are one ordered list (country flag, bank, account name, number, branch/SWIFT, type, free-text lines, optional confirmer); only the Owner can change them, every change is logged old→new, and each method shows "Last verified by <name>, <date>". Contributions take NZD/AUD and choose from the saved methods (plus Cash/Other); admins get a "My channel" filter. Tributes became "Memories & messages": posts publish immediately unless they contain a link, email, long number or flagged word (those wait for review). Each update is Public or Family-only (family-only never reaches public HTML). Program events carry a time zone and show the viewer's own time automatically.
