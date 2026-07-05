"use client";

import {
  AppNotification,
  AppRole,
  CareAppointment,
  ChannelMessage,
  ChatChannel,
  Conversation,
  FeedItem,
  Horse,
  HorseDocument,
  LogTask,
  Pedigree,
  StableHorse,
  WorkoutSession,
} from "@/lib/types";
import { usePersistentState } from "@/lib/use-persistent-state";
import { HorseDashboard } from "./horse-dashboard/HorseDashboard";
import { ManagerDashboard } from "./manager-dashboard/ManagerDashboard";

const STAFF_NAME = "Julien";

function nowLabel() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function AppRoot({
  horse,
  feed,
  logTasks,
  pedigree,
  documents,
  conversations,
  notifications,
  workoutHistory,
  stableName,
  stableHorses,
  chatChannels,
  appointments,
}: {
  horse: Horse;
  feed: FeedItem[];
  logTasks: LogTask[];
  pedigree: Pedigree;
  documents: HorseDocument[];
  conversations: Conversation[];
  notifications: AppNotification[];
  workoutHistory: WorkoutSession[];
  stableName: string;
  stableHorses: StableHorse[];
  chatChannels: ChatChannel[];
  appointments: CareAppointment[];
}) {
  const [role, setRole] = usePersistentState<AppRole>("kavero:role", "owner");
  const [sharedAppointments, setSharedAppointments] = usePersistentState(
    "kavero:appointments",
    appointments
  );
  const [horses, setHorses] = usePersistentState("kavero:stableHorses", stableHorses);
  const [channels, setChannels] = usePersistentState("kavero:channels", chatChannels);

  function handleSwitchRole() {
    setRole((prev) => (prev === "owner" ? "manager" : "owner"));
  }

  function handleAddAppointment(appointment: CareAppointment) {
    setSharedAppointments((prev) => [appointment, ...prev]);
  }

  function handleRespondAppointment(id: string, status: "confirmed" | "declined") {
    setSharedAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, careAuthorized: status === "confirmed" } : a
      )
    );
  }

  function handleCompleteTask(horseId: string, taskId: string) {
    const time = nowLabel();
    setHorses((prev) =>
      prev.map((h) =>
        h.id !== horseId
          ? h
          : {
              ...h,
              tasks: h.tasks.map((t) =>
                t.id === taskId ? { ...t, done: true, time, author: STAFF_NAME } : t
              ),
            }
      )
    );
  }

  function handleSendMessage(channelId: string, message: ChannelMessage) {
    setChannels((prev) =>
      prev.map((c) => (c.id === channelId ? { ...c, messages: [...c.messages, message] } : c))
    );
  }

  if (role === "manager") {
    return (
      <ManagerDashboard
        stableName={stableName}
        staffName={STAFF_NAME}
        stableHorses={horses}
        onCompleteTask={handleCompleteTask}
        appointments={sharedAppointments}
        onAddAppointment={handleAddAppointment}
        channels={channels}
        onSendMessage={handleSendMessage}
        onSwitchRole={handleSwitchRole}
      />
    );
  }

  return (
    <HorseDashboard
      horse={horse}
      feed={feed}
      logTasks={logTasks}
      appointments={sharedAppointments}
      onAddAppointment={handleAddAppointment}
      onRespondAppointment={handleRespondAppointment}
      pedigree={pedigree}
      documents={documents}
      conversations={conversations}
      notifications={notifications}
      workoutHistory={workoutHistory}
      onSwitchRole={handleSwitchRole}
    />
  );
}
