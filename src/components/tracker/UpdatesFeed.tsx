"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import type { StatusUpdate } from "@/lib/tracker/types";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

interface UpdatesFeedProps {
  projectId: string;
  updates: StatusUpdate[];
}

export default function UpdatesFeed({ projectId, updates: initialUpdates }: UpdatesFeedProps) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [note, setNote] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!note.trim()) return;
    setIsPosting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/tracker/projects/${projectId}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post update.");
      setUpdates((prev) => [data.update, ...prev]);
      setNote("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to post update.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Status Updates</h2>

      <form onSubmit={handleSubmit} className="flex items-start gap-3 mb-2">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Post a status update..."
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red/50 resize-none transition-colors"
        />
        <button
          type="submit"
          disabled={isPosting || !note.trim()}
          aria-label="Post update"
          className="shrink-0 h-10 w-10 flex items-center justify-center bg-brand-red hover:bg-brand-red-dark disabled:opacity-40 disabled:pointer-events-none text-white rounded-lg transition-colors"
        >
          {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
      {errorMsg && <p className="text-sm text-red-400 mb-4">{errorMsg}</p>}

      {updates.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No updates yet.</p>
      ) : (
        <div className="space-y-4 mt-6">
          {updates.map((update) => (
            <div key={update.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium">{update.author}</span>
                <span className="text-xs text-gray-500">{formatDateTime(update.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{update.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
