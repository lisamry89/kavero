export type HorseStatus = "great" | "good" | "attention";
export type HorseGender = "jument" | "hongre" | "etalon";

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
  dob: string;
  gender: HorseGender;
  coatColor: string;
  height: string;
  microchip: string;
  sireNumber: string;
}

export interface PedigreeEntry {
  name: string;
  sire?: string;
  dam?: string;
}

export interface Pedigree {
  sire: PedigreeEntry;
  dam: PedigreeEntry;
}

export type DocumentKind = "pdf" | "image";

export interface HorseDocument {
  id: string;
  name: string;
  kind: DocumentKind;
  addedAt: string;
}

export type FeedKind = "photo" | "video" | "flash";

export interface FeedItem {
  id: string;
  kind: FeedKind;
  title: string;
  time: string;
  author: string;
  mediaUrl?: string;
  viewed?: boolean;
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

export type HealthEventType =
  | "vet"
  | "farrier"
  | "dentist"
  | "osteopath"
  | "competition"
  | "other";

export interface HealthEvent {
  id: string;
  type: HealthEventType;
  title: string;
  date: string;
  time: string;
}

export type MessageSender = "contact" | "owner";
export type MessageKind = "text" | "file";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  kind: MessageKind;
  content: string;
  fileName?: string;
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  online: boolean;
  messages: ChatMessage[];
}

export type NotificationKind = "reminder" | "care" | "message";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  subtitle: string;
  time: string;
}
