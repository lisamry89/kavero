"use client";

import { useRef } from "react";
import { Camera, Check, Fence, Shovel, Sparkles, Wheat, type LucideIcon } from "lucide-react";
import { LogTask } from "@/lib/types";
import { readFileAsDataUrl } from "@/lib/file";

const TASK_ICON: Record<string, LucideIcon> = {
  t1: Wheat,
  t2: Shovel,
  t3: Sparkles,
  t4: Wheat,
  t5: Fence,
};

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

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const taskId = pendingTaskId.current;
    if (file && taskId) {
      onComplete(taskId, await readFileAsDataUrl(file));
    }
    pendingTaskId.current = null;
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <h2 className="text-center font-serif text-xl font-medium text-white">
        Actions rapides
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {tasks.map((task) => {
          const Icon = TASK_ICON[task.id];
          return (
            <button
              key={task.id}
              onClick={() => handleTap(task)}
              disabled={task.done}
              className={`relative flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition ${
                task.done
                  ? "border-neutral-900 bg-black"
                  : "border-neutral-800 bg-neutral-900 active:scale-[0.98]"
              }`}
            >
              {task.requiresPhoto && !task.done && (
                <Camera
                  className="absolute right-3 top-3 h-3.5 w-3.5 text-neutral-500"
                  strokeWidth={1.5}
                />
              )}
              {task.done && (
                <div className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
                </div>
              )}

              <Icon
                className={task.done ? "h-8 w-8 text-neutral-600" : "h-8 w-8 text-white"}
                strokeWidth={1.5}
              />
              <span
                className={`text-sm ${task.done ? "text-neutral-500" : "text-white"}`}
              >
                {task.label}
              </span>
              {task.done && (
                <span className="text-[10px] tracking-wide text-neutral-600">
                  {task.time} · {task.author}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
