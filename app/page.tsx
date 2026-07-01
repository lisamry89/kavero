import { HorseDashboard } from "@/components/horse-dashboard/HorseDashboard";
import { mockFeed, mockHealthEvents, mockHorse, mockLogTasks } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <HorseDashboard
      horse={mockHorse}
      feed={mockFeed}
      logTasks={mockLogTasks}
      healthEvents={mockHealthEvents}
    />
  );
}
