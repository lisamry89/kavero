"use client";

import { useState } from "react";
import {
  AppNotification,
  Conversation,
  FeedItem,
  HealthEvent,
  Horse,
  HorseDocument,
  LogTask,
  Pedigree,
} from "@/lib/types";
import { HorseHeader } from "./HorseHeader";
import { Tabs } from "./Tabs";
import { FeedTab } from "./FeedTab";
import { LogTab } from "./LogTab";
import { CalendarScreen } from "./CalendarScreen";
import { HorseProfileScreen } from "./HorseProfileScreen";
import { MessagingScreen } from "./MessagingScreen";
import { NotificationsScreen } from "./NotificationsScreen";
import { BottomNav, NavId } from "./BottomNav";

const STAFF_NAME = "Julien";

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
  pedigree,
  documents,
  conversations,
  notifications,
}: {
  horse: Horse;
  feed: FeedItem[];
  logTasks: LogTask[];
  healthEvents: HealthEvent[];
  pedigree: Pedigree;
  documents: HorseDocument[];
  conversations: Conversation[];
  notifications: AppNotification[];
}) {
  const TABS = [
    { id: "feed", label: horse.name },
    { id: "log", label: "Suivi quotidien" },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [activeNav, setActiveNav] = useState<NavId>("home");
  const [feedItems, setFeedItems] = useState(feed);
  const [tasks, setTasks] = useState(logTasks);
  const [events, setEvents] = useState(healthEvents);

  function goHome() {
    setActiveNav("home");
  }

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
        title: "Sortie au paddock",
        time,
        author: STAFF_NAME,
        mediaUrl,
      };
      setFeedItems((prev) => [highlight, ...prev]);
    }
  }

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col bg-black">
      <div className="flex-1 overflow-hidden">
        {activeNav === "chat" && <MessagingScreen conversations={conversations} />}
        {activeNav === "bell" && <NotificationsScreen notifications={notifications} />}
        {activeNav === "calendar" && (
          <CalendarScreen
            events={events}
            onAdd={(event) => setEvents((prev) => [...prev, event])}
          />
        )}
        {activeNav === "profile" && (
          <HorseProfileScreen
            horse={horse}
            pedigree={pedigree}
            documents={documents}
            onBack={goHome}
          />
        )}
        {activeNav === "home" && (
          <div className="h-full overflow-y-auto">
            <div className="px-4 pb-4 pt-6">
              <HorseHeader horse={horse} onOpenProfile={() => setActiveNav("profile")} />
            </div>

            <div className="px-4">
              <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
            </div>

            <div className="px-4 pb-6 pt-5">
              {activeTab === "feed" && <FeedTab items={feedItems} />}
              {activeTab === "log" && (
                <LogTab tasks={tasks} onComplete={handleComplete} />
              )}
            </div>
          </div>
        )}
      </div>

      <BottomNav activeId={activeNav} onChange={setActiveNav} />
    </div>
  );
}
