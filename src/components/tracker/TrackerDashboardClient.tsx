"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import ProjectCard from "@/components/tracker/ProjectCard";
import type { Project, ProjectStatus } from "@/lib/tracker/types";

const FILTERS: Array<{ value: ProjectStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
];

export default function TrackerDashboardClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.status === filter)),
    [projects, filter]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              filter === f.value ? "bg-brand-red text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
          <Inbox className="h-10 w-10 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects here</h3>
          <p className="text-gray-400 text-sm">Try a different filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
