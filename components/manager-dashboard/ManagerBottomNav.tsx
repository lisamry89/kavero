"use client";

import { Calendar, ClipboardCheck, MessageCircle, type LucideIcon } from "lucide-react";

export type ManagerNavId = "board" | "agenda" | "chat";

interface NavItem {
  id: ManagerNavId;
  icon: LucideIcon;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "board", icon: ClipboardCheck, label: "Terrain" },
  { id: "agenda", icon: Calendar, label: "Agenda" },
  { id: "chat", icon: MessageCircle, label: "Chats" },
];

export function ManagerBottomNav({
  activeId,
  onChange,
}: {
  activeId: ManagerNavId;
  onChange: (id: ManagerNavId) => void;
}) {
  return (
    <nav
      className="shrink-0 border-t border-neutral-900 bg-black/90 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 items-center px-4 pb-3 pt-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 py-1.5"
            >
              <Icon
                className={isActive ? "h-5 w-5 text-white" : "h-5 w-5 text-neutral-600"}
                strokeWidth={1.5}
              />
              <span
                className={`text-[9px] uppercase tracking-widest2 ${
                  isActive ? "text-white" : "text-neutral-600"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="pb-2 text-center">
        <span className="text-[10px] uppercase tracking-widest2 text-neutral-700">
          Kavero Pro
        </span>
      </div>
    </nav>
  );
}
