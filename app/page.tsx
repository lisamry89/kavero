import { HorseDashboard } from "@/components/horse-dashboard/HorseDashboard";
import { mockFeed, mockHorse } from "@/lib/mock-data";

export default function HomePage() {
  return <HorseDashboard horse={mockHorse} feed={mockFeed} />;
}
