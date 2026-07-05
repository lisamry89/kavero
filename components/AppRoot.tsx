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
  Listing,
  LogTask,
  Pedigree,
  StableHorse,
  WorkoutSession,
} from "@/lib/types";
import { usePersistentState } from "@/lib/use-persistent-state";
import { APPOINTMENT_TYPE_LABEL } from "@/lib/appointment-shared";
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
  managerNotifications,
  workoutHistory,
  stableName,
  stableHorses,
  chatChannels,
  appointments,
  listings,
}: {
  horse: Horse;
  feed: FeedItem[];
  logTasks: LogTask[];
  pedigree: Pedigree;
  documents: HorseDocument[];
  conversations: Conversation[];
  notifications: AppNotification[];
  managerNotifications: AppNotification[];
  workoutHistory: WorkoutSession[];
  stableName: string;
  stableHorses: StableHorse[];
  chatChannels: ChatChannel[];
  appointments: CareAppointment[];
  listings: Listing[];
}) {
  const [role, setRole] = usePersistentState<AppRole>("kavero:role", "owner");
  const [sharedAppointments, setSharedAppointments] = usePersistentState(
    "kavero:appointments",
    appointments
  );
  const [horses, setHorses] = usePersistentState("kavero:stableHorses", stableHorses);
  const [channels, setChannels] = usePersistentState("kavero:channels", chatChannels);
  const [sharedListings, setSharedListings] = usePersistentState("kavero:listings", listings);
  const [ownerNotifications, setOwnerNotifications] = usePersistentState(
    "kavero:notifications:owner",
    notifications
  );
  const [managerNotificationList, setManagerNotificationList] = usePersistentState(
    "kavero:notifications:manager",
    managerNotifications
  );

  function handleSwitchRole() {
    setRole((prev) => (prev === "owner" ? "manager" : "owner"));
  }

  function handleAddAppointment(appointment: CareAppointment) {
    setSharedAppointments((prev) => [appointment, ...prev]);
    if (appointment.status === "pending") {
      setOwnerNotifications((prev) => [
        {
          id: `n-${appointment.id}`,
          kind: "appointment",
          title: `Nouvelle demande de rendez-vous pour ${appointment.horseName}`,
          subtitle: `${APPOINTMENT_TYPE_LABEL[appointment.type]} · demandé par ${appointment.requestedBy}`,
          time: "À l'instant",
        },
        ...prev,
      ]);
    }
  }

  function handleRespondAppointment(id: string, status: "confirmed" | "declined") {
    const appointment = sharedAppointments.find((a) => a.id === id);
    setSharedAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, careAuthorized: status === "confirmed" } : a
      )
    );
    if (appointment) {
      setManagerNotificationList((prev) => [
        {
          id: `n-${id}-${status}`,
          kind: "appointment",
          title:
            status === "confirmed"
              ? `Rendez-vous confirmé pour ${appointment.horseName}`
              : `Rendez-vous refusé pour ${appointment.horseName}`,
          subtitle: `${APPOINTMENT_TYPE_LABEL[appointment.type]} · ${appointment.date} à ${appointment.time}`,
          time: "À l'instant",
        },
        ...prev,
      ]);
    }
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

  function handleAddListing(listing: Listing) {
    setSharedListings((prev) => [listing, ...prev]);
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
        notifications={managerNotificationList}
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
      notifications={ownerNotifications}
      workoutHistory={workoutHistory}
      listings={sharedListings}
      onAddListing={handleAddListing}
      onSwitchRole={handleSwitchRole}
    />
  );
}
