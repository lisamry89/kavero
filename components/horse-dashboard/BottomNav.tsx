"use client";

import { useState } from "react";
import { Bell, Calendar, Home, MessageCircle, Sparkles, User, type LucideIcon } from "lucide-react";

export type NavId = "home" | "profile" | "calendar" | "chat" | "bell";

interface NavItem {
  id: NavId;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", icon: Home },
  { id: "profile", icon: User },
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
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-t border-neutral-900 bg-black/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3">
        <div className="flex flex-1 items-center justify-between pr-4">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => onChange(item.id)} className="p-1.5">
                <Icon
                  className={isActive ? "h-5 w-5 text-white" : "h-5 w-5 text-neutral-600"}
                  strokeWidth={1.5}
                />
              </button>
            );
          })}
        </div>
        <div className="relative shrink-0">
          {showSoonHint && (
            <span className="absolute -top-9 right-0 whitespace-nowrap rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-neutral-300">
              Bientôt disponible
            </span>
          )}
          <button onClick={handleSparkleTap} aria-label="Assistant IA (bientôt disponible)">
            <Sparkles className="h-5 w-5 text-neutral-600" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="pb-[calc(env(safe-area-inset-bottom)+0.5rem)] text-center">
        <span className="text-[10px] uppercase tracking-widest2 text-neutral-700">
          Kavero
        </span>
      </div>
    </nav>
  );
}
