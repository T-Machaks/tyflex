"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import type { PortalDocument } from "@/lib/portal/types";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DocumentRow({ document }: { document: PortalDocument }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    setIsDownloading(true);
    setError("");
    try {
      const res = await fetch(`/api/portal/documents/${document.id}/download-url`);
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Download failed.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{document.name}</p>
        <p className="text-xs text-gray-500 truncate">
          {document.company} &middot; {document.folder} &middot; {formatBytes(document.sizeBytes)} &middot;{" "}
          {formatDate(document.uploadedAt)}
        </p>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-60 rounded-lg text-xs font-medium transition-colors"
      >
        {isDownloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
        Download
      </button>
    </div>
  );
}
