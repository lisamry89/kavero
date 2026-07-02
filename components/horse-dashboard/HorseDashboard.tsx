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
  WorkoutDetail,
} from "@/lib/types";
import { HorseHeader } from "./HorseHeader";
import { Tabs } from "./Tabs";
import { FeedTab } from "./FeedTab";
import { LogTab } from "./LogTab";
import { CalendarScreen } from "./CalendarScreen";
import { HorseProfileScreen } from "./HorseProfileScreen";
import { MessagingScreen } from "./MessagingScreen";
import { NotificationsScreen } from "./NotificationsScreen";
import { StoryViewer } from "./StoryViewer";
import { WorkoutTrackerScreen } from "./WorkoutTrackerScreen";
import { QuickAddButton } from "./QuickAddButton";
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
  workoutDetail,
}: {
  horse: Horse;
  feed: FeedItem[];
  logTasks: LogTask[];
  healthEvents: HealthEvent[];
  pedigree: Pedigree;
  documents: HorseDocument[];
  conversations: Conversation[];
  notifications: AppNotification[];
  workoutDetail: WorkoutDetail;
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
  const [storyOpen, setStoryOpen] = useState(false);

  const hasUnseenStory = feedItems.some((item) => !item.viewed);
  const latestFeedItem = feedItems[0];

  function goHome() {
    setActiveNav("home");
  }

  function handleOpenStory() {
    setStoryOpen(true);
  }

  function handleCloseStory() {
    setStoryOpen(false);
    setFeedItems((prev) => prev.map((item) => ({ ...item, viewed: true })));
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
        {activeNav === "workout-tracker" && (
          <WorkoutTrackerScreen horse={horse} workout={workoutDetail} onBack={goHome} />
        )}
        {activeNav === "home" && (
          <div className="no-scrollbar h-full overflow-y-auto">
            <div className="relative px-4 pb-4 pt-6">
              <div className="absolute left-4 top-6 z-10">
                <QuickAddButton onSelectWorkout={() => setActiveNav("workout-tracker")} />
              </div>
              <HorseHeader
                horse={horse}
                hasUnseenStory={hasUnseenStory}
                onOpenProfile={() => setActiveNav("profile")}
                onOpenStory={handleOpenStory}
              />
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

      {storyOpen && latestFeedItem && (
        <StoryViewer item={latestFeedItem} onClose={handleCloseStory} />
      )}
    </div>
  );
}
