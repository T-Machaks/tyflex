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
   - `ANTHROPIC_API_KEY`
   
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
