"use client";

import { useState } from "react";
import { FeedItem, HealthEvent, Horse, LogTask } from "@/lib/types";
import { HorseProfileCard } from "./HorseProfileCard";
import { ShareStoryButton } from "./ShareStoryButton";
import { Tabs } from "./Tabs";
import { FeedTab } from "./FeedTab";
import { LogTab } from "./LogTab";
import { CalendarTab } from "./CalendarTab";
import { BottomNav } from "./BottomNav";

const STAFF_NAME = "Julien";

const TABS = [
  { id: "feed", label: "Fil d'actualité" },
  { id: "log", label: "Suivi quotidien" },
  { id: "health", label: "Santé" },
];

function nowLabel() {
  return new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HorseDashboard({
  horse,
  feed,
  logTasks,
  healthEvents,
}: {
  horse: Horse;
  feed: FeedItem[];
  logTasks: LogTask[];
  healthEvents: HealthEvent[];
}) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [feedItems, setFeedItems] = useState(feed);
  const [tasks, setTasks] = useState(logTasks);

  function handleComplete(taskId: string, mediaUrl?: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const time = nowLabel();

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, done: true, time, author: STAFF_NAME } : t
      )
    );

    if (task.requiresPhoto && mediaUrl) {
      const highlight: FeedItem = {
        id: `f-${taskId}-${Date.now()}`,
        kind: "photo",
        title: task.generatedNote,
        time,
        author: STAFF_NAME,
        mediaUrl,
      };
      setFeedItems((prev) => [highlight, ...prev]);
    }
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-black">
      <div className="flex flex-col gap-4 px-4 pb-4 pt-4">
        <HorseProfileCard horse={horse} />
        <ShareStoryButton horse={horse} />
      </div>

      <div className="px-4">
        <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
      </div>

      <div className="flex-1 px-4 pb-28 pt-5">
        {activeTab === "feed" && <FeedTab items={feedItems} />}
        {activeTab === "log" && <LogTab tasks={tasks} onComplete={handleComplete} />}
        {activeTab === "health" && <CalendarTab events={healthEvents} />}
      </div>

      <BottomNav />
    </div>
  );
}
