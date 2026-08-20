import Link from "next/link";
import { Calendar, ListChecks } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_STYLES } from "@/lib/tracker/ui";
import type { Project } from "@/lib/tracker/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ProjectCard({ project }: { project: Project }) {
  const doneTasks = project.tasks.filter((t) => t.status === "done").length;

  return (
    <Link href={`/tracker/projects/${project.id}`} className="block h-full">
      <GlassCard className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-bold leading-snug mb-1 truncate">{project.title}</h3>
            <p className="text-sm text-gray-500 truncate">{project.client}</p>
          </div>
          <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border ${PROJECT_STATUS_STYLES[project.status]}`}
          >
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-4">
            <div
              className="h-full bg-brand-red rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <ListChecks className="h-3.5 w-3.5" />
              {doneTasks}/{project.tasks.length} tasks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(project.dueDate)}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
