"use client";

import { useRef } from "react";
import { Check, Camera } from "lucide-react";
import { LogTask } from "@/lib/types";

export function LogTab({
  tasks,
  onComplete,
}: {
  tasks: LogTask[];
  onComplete: (taskId: string, mediaUrl?: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingTaskId = useRef<string | null>(null);

  function handleTap(task: LogTask) {
    if (task.done) return;
    if (task.requiresPhoto) {
      pendingTaskId.current = task.id;
      fileInputRef.current?.click();
      return;
    }
    onComplete(task.id);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const taskId = pendingTaskId.current;
    if (file && taskId) {
      onComplete(taskId, URL.createObjectURL(file));
    }
    pendingTaskId.current = null;
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {tasks.map((task) => (
        <button
          key={task.id}
          onClick={() => handleTap(task)}
          disabled={task.done}
          className={`flex items-center gap-3 rounded-xl border border-neutral-800 p-4 text-left transition ${
            task.done ? "bg-black" : "bg-neutral-900 active:scale-[0.98]"
          }`}
        >
          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
              task.done
                ? "border-white bg-white"
                : "border-neutral-600 bg-transparent"
            }`}
          >
            {task.done && <Check className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />}
            {!task.done && task.requiresPhoto && (
              <Camera className="h-3 w-3 text-neutral-500" strokeWidth={1.5} />
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span
              className={`text-sm font-medium tracking-tight ${
                task.done ? "text-neutral-400" : "text-white"
              }`}
            >
              {task.label}
            </span>
            {task.done && (
              <span className="text-[11px] tracking-wide text-neutral-600">
                {task.generatedNote} · {task.time} · {task.author}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
