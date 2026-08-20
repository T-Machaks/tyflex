"use client";

import { useState, type FormEvent } from "react";
import { Calendar, Loader2, Pencil } from "lucide-react";
import { inputClass, selectOptionClass } from "@/lib/form-styles";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_STYLES } from "@/lib/tracker/ui";
import type { Project, ProjectStatus } from "@/lib/tracker/types";

const STATUSES: ProjectStatus[] = ["active", "on-hold", "completed"];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ProjectHeaderEditor({ project: initialProject }: { project: Project }) {
  const [project, setProject] = useState(initialProject);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    const patch = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch(`/api/tracker/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save changes.");
      setProject((prev) => ({ ...prev, ...data.project }));
      setEditing(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-card p-6 mb-8">
        <form onSubmit={handleSave} className="space-y-4">
          {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
              <input name="title" defaultValue={project.title} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Client</label>
              <input name="client" defaultValue={project.client} required className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Status</label>
              <select name="status" defaultValue={project.status} className={inputClass}>
                {STATUSES.map((s) => (
                  <option key={s} value={s} className={selectOptionClass}>
                    {PROJECT_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Progress (%)</label>
              <input type="number" name="progress" min={0} max={100} defaultValue={project.progress} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Due Date</label>
              <input type="date" name="dueDate" defaultValue={project.dueDate} className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Start Date</label>
              <input type="date" name="startDate" defaultValue={project.startDate} className={inputClass} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-brand-card p-6 mb-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${PROJECT_STATUS_STYLES[project.status]}`}
            >
              {PROJECT_STATUS_LABELS[project.status]}
            </span>
          </div>
          <p className="text-gray-400">{project.client}</p>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-brand-red rounded-full transition-all" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          Start: {formatDate(project.startDate)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          Due: {formatDate(project.dueDate)}
        </span>
      </div>
    </div>
  );
}
