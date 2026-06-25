import {
  Atom,
  BookOpenText,
  Compass,
  FlaskConical,
  Home,
  Info,
  ListChecks,
  MoonStar,
  NotebookPen,
  Orbit,
  Satellite,
  Settings,
  Telescope,
} from "lucide-react";

import type {
  AppRoute,
  Briefing,
  CelestialObject,
  DataStatus,
  Mission,
  Quest,
  SimulationKind,
  SkyEvent,
} from "@/types/domain";

export const routes: AppRoute[] = [
  {
    href: "/command",
    label: "Command",
    shortLabel: "Command",
    description: "Daily briefing, progress, quick launch, and system status.",
    icon: Home,
  },
  {
    href: "/atlas",
    label: "Atlas",
    shortLabel: "Atlas",
    description: "Search and inspect planets, stars, galaxies, and nebulae.",
    icon: Orbit,
  },
  {
    href: "/missions",
    label: "Missions",
    shortLabel: "Missions",
    description: "Explore Indian and global space mission stories.",
    icon: Satellite,
  },
  {
    href: "/lab",
    label: "Lab",
    shortLabel: "Lab",
    description: "Run gravity, orbit, transit, lensing, and stellar simulations.",
    icon: FlaskConical,
  },
  {
    href: "/observatory",
    label: "Observatory",
    shortLabel: "Sky",
    description: "Plan a night sky session with local calculations.",
    icon: Telescope,
  },
  {
    href: "/notebook",
    label: "Notebook",
    shortLabel: "Notes",
    description: "Save research entries and experiment observations.",
    icon: NotebookPen,
  },
  {
    href: "/quests",
    label: "Quests",
    shortLabel: "Quests",
    description: "Complete learning paths and build explorer identity.",
    icon: ListChecks,
  },
  {
    href: "/settings",
    label: "Settings",
    shortLabel: "Settings",
    description: "Profile, location, accessibility, and data transparency.",
    icon: Settings,
  },
  {
    href: "/about",
    label: "About",
    shortLabel: "About",
    description: "AstraSetu philosophy, architecture, and roadmap.",
    icon: Info,
  },
];

export const launchMessages = [
  "Calibrating local observatory shell",
  "Loading verified static reference sets",
  "Preparing educational simulation engines",
  "Opening command rail and discovery notebook",
  "AstraSetu is ready",
];

export const celestialObjects: CelestialObject[] = [
  {
    slug: "jupiter",
    name: "Jupiter",
    type: "Planet",
    distance: "Varies with orbit; roughly 4.2 to 6.2 AU from Earth",
    composition: "Hydrogen and helium gas giant with complex cloud belts",
    visibility: "Often bright in the night sky when well placed",
    magnitude: "Up to about -2.9",
    summary:
      "The largest planet in the Solar System, carrying a miniature system of moons, storms, and magnetic structure.",
    whyItMatters:
      "Jupiter is a gravity laboratory: its moons, resonances, and storms make orbital science feel tangible.",
    relations: ["Io", "Europa", "Ganymede", "Callisto", "Great Red Spot"],
    color: "#FFD166",
    radius: 22,
    status: "Verified static data",
  },
  {
    slug: "moon",
    name: "Moon",
    type: "Moon",
    distance: "Average distance about 384,400 km",
    composition: "Rocky body with maria, highlands, craters, and regolith",
    visibility: "Visible in phase-dependent windows from most locations",
    summary:
      "Earth's natural satellite and humanity's nearest laboratory for surface exploration.",
    whyItMatters:
      "The Moon links naked-eye observation, mission history, geology, tides, and future exploration.",
    relations: ["Chandrayaan-1", "Chandrayaan-3", "Earth"],
    color: "#EAF4FF",
    radius: 15,
    status: "Verified static data",
  },
  {
    slug: "orion-nebula",
    name: "Orion Nebula",
    type: "Nebula",
    distance: "Roughly 1,344 light-years",
    composition: "Star-forming gas and dust region",
    visibility: "A winter sky object in Orion, visible with binoculars under dark skies",
    summary:
      "A nearby stellar nursery where new stars illuminate the surrounding gas.",
    whyItMatters:
      "It lets learners connect telescope observing to the physics of star birth.",
    relations: ["Orion", "Trapezium Cluster", "Betelgeuse"],
    color: "#9D7CFF",
    radius: 18,
    status: "Verified static data",
  },
  {
    slug: "andromeda",
    name: "Andromeda Galaxy",
    type: "Galaxy",
    distance: "About 2.5 million light-years",
    composition: "Spiral galaxy with stars, dust lanes, and satellite galaxies",
    visibility: "Dark-sky naked-eye object in the northern sky",
    summary:
      "The nearest large spiral galaxy to the Milky Way and a deep-time destination for cosmic scale.",
    whyItMatters:
      "Andromeda teaches distance, galaxy structure, and the future interaction with the Milky Way.",
    relations: ["Milky Way", "Triangulum Galaxy", "Local Group"],
    color: "#5BA7FF",
    radius: 24,
    status: "Verified static data",
  },
  {
    slug: "proxima-centauri-b",
    name: "Proxima Centauri b",
    type: "Exoplanet",
    distance: "About 4.2 light-years",
    composition: "Confirmed exoplanet; detailed surface conditions remain uncertain",
    visibility: "Host star is a faint red dwarf not visible to the unaided eye",
    summary:
      "A nearby exoplanet candidate for habitability conversations, orbiting the closest known star to the Sun.",
    whyItMatters:
      "It creates a bridge from transit and radial velocity ideas to the limits of what we actually know.",
    relations: ["Proxima Centauri", "Alpha Centauri", "Exoplanet Transit Lab"],
    color: "#67E8D0",
    radius: 12,
    status: "Verified static data",
  },
  {
    slug: "pleiades",
    name: "Pleiades",
    type: "Cluster",
    distance: "About 444 light-years",
    composition: "Open star cluster with hot blue stars and reflection nebulosity",
    visibility: "Prominent seasonal naked-eye cluster",
    summary:
      "A compact star cluster that rewards binocular viewing and introduces stellar families.",
    whyItMatters:
      "The Pleiades makes open clusters, star color, and stellar youth visible without heavy equipment.",
    relations: ["Taurus", "Reflection Nebula", "Open Cluster"],
    color: "#8FD3FF",
    radius: 16,
    status: "Verified static data",
  },
  {
    slug: "mars",
    name: "Mars",
    type: "Planet",
    distance: "Varies widely; about 54.6 million km at favorable close approach",
    composition: "Rocky planet with iron-rich surface dust, polar caps, valleys, and volcanoes",
    visibility: "Reddish point of light, brightest near opposition",
    summary:
      "A terrestrial planet central to robotic exploration and planetary climate questions.",
    whyItMatters:
      "Mars joins mission design, orbital windows, geology, and astrobiology into one story.",
    relations: ["Mangalyaan", "Mars 2020", "Phobos", "Deimos"],
    color: "#FF7A6B",
    radius: 15,
    status: "Verified static data",
  },
  {
    slug: "sun",
    name: "Sun",
    type: "Star",
    distance: "1 AU from Earth",
    composition: "Hydrogen-helium plasma powered by nuclear fusion",
    visibility: "Daytime object; never observe directly without certified solar protection",
    summary:
      "The star that powers Earth systems and anchors Solar System dynamics.",
    whyItMatters:
      "Solar observation connects energy, space weather, mission safety, and Aditya-L1.",
    relations: ["Aditya-L1", "Solar Wind", "Earth"],
    color: "#FFD166",
    radius: 26,
    status: "Verified static data",
  },
];

export const missions: Mission[] = [
  {
    slug: "chandrayaan-3",
    name: "Chandrayaan-3",
    agency: "ISRO",
    category: ["India", "Moon"],
    launch: "2023-07-14",
    stage: "Lunar surface mission completed; science data released through official channels",
    destination: "Moon south polar region",
    objective:
      "Demonstrate safe soft landing, rover mobility, and in-situ lunar surface science.",
    significance:
      "India became the first nation to land near the lunar south polar region and the fourth to soft-land on the Moon.",
    trajectory: [
      { label: "Launch", progress: 0.08 },
      { label: "Earth-bound orbits", progress: 0.25 },
      { label: "Trans-lunar injection", progress: 0.48 },
      { label: "Lunar orbit", progress: 0.7 },
      { label: "Landing", progress: 0.94 },
    ],
    status: "Verified static data",
  },
  {
    slug: "mangalyaan",
    name: "Mars Orbiter Mission",
    agency: "ISRO",
    category: ["India", "Mars"],
    launch: "2013-11-05",
    stage: "Mission completed",
    destination: "Mars orbit",
    objective:
      "Demonstrate interplanetary mission capability and study Mars from orbit.",
    significance:
      "India reached Mars orbit on its first attempt, a milestone in low-cost interplanetary mission design.",
    trajectory: [
      { label: "Launch", progress: 0.1 },
      { label: "Earth orbit raising", progress: 0.34 },
      { label: "Mars transfer", progress: 0.58 },
      { label: "Mars orbit insertion", progress: 0.9 },
    ],
    status: "Verified static data",
  },
  {
    slug: "aditya-l1",
    name: "Aditya-L1",
    agency: "ISRO",
    category: ["India", "Solar"],
    launch: "2023-09-02",
    stage: "Operational solar observatory at Sun-Earth L1 region",
    destination: "Sun-Earth L1 region",
    objective:
      "Study solar corona, solar wind, flares, and space weather drivers.",
    significance:
      "India's first dedicated solar observatory expands space-weather learning and science operations.",
    trajectory: [
      { label: "Launch", progress: 0.12 },
      { label: "Earth-bound maneuvers", progress: 0.3 },
      { label: "L1 transfer", progress: 0.62 },
      { label: "Halo orbit", progress: 0.88 },
    ],
    status: "Verified static data",
  },
  {
    slug: "gaganyaan",
    name: "Gaganyaan",
    agency: "ISRO",
    category: ["India", "Human Spaceflight"],
    launch: "Planned program; schedule subject to official updates",
    stage: "Development and test campaign",
    destination: "Low Earth orbit",
    objective:
      "Develop Indian human spaceflight capability with crewed orbital missions.",
    significance:
      "The program is a long-term capability bridge for crew safety, training, launch systems, and life support.",
    trajectory: [
      { label: "Abort tests", progress: 0.2 },
      { label: "Uncrewed validation", progress: 0.46 },
      { label: "Crew systems", progress: 0.68 },
      { label: "Crewed orbit", progress: 0.86 },
    ],
    status: "Future live integration",
  },
  {
    slug: "james-webb",
    name: "James Webb Space Telescope",
    agency: "NASA / ESA / CSA",
    category: ["Deep Space", "Observatory"],
    launch: "2021-12-25",
    stage: "Operational infrared observatory",
    destination: "Sun-Earth L2 region",
    objective:
      "Observe early galaxies, star formation, exoplanet atmospheres, and infrared cosmic structure.",
    significance:
      "JWST extends classroom astronomy into current-generation observational astrophysics.",
    trajectory: [
      { label: "Launch", progress: 0.1 },
      { label: "Deployment", progress: 0.32 },
      { label: "L2 insertion", progress: 0.62 },
      { label: "Science operations", progress: 0.96 },
    ],
    status: "Verified static data",
  },
  {
    slug: "voyager-1",
    name: "Voyager 1",
    agency: "NASA",
    category: ["Deep Space"],
    launch: "1977-09-05",
    stage: "Interstellar mission extension",
    destination: "Outer Solar System and interstellar space",
    objective:
      "Conduct flybys of Jupiter and Saturn, then continue heliosphere science.",
    significance:
      "Voyager compresses decades of exploration into a single story about distance, autonomy, and signal delay.",
    trajectory: [
      { label: "Launch", progress: 0.06 },
      { label: "Jupiter", progress: 0.2 },
      { label: "Saturn", progress: 0.36 },
      { label: "Heliopause", progress: 0.76 },
      { label: "Interstellar", progress: 0.94 },
    ],
    status: "Verified static data",
  },
];

export const briefings: Briefing[] = [
  {
    id: "moon-phase",
    title: "Read the Moon like a clock",
    object: "Moon",
    idea: "The illuminated fraction changes because your viewing geometry changes, not because Earth's shadow crosses the Moon except during eclipses.",
    whyItMatters:
      "Moon phase is the fastest way to make orbital geometry visible without equipment.",
    actionLabel: "Open Observatory",
    route: "/observatory",
    status: "Local calculation",
  },
  {
    id: "jupiter-moons",
    title: "Jupiter's moons are a miniature orbit lab",
    object: "Jupiter",
    idea: "The Galilean moons demonstrate resonance, tides, and comparative worlds in one bright target.",
    whyItMatters:
      "A small telescope turns abstract gravity into a visible system that changes night to night.",
    actionLabel: "Inspect Jupiter",
    route: "/atlas?object=jupiter",
    status: "Verified static data",
  },
  {
    id: "transit-depth",
    title: "A planet can dim a star without being seen",
    object: "Exoplanet transit",
    idea: "Transit depth is approximately the square of the planet-to-star radius ratio.",
    whyItMatters:
      "This simple idea powers one of astronomy's most productive exoplanet discovery methods.",
    actionLabel: "Run Transit Lab",
    route: "/lab?sim=transit",
    status: "Educational simulation",
  },
  {
    id: "mission-window",
    title: "Mission timing is a gravity negotiation",
    object: "Mars transfer",
    idea: "Interplanetary missions use launch windows to trade time, fuel, and geometry.",
    whyItMatters:
      "It explains why mission calendars are shaped by orbital mechanics, not convenience.",
    actionLabel: "Open Mission Control",
    route: "/missions?mission=mangalyaan",
    status: "Seeded event data",
  },
];

export const simulationKinds: SimulationKind[] = [
  "Gravity Forge",
  "Orbit Builder",
  "Exoplanet Transit Lab",
  "Gravitational Lens Lab",
  "Stellar Evolution Explorer",
];

export const quests: Quest[] = [
  {
    id: "lunar-observer",
    title: "Lunar Surface Interpreter",
    track: "Observation",
    description:
      "Move from Moon phases to mission geography and finish with a research note.",
    reward: "Crescent Cartographer",
    status: "Demo data",
    steps: [
      {
        id: "moon-atlas",
        title: "Inspect the Moon",
        description: "Open the Moon in the Atlas and mark it discovered.",
        route: "/atlas?object=moon",
      },
      {
        id: "moon-sky",
        title: "Plan a viewing window",
        description: "Use the Observatory to read the current phase.",
        route: "/observatory",
      },
      {
        id: "moon-note",
        title: "Write a research note",
        description: "Save one notebook entry linked to the Moon.",
        route: "/notebook",
      },
    ],
  },
  {
    id: "orbit-engineer",
    title: "Orbit Engineer",
    track: "Simulation",
    description:
      "Tune velocity and distance until you can explain a stable orbit outcome.",
    reward: "Trajectory Builder",
    status: "Educational simulation",
    steps: [
      {
        id: "orbit-builder",
        title: "Run Orbit Builder",
        description: "Classify a stable orbit using the lab controls.",
        route: "/lab?sim=orbit",
      },
      {
        id: "save-experiment",
        title: "Save the experiment",
        description: "Persist a simulation result to your explorer profile.",
        route: "/lab",
      },
      {
        id: "mission-link",
        title: "Connect to a mission",
        description: "Open a mission trajectory and compare the design language.",
        route: "/missions",
      },
    ],
  },
  {
    id: "deep-sky-starter",
    title: "Deep Sky Starter",
    track: "Cosmic Atlas",
    description:
      "Build a small mental map of nebulae, galaxies, and clusters using verified reference entries.",
    reward: "Deep Field Scout",
    status: "Verified static data",
    steps: [
      {
        id: "orion",
        title: "Inspect Orion Nebula",
        description: "Read why stellar nurseries matter.",
        route: "/atlas?object=orion-nebula",
      },
      {
        id: "andromeda",
        title: "Compare Andromeda",
        description: "Switch from nebula scale to galaxy scale.",
        route: "/atlas?object=andromeda",
      },
      {
        id: "pleiades",
        title: "Add a cluster",
        description: "Mark the Pleiades as discovered.",
        route: "/atlas?object=pleiades",
      },
    ],
  },
];

export const skyEvents: SkyEvent[] = [
  {
    id: "moon-phase",
    title: "Moon phase check",
    window: "Tonight",
    description:
      "Use the local calculation panel to compare phase, illumination, and a suggested viewing note.",
    status: "Local calculation",
  },
  {
    id: "jupiter-season",
    title: "Jupiter observing practice",
    window: "Seeded reference",
    description:
      "Visibility changes across the year. This demo item is a planning prompt, not a live ephemeris.",
    status: "Seeded event data",
  },
  {
    id: "meteor-radar-demo",
    title: "Meteor shower radar placeholder",
    window: "Demo mode",
    description:
      "A labelled placeholder for future verified event feeds. It does not claim a current shower is active.",
    status: "Future live integration",
  },
];

export const educationalFacts = [
  "Seeded cosmic fact: A transit light curve estimates planet size from a tiny dip in starlight.",
  "Seeded cosmic fact: Chandrayaan-3 demonstrated safe soft landing and rover mobility on the Moon.",
  "Seeded cosmic fact: The Orion Nebula is a nearby region where stars are forming.",
  "Seeded cosmic fact: The Moon's phase is a viewing-geometry effect, except during eclipses.",
];

export const sourceTransparency: Array<{ label: DataStatus; description: string }> = [
  {
    label: "Verified static data",
    description:
      "Curated reference facts for stable mission, object, and science concepts. Not a live feed.",
  },
  {
    label: "Educational simulation",
    description:
      "Deterministic classroom models designed to make relationships visible, not research-grade predictions.",
  },
  {
    label: "Demo data",
    description:
      "Seeded product content used to demonstrate local-first features and progress systems.",
  },
  {
    label: "Seeded event data",
    description:
      "Illustrative planning prompts. They do not claim to be today's verified sky events.",
  },
  {
    label: "Local calculation",
    description:
      "Browser-side calculations based on date/location inputs. Useful for learning and planning.",
  },
  {
    label: "Future live integration",
    description:
      "Clearly marked areas where verified APIs or database-backed services can be connected later.",
  },
];

export const designConcepts = [
  { label: "Launch", src: "/concepts/01-landing.png" },
  { label: "Command", src: "/concepts/02-command.png" },
  { label: "Atlas + Missions", src: "/concepts/03-atlas-missions.png" },
  { label: "Lab + Observatory", src: "/concepts/04-lab-observatory.png" },
  {
    label: "Notebook + Quests",
    src: "/concepts/05-notebook-quests-settings.png",
  },
];

export const commandHelp = [
  {
    label: "Keyboard",
    value: "Press Ctrl/Cmd + K anywhere to open the command palette.",
    icon: BookOpenText,
  },
  {
    label: "Discovery",
    value: "Mark objects, missions, quests, and simulations to build local progress.",
    icon: Compass,
  },
  {
    label: "Science",
    value: "Every data surface is labelled as static, demo, simulated, local, or future live.",
    icon: Atom,
  },
  {
    label: "Observatory",
    value: "Set location and reduced motion preferences in Settings.",
    icon: MoonStar,
  },
];

export function getDailyIndex(length: number, date = new Date()) {
  const seed = Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
      date.getDate(),
    ).padStart(2, "0")}`,
  );
  return seed % length;
}

export function getDailyBriefing(date = new Date()) {
  return briefings[getDailyIndex(briefings.length, date)];
}

export function getDailyObject(date = new Date()) {
  return celestialObjects[getDailyIndex(celestialObjects.length, date)];
}

export function getFeaturedMission(date = new Date()) {
  return missions[getDailyIndex(missions.length, date)];
}
