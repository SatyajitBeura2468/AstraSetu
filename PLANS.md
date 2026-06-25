# AstraSetu Plans

## Version One Implementation Plan

- [x] Create visual concept set for launch, command, atlas/missions, lab/observatory, and notebook/quests/settings.
- [x] Bootstrap Next.js App Router, TypeScript, Tailwind, testing, CI, and metadata.
- [x] Build global design tokens, navigation, command palette, background scene, data labels, and toasts.
- [x] Create local-first Zustand persistence for profile, discoveries, saves, simulations, quests, notebook, settings, and intro.
- [x] Implement all required routes with working interactions.
- [x] Add provider-ready API routes and static data providers.
- [x] Add tests and documentation.

## Future Feature Roadmap

- Add richer celestial catalogues with verified source citations.
- Add deeper mission pages with phase maps, payloads, and lesson paths.
- Add more simulation presets and shareable saved experiments.
- Add production screenshots and deployment analytics.
- Add offline-first PWA caching after core QA.

## Database Integration Roadmap

1. Introduce authenticated user IDs while preserving anonymous local mode.
2. Add Supabase/PostgreSQL tables for profiles, notes, discoveries, quest progress, saved missions, saved objects, and saved experiments.
3. Implement sync conflict handling for local and cloud state.
4. Keep export/import available for portability.

## Live Astronomy Data Roadmap

1. Add verified providers behind `AstraDataProvider` contracts.
2. Add source citations and freshness timestamps.
3. Cache responses and clearly mark stale data.
4. Keep seeded fallback data available for classrooms and offline demos.

## Authentication Roadmap

- Add optional authentication only after local demo mode remains excellent.
- Keep "no login required" path for students and public demos.
- Avoid fake accounts or mocked social identity.

## Collaboration Roadmap

- Add classroom collections and teacher-created quest packs.
- Add shared notebook exports.
- Add institution dashboards only after core explorer experience remains polished.
