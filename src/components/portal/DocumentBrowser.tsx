"use client";

import { useMemo, useState } from "react";
import { Inbox, Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import DocumentRow from "@/components/portal/DocumentRow";
import type { PortalDocument } from "@/lib/portal/types";

export default function DocumentBrowser({ documents }: { documents: PortalDocument[] }) {
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState("All");

  const folders = useMemo(
    () => ["All", ...Array.from(new Set(documents.map((d) => d.folder))).sort()],
    [documents]
  );

  const filtered = useMemo(() => {
    let list = documents;
    if (folder !== "All") list = list.filter((d) => d.folder === folder);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((d) => d.name.toLowerCase().includes(q) || d.company.toLowerCase().includes(q));
    }
    return list;
  }, [documents, folder, query]);

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setFolder(f)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                folder === f ? "bg-brand-red text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} document{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
          <Inbox className="h-10 w-10 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-gray-400 text-sm">Try a different search or folder.</p>
        </div>
      ) : (
        <GlassCard interactive={false} className="divide-y divide-white/5">
          {filtered.map((doc) => (
            <DocumentRow key={doc.id} document={doc} />
          ))}
        </GlassCard>
      )}
    </>
  );
}
