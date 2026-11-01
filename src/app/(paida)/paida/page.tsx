import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import { loadContent } from "@/lib/paida/content";
import { listApproved } from "@/lib/paida/tributes";
import { listFeed, relativeTime } from "@/lib/paida/feed";
import type { SupportMethod } from "@/lib/paida/schema";
import { formatDate, intlDigits, mapsHref, safeUrl, telHref, waHref, youtubeId } from "@/lib/paida/util";
import AddToCalendar from "@/components/paida/AddToCalendar";
import ContributionForm from "@/components/paida/ContributionForm";
import CopyButton from "@/components/paida/CopyButton";
import FeedTicker from "@/components/paida/FeedTicker";
import Gallery from "@/components/paida/Gallery";
import ShareBar from "@/components/paida/ShareBar";
import TributeForm from "@/components/paida/TributeForm";
import YouTubeFacade from "@/components/paida/YouTubeFacade";

// Always render fresh from storage so admin edits and approved tributes show immediately.
export const dynamic = "force-dynamic";

const PAGE_URL = `${COMPANY.url}/paida`;
const getContent = cache(loadContent);

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const title = `${c.name || "In loving memory"} — Celebrating her life`;
  const description = c.tagline || "Program, updates and how to support the family.";
  const image = safeUrl(c.ogImage) || safeUrl(c.heroImage) || "/paida/og.jpg";
  return {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { title, description, url: PAGE_URL, type: "website", images: [{ url: image, alt: c.name }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const hasMethod = (m: SupportMethod) => Boolean(m.details || m.copyText || m.link || m.phone);
const copyValue = (t: string) => (/^[\d\s+()-]+$/.test(t) ? t.replace(/[\s()-]/g, "") : t);

function PaymentCard({ m, contactName }: { m: SupportMethod; contactName?: string }) {
  const href = safeUrl(m.link);
  return (
    <div className="pay">
      <h2>{m.label || "Payment"}</h2>
      {m.details && <p style={{ margin: "0.2rem 0", whiteSpace: "pre-line" }}>{m.details}</p>}
      {m.copyText && <p className="number">{m.copyText}</p>}
      <div className="btn-row">
        {m.copyText && <CopyButton text={copyValue(m.copyText)} label={/^[\d\s+()-]+$/.test(m.copyText) ? "Copy number" : "Copy details"} />}
        {href && (
          <a className="btn ghost" href={href} target="_blank" rel="noopener noreferrer">
            {m.linkLabel || "Open link"} ↗
          </a>
        )}
        {m.phone && (
          <>
            <a className="btn ghost" href={telHref(m.phone)}>
              📞 Call{contactName ? ` ${contactName}` : ""}
            </a>
            <a className="btn ghost" href={waHref(m.phone)} target="_blank" rel="noopener noreferrer">
              💬 WhatsApp{contactName ? ` ${contactName}` : ""}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default async function PaidaPage() {
  const [c, tributes, feed] = await Promise.all([getContent(), listApproved(), listFeed()]);

  const dates = [formatDate(c.born), formatDate(c.died)].filter(Boolean).join(" – ");
  const heroSrc = safeUrl(c.heroImage) || "/paida/og.jpg";
  const updates = [...c.updates.filter((u) => u.title || u.body)].sort((a, b) => b.date.localeCompare(a.date));
  const events = c.program.filter((e) => e.title);
  const local = c.supportLocal.filter(hasMethod);
  const abroad = c.supportAbroad.filter(hasMethod);
  // Soft notification feed: finished sentences + relative time only. No amounts, methods, phones,
  // references or messages ever reach this page (the feed file doesn't contain them).
  const now = Date.now();
  const feedLines = feed.map((f, i) => ({
    id: String(i),
    text: f.line ? `${f.name} — ${f.line}` : `${f.name} sent love and support to the family`,
    when: relativeTime(f.at, now),
  }));
  const showSupport = local.length > 0 || c.supportAbroad.length > 0 || Boolean(c.supportIntro);
  const timeline = c.timeline.filter((t) => t.caption);
  const photos = c.gallery.filter((g) => safeUrl(g.src));
  const videos = c.videos.flatMap((v) => {
    const id = youtubeId(v.url);
    return id ? [{ ...v, vid: id }] : [];
  });
  const social = c.social.filter((s) => s.label && safeUrl(s.url));
  const channel = safeUrl(c.channelUrl);
  const contacts = c.contacts.filter((p) => p.name);
  const contactNameFor = (phone: string) => contacts.find((p) => p.phone && intlDigits(p.phone) === intlDigits(phone))?.name;
  const shareText = c.shareText || "Celebrating the life of our dear Paida. Program, updates and how to support the family:";

  return (
    <>
      <header className="hero">
        <div className="hero-photo">
          {heroSrc.startsWith("/api/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroSrc} alt={c.name} width={600} height={600} fetchPriority="high" decoding="async" />
          ) : (
            <Image src={heroSrc} alt={c.name} width={600} height={600} priority sizes="(max-width: 640px) 78vw, 300px" />
          )}
        </div>
        {c.name && <h1>{c.name}</h1>}
        {dates && <p className="dates">{dates}</p>}
        {c.tagline && <p className="tagline">{c.tagline}</p>}
        {feedLines.length > 0 && <FeedTicker items={feedLines.slice(0, 5).map((f) => `💗 ${f.text} · ${f.when}`)} />}
      </header>

      <main className="wrap">
        {updates.length > 0 && (
          <details className="acc" open id="updates">
            <summary>Updates</summary>
            <div className="acc-body">
              <ul className="list">
                {updates.map((u) => (
                  <li key={u.id} className="item">
                    {u.date && <div className="when">{formatDate(u.date)}</div>}
                    {u.title && <h2>{u.title}</h2>}
                    {u.body && <p>{u.body}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )}

        {events.length > 0 && (
          <details className="acc" open id="program">
            <summary>Program</summary>
            <div className="acc-body">
              <ul className="list">
                {events.map((e) => {
                  const maps = mapsHref(e);
                  const live = safeUrl(e.livestreamUrl);
                  const when = [e.date && formatDate(e.date, true), e.time && (e.endTime ? `${e.time} – ${e.endTime}` : e.time)]
                    .filter(Boolean)
                    .join(" · ");
                  const where = [e.venue, e.address].filter(Boolean).join(", ");
                  return (
                    <li key={e.id} className="item event">
                      <h2>{e.title}</h2>
                      {when && <div className="when">{when}</div>}
                      {where && <p>📍 {where}</p>}
                      {e.notes && <p>{e.notes}</p>}
                      {!when && !where && <p className="muted">Details to be confirmed.</p>}
                      <div className="btn-row">
                        {maps && (
                          <a className="btn ghost" href={maps} target="_blank" rel="noopener noreferrer">
                            🗺️ Directions
                          </a>
                        )}
                        {live && (
                          <a className="btn ghost" href={live} target="_blank" rel="noopener noreferrer">
                            🔴 Watch live
                          </a>
                        )}
                        {e.date && (
                          <AddToCalendar title={`${e.title} — ${c.name}`} date={e.date} time={e.time} endTime={e.endTime} location={where} description={e.notes} />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="btn-row">
                <a className="btn" href="/paida/program" target="_blank" rel="noopener">
                  🖨️ Download / print program
                </a>
              </div>
            </div>
          </details>
        )}

        {showSupport && (
          <section className="section" id="support" aria-labelledby="support-h">
            <div className="card">
              <h2 id="support-h">Ways to help</h2>
              {c.supportIntro && <p style={{ margin: 0 }}>{c.supportIntro}</p>}

              {local.length > 0 && (
                <>
                  <p className="sub">🇿🇼 In Zimbabwe</p>
                  {local.map((m) => (
                    <PaymentCard key={m.id} m={m} contactName={m.phone ? contactNameFor(m.phone) : undefined} />
                  ))}
                </>
              )}

              <p className="sub">🌍 Outside Zimbabwe</p>
              {abroad.length > 0 ? (
                abroad.map((m) => <PaymentCard key={m.id} m={m} contactName={m.phone ? contactNameFor(m.phone) : undefined} />)
              ) : (
                <p className="muted">Details for family abroad coming soon. 💗</p>
              )}

              <ContributionForm />

              {feedLines.length > 0 && (
                <div className="feed" aria-label="Love and support for the family">
                  <p className="sub">💗 With love</p>
                  <ul className="feed-list">
                    {feedLines.slice(0, 5).map((f) => (
                      <li key={f.id}>
                        <span>💗 {f.text}</span> <time>{f.when}</time>
                      </li>
                    ))}
                  </ul>
                  {feedLines.length > 5 && (
                    <details className="feed-more">
                      <summary>{`See all (${feedLines.length})`}</summary>
                      <ul className="feed-list">
                        {feedLines.slice(5).map((f) => (
                          <li key={f.id}>
                            <span>💗 {f.text}</span> <time>{f.when}</time>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {(c.storyText || timeline.length > 0) && (
          <details className="acc" id="story">
            <summary>Her Story</summary>
            <div className="acc-body">
              {c.storyText && <p className="story" style={{ margin: 0 }}>{c.storyText}</p>}
              {timeline.length > 0 && (
                <ol className="timeline">
                  {timeline.map((t) => (
                    <li key={t.id}>
                      {t.year && <b>{t.year}</b>} {t.year && "— "}
                      {t.caption}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </details>
        )}

        {(channel || videos.length > 0 || social.length > 0) && (
          <section className="section" id="voice" aria-labelledby="voice-h">
            <div className="card">
              <h2 id="voice-h">Her Voice</h2>
              {(channel || c.channelName) && (
                <p style={{ margin: 0 }}>
                  Paida shared her light on YouTube as <strong>{c.channelName || "her channel"}</strong>.
                </p>
              )}
              <div className="btn-row">
                {channel && (
                  <a className="btn" href={channel} target="_blank" rel="noopener noreferrer">
                    ▶ Visit her channel
                  </a>
                )}
                {social.map((s) => (
                  <a key={s.id} className="btn ghost" href={safeUrl(s.url)!} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
              {videos.length > 0 && (
                <div className="videos">
                  {videos.map((v) => (
                    <YouTubeFacade key={v.id} id={v.vid} title={v.title} watchUrl={v.url} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <details className="acc" id="gallery">
            <summary>Gallery</summary>
            <div className="acc-body">
              <Gallery photos={photos} />
            </div>
          </details>
        )}

        <details className="acc" id="tributes">
          <summary>Tributes{tributes.length > 0 ? ` (${tributes.length})` : ""}</summary>
          <div className="acc-body">
            {tributes.length > 0 && (
              <ul className="list" style={{ marginBottom: "1.25rem" }}>
                {tributes.map((t) => (
                  <li key={t.id} className="tribute">
                    <span className="by">{t.name}</span>
                    {t.relationship && <span className="muted"> · {t.relationship}</span>}
                    <p>{t.message}</p>
                    {t.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photo} alt={`Shared by ${t.name}`} loading="lazy" decoding="async" width={450} />
                    )}
                  </li>
                ))}
              </ul>
            )}
            <TributeForm />
          </div>
        </details>

        {contacts.length > 0 && (
          <section className="section" id="contacts" aria-labelledby="contacts-h">
            <div className="card">
              <h2 id="contacts-h">Family contacts</h2>
              {contacts.map((p) => (
                <div key={p.id} className="contact">
                  <div>
                    <strong>{p.name}</strong>
                    {p.role && <div className="muted small">{p.role}</div>}
                  </div>
                  {p.phone && (
                    <div className="btn-row" style={{ margin: 0 }}>
                      <a className="btn ghost" href={telHref(p.phone)} aria-label={`Call ${p.name}`}>
                        📞 Call
                      </a>
                      <a className="btn ghost" href={waHref(p.phone)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${p.name}`}>
                        💬 WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="pfoot">With love, the Machakaire family 💗</footer>

      <ShareBar url={PAGE_URL} text={shareText} showProgram={events.length > 0} showSupport={showSupport} />
    </>
  );
}
