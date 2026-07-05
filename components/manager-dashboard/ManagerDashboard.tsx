"use client";

import { useState } from "react";
import {
  AppNotification,
  CareAppointment,
  ChannelMessage,
  ChatChannel,
  StableHorse,
} from "@/lib/types";
import { ManagerHeader } from "./ManagerHeader";
import { StaffBoard } from "./StaffBoard";
import { ManagerAgendaScreen } from "./ManagerAgendaScreen";
import { ManagerChatScreen } from "./ManagerChatScreen";
import { ManagerBottomNav, ManagerNavId } from "./ManagerBottomNav";
import { NotificationsScreen } from "@/components/horse-dashboard/NotificationsScreen";

export function ManagerDashboard({
  stableName,
  staffName,
  stableHorses,
  onCompleteTask,
  appointments,
  onAddAppointment,
  channels,
  onSendMessage,
  notifications,
  onSwitchRole,
}: {
  stableName: string;
  staffName: string;
  stableHorses: StableHorse[];
  onCompleteTask: (horseId: string, taskId: string, mediaUrl?: string) => void;
  appointments: CareAppointment[];
  onAddAppointment: (appointment: CareAppointment) => void;
  channels: ChatChannel[];
  onSendMessage: (channelId: string, message: ChannelMessage) => void;
  notifications: AppNotification[];
  onSwitchRole: () => void;
}) {
  const [activeNav, setActiveNav] = useState<ManagerNavId>("board");

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col bg-black">
      <div className="flex-1 overflow-hidden">
        {activeNav === "board" && (
          <div className="flex h-full flex-col">
            <ManagerHeader
              stableName={stableName}
              staffName={staffName}
              onSwitchRole={onSwitchRole}
            />
            <div className="no-scrollbar flex-1 overflow-y-auto">
              <StaffBoard stableHorses={stableHorses} onCompleteTask={onCompleteTask} />
            </div>
          </div>
        )}
        {activeNav === "agenda" && (
          <ManagerAgendaScreen
            stableHorses={stableHorses}
            appointments={appointments}
            staffName={staffName}
            onAdd={onAddAppointment}
          />
        )}
        {activeNav === "chat" && (
          <ManagerChatScreen
            channels={channels}
            staffName={staffName}
            onSendMessage={onSendMessage}
          />
        )}
        {activeNav === "bell" && <NotificationsScreen notifications={notifications} />}
      </div>

      <ManagerBottomNav activeId={activeNav} onChange={setActiveNav} />
    </div>
  );
}
