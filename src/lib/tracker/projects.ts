import type { Project, StatusUpdate, Task, TaskStatus } from "@/lib/tracker/types";

/**
 * In-memory demo project store, seeded on module load. Stands in for a real
 * projects table (DynamoDB/Supabase per the project's tech stack) — writes
 * here persist only for the lifetime of this server process, same caveat as
 * src/lib/portal/users.ts and src/lib/portal/documents.ts.
 */
const projects: Project[] = [
  {
    id: "proj_hlg_network",
    title: "Warehouse Network Upgrade",
    client: "Harare Logistics Group",
    status: "active",
    progress: 65,
    startDate: "2026-06-01",
    dueDate: "2026-09-15",
    tasks: [
      { id: "task_1", title: "Structured cabling install", status: "done", assignee: "Kudzai Marufu", dueDate: "2026-06-20" },
      { id: "task_2", title: "Managed switch configuration", status: "in-progress", assignee: "Tapiwa Ncube", dueDate: "2026-08-25" },
      { id: "task_3", title: "Wi-Fi 6 access point survey", status: "in-progress", assignee: "Simbarashe Gumbo", dueDate: "2026-09-01" },
      { id: "task_4", title: "Staff handover & documentation", status: "todo", assignee: "Kudzai Marufu", dueDate: "2026-09-15" },
    ],
    updates: [
      { id: "upd_1", author: "Kudzai Marufu", note: "Cabling complete across all three depots, ahead of schedule.", createdAt: "2026-06-22T09:00:00.000Z" },
      { id: "upd_2", author: "Tapiwa Ncube", note: "Switch configuration underway — VLAN segmentation in progress.", createdAt: "2026-08-10T09:00:00.000Z" },
    ],
  },
  {
    id: "proj_zrd_3cx",
    title: "3CX Branch Rollout",
    client: "Zimbank Retail Division",
    status: "completed",
    progress: 100,
    startDate: "2026-01-10",
    dueDate: "2026-05-02",
    tasks: [
      { id: "task_5", title: "Central 3CX server provisioning", status: "done", assignee: "Tapiwa Ncube" },
      { id: "task_6", title: "Branch handset deployment", status: "done", assignee: "Simbarashe Gumbo" },
      { id: "task_7", title: "Call queue & recording setup", status: "done", assignee: "Tapiwa Ncube" },
      { id: "task_8", title: "Staff training", status: "done", assignee: "Chiedza Muleya" },
    ],
    updates: [
      { id: "upd_3", author: "Tapiwa Ncube", note: "Rollout completed across all branches. Client sign-off received.", createdAt: "2026-05-02T09:00:00.000Z" },
    ],
  },
  {
    id: "proj_crg_pos",
    title: "POS Standardization",
    client: "Cranborne Retail Group",
    status: "active",
    progress: 40,
    startDate: "2026-07-01",
    dueDate: "2026-10-30",
    tasks: [
      { id: "task_9", title: "Terminal hardware procurement", status: "done", assignee: "Chiedza Muleya" },
      { id: "task_10", title: "POS software configuration", status: "in-progress", assignee: "Chiedza Muleya" },
      { id: "task_11", title: "Store-by-store rollout", status: "todo" },
      { id: "task_12", title: "Staff training", status: "todo" },
    ],
    updates: [
      { id: "upd_4", author: "Chiedza Muleya", note: "First batch of terminals configured and ready for the pilot store.", createdAt: "2026-08-05T09:00:00.000Z" },
    ],
  },
  {
    id: "proj_blm_erp",
    title: "ERP Implementation",
    client: "Bluffhill Manufacturing",
    status: "on-hold",
    progress: 20,
    startDate: "2026-05-15",
    dueDate: "2026-12-01",
    tasks: [
      { id: "task_13", title: "Requirements workshop", status: "done", assignee: "Blessing Chirwa" },
      { id: "task_14", title: "Financial module configuration", status: "in-progress", assignee: "Blessing Chirwa" },
      { id: "task_15", title: "Data migration", status: "todo" },
      { id: "task_16", title: "User acceptance testing", status: "todo" },
    ],
    updates: [
      { id: "upd_5", author: "Blessing Chirwa", note: "Paused at the client's request, pending internal budget approval.", createdAt: "2026-07-20T09:00:00.000Z" },
    ],
  },
  {
    id: "proj_hlg_barcode",
    title: "Barcode Scanning Rollout",
    client: "Harare Logistics Group",
    status: "completed",
    progress: 100,
    startDate: "2026-02-01",
    dueDate: "2026-04-18",
    tasks: [
      { id: "task_17", title: "Scanner hardware deployment", status: "done", assignee: "Simbarashe Gumbo" },
      { id: "task_18", title: "Inventory system integration", status: "done", assignee: "Kudzai Marufu" },
      { id: "task_19", title: "Warehouse staff training", status: "done", assignee: "Simbarashe Gumbo" },
    ],
    updates: [
      { id: "upd_6", author: "Simbarashe Gumbo", note: "Rollout complete — zero downtime during the transition.", createdAt: "2026-04-18T09:00:00.000Z" },
    ],
  },
  {
    id: "proj_amc_power",
    title: "Backup Power & UPS Installation",
    client: "Avondale Medical Centre",
    status: "active",
    progress: 55,
    startDate: "2026-06-10",
    dueDate: "2026-09-05",
    tasks: [
      { id: "task_20", title: "Load assessment", status: "done", assignee: "Blessing Chirwa" },
      { id: "task_21", title: "Inverter & UPS installation", status: "in-progress", assignee: "Blessing Chirwa" },
      { id: "task_22", title: "Surge protection wiring", status: "todo" },
      { id: "task_23", title: "Testing & handover", status: "todo" },
    ],
    updates: [
      { id: "upd_7", author: "Blessing Chirwa", note: "Installed the primary inverter bank — load-tested successfully.", createdAt: "2026-08-01T09:00:00.000Z" },
    ],
  },
];

let nextId = 100;
function generateId(prefix: string): string {
  nextId += 1;
  return `${prefix}_${Date.now().toString(36)}${nextId}`;
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1));
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export interface CreateProjectInput {
  title: string;
  client: string;
  status: Project["status"];
  startDate: string;
  dueDate: string;
  progress?: number;
}

export function createProject(input: CreateProjectInput): Project {
  const project: Project = {
    id: generateId("proj"),
    title: input.title,
    client: input.client,
    status: input.status,
    progress: input.progress ?? 0,
    startDate: input.startDate,
    dueDate: input.dueDate,
    tasks: [],
    updates: [],
  };
  projects.unshift(project);
  return project;
}

export interface UpdateProjectInput {
  title?: string;
  client?: string;
  status?: Project["status"];
  progress?: number;
  startDate?: string;
  dueDate?: string;
}

export function updateProject(id: string, patch: UpdateProjectInput): Project | undefined {
  const project = getProjectById(id);
  if (!project) return undefined;
  Object.assign(project, patch);
  return project;
}

export interface AddTaskInput {
  title: string;
  status?: TaskStatus;
  assignee?: string;
  dueDate?: string;
}

export function addTask(projectId: string, input: AddTaskInput): Task | undefined {
  const project = getProjectById(projectId);
  if (!project) return undefined;
  const task: Task = {
    id: generateId("task"),
    title: input.title,
    status: input.status ?? "todo",
    assignee: input.assignee || undefined,
    dueDate: input.dueDate || undefined,
  };
  project.tasks.push(task);
  return task;
}

export interface UpdateTaskInput {
  title?: string;
  status?: TaskStatus;
  assignee?: string;
  dueDate?: string;
}

export function updateTask(projectId: string, taskId: string, patch: UpdateTaskInput): Task | undefined {
  const project = getProjectById(projectId);
  const task = project?.tasks.find((t) => t.id === taskId);
  if (!task) return undefined;
  Object.assign(task, patch);
  return task;
}

export function addStatusUpdate(projectId: string, author: string, note: string): StatusUpdate | undefined {
  const project = getProjectById(projectId);
  if (!project) return undefined;
  const update: StatusUpdate = { id: generateId("upd"), author, note, createdAt: new Date().toISOString() };
  project.updates.unshift(update);
  return update;
}

export function getProjectStats(list: Project[] = projects) {
  return {
    total: list.length,
    active: list.filter((p) => p.status === "active").length,
    completed: list.filter((p) => p.status === "completed").length,
    onHold: list.filter((p) => p.status === "on-hold").length,
  };
}
