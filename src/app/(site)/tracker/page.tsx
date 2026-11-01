import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckCircle2, ClipboardList, ListChecks, PauseCircle } from "lucide-react";
import { getPortalSession } from "@/lib/auth";
import { getAllProjects, getProjectStats } from "@/lib/tracker/projects";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import TrackerDashboardClient from "@/components/tracker/TrackerDashboardClient";
import NewProjectModal from "@/components/tracker/NewProjectModal";

export const metadata: Metadata = { title: "Dashboard | Tyflex Project Tracker" };

export default async function TrackerPage() {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") redirect("/portal");

  const projects = getAllProjects();
  const stats = getProjectStats(projects);

  const statCards = [
    { label: "Total Projects", value: stats.total, icon: ClipboardList },
    { label: "Active", value: stats.active, icon: ListChecks },
    { label: "Completed", value: stats.completed, icon: CheckCircle2 },
    { label: "On Hold", value: stats.onHold, icon: PauseCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Project Tracker</h1>
            <p className="text-gray-400">Track active work across every client engagement.</p>
          </div>
          <NewProjectModal />
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat, i) => (
          <FadeIn key={stat.label} delay={0.05 * i}>
            <GlassCard interactive={false} className="p-6 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      <TrackerDashboardClient projects={projects} />
    </div>
  );
}
