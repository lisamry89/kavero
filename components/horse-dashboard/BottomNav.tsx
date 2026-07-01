"use client";

import { useState } from "react";
import { Home, MessageCircle, Settings, type LucideIcon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Accueil", icon: Home },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "settings", label: "Réglages", icon: Settings },
];

export function BottomNav() {
  const [activeId, setActiveId] = useState("home");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-t border-neutral-800 bg-black/90 backdrop-blur">
      <div className="flex items-center justify-around px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <Icon
                className={isActive ? "h-5 w-5 text-white" : "h-5 w-5 text-neutral-500"}
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
    </nav>
  );
}
