"use client";

import { useState } from "react";
import {
  AppNotification,
  CareAppointment,
  Conversation,
  FeedItem,
  Horse,
  HorseDocument,
  LogTask,
  Pedigree,
  WorkoutSession,
} from "@/lib/types";
import { RoleSwitch } from "@/components/RoleSwitch";
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
import { GpsTrackingScreen } from "./GpsTrackingScreen";
import { WorkoutHistoryScreen } from "./WorkoutHistoryScreen";
import { QuickAddButton } from "./QuickAddButton";
import { BottomNav, NavId } from "./BottomNav";
import { usePersistentState } from "@/lib/use-persistent-state";

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
  appointments,
  onAddAppointment,
  onRespondAppointment,
  pedigree,
  documents,
  conversations,
  notifications,
  workoutHistory,
  onSwitchRole,
}: {
  horse: Horse;
  feed: FeedItem[];
  logTasks: LogTask[];
  appointments: CareAppointment[];
  onAddAppointment: (appointment: CareAppointment) => void;
  onRespondAppointment: (id: string, status: "confirmed" | "declined") => void;
  pedigree: Pedigree;
  documents: HorseDocument[];
  conversations: Conversation[];
  notifications: AppNotification[];
  workoutHistory: WorkoutSession[];
  onSwitchRole: () => void;
}) {
  const TABS = [
    { id: "feed", label: horse.name },
    { id: "log", label: "Suivi quotidien" },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [activeNav, setActiveNav] = useState<NavId>("home");
  const [feedItems, setFeedItems] = usePersistentState(`kavero:${horse.id}:feed`, feed);
  const [tasks, setTasks] = useState(logTasks);
  const [storyOpen, setStoryOpen] = useState(false);
  const [sessions, setSessions] = usePersistentState(
    `kavero:${horse.id}:workoutHistory`,
    workoutHistory
  );
  const [viewingSessionId, setViewingSessionId] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = usePersistentState(`kavero:${horse.id}:photoUrl`, horse.photoUrl);
  const [horseDocuments, setHorseDocuments] = usePersistentState(
    `kavero:${horse.id}:documents`,
    documents
  );

  const hasUnseenStory = feedItems.some((item) => !item.viewed);
  const latestFeedItem = feedItems[0];
  const viewingSession = sessions.find((s) => s.id === viewingSessionId);
  const displayHorse = { ...horse, photoUrl };
  const ownAppointments = appointments.filter((a) => a.horseId === horse.id);

  function handleAddDocument(doc: HorseDocument) {
    setHorseDocuments((prev) => [doc, ...prev]);
  }

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

  function handleOpenWorkout(id: string) {
    setViewingSessionId(id);
    setActiveNav("workout-tracker");
  }

  function handleStopGps(draft: Omit<WorkoutSession, "id">) {
    const id = `w-${Date.now()}`;
    const session: WorkoutSession = { id, ...draft };

    setSessions((prev) => [session, ...prev]);
    setFeedItems((prev) => [
      {
        id: `f-${id}`,
        kind: "workout",
        title: session.title,
        time: session.time,
        author: session.author,
        stats: {
          duration: session.duration,
          distance: session.distance,
          topSpeed: `${
            session.gaits.galop > 0 ? "Galop" : session.gaits.trot > 0 ? "Trot" : "Pas"
          }`,
        },
        mapPlaceholder: true,
        viewed: true,
        workoutId: id,
      },
      ...prev,
    ]);
    setViewingSessionId(id);
    setActiveNav("workout-tracker");
  }

  function handleAddMemory(url: string) {
    if (!viewingSessionId) return;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === viewingSessionId ? { ...s, memories: [...s.memories, url] } : s
      )
    );
  }

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col bg-black">
      <div className="flex-1 overflow-hidden">
        {activeNav === "chat" && <MessagingScreen conversations={conversations} />}
        {activeNav === "bell" && <NotificationsScreen notifications={notifications} />}
        {activeNav === "calendar" && (
          <CalendarScreen
            horseId={horse.id}
            horseName={horse.name}
            ownerName={horse.owner}
            appointments={ownAppointments}
            onAdd={onAddAppointment}
            onRespond={onRespondAppointment}
          />
        )}
        {activeNav === "profile" && (
          <HorseProfileScreen
            horse={horse}
            photoUrl={photoUrl}
            pedigree={pedigree}
            documents={horseDocuments}
            onBack={goHome}
            onPhotoChange={setPhotoUrl}
            onAddDocument={handleAddDocument}
          />
        )}
        {activeNav === "gps-tracking" && (
          <GpsTrackingScreen author={horse.owner} onCancel={goHome} onStop={handleStopGps} />
        )}
        {activeNav === "workout-history" && (
          <WorkoutHistoryScreen
            sessions={sessions}
            onBack={goHome}
            onOpenSession={handleOpenWorkout}
          />
        )}
        {activeNav === "workout-tracker" && viewingSession && (
          <WorkoutTrackerScreen
            horse={displayHorse}
            session={viewingSession}
            onBack={goHome}
            onAddMemory={handleAddMemory}
          />
        )}
        {activeNav === "home" && (
          <div className="no-scrollbar h-full overflow-y-auto">
            <div className="relative px-4 pb-4 pt-6">
              <div className="absolute left-4 top-6 z-10">
                <QuickAddButton onSelectWorkout={() => setActiveNav("gps-tracking")} />
              </div>
              <div className="absolute right-4 top-6 z-10">
                <RoleSwitch role="owner" onSwitch={onSwitchRole} />
              </div>
              <HorseHeader
                horse={displayHorse}
                hasUnseenStory={hasUnseenStory}
                onOpenProfile={() => setActiveNav("profile")}
                onOpenStory={handleOpenStory}
              />
            </div>

            <div className="px-4">
              <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
            </div>

            <div className="px-4 pb-6 pt-5">
              {activeTab === "feed" && (
                <FeedTab
                  items={feedItems}
                  onOpenWorkout={handleOpenWorkout}
                  onOpenHistory={() => setActiveNav("workout-history")}
                />
              )}
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
