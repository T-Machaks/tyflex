import type { Metadata } from "next";
import { loadContent } from "@/lib/paida/content";
import { formatDate, mapsHref, telHref } from "@/lib/paida/util";
import PrintButton from "@/components/paida/PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Program", robots: { index: false, follow: false } };

/** Clean printable program — use the browser's Print → Save as PDF to get a PDF. */
export default async function ProgramPrintPage() {
  const c = await loadContent();
  const events = c.program.filter((e) => e.title);
  const contacts = c.contacts.filter((p) => p.name && p.phone);
  const dates = [formatDate(c.born), formatDate(c.died)].filter(Boolean).join(" – ");

  return (
    <div className="wrap" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="btn-row no-print" style={{ marginTop: 0, justifyContent: "space-between" }}>
        <a className="btn ghost" href="/paida">
          ← Back
        </a>
        <PrintButton />
      </div>

      <div style={{ textAlign: "center", margin: "1.5rem 0" }}>
        <p className="muted" style={{ margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Celebrating the life of
        </p>
        <h1 style={{ fontSize: "2.2rem" }}>{c.name}</h1>
        {dates && <p className="muted" style={{ margin: "0.3rem 0 0" }}>{dates}</p>}
        {c.tagline && <p style={{ fontStyle: "italic" }}>{c.tagline}</p>}
      </div>

      <h2 style={{ marginBottom: "0.8rem" }}>Program</h2>
      {events.length === 0 && <p className="muted">The program will be shared soon.</p>}
      <ul className="list">
        {events.map((e) => {
          const where = [e.venue, e.address].filter(Boolean).join(", ");
          const when = [e.date && formatDate(e.date, true), e.time && (e.endTime ? `${e.time} – ${e.endTime}` : e.time)]
            .filter(Boolean)
            .join(" · ");
          const maps = where ? mapsHref(e) : null;
          return (
            <li key={e.id} className="item event">
              <h2>{e.title}</h2>
              {when && <div className="when">{when}</div>}
              {where && <p>📍 {where}</p>}
              {maps && <p className="small muted">{maps}</p>}
              {e.notes && <p>{e.notes}</p>}
              {!when && !where && <p className="muted">Details to be confirmed.</p>}
            </li>
          );
        })}
      </ul>

      {contacts.length > 0 && (
        <>
          <h2 style={{ margin: "1.5rem 0 0.8rem" }}>Family contacts</h2>
          {contacts.map((p) => (
            <p key={p.id} style={{ margin: "0.2rem 0" }}>
              <strong>{p.name}</strong>
              {p.role ? ` — ${p.role}` : ""}: <a href={telHref(p.phone)}>{p.phone}</a>
            </p>
          ))}
        </>
      )}

      <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--burgundy)" }}>With love, the Machakaire family 💗</p>
    </div>
  );
}
