# Design System

## Visual Direction

AstraSetu uses deep-space luxury, scientific precision, Indian scientific curiosity, and mission-control intelligence. It avoids generic SaaS cards, excessive neon, cartoon rockets, and fake live dashboards.

## Tokens

Design tokens live in `src/app/globals.css`:

- Void Black: `#050714`
- Deep Space: `#0B1022`
- Starlight: `#EAF4FF`
- Orbit Blue: `#5BA7FF`
- Nebula Violet: `#9D7CFF`
- Solar Gold: `#FFD166`
- Aurora Mint: `#67E8D0`
- Mars Coral: `#FF7A6B`

## Components

- `CosmicBackground`: procedural starfield and orbit field.
- `CommandRail` and `MobileNavigation`: route navigation with active state.
- `CommandPalette`: global keyboard navigation and search.
- `HologramPanel`: primary glass mission-control panel.
- `CosmicButton`: consistent button/link primitive.
- `DataStatusIndicator`: source transparency labels.
- `TrajectoryVisual`, `ObjectField`, `TransitChart`, `OrbitPreview`, `SkyDome`: code-native science visuals.

## Motion

Motion is used for launch sequence, command palette, toasts, subtle background drift, and state feedback. Reduced motion disables continuous motion through CSS and store settings.
