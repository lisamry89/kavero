import { HorseDashboard } from "@/components/horse-dashboard/HorseDashboard";
import {
  mockConversations,
  mockFeed,
  mockHealthEvents,
  mockHorse,
  mockLogTasks,
  mockNotifications,
  mockPedigree,
} from "@/lib/mock-data";

export default function HomePage() {
  return (
    <HorseDashboard
      horse={mockHorse}
      feed={mockFeed}
      logTasks={mockLogTasks}
      healthEvents={mockHealthEvents}
      pedigree={mockPedigree}
      conversations={mockConversations}
      notifications={mockNotifications}
    />
  );
}
