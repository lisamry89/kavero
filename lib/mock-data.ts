import { FeedItem, HealthEvent, Horse, LogTask } from "./types";

export const mockHorse: Horse = {
  id: "eclipse-01",
  name: "Éclipse",
  breed: "Selle Français",
  age: 7,
  photoUrl:
    "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1200&auto=format&fit=crop",
  status: "great",
  statusLabel: "En pleine forme",
  stable: "Écurie des Tilleuls",
  owner: "Camille D.",
};

export const mockFeed: FeedItem[] = [
  {
    id: "f1",
    kind: "photo",
    title: "Sortie au paddock",
    time: "16:45",
    author: "Julien",
    mediaUrl:
      "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "f2",
    kind: "flash",
    title: "Le maréchal-ferrant est passé ce matin",
    time: "09:10",
    author: "Écurie des Tilleuls",
  },
];

export const mockLogTasks: LogTask[] = [
  {
    id: "t1",
    label: "Ration du matin",
    generatedNote: "Ration du matin distribuée.",
    done: true,
    time: "07:30",
    author: "Julien",
  },
  {
    id: "t2",
    label: "Litière",
    generatedNote: "Litière refaite, box propre et sec.",
    done: true,
    time: "08:15",
    author: "Marie",
  },
  {
    id: "t3",
    label: "Pansage complet",
    generatedNote: "Pansage complet effectué (robe, sabots curés).",
    done: false,
  },
  {
    id: "t4",
    label: "Ration du midi",
    generatedNote: "Ration du midi distribuée.",
    done: false,
  },
  {
    id: "t5",
    label: "Sortie paddock",
    generatedNote: "Sortie au paddock effectuée.",
    done: false,
    requiresPhoto: true,
  },
];

export const mockHealthEvents: HealthEvent[] = [
  {
    id: "h1",
    type: "vet",
    title: "Visite de contrôle et vaccination",
    date: "12 juil.",
    time: "10:00",
  },
  {
    id: "h2",
    type: "farrier",
    title: "Ferrure complète",
    date: "18 juil.",
    time: "14:00",
  },
];
