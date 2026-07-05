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
  url?: string;
}

export type FeedKind = "photo" | "video" | "flash" | "workout";

export interface WorkoutStats {
  duration: string;
  distance: string;
  topSpeed: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  t: number;
}

export interface FeedItem {
  id: string;
  kind: FeedKind;
  title: string;
  time: string;
  author: string;
  mediaUrl?: string;
  viewed?: boolean;
  stats?: WorkoutStats;
  mapPlaceholder?: boolean;
  workoutId?: string;
  route?: RoutePoint[];
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

export type AppointmentStatus = "pending" | "confirmed" | "declined";

export interface CareAppointment {
  id: string;
  horseId: string;
  horseName: string;
  type: HealthEventType;
  title: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  requestedBy: string;
  careAuthorizationRequired: boolean;
  careAuthorized?: boolean;
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

export type Gait = "arret" | "pas" | "trot" | "galop";

export interface GaitBreakdown {
  arret: number;
  pas: number;
  trot: number;
  galop: number;
}

export interface WorkoutSession {
  id: string;
  title: string;
  date: string;
  time: string;
  author: string;
  duration: string;
  distance: string;
  gaits: GaitBreakdown;
  memories: string[];
  route?: RoutePoint[];
}

export type AppRole = "owner" | "manager";

export interface StableHorse {
  id: string;
  name: string;
  photoUrl: string;
  box: string;
  tasks: LogTask[];
}

export type ChannelKind = "general" | "urgent" | "horse";

export interface ChannelMessage {
  id: string;
  author: string;
  authorRole: string;
  kind: MessageKind;
  content: string;
  fileName?: string;
  time: string;
}

export interface ChatChannel {
  id: string;
  kind: ChannelKind;
  name: string;
  horseId?: string;
  messages: ChannelMessage[];
}
