"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { inputClass } from "@/lib/form-styles";

interface AdminUploadPanelProps {
  companies: string[];
  folders: string[];
}

type Status = "idle" | "submitting" | "success" | "error";

export default function AdminUploadPanel({ companies, folders }: AdminUploadPanelProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/portal/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setStatus("success");
      form.reset();
      // Reload so the new document appears in the server-rendered lists below.
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Upload failed.");
      setStatus("error");
    }
  }

  return (
    <GlassCard interactive={false} className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
          <UploadCloud className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold">Upload a Document</h2>
          <p className="text-xs text-gray-500">Assign a file to a client company — admin only.</p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-emerald-400 text-sm py-2">
          <CheckCircle2 className="h-4 w-4" />
          Uploaded — refreshing...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">File</label>
            <input
              type="file"
              name="file"
              required
              className={`${inputClass} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-red file:text-white file:text-xs file:font-medium cursor-pointer`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Display Name (optional)</label>
            <input type="text" name="name" className={inputClass} placeholder="Leave blank to use the file name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Client Company</label>
              <input
                list="portal-companies"
                name="company"
                required
                className={inputClass}
                placeholder="Select or type a company"
              />
              <datalist id="portal-companies">
                {companies.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Folder</label>
              <input list="portal-folders" name="folder" required className={inputClass} placeholder="e.g. Contracts" />
              <datalist id="portal-folders">
                {folders.map((f) => (
                  <option key={f} value={f} />
                ))}
              </datalist>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Document"
            )}
          </button>
        </form>
      )}
    </GlassCard>
  );
}
