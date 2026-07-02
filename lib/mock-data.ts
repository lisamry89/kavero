import {
  AppNotification,
  Conversation,
  FeedItem,
  HealthEvent,
  Horse,
  HorseDocument,
  LogTask,
  Pedigree,
} from "./types";

export const mockHorse: Horse = {
  id: "eclipse-01",
  name: "Éclipse",
  breed: "Selle Français",
  age: 7,
  photoUrl: "/horses/eclipse.jpg",
  status: "great",
  statusLabel: "En pleine forme",
  stable: "Écurie des Tilleuls",
  owner: "Camille D.",
  dob: "12/04/2019",
  gender: "jument",
  coatColor: "Bai",
  height: "1,68 m",
  microchip: "250259800123456",
  sireNumber: "FR9202719",
};

export const mockPedigree: Pedigree = {
  sire: { name: "Diamant Noir", sire: "Baloubet du Rouet", dam: "Ondine des Bois" },
  dam: { name: "Belle Étoile", sire: "Quartz de Plaine", dam: "Volcane du Parc" },
};

export const mockDocuments: HorseDocument[] = [
  { id: "d1", name: "Passeport équin", kind: "pdf", addedAt: "03/01/2024" },
  { id: "d2", name: "Certificat de vaccination", kind: "pdf", addedAt: "12/06/2025" },
];

export const mockFeed: FeedItem[] = [
  {
    id: "f1",
    kind: "photo",
    title: "Sortie au paddock",
    time: "16:45",
    author: "Julien",
    mediaUrl:
      "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1200&auto=format&fit=crop",
    viewed: false,
  },
  {
    id: "strava-1",
    kind: "workout",
    title: "Travail sur le plat & Cadence",
    time: "14:20",
    author: "Camille D.",
    stats: { duration: "52 min", distance: "6.1 km", topSpeed: "28 km/h" },
    mapPlaceholder: true,
    viewed: false,
  },
  {
    id: "f2",
    kind: "flash",
    title: "Le maréchal-ferrant est passé ce matin",
    time: "09:10",
    author: "Écurie des Tilleuls",
    viewed: false,
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

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    name: "Écurie des Tilleuls",
    role: "Gestionnaire",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "contact",
        kind: "text",
        content:
          "Bonjour, la visite du maréchal-ferrant s'est bien passée. Voici le nouveau rapport vétérinaire à consulter.",
      },
      {
        id: "m2",
        sender: "owner",
        kind: "text",
        content: "Merci, je regarde ça tout de suite. Comment va-t-elle sinon ?",
      },
      {
        id: "m3",
        sender: "contact",
        kind: "file",
        content: "Rapport vétérinaire",
        fileName: "rapport_veterinaire.pdf",
      },
    ],
  },
  {
    id: "c2",
    name: "Dr. Meyer",
    role: "Vétérinaire",
    online: false,
    messages: [
      {
        id: "m4",
        sender: "contact",
        kind: "text",
        content: "Le vaccin est bien noté pour le 12 juillet à 10h.",
      },
    ],
  },
  {
    id: "c3",
    name: "Thomas Lefèvre",
    role: "Maréchal-ferrant",
    online: false,
    messages: [
      {
        id: "m5",
        sender: "contact",
        kind: "text",
        content: "Prochaine ferrure prévue le 18 juillet, je confirme l'heure la veille.",
      },
    ],
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    kind: "reminder",
    title: "Rendez-vous vétérinaire dans 3 jours",
    subtitle: "Visite de contrôle et vaccination · 12 juil., 10:00",
    time: "Aujourd'hui",
  },
  {
    id: "n2",
    kind: "care",
    title: "Pansage complet effectué",
    subtitle: "Par Julien",
    time: "14:10",
  },
  {
    id: "n3",
    kind: "care",
    title: "Sortie au paddock effectuée",
    subtitle: "Par Julien",
    time: "16:45",
  },
  {
    id: "n4",
    kind: "message",
    title: "Nouveau message de l'écurie",
    subtitle: "Rapport vétérinaire partagé",
    time: "Hier",
  },
];
