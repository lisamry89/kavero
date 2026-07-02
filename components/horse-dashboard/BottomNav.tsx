"use client";

import { useState } from "react";
import { Bell, Calendar, Home, MessageCircle, Sparkles, type LucideIcon } from "lucide-react";

export type NavId =
  | "home"
  | "profile"
  | "calendar"
  | "chat"
  | "bell"
  | "workout-tracker"
  | "gps-tracking"
  | "workout-history";

interface NavItem {
  id: NavId;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", icon: Home },
  { id: "calendar", icon: Calendar },
  { id: "chat", icon: MessageCircle },
  { id: "bell", icon: Bell },
];

export function BottomNav({
  activeId,
  onChange,
}: {
  activeId: NavId;
  onChange: (id: NavId) => void;
}) {
  const [showSoonHint, setShowSoonHint] = useState(false);

  function handleSparkleTap() {
    setShowSoonHint(true);
    setTimeout(() => setShowSoonHint(false), 1600);
  }

  return (
    <nav
      className="shrink-0 border-t border-neutral-900 bg-black/90 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 items-center px-4 pb-3 pt-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex items-center justify-center py-1.5"
            >
              <Icon
                className={isActive ? "h-5 w-5 text-white" : "h-5 w-5 text-neutral-600"}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
        <div className="relative flex items-center justify-center py-1.5">
          {showSoonHint && (
            <span className="absolute -top-8 whitespace-nowrap rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-neutral-300">
              Bientôt disponible
            </span>
          )}
          <button onClick={handleSparkleTap} aria-label="Assistant IA (bientôt disponible)">
            <Sparkles className="h-5 w-5 text-neutral-600" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="pb-2 text-center">
        <span className="text-[10px] uppercase tracking-widest2 text-neutral-700">
          Kavero
        </span>
      </div>
    </nav>
  );
}
