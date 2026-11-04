"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { PaidaContent, Tribute } from "@/lib/paida/schema";
import AccountPanel from "./AccountPanel";
import ActivityAdmin from "./ActivityAdmin";
import ContributionsAdmin from "./ContributionsAdmin";
import FeedAdmin from "./FeedAdmin";
import TeamAdmin from "./TeamAdmin";
import { resizeImage } from "./resizeImage";
import { ROLE_LABEL, TABS_FOR_ROLE, type AdminTab as Tab, type Role } from "@/lib/paida/roles";
import { TIMEZONES } from "@/lib/paida/time";

const TAB_LABELS: Record<Tab, string> = {
  basics: "Basics", updates: "Updates", program: "Program", support: "Support", story: "Her Story", voice: "Her Voice",
  about: "About", gallery: "Gallery", contacts: "Contacts", tributes: "Memories & messages", notifications: "Notifications", contributions: "Contributions",
  activity: "Activity", team: "Team", json: "Advanced",
};

const uid = () => crypto.randomUUID();

function Field({ label, value, onChange, type = "text", multiline, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean; placeholder?: string; hint?: string;
}) {
  return (
    <label>
      {label}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={5} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
      {hint && <span className="muted small" style={{ fontWeight: 400 }}>{hint}</span>}
    </label>
  );
}

/** Generic editable list with add / remove / reorder. */
function ListEditor<T extends { id: string }>({ items, onChange, blank, addLabel, render }: {
  items: T[]; onChange: (items: T[]) => void; blank: () => T; addLabel: string; render: (item: T, patch: (p: Partial<T>) => void) => ReactNode;
}) {
  const move = (i: number, d: number) => {
    const next = [...items];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div>
      {items.map((item, i) => (
        <div key={item.id} className="row">
          {render(item, (p) => onChange(items.map((x, k) => (k === i ? { ...x, ...p } : x))))}
          <div className="btn-row" style={{ margin: 0 }}>
            <button type="button" className="btn ghost" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
            <button type="button" className="btn ghost" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">↓</button>
            <button type="button" className="btn ghost" onClick={() => confirm("Remove this item?") && onChange(items.filter((_, k) => k !== i))}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn" onClick={() => onChange([...items, blank()])}>＋ {addLabel}</button>
    </div>
  );
}

async function upload(file: File, kind: "hero" | "gallery") {
  const body = new FormData();
  body.set("file", file.size <= 14 * 1024 * 1024 ? file : await resizeImage(file, 4000, 0.9)); // the server resizes for the page and keeps the original
  body.set("kind", kind);
  const res = await fetch("/api/paida/admin/upload", { method: "POST", body });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; src: string; thumb?: string; ogSrc?: string; w: number; h: number };
  if (!res.ok || !json.ok) throw new Error(json.message || "Upload failed");
  return json;
}

export default function AdminApp({ initial, storageReady, me }: { initial: PaidaContent; storageReady: boolean; me: { id: string; name: string; role: Role; shared: boolean } }) {
  const [c, setC] = useState<PaidaContent>(initial);
  // Hiding tabs is only for convenience — every API route enforces the role on the server.
  const tabs = TABS_FOR_ROLE[me.role];
  const [tab, setTab] = useState<Tab>(tabs[0]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [json, setJson] = useState("");
  const [team, setTeam] = useState<{ id: string; name: string; role: string }[]>([]);
  useEffect(() => {
    if (me.role !== "owner") return;
    fetch("/api/paida/admin/team", { cache: "no-store" }).then((r) => r.json()).then((o: { team?: { id: string; name: string; role: string }[] }) => setTeam((o.team ?? []).filter((t) => t.role !== "editor"))).catch(() => {});
  }, [me.role]);
  const set = (p: Partial<PaidaContent>) => setC((prev) => ({ ...prev, ...p }));
  const say = (m: string, isErr = false) => { setMsg(m); setErr(isErr); };

  async function save() {
    setBusy(true);
    say("Saving…");
    const res = await fetch("/api/paida/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; content?: PaidaContent };
    if (res.ok && out.ok && out.content) { setC(out.content); say("✓ Saved — the live page is updated."); }
    else say(out.message || "Could not save.", true);
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/paida/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function uploadHero(file?: File) {
    if (!file) return;
    say("Uploading hero photo…");
    try {
      const r = await upload(file, "hero");
      set({ heroImage: r.src, ogImage: r.ogSrc ?? "" });
      say("Hero photo uploaded — press Save to publish it.");
    } catch (e) { say(e instanceof Error ? e.message : "Upload failed", true); }
  }

  async function uploadGallery(files: FileList | null) {
    if (!files?.length) return;
    const added: PaidaContent["gallery"] = [];
    for (const [i, f] of Array.from(files).entries()) {
      say(`Uploading ${i + 1} of ${files.length}…`);
      try {
        const r = await upload(f, "gallery");
        added.push({ id: uid(), src: r.src, thumb: r.thumb ?? r.src, caption: "", w: r.w, h: r.h });
      } catch (e) { say(e instanceof Error ? e.message : "Upload failed", true); }
    }
    if (added.length) { setC((prev) => ({ ...prev, gallery: [...prev.gallery, ...added] })); say(`${added.length} photo(s) added — press Save to publish.`); }
  }

  return (
    <div className="admin">
      <h1 style={{ fontSize: "1.6rem" }}>Paida page — admin</h1>
      <p className="muted small" style={{ margin: "0.3rem 0 0" }}>
        Signed in as <strong>{me.name}</strong> ({ROLE_LABEL[me.role]}). Leave any field empty and it disappears from the page. <a href="/paida" target="_blank" rel="noopener">View page ↗</a>
      </p>
      {me.shared ? (
        <p className="muted small" style={{ margin: "0.4rem 0 0" }}>
          You&apos;re on the shared owner login. Add yourself as an Owner in <strong>Team</strong> to get a personal login.
        </p>
      ) : (
        <AccountPanel />
      )}
      {!storageReady && <p className="status err">Storage is not configured (AWS_REGION + S3_BUCKET_NAME) — saving will fail.</p>}

      <div className="savebar">
        <button className="btn" onClick={save} disabled={busy}>💾 Save changes</button>
        {me.role === "owner" && <a className="btn ghost" href="/api/paida/admin/archive" title="Everything: data, photos and the untouched originals">⬇ Full archive (ZIP)</a>}
        <button className="btn ghost" onClick={logout}>Sign out</button>
        <span role="status" className={err ? "status err" : "status"}>{msg}</span>
      </div>

      <div className="tabs" role="tablist">
        {tabs.map((id) => (
          <button key={id} aria-pressed={tab === id} onClick={() => { setTab(id); if (id === "json") setJson(JSON.stringify(c, null, 2)); }}>{TAB_LABELS[id]}</button>
        ))}
      </div>

      <div className="card">
        {tab === "basics" && (
          <div className="tform">
            <Field label="Full name" value={c.name} onChange={(v) => set({ name: v })} />
            <Field label="Nickname" value={c.nickname} onChange={(v) => set({ nickname: v })} />
            <Field label="Born" type="date" value={c.born} onChange={(v) => set({ born: v })} />
            <Field label="Passed away" type="date" value={c.died} onChange={(v) => set({ died: v })} />
            <Field label="Tagline" value={c.tagline} onChange={(v) => set({ tagline: v })} />
            <Field label="WhatsApp share message" multiline value={c.shareText} onChange={(v) => set({ shareText: v })} hint="The page link is added after this text." />
            <h3 style={{ margin: "0.5rem 0 0" }}>Also shared on</h3>
            <ListEditor items={c.alsoShared} onChange={(alsoShared) => set({ alsoShared })} addLabel="Add link"
              blank={() => ({ id: uid(), label: "", url: "" })}
              render={(s, p) => (<>
                <Field label="Where (e.g. Facebook, YouTube)" value={s.label} onChange={(v) => p({ label: v })} />
                <Field label="Link" value={s.url} onChange={(v) => p({ url: v })} />
              </>)} />
            <label>
              Hero photo
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {c.heroImage && <img src={c.heroImage} alt="" width={140} height={140} style={{ borderRadius: 12, objectFit: "cover" }} />}
              <input type="file" accept="image/*" onChange={(e) => uploadHero(e.target.files?.[0])} />
              <span className="muted small" style={{ fontWeight: 400 }}>
                Or replace the file public/paida/hero.jpg in the repo. Uploading here also makes the link-preview image for WhatsApp.
              </span>
            </label>
          </div>
        )}

        {tab === "updates" && (
          <ListEditor items={c.updates} onChange={(updates) => set({ updates })} addLabel="Add update"
            blank={() => ({ id: uid(), date: new Date().toISOString().slice(0, 10), title: "", body: "", visibility: "public" as const })}
            render={(u, p) => (<>
              <Field label="Date" type="date" value={u.date} onChange={(v) => p({ date: v })} />
              <Field label="Headline" value={u.title} onChange={(v) => p({ title: v })} />
              <Field label="Details" multiline value={u.body} onChange={(v) => p({ body: v })} />
              <label>Who can see this?
                <select value={u.visibility} onChange={(e) => p({ visibility: e.target.value as "public" | "family" })}>
                  <option value="public">Public — shown on the page</option>
                  <option value="family">Family only (admins) — never shown publicly</option>
                </select>
              </label>
            </>)} />
        )}

        {tab === "program" && (
          <ListEditor items={c.program} onChange={(program) => set({ program })} addLabel="Add event"
            blank={() => ({ id: uid(), title: "", date: "", time: "", endTime: "", timezone: "Pacific/Auckland" as const, venue: "", address: "", mapsUrl: "", livestreamUrl: "", notes: "" })}
            render={(e, p) => (<>
              <Field label="Event" value={e.title} onChange={(v) => p({ title: v })} placeholder="Church service" />
              <Field label="Date" type="date" value={e.date} onChange={(v) => p({ date: v })} />
              <label>Time zone of this event
                <select value={e.timezone} onChange={(ev) => p({ timezone: ev.target.value as typeof e.timezone })}>
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </label>
              <Field label="Start time" type="time" value={e.time} onChange={(v) => p({ time: v })} hint="In the time zone above. Visitors automatically also see it in their own time." />
              <Field label="End time (optional)" type="time" value={e.endTime} onChange={(v) => p({ endTime: v })} />
              <Field label="Venue" value={e.venue} onChange={(v) => p({ venue: v })} />
              <Field label="Address" value={e.address} onChange={(v) => p({ address: v })} />
              <Field label="Google Maps link" value={e.mapsUrl} onChange={(v) => p({ mapsUrl: v })} hint="Optional — a search link is built from venue + address if empty." />
              <Field label="Livestream link" value={e.livestreamUrl} onChange={(v) => p({ livestreamUrl: v })} />
              <Field label="Notes" multiline value={e.notes} onChange={(v) => p({ notes: v })} />
            </>)} />
        )}

        {tab === "support" && (
          <div className="tform">
            <Field label="Message above the payment details" multiline value={c.supportIntro} onChange={(v) => set({ supportIntro: v })} />
            <p className="warn" style={{ margin: 0 }}>⚠️ The page always shows: “Only send to the accounts listed here. The family will never ask you to pay anywhere else.”</p>
            <h3 style={{ margin: "0.5rem 0" }}>Payment methods</h3>
            {me.role !== "owner" ? (
              <>
                <p className="muted small" style={{ margin: 0 }}>Only the Owner can change payment details — this protects the family from anyone redirecting contributions. You can see what is currently published:</p>
                {c.paymentMethods.map((m) => (
                  <div key={m.id} className="row">
                    <strong>{m.flag && `${m.flag} · `}{m.label}</strong>
                    <span className="small" style={{ whiteSpace: "pre-line" }}>{[m.bank, m.accountName, m.number, m.branchSwift, m.type, m.details].filter(Boolean).join("\n")}</span>
                    <span className="muted small">{m.verifiedBy ? `Last verified by ${m.verifiedBy}, ${m.verifiedAt.slice(0, 10)}` : "Not verified yet"}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className="muted small" style={{ margin: 0 }}>
                  Shown on the page in this order. Saving a change stamps “Last verified by {me.name}” automatically; use “Re-verify” after double-checking a method that has not changed. Every change is written to the Activity log with the old and new values.
                </p>
                <ListEditor items={c.paymentMethods} onChange={(paymentMethods) => set({ paymentMethods })} addLabel="Add payment method"
                  blank={() => ({ id: uid(), flag: "", label: "", bank: "", accountName: "", number: "", branchSwift: "", type: "", details: "", link: "", linkLabel: "", phone: "", confirmerId: "", verifiedBy: "", verifiedAt: "" })}
                  render={(m, p) => (<>
                    <Field label="Name shown (e.g. NZ bank (Kudzi), FNB (Allan), EcoCash (Rufaro))" value={m.label} onChange={(v) => p({ label: v })} />
                    <Field label="Country code for the flag" value={m.flag} onChange={(v) => p({ flag: v.toUpperCase().slice(0, 2) })} hint="Two letters, e.g. NZ, ZA, ZW, GB, AU. Leave empty for a globe." />
                    <Field label="Bank" value={m.bank} onChange={(v) => p({ bank: v })} />
                    <Field label="Account name" value={m.accountName} onChange={(v) => p({ accountName: v })} />
                    <Field label="Account / wallet number" value={m.number} onChange={(v) => p({ number: v })} />
                    <Field label="Branch code / SWIFT" value={m.branchSwift} onChange={(v) => p({ branchSwift: v })} />
                    <Field label="Account type" value={m.type} onChange={(v) => p({ type: v })} placeholder="Savings, Cheque, Mobile wallet…" />
                    <Field label="Other details (one per line, “Label: value”)" multiline value={m.details} onChange={(v) => p({ details: v })} hint="Every line gets its own Copy button on the page." />
                    <Field label="Phone (adds Call / WhatsApp buttons)" value={m.phone} onChange={(v) => p({ phone: v })} />
                    <Field label="Link (optional)" value={m.link} onChange={(v) => p({ link: v })} />
                    <Field label="Link button label" value={m.linkLabel} onChange={(v) => p({ linkLabel: v })} />
                    <label>Who confirms contributions sent this way?
                      <select value={m.confirmerId} onChange={(e) => p({ confirmerId: e.target.value })}>
                        <option value="">Nobody assigned</option>
                        {team.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.role})</option>)}
                      </select>
                    </label>
                    <span className="muted small">{m.verifiedBy ? `Last verified by ${m.verifiedBy}, ${m.verifiedAt.slice(0, 10)}` : "Not verified yet — saving stamps it with your name."}</span>
                    <button type="button" className="btn ghost" onClick={() => p({ reverify: true } as never)}>✓ Re-verify (I checked these details)</button>
                  </>)} />
              </>
            )}
            <p className="muted small">Do not enter amounts or targets — the page deliberately shows no fundraising progress.</p>
          </div>
        )}

        {tab === "about" && (
          <div className="tform">
            <p className="muted small" style={{ margin: 0 }}>
              A short note (2–4 sentences) that appears just above “Ways to help”, with a small portrait. Leave it empty to hide it. The full story goes in <strong>Her Story</strong>.
            </p>
            <label>
              About Paida
              <textarea value={c.aboutText} maxLength={700} rows={5} onChange={(e) => set({ aboutText: e.target.value })} />
              <span className="muted small" style={{ fontWeight: 400 }}>{c.aboutText.length}/700 characters</span>
            </label>
            <label>
              Portrait
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.aboutPhoto || c.heroImage} alt="" width={96} height={96} style={{ borderRadius: "50%", objectFit: "cover" }} />
              <input type="file" accept="image/*" onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                say("Uploading portrait…");
                try { const r = await upload(f, "gallery"); set({ aboutPhoto: r.src }); say("Portrait uploaded — press Save to publish it."); }
                catch (x) { say(x instanceof Error ? x.message : "Upload failed", true); }
                e.target.value = "";
              }} />
              <span className="muted small" style={{ fontWeight: 400 }}>
                {c.aboutPhoto ? "Using the photo you uploaded." : "Using her main photo."}{" "}
                {c.aboutPhoto && <button type="button" className="btn ghost" style={{ minHeight: 32, padding: "0.1rem 0.7rem" }} onClick={() => set({ aboutPhoto: "" })}>Use her main photo instead</button>}
              </span>
            </label>
          </div>
        )}

        {tab === "story" && (
          <div className="tform">
            <Field label="Her story" multiline value={c.storyText} onChange={(v) => set({ storyText: v })} hint="Blank lines make new paragraphs." />
            <h3>Life moments</h3>
            <ListEditor items={c.timeline} onChange={(timeline) => set({ timeline })} addLabel="Add moment"
              blank={() => ({ id: uid(), year: "", caption: "" })}
              render={(t, p) => (<>
                <Field label="Year" value={t.year} onChange={(v) => p({ year: v })} />
                <Field label="Caption" value={t.caption} onChange={(v) => p({ caption: v })} />
              </>)} />
          </div>
        )}

        {tab === "voice" && (
          <div className="tform">
            <Field label="Channel name" value={c.channelName} onChange={(v) => set({ channelName: v })} />
            <Field label="Channel link" value={c.channelUrl} onChange={(v) => set({ channelUrl: v })} />
            <h3>Featured videos</h3>
            <ListEditor items={c.videos} onChange={(videos) => set({ videos })} addLabel="Add video"
              blank={() => ({ id: uid(), url: "", title: "" })}
              render={(v, p) => (<>
                <Field label="YouTube link" value={v.url} onChange={(x) => p({ url: x })} placeholder="https://www.youtube.com/watch?v=…" />
                <Field label="Title" value={v.title} onChange={(x) => p({ title: x })} />
              </>)} />
            <h3>Social links</h3>
            <ListEditor items={c.social} onChange={(social) => set({ social })} addLabel="Add link"
              blank={() => ({ id: uid(), label: "", url: "" })}
              render={(s, p) => (<>
                <Field label="Name" value={s.label} onChange={(x) => p({ label: x })} placeholder="Instagram, TikTok…" />
                <Field label="Link" value={s.url} onChange={(x) => p({ url: x })} />
              </>)} />
          </div>
        )}

        {tab === "gallery" && (
          <div className="tform">
            <label>
              Add photos
              <input type="file" accept="image/*" multiple onChange={(e) => { uploadGallery(e.target.files); e.target.value = ""; }} />
              <span className="muted small" style={{ fontWeight: 400 }}>Photos are resized automatically. Press Save after uploading.</span>
            </label>
            <div className="thumbs">
              {c.gallery.map((g, i) => (
                <div key={g.id} className="row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.thumb || g.src} alt="" loading="lazy" />
                  <input type="text" value={g.caption} placeholder="Caption" aria-label="Caption" onChange={(e) => set({ gallery: c.gallery.map((x, k) => (k === i ? { ...x, caption: e.target.value } : x)) })} />
                  <div className="btn-row" style={{ margin: 0 }}>
                    <button type="button" className="btn ghost" disabled={i === 0} onClick={() => { const n = [...c.gallery]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; set({ gallery: n }); }} aria-label="Move earlier">←</button>
                    <button type="button" className="btn ghost" disabled={i === c.gallery.length - 1} onClick={() => { const n = [...c.gallery]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; set({ gallery: n }); }} aria-label="Move later">→</button>
                    <button type="button" className="btn ghost" onClick={() => confirm("Remove this photo?") && set({ gallery: c.gallery.filter((_, k) => k !== i) })} aria-label="Remove photo">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "contacts" && (
          <ListEditor items={c.contacts} onChange={(contacts) => set({ contacts })} addLabel="Add contact"
            blank={() => ({ id: uid(), name: "", role: "", phone: "" })}
            render={(p0, p) => (<>
              <Field label="Name" value={p0.name} onChange={(v) => p({ name: v })} />
              <Field label="Role" value={p0.role} onChange={(v) => p({ role: v })} placeholder="Funeral arrangements" />
              <Field label="Phone / WhatsApp" value={p0.phone} onChange={(v) => p({ phone: v })} hint="Numbers starting with 0 are treated as Zimbabwe (+263)." />
            </>)} />
        )}

        {tab === "tributes" && <TributesAdmin canDelete={me.role !== "editor"} />}
        {tab === "notifications" && <FeedAdmin />}
        {tab === "contributions" && <ContributionsAdmin meId={me.id} />}
        {tab === "activity" && <ActivityAdmin />}
        {tab === "team" && <TeamAdmin />}

        {tab === "json" && (
          <div className="tform">
            <p className="muted small" style={{ margin: 0 }}>Full content as JSON — for bulk edits or backup. Apply, then Save.</p>
            <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={18} spellCheck={false} style={{ fontFamily: "monospace", fontSize: 13 }} />
            <button className="btn ghost" onClick={() => { try { setC(JSON.parse(json)); say("JSON applied — press Save to publish."); } catch { say("That is not valid JSON.", true); } }}>Apply JSON</button>
          </div>
        )}
      </div>
    </div>
  );
}

function TributesAdmin({ canDelete }: { canDelete: boolean }) {
  const [items, setItems] = useState<Tribute[] | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    const res = await fetch("/api/paida/admin/tributes");
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; tributes?: Tribute[]; message?: string };
    if (out.ok && out.tributes) setItems(out.tributes);
    else setError(out.message || "Could not load memories (the bucket role may need s3:ListBucket).");
  }
  useEffect(() => { refresh(); }, []);

  async function setStatus(id: string, status: Tribute["status"]) {
    await fetch("/api/paida/admin/tributes", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    await fetch(`/api/paida/admin/tributes?id=${id}`, { method: "DELETE" });
    refresh();
  }

  if (error) return <p className="status err">{error}</p>;
  if (!items) return <p>Loading…</p>;
  if (items.length === 0) return <p className="muted">No memories yet.</p>;

  const order = { pending: 0, approved: 1, hidden: 2 } as const;
  return (
    <div>
      {[...items].sort((a, b) => order[a.status] - order[b.status]).map((t) => (
        <div key={t.id} className="row">
          <div>
            <strong>{t.name}</strong> {t.relationship && <span className="muted">· {t.relationship}</span>} <span className="badge">{t.status}</span> {t.flag && <span className="badge">held: {t.flag}</span>}
            <div className="muted small">{new Date(t.createdAt).toLocaleString("en-GB")}</div>
          </div>
          <p style={{ margin: 0, whiteSpace: "pre-line" }}>{t.message}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {t.photo && <img src={t.photo} alt="" width={160} style={{ borderRadius: 10 }} loading="lazy" />}
          <div className="btn-row" style={{ margin: 0 }}>
            {t.status !== "approved" && <button className="btn" onClick={() => setStatus(t.id, "approved")}>✓ Approve</button>}
            {t.status === "approved" && <button className="btn ghost" onClick={() => setStatus(t.id, "hidden")}>Hide</button>}
            {canDelete && <button className="btn ghost" onClick={() => remove(t.id)}>Delete</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
