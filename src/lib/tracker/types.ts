export type ProjectStatus = "active" | "completed" | "on-hold";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee?: string;
  dueDate?: string;
}

export interface StatusUpdate {
  id: string;
  author: string;
  note: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  status: ProjectStatus;
  /** 0-100 */
  progress: number;
  startDate: string;
  dueDate: string;
  tasks: Task[];
  updates: StatusUpdate[];
}
