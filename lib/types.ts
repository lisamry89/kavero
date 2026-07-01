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

export type FeedKind = "photo" | "video" | "flash";

export interface FeedItem {
  id: string;
  kind: FeedKind;
  title: string;
  time: string;
  author: string;
  mediaUrl?: string;
}

export interface LogTask {
  id: string;
  label: string;
  generatedNote: string;
  done: boolean;
  time?: string;
  author?: string;
  requiresPhoto?: boolean;
}

export type HealthEventType = "vet" | "farrier";

export interface HealthEvent {
  id: string;
  type: HealthEventType;
  title: string;
  date: string;
  time: string;
}
