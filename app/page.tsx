import { AppRoot } from "@/components/AppRoot";
import {
  mockConversations,
  mockDocuments,
  mockFeed,
  mockHorse,
  mockLogTasks,
  mockNotifications,
  mockPedigree,
  mockWorkoutHistory,
} from "@/lib/mock-data";
import {
  mockAppointments,
  mockChatChannels,
  mockStableHorses,
} from "@/lib/manager-mock-data";

export default function HomePage() {
  return (
    <AppRoot
      horse={mockHorse}
      feed={mockFeed}
      logTasks={mockLogTasks}
      pedigree={mockPedigree}
      documents={mockDocuments}
      conversations={mockConversations}
      notifications={mockNotifications}
      workoutHistory={mockWorkoutHistory}
      stableName={mockHorse.stable}
      stableHorses={mockStableHorses}
      chatChannels={mockChatChannels}
      appointments={mockAppointments}
    />
  );
}
