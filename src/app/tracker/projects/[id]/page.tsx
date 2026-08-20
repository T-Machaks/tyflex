import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPortalSession } from "@/lib/auth";
import { getProjectById } from "@/lib/tracker/projects";
import ProjectHeaderEditor from "@/components/tracker/ProjectHeaderEditor";
import TaskBoard from "@/components/tracker/TaskBoard";
import UpdatesFeed from "@/components/tracker/UpdatesFeed";
import FadeIn from "@/components/motion/FadeIn";

interface ProjectPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectById(params.id);
  return {
    title: project ? `${project.title} | Tyflex Project Tracker` : "Project | Tyflex Project Tracker",
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") redirect("/portal");

  const project = getProjectById(params.id);
  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <FadeIn>
        <Link
          href="/tracker"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Projects
        </Link>
      </FadeIn>

      <FadeIn delay={0.05}>
        <ProjectHeaderEditor project={project} />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-10">
          <TaskBoard projectId={project.id} tasks={project.tasks} />
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="pt-10 border-t border-white/5">
          <UpdatesFeed projectId={project.id} updates={project.updates} />
        </div>
      </FadeIn>
    </div>
  );
}
