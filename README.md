# Kavero — Equestrian Connect (MVP)

Application web hybride pour la gestion d'écurie : dashboard propriétaire premium, dispatch de tâches pour les ouvriers, et messagerie interne.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (à venir pour l'auth, le temps réel et la persistance)

## Démarrer

```bash
npm install
npm run dev
```

L'app démarre sur `http://localhost:3000` et affiche le **Horse Dashboard** (vue propriétaire) avec des données fictives.

## Structure

```
app/                     # Routes Next.js (App Router)
components/
  horse-dashboard/       # Module A — vue propriétaire
    HorseDashboard.tsx
    HorseProfileCard.tsx
    StatusGauge.tsx
    DailyFeed.tsx
    FeedCard.tsx
    ShareStoryButton.tsx
lib/
  types.ts
  mock-data.ts
```

## Prochaines étapes

- Module B — Task Dispatcher (vue ouvrier/gestionnaire)
- Module C — Messagerie Pro
- Intégration Supabase (auth par rôle, realtime, storage média)
- Export réel du visuel "Share to Story" (canvas / html-to-image)
