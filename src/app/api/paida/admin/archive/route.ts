import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { archiveEntries, lastArchive, runNightlyArchive } from "@/lib/paida/archive";
import { zipStream } from "@/lib/paida/zip";

// Owner only: it contains private data (phone numbers, contributions, team, activity log).

/** Streams a ZIP of everything. `?status=1` returns when the last nightly archive ran. */
export async function GET(req: Request) {
  const gate = await requireRole("owner");
  if (!gate.ok) return gate.res;

  if (new URL(req.url).searchParams.get("status")) {
    return Response.json({ ok: true, last: await lastArchive() }, { headers: { "Cache-Control": "no-store" } });
  }
  await logActivity(gate.session, "downloaded the full archive");
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(zipStream(await archiveEntries()), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="paida-archive-${stamp}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}

/** Run the nightly bundle right now. */
export async function POST() {
  const gate = await requireRole("owner");
  if (!gate.ok) return gate.res;
  const name = await runNightlyArchive();
  await logActivity(gate.session, "ran the data archive now");
  return Response.json({ ok: true, name });
}
