# AstraSetu

AstraSetu is India's Interactive Space Science and Mission Exploration Platform. It is a local-first flagship web application for exploring celestial objects, Indian and global missions, educational simulations, night-sky planning, research notes, and learning quests.

## Core Features

- Cinematic launch route with first-visit boot sequence, skip intro, discovery ticker, and persistent intro dismissal.
- Command Deck with daily briefing, featured mission, tonight's sky, simulation dock, daily discovery object, explorer progress, and global command palette.
- Cosmic Atlas with filters, searchable object field, object inspector, discovery/save actions, and relationship mapping.
- Mission Control with category filters, timeline selection, trajectory visuals, URL-backed selected mission state, and saved missions.
- Simulation Lab with five working educational models: Gravity Forge, Orbit Builder, Exoplanet Transit Lab, Gravitational Lens Lab, and Stellar Evolution Explorer.
- Night Observatory with local moon phase calculation, date/time planning, visible-object suggestions, event radar, and observer mode.
- Research Notebook with local create/edit/delete, linked objects, tags, JSON export, and JSON import.
- Learning Quests with constellation-style progress, route-linked checkpoints, local completion, and achievements.
- Settings for profile, observatory location, reduced motion, high contrast, data export, reset, and data transparency.
- API routes for health, briefing, atlas, missions, events, quests, and sky planning.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS with CSS-variable design tokens
- Framer Motion for purposeful motion
- Zustand local persistence
- Zod-ready typed architecture and typed provider contracts
- Lucide React icons
- astronomy-engine for local moon phase calculations
- Vitest and React Testing Library
- GitHub Actions CI

## Project Structure

```text
src/
  app/                 App Router routes and API handlers
  components/          Shared UI, navigation, scene, chart, and feedback systems
  data/                Seed data and provider contracts
  features/            Route-specific product experiences
  lib/                 Simulations, notebook, sky, search, and API helpers
  store/               Local-first Zustand state
  tests/               Vitest coverage
public/
  concepts/            Generated visual direction concepts
docs/                  Architecture, design, data, roadmap, and testing notes
```

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

CI runs install, lint, tests, and production build on pushes and pull requests to `main`.

## Deployment

AstraSetu is Vercel-ready and does not require environment variables for version one.

1. Import the repository into Vercel.
2. Use the default Next.js build settings.
3. Deploy. No secrets are required.

## Data Transparency

AstraSetu v1 does not invent live facts. Data surfaces are labelled as:

- Verified static data
- Educational simulation
- Demo data
- Seeded event data
- Local calculation
- Future live integration

Seeded data demonstrates product behavior. Local calculations are deterministic browser/server calculations. Future verified APIs can be added through the provider layer.

## Current Limitations

- The platform is local-first; profiles and notebooks are not cloud synced.
- Mission and object data are curated static references, not live feeds.
- Observatory event radar includes clearly labelled seeded and future-live entries.
- Simulations are educational models, not mission-grade numerical solvers.

## Future Roadmap

- Verified astronomy and mission data integrations.
- Supabase/PostgreSQL persistence.
- Authentication and cloud-synced explorer profiles.
- AI-guided learning and notebook summaries.
- School or institution dashboards.
- More advanced simulation engines and verified observatory planning.

## Screenshots

Generated concept references live in `public/concepts/`. Add production screenshots here after deployment.

## Contribution Guidance

Preserve AstraSetu's visual quality, data labels, accessibility, and local-first behavior. Do not reduce routes to placeholders or generic dashboards. Run validation before opening changes.
