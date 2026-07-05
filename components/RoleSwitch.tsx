"use client";

import { ArrowLeftRight, Briefcase, User } from "lucide-react";
import { AppRole } from "@/lib/types";

export function RoleSwitch({
  role,
  onSwitch,
}: {
  role: AppRole;
  onSwitch: () => void;
}) {
  const isOwner = role === "owner";

  return (
    <button
      onClick={onSwitch}
      aria-label={isOwner ? "Passer en mode Gestionnaire" : "Passer en mode Propriétaire"}
      className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 py-1.5 pl-1.5 pr-3 active:scale-95"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900">
        {isOwner ? (
          <User className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
        ) : (
          <Briefcase className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
        )}
      </span>
      <span className="text-[10px] uppercase tracking-widest2 text-neutral-400">
        {isOwner ? "Pro" : "Propriétaire"}
      </span>
      <ArrowLeftRight className="h-3 w-3 text-neutral-600" strokeWidth={1.5} />
    </button>
  );
}
