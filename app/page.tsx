import { HorseDashboard } from "@/components/horse-dashboard/HorseDashboard";
import {
  mockConversations,
  mockDocuments,
  mockFeed,
  mockHealthEvents,
  mockHorse,
  mockLogTasks,
  mockNotifications,
  mockPedigree,
  mockWorkoutDetail,
} from "@/lib/mock-data";

export default function HomePage() {
  return (
    <HorseDashboard
      horse={mockHorse}
      feed={mockFeed}
      logTasks={mockLogTasks}
      healthEvents={mockHealthEvents}
      pedigree={mockPedigree}
      documents={mockDocuments}
      conversations={mockConversations}
      notifications={mockNotifications}
      workoutDetail={mockWorkoutDetail}
    />
  );
}
