# Data Sources

AstraSetu v1 is intentionally transparent about data.

## Labels

- Verified static data: stable curated reference facts.
- Educational simulation: deterministic learning models.
- Demo data: product state and seeded profile behavior.
- Seeded event data: illustrative planning prompts.
- Local calculation: deterministic calculations from date/location inputs.
- Future live integration: places designed for verified APIs later.

## Current Sources

The first version uses curated static seed data in `src/data/astrasetu.ts` and local calculations in `src/lib/sky.ts`. It does not claim real-time mission status, live observatory weather, live sky events, or current launch schedules.

## Future Sources

Future live providers should include source citations, freshness timestamps, cache policy, and fallback behavior. Routes should continue showing source labels even after live data arrives.
