import { FeedItem, Horse } from "./types";

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
    type: "turnout",
    title: "Sortie au paddock",
    subtitle: "Balade libre au soleil, très joueur aujourd'hui",
    time: "16:45",
    author: "Julien (palefrenier)",
    durationLabel: "2h00",
    mediaUrl:
      "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "f2",
    type: "grooming",
    title: "Pansage complet",
    subtitle: "Robe brossée, sabots curés et graissés",
    time: "14:10",
    author: "Marie (palefrenier)",
  },
  {
    id: "f3",
    type: "feeding",
    title: "Ration du midi validée",
    subtitle: "Granulés + foin, appétit excellent",
    time: "12:00",
    author: "Julien (palefrenier)",
  },
  {
    id: "f4",
    type: "bedding",
    title: "Litière refaite",
    subtitle: "Box paillé, propre et sec",
    time: "08:15",
    author: "Marie (palefrenier)",
  },
  {
    id: "f5",
    type: "feeding",
    title: "Ration du matin validée",
    subtitle: "07:30 précises, comme d'habitude",
    time: "07:30",
    author: "Julien (palefrenier)",
  },
];
