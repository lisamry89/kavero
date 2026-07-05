"use client";

import { RoleSwitch } from "@/components/RoleSwitch";

export function ManagerHeader({
  stableName,
  staffName,
  onSwitchRole,
}: {
  stableName: string;
  staffName: string;
  onSwitchRole: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-neutral-900 px-4 pb-4 pt-6">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest2 text-neutral-600">
          {stableName}
        </span>
        <h1 className="font-serif text-2xl font-medium text-white">Bonjour, {staffName}</h1>
      </div>
      <RoleSwitch role="manager" onSwitch={onSwitchRole} />
    </div>
  );
}
