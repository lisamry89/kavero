import { AppNotification, CareAppointment, ChatChannel, StableHorse } from "./types";

export const mockStableHorses: StableHorse[] = [
  {
    id: "eclipse-01",
    name: "Éclipse",
    photoUrl: "/horses/eclipse.jpg",
    box: "Box 4",
    tasks: [
      {
        id: "eclipse-ration-matin",
        label: "Ration Matin",
        generatedNote: "Ration du matin distribuée.",
        done: true,
        time: "07:30",
        author: "Julien",
      },
      {
        id: "eclipse-paddock",
        label: "Paddock",
        generatedNote: "Sortie au paddock effectuée.",
        done: false,
        requiresPhoto: true,
      },
      {
        id: "eclipse-pansage",
        label: "Pansage",
        generatedNote: "Pansage complet effectué.",
        done: false,
      },
      {
        id: "eclipse-litiere",
        label: "Litière",
        generatedNote: "Litière refaite, box propre et sec.",
        done: true,
        time: "08:15",
        author: "Marie",
      },
    ],
  },
  {
    id: "volcane-02",
    name: "Volcane",
    photoUrl:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop",
    box: "Box 7",
    tasks: [
      {
        id: "volcane-ration-matin",
        label: "Ration Matin",
        generatedNote: "Ration du matin distribuée.",
        done: true,
        time: "07:20",
        author: "Julien",
      },
      {
        id: "volcane-paddock",
        label: "Paddock",
        generatedNote: "Sortie au paddock effectuée.",
        done: true,
        time: "09:05",
        author: "Marie",
      },
      {
        id: "volcane-pansage",
        label: "Pansage",
        generatedNote: "Pansage complet effectué.",
        done: false,
      },
      {
        id: "volcane-litiere",
        label: "Litière",
        generatedNote: "Litière refaite, box propre et sec.",
        done: false,
      },
    ],
  },
  {
    id: "quartz-03",
    name: "Quartz",
    photoUrl:
      "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=800&auto=format&fit=crop",
    box: "Box 2",
    tasks: [
      {
        id: "quartz-ration-matin",
        label: "Ration Matin",
        generatedNote: "Ration du matin distribuée.",
        done: false,
      },
      {
        id: "quartz-paddock",
        label: "Paddock",
        generatedNote: "Sortie au paddock effectuée.",
        done: false,
        requiresPhoto: true,
      },
      {
        id: "quartz-pansage",
        label: "Pansage",
        generatedNote: "Pansage complet effectué.",
        done: false,
      },
      {
        id: "quartz-litiere",
        label: "Litière",
        generatedNote: "Litière refaite, box propre et sec.",
        done: true,
        time: "06:50",
        author: "Julien",
      },
    ],
  },
  {
    id: "ondine-04",
    name: "Ondine",
    photoUrl:
      "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=800&auto=format&fit=crop",
    box: "Box 9",
    tasks: [
      {
        id: "ondine-ration-matin",
        label: "Ration Matin",
        generatedNote: "Ration du matin distribuée.",
        done: true,
        time: "07:35",
        author: "Marie",
      },
      {
        id: "ondine-paddock",
        label: "Paddock",
        generatedNote: "Sortie au paddock effectuée.",
        done: false,
        requiresPhoto: true,
      },
      {
        id: "ondine-pansage",
        label: "Pansage",
        generatedNote: "Pansage complet effectué.",
        done: true,
        time: "08:40",
        author: "Julien",
      },
      {
        id: "ondine-litiere",
        label: "Litière",
        generatedNote: "Litière refaite, box propre et sec.",
        done: false,
      },
    ],
  },
];

export const mockAppointments: CareAppointment[] = [
  {
    id: "a1",
    horseId: "eclipse-01",
    horseName: "Éclipse",
    type: "vet",
    title: "Visite de contrôle et vaccination",
    date: "12 juil.",
    time: "10:00",
    status: "confirmed",
    requestedBy: "Camille D.",
    careAuthorizationRequired: false,
  },
  {
    id: "a2",
    horseId: "eclipse-01",
    horseName: "Éclipse",
    type: "farrier",
    title: "Ferrure complète",
    date: "18 juil.",
    time: "14:00",
    status: "pending",
    requestedBy: "Julien",
    careAuthorizationRequired: true,
  },
  {
    id: "a3",
    horseId: "volcane-02",
    horseName: "Volcane",
    type: "osteopath",
    title: "Séance d'ostéopathie",
    date: "15 juil.",
    time: "11:30",
    status: "pending",
    requestedBy: "Marie",
    careAuthorizationRequired: true,
  },
  {
    id: "a4",
    horseId: "quartz-03",
    horseName: "Quartz",
    type: "dentist",
    title: "Contrôle dentaire annuel",
    date: "22 juil.",
    time: "09:00",
    status: "declined",
    requestedBy: "Julien",
    careAuthorizationRequired: true,
  },
];

export const mockChatChannels: ChatChannel[] = [
  {
    id: "general",
    kind: "general",
    name: "#Général",
    messages: [
      {
        id: "cg1",
        author: "Écurie des Tilleuls",
        authorRole: "Gestionnaire",
        kind: "text",
        content: "Bonjour à tous, pensez à fermer le portail du paddock ce soir.",
        time: "08:02",
      },
      {
        id: "cg2",
        author: "Marie",
        authorRole: "Palefrenier",
        kind: "text",
        content: "Bien reçu, c'est noté.",
        time: "08:05",
      },
    ],
  },
  {
    id: "urgent",
    kind: "urgent",
    name: "#Urgences",
    messages: [
      {
        id: "cu1",
        author: "Julien",
        authorRole: "Palefrenier",
        kind: "text",
        content: "Quartz boite légèrement à l'antérieur droit, je surveille.",
        time: "09:15",
      },
    ],
  },
  {
    id: "horse-eclipse-01",
    kind: "horse",
    name: "💬 Éclipse (Privé)",
    horseId: "eclipse-01",
    messages: [
      {
        id: "ce1",
        author: "Camille D.",
        authorRole: "Propriétaire",
        kind: "text",
        content: "Comment s'est passée la sortie de ce matin ?",
        time: "09:40",
      },
      {
        id: "ce2",
        author: "Julien",
        authorRole: "Palefrenier",
        kind: "text",
        content: "Très bien, elle était calme et attentive.",
        time: "09:52",
      },
    ],
  },
  {
    id: "horse-volcane-02",
    kind: "horse",
    name: "💬 Volcane (Privé)",
    horseId: "volcane-02",
    messages: [
      {
        id: "cv1",
        author: "Marie",
        authorRole: "Palefrenier",
        kind: "text",
        content: "Volcane a bien mangé ce matin.",
        time: "07:25",
      },
    ],
  },
  {
    id: "horse-quartz-03",
    kind: "horse",
    name: "💬 Quartz (Privé)",
    horseId: "quartz-03",
    messages: [],
  },
  {
    id: "horse-ondine-04",
    kind: "horse",
    name: "💬 Ondine (Privé)",
    horseId: "ondine-04",
    messages: [],
  },
];

export const mockManagerNotifications: AppNotification[] = [
  {
    id: "mn1",
    kind: "message",
    title: "Nouveau message dans #Général",
    subtitle: "Écurie des Tilleuls",
    time: "Hier",
  },
];
