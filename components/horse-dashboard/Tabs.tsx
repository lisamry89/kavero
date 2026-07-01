"use client";

export interface TabItem {
  id: string;
  label: string;
}

export function Tabs({
  tabs,
  activeId,
  onChange,
}: {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex border-b border-neutral-800">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 border-b-2 pb-3 pt-1 text-[11px] font-medium uppercase tracking-widest2 transition ${
              isActive
                ? "border-white text-white"
                : "border-transparent text-neutral-500"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
