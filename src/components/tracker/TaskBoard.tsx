"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Plus } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { inputClass, selectOptionClass } from "@/lib/form-styles";
import { TASK_STATUS_LABELS } from "@/lib/tracker/ui";
import { TEAM_MEMBERS } from "@/lib/tracker/team";
import type { Task, TaskStatus } from "@/lib/tracker/types";

const COLUMNS: TaskStatus[] = ["todo", "in-progress", "done"];

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface TaskBoardProps {
  projectId: string;
  tasks: Task[];
}

export default function TaskBoard({ projectId, tasks: initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  async function handleStatusChange(taskId: string, status: TaskStatus) {
    setUpdatingTaskId(taskId);
    const previous = tasks;
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));

    try {
      const res = await fetch(`/api/tracker/projects/${projectId}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(previous); // revert on failure
    } finally {
      setUpdatingTaskId(null);
    }
  }

  async function handleAddTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAdding(true);
    setAddErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(`/api/tracker/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add task.");
      setTasks((prev) => [...prev, json.task]);
      form.reset();
      setShowAddForm(false);
    } catch (err) {
      setAddErrorMsg(err instanceof Error ? err.message : "Failed to add task.");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Tasks</h2>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Task
        </button>
      </div>

      {showAddForm && (
        <GlassCard interactive={false} className="p-5 mb-6">
          <form onSubmit={handleAddTask} className="space-y-3">
            {addErrorMsg && <p className="text-sm text-red-400">{addErrorMsg}</p>}
            <input name="title" required placeholder="Task title" className={inputClass} />
            <div className="grid sm:grid-cols-3 gap-3">
              <select name="status" defaultValue="todo" className={inputClass}>
                {COLUMNS.map((s) => (
                  <option key={s} value={s} className={selectOptionClass}>
                    {TASK_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <input list="tracker-team" name="assignee" placeholder="Assignee (optional)" className={inputClass} />
              <input type="date" name="dueDate" className={inputClass} />
            </div>
            <datalist id="tracker-team">
              {TEAM_MEMBERS.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isAdding}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Task"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column);
          return (
            <div key={column}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {TASK_STATUS_LABELS[column]} <span className="text-gray-600">({columnTasks.length})</span>
              </h3>
              <div className="space-y-3">
                {columnTasks.length === 0 ? (
                  <p className="text-xs text-gray-600 py-4 text-center rounded-xl border border-dashed border-white/10">
                    No tasks
                  </p>
                ) : (
                  columnTasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-xl bg-brand-card border border-white/5">
                      <p className="text-sm font-medium mb-2">{task.title}</p>
                      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-3">
                        {task.assignee && <span className="truncate">{task.assignee}</span>}
                        {formatDate(task.dueDate) && <span className="shrink-0">{formatDate(task.dueDate)}</span>}
                      </div>
                      <select
                        value={task.status}
                        disabled={updatingTaskId === task.id}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                        className="w-full text-xs px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:border-brand-red/50 disabled:opacity-60"
                      >
                        {COLUMNS.map((s) => (
                          <option key={s} value={s} className={selectOptionClass}>
                            {TASK_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
