import { FeedItem, Horse } from "@/lib/types";
import { HorseProfileCard } from "./HorseProfileCard";
import { ShareStoryButton } from "./ShareStoryButton";
import { DailyFeed } from "./DailyFeed";

export function HorseDashboard({
  horse,
  feed,
}: {
  horse: Horse;
  feed: FeedItem[];
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 bg-kavero-bg px-4 pb-16 pt-6">
      <HorseProfileCard horse={horse} />
      <ShareStoryButton horse={horse} />
      <DailyFeed items={feed} />
    </div>
  );
}
