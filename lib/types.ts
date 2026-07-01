export type HorseStatus = "great" | "good" | "attention";

export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  photoUrl: string;
  status: HorseStatus;
  statusLabel: string;
  stable: string;
  owner: string;
}

export type FeedCardType = "feeding" | "turnout" | "grooming" | "vet" | "media" | "bedding";

export interface FeedItem {
  id: string;
  type: FeedCardType;
  title: string;
  subtitle: string;
  time: string;
  author: string;
  mediaUrl?: string;
  durationLabel?: string;
}
