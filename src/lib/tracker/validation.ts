import { z } from "zod";

export const PROJECT_STATUSES = ["active", "completed", "on-hold"] as const;
export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  client: z.string().trim().min(1, "Client is required").max(160),
  status: z.enum(PROJECT_STATUSES).default("active"),
  startDate: z.string().trim().min(1, "Start date is required"),
  dueDate: z.string().trim().min(1, "Due date is required"),
  progress: z.coerce.number().min(0).max(100).default(0),
});

export const updateProjectSchema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  client: z.string().trim().min(1).max(160).optional(),
  status: z.enum(PROJECT_STATUSES).optional(),
  progress: z.coerce.number().min(0).max(100).optional(),
  startDate: z.string().trim().min(1).optional(),
  dueDate: z.string().trim().min(1).optional(),
});

export const addTaskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required").max(200),
  status: z.enum(TASK_STATUSES).default("todo"),
  assignee: z.string().trim().max(120).optional().or(z.literal("")),
  dueDate: z.string().trim().optional().or(z.literal("")),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  assignee: z.string().trim().max(120).optional().or(z.literal("")),
  dueDate: z.string().trim().optional().or(z.literal("")),
});

export const addUpdateSchema = z.object({
  note: z.string().trim().min(1, "Please write a short update").max(2000),
});
