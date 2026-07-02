import { ChevronRight } from "lucide-react";
import { WorkoutSession } from "@/lib/types";
import { ScreenHeader } from "./ScreenHeader";

export function WorkoutHistoryScreen({
  sessions,
  onBack,
  onOpenSession,
}: {
  sessions: WorkoutSession[];
  onBack: () => void;
  onOpenSession: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <ScreenHeader onBack={onBack} title="Historique des activités" />

      {sessions.length === 0 ? (
        <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
          Aucune activité enregistrée
        </p>
      ) : (
        <div className="flex flex-col px-4">
          {sessions.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onOpenSession(s.id)}
              className={`flex items-center gap-3 py-4 text-left ${
                i === 0 ? "" : "border-t border-neutral-900"
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm text-white">{s.title}</span>
                <span className="text-xs text-neutral-500">
                  {s.date} · {s.duration} · {s.distance}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-neutral-600" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
