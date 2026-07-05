import { Listing } from "./types";

export const mockListings: Listing[] = [
  {
    id: "l1",
    title: "Selle Français, 7 ans — dressage & CSO",
    category: "cheval",
    price: "18 500 €",
    location: "Écurie des Tilleuls, Chantilly",
    description:
      "Jument équilibrée et généreuse, évoluant actuellement en Pro Elite. Excellent modèle, aplombs irréprochables, très bon caractère à l'écurie comme au travail. Vaccins et vermifuges à jour, aucun antécédent.",
    photos: [
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1200&auto=format&fit=crop",
    ],
    sellerName: "Camille D.",
    createdAt: "2 juil.",
    status: "active",
  },
  {
    id: "l2",
    title: "Selle mixte cuir — état neuf",
    category: "materiel",
    price: "1 200 €",
    location: "Chantilly",
    description:
      "Selle mixte peu servie, entretien régulier chez un sellier, housse et étrivières incluses.",
    photos: [
      "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1200&auto=format&fit=crop",
    ],
    sellerName: "Écurie des Tilleuls",
    createdAt: "28 juin",
    status: "active",
  },
  {
    id: "l3",
    title: "Poney Welsh, 12 ans — club & loisir",
    category: "poney",
    price: "6 000 €",
    location: "Chantilly",
    description:
      "Poney sage et polyvalent, adapté à un cavalier débutant à confirmé. À jour de vaccins, visite vétérinaire récente disponible sur demande.",
    photos: [
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1200&auto=format&fit=crop",
    ],
    sellerName: "Marie",
    createdAt: "20 juin",
    status: "sold",
  },
];
