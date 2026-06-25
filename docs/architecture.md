# Architecture

AstraSetu is a Next.js App Router application with route features separated from global product systems.

## Layers

- `src/app`: route entry points, metadata, layout, and API route handlers.
- `src/features`: route-specific interactive screens.
- `src/components`: shared navigation, scene, UI, chart, feedback, and shell components.
- `src/data`: curated static data, visual concept references, provider contracts, and static provider implementation.
- `src/lib`: deterministic simulations, sky calculations, search, notebook utilities, quest utilities, and API response helpers.
- `src/store`: local-first persisted Zustand state.

## Provider Strategy

Version one uses `staticDataProvider`. Future providers can implement `AstraDataProvider` for live astronomy data, mission feeds, or database-backed content without forcing route rewrites.

## Persistence

The app uses Zustand `persist` with `localStorage` for demo profile data, notebook entries, saves, quest progress, and settings. The Settings and Notebook routes provide export/reset/import flows to keep the local-only model transparent.

## API Routes

Current API handlers expose local seed data and local calculations:

- `/api/health`
- `/api/briefing`
- `/api/atlas`
- `/api/atlas/[slug]`
- `/api/missions`
- `/api/missions/[slug]`
- `/api/events`
- `/api/quests`
- `/api/sky`

Handlers include typed response helpers and error paths.
