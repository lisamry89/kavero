"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Check, Fence, Shovel, Sparkles, Wheat, type LucideIcon } from "lucide-react";
import { LogTask, StableHorse } from "@/lib/types";
import { readFileAsDataUrl } from "@/lib/file";

const TASK_ICON: Record<string, LucideIcon> = {
  "Ration Matin": Wheat,
  Paddock: Fence,
  Pansage: Sparkles,
  Litière: Shovel,
};

function HorseTaskCard({
  horse,
  onCompleteTask,
}: {
  horse: StableHorse;
  onCompleteTask: (horseId: string, taskId: string, mediaUrl?: string) => void;
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
    onCompleteTask(horse.id, task.id);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const taskId = pendingTaskId.current;
    if (file && taskId) {
      onCompleteTask(horse.id, taskId, await readFileAsDataUrl(file));
    }
    pendingTaskId.current = null;
    e.target.value = "";
  }

  const doneCount = horse.tasks.filter((t) => t.done).length;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-neutral-800">
          <Image src={horse.photoUrl} alt={horse.name} fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-medium text-white">{horse.name}</span>
          <span className="text-xs text-neutral-500">{horse.box}</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest2 text-neutral-600">
          {doneCount}/{horse.tasks.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {horse.tasks.map((task) => {
          const Icon = TASK_ICON[task.label] ?? Sparkles;
          return (
            <button
              key={task.id}
              onClick={() => handleTap(task)}
              disabled={task.done}
              className={`relative flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                task.done
                  ? "border-emerald-900/60 bg-emerald-950/30"
                  : "border-neutral-800 bg-neutral-900 active:scale-[0.97]"
              }`}
            >
              {task.requiresPhoto && !task.done && (
                <Camera
                  className="absolute right-2 top-2 h-3 w-3 text-neutral-500"
                  strokeWidth={1.5}
                />
              )}
              {task.done && (
                <div className="absolute right-2 top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400">
                  <Check className="h-2 w-2 text-black" strokeWidth={3} />
                </div>
              )}
              <Icon
                className={task.done ? "h-5 w-5 text-emerald-400" : "h-5 w-5 text-white"}
                strokeWidth={1.5}
              />
              <span className={`text-xs ${task.done ? "text-emerald-200" : "text-white"}`}>
                {task.label}
              </span>
              {task.done && (
                <span className="text-[9px] leading-tight text-emerald-500/80">
                  Validé à {task.time} par {task.author}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StaffBoard({
  stableHorses,
  onCompleteTask,
}: {
  stableHorses: StableHorse[];
  onCompleteTask: (horseId: string, taskId: string, mediaUrl?: string) => void;
}) {
  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 text-center font-serif text-xl font-medium text-white">
        Tableau de bord terrain
      </h2>
      <div className="flex flex-col gap-3 pb-6">
        {stableHorses.map((horse) => (
          <HorseTaskCard key={horse.id} horse={horse} onCompleteTask={onCompleteTask} />
        ))}
      </div>
    </div>
  );
}
