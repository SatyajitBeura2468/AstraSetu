"use client";

import { RotateCcw, Save, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { OrbitPreview, TransitChart } from "@/components/charts/simulation-visuals";
import { PageHeader } from "@/components/core/page-header";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { DataStatusIndicator } from "@/components/ui/data-status-indicator";
import { HologramPanel } from "@/components/ui/hologram-panel";
import { simulationKinds } from "@/data/astrasetu";
import {
  classifyOrbit,
  escapeVelocityKms,
  generateTransitCurve,
  gravityForceIndex,
  lensAmplification,
  orbitEnergyScore,
  stellarLifetimeBillionsYears,
  stellarStages,
  transitDepthPercent,
} from "@/lib/simulations";
import { formatNumber } from "@/lib/utils";
import { useAstraStore } from "@/store/astra-store";
import type { SimulationKind } from "@/types/domain";

function resolveInitial(value?: string): SimulationKind {
  const normalized = decodeURIComponent(value ?? "").toLowerCase();
  return (
    simulationKinds.find((kind) => normalized.includes(kind.toLowerCase().split(" ")[0])) ??
    "Orbit Builder"
  );
}

export function SimulationLab({ initialSimulation }: { initialSimulation?: string }) {
  const [active, setActive] = useState<SimulationKind>(resolveInitial(initialSimulation));
  const [mass, setMass] = useState(1);
  const [distance, setDistance] = useState(2.2);
  const [velocity, setVelocity] = useState(5.8);
  const [starRadius, setStarRadius] = useState(1);
  const [planetRadius, setPlanetRadius] = useState(4);
  const [period, setPeriod] = useState(9);
  const [alignment, setAlignment] = useState(18);
  const [lensMass, setLensMass] = useState(8);
  const [stellarMass, setStellarMass] = useState(1.4);
  const [gravityA, setGravityA] = useState(4);
  const [gravityB, setGravityB] = useState(2);
  const [separation, setSeparation] = useState(4);
  const saveSimulation = useAstraStore((state) => state.saveSimulation);

  const orbitInput = { centralMassEarths: mass, distanceEarthRadii: distance, velocityKms: velocity };
  const orbitLabel = classifyOrbit(orbitInput);
  const orbitScore = orbitEnergyScore(orbitInput);
  const transit = useMemo(
    () => generateTransitCurve({ starRadiusSolar: starRadius, planetRadiusEarth: planetRadius, orbitalPeriodDays: period }),
    [period, planetRadius, starRadius],
  );
  const transitDepth = transitDepthPercent(starRadius, planetRadius);
  const lens = lensAmplification(alignment, lensMass);
  const force = gravityForceIndex(gravityA, gravityB, separation);
  const stages = stellarStages(stellarMass);
  const lifetime = stellarLifetimeBillionsYears(stellarMass);

  function resetActive() {
    setMass(1);
    setDistance(2.2);
    setVelocity(5.8);
    setStarRadius(1);
    setPlanetRadius(4);
    setPeriod(9);
    setAlignment(18);
    setLensMass(8);
    setStellarMass(1.4);
    setGravityA(4);
    setGravityB(2);
    setSeparation(4);
  }

  return (
    <div className="route-shell">
      <PageHeader
        title="Simulation Lab"
        description="Hands-on educational simulations for gravity, orbits, exoplanet transits, lensing, and stellar evolution. Every result is deterministic and labelled as a learning model."
        status="Educational simulation"
      >
        <CosmicButton onClick={() => saveSimulation(active)} variant="primary">
          <Save className="h-4 w-4" aria-hidden />
          Save experiment
        </CosmicButton>
      </PageHeader>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {simulationKinds.map((kind) => (
          <button
            key={kind}
            className={`min-h-12 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
              active === kind
                ? "border-aurora/50 bg-aurora text-slate-950"
                : "border-white/10 bg-white/[0.045] text-slate-300 hover:bg-white/10"
            }`}
            type="button"
            onClick={() => setActive(kind)}
          >
            {kind}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_.42fr]">
        <section className="grid gap-5">
          <HologramPanel>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <DataStatusIndicator status="Educational simulation" />
                <h2 className="mt-5 font-display text-4xl font-semibold text-white">{active}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  {active === "Orbit Builder" && "Tune mass, distance, and velocity to classify the trajectory outcome."}
                  {active === "Gravity Forge" && "Compare two-body gravitational strength as masses and separation change."}
                  {active === "Exoplanet Transit Lab" && "Change star and planet radius to see how transit depth changes the light curve."}
                  {active === "Gravitational Lens Lab" && "Move source-lens alignment and mass to see an educational lensing amplification index."}
                  {active === "Stellar Evolution Explorer" && "Adjust stellar mass to see broad lifecycle stage changes and lifetime scaling."}
                </p>
              </div>
              <CosmicButton onClick={resetActive} variant="ghost">
                <RotateCcw className="h-4 w-4" aria-hidden />
                Reset controls
              </CosmicButton>
            </div>

            <div className="mt-6">
              {active === "Orbit Builder" ? (
                <OrbitPreview score={orbitScore} label={orbitLabel} />
              ) : null}
              {active === "Exoplanet Transit Lab" ? (
                <div className="rounded-2xl border border-white/10 bg-[#050714]/80 p-5">
                  <TransitChart points={transit} />
                </div>
              ) : null}
              {active === "Gravity Forge" ? (
                <div className="relative grid min-h-72 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[#050714]/80">
                  <div className="absolute h-64 w-64 rounded-full border border-orbit/20" />
                  <div className="absolute left-[24%] top-[42%] h-20 w-20 rounded-full bg-solar shadow-[0_0_48px_rgba(255,209,102,.32)]" />
                  <div className="absolute right-[24%] top-[34%] h-14 w-14 rounded-full bg-aurora shadow-[0_0_48px_rgba(103,232,208,.32)]" />
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Force index</p>
                    <p className="mt-2 font-display text-4xl font-semibold text-white">{formatNumber(force, 2)}</p>
                  </div>
                </div>
              ) : null}
              {active === "Gravitational Lens Lab" ? (
                <div className="relative grid min-h-72 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[#050714]/80">
                  <div className="absolute h-36 w-36 rounded-full border border-solar/20 bg-solar/10" />
                  <div
                    className="absolute h-52 w-52 rounded-full border border-aurora/40"
                    style={{ transform: `scale(${lens / 1.8})`, boxShadow: "0 0 70px rgba(103,232,208,.18)" }}
                  />
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Amplification</p>
                    <p className="mt-2 font-display text-4xl font-semibold text-white">{formatNumber(lens, 2)}x</p>
                  </div>
                </div>
              ) : null}
              {active === "Stellar Evolution Explorer" ? (
                <div className="rounded-2xl border border-white/10 bg-[#050714]/80 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Estimated lifetime</p>
                      <p className="mt-2 font-display text-4xl font-semibold text-white">
                        {lifetime > 100 ? ">100" : formatNumber(lifetime, 1)} billion years
                      </p>
                    </div>
                    <div className="h-24 w-24 rounded-full bg-solar shadow-[0_0_64px_rgba(255,209,102,.3)]" style={{ transform: `scale(${Math.min(1.8, 0.7 + stellarMass / 9)})` }} />
                  </div>
                  <div className="mt-7 grid gap-3 md:grid-cols-5">
                    {stages.map((stage, index) => (
                      <div key={stage} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Stage {index + 1}</p>
                        <p className="mt-2 text-sm font-semibold text-starlight">{stage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </HologramPanel>
        </section>

        <aside className="grid gap-5">
          <HologramPanel>
            <h2 className="font-display text-2xl font-semibold text-white">Parameter controls</h2>
            <div className="mt-5 grid gap-5">
              {active === "Orbit Builder" ? (
                <>
                  <Range label="Central mass" value={mass} min={0.5} max={6} step={0.1} unit="Earth masses" onChange={setMass} />
                  <Range label="Distance" value={distance} min={1} max={9} step={0.1} unit="Earth radii" onChange={setDistance} />
                  <Range label="Velocity" value={velocity} min={1} max={17} step={0.1} unit="km/s" onChange={setVelocity} />
                  <p className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-slate-300">
                    Escape velocity here is {formatNumber(escapeVelocityKms(orbitInput), 2)} km/s.
                  </p>
                </>
              ) : null}
              {active === "Gravity Forge" ? (
                <>
                  <Range label="Mass A" value={gravityA} min={0.5} max={12} step={0.1} unit="units" onChange={setGravityA} />
                  <Range label="Mass B" value={gravityB} min={0.5} max={12} step={0.1} unit="units" onChange={setGravityB} />
                  <Range label="Separation" value={separation} min={0.8} max={12} step={0.1} unit="units" onChange={setSeparation} />
                </>
              ) : null}
              {active === "Exoplanet Transit Lab" ? (
                <>
                  <Range label="Star radius" value={starRadius} min={0.3} max={2.2} step={0.05} unit="solar radii" onChange={setStarRadius} />
                  <Range label="Planet radius" value={planetRadius} min={0.5} max={14} step={0.1} unit="Earth radii" onChange={setPlanetRadius} />
                  <Range label="Orbital period" value={period} min={1} max={40} step={0.5} unit="days" onChange={setPeriod} />
                  <p className="rounded-2xl border border-aurora/20 bg-aurora/10 p-4 text-sm text-starlight">
                    Transit depth: {formatNumber(transitDepth, 3)}%
                  </p>
                </>
              ) : null}
              {active === "Gravitational Lens Lab" ? (
                <>
                  <Range label="Alignment" value={alignment} min={0} max={100} step={1} unit="offset" onChange={setAlignment} />
                  <Range label="Lens mass" value={lensMass} min={1} max={22} step={0.5} unit="relative" onChange={setLensMass} />
                </>
              ) : null}
              {active === "Stellar Evolution Explorer" ? (
                <Range label="Star mass" value={stellarMass} min={0.2} max={18} step={0.1} unit="solar masses" onChange={setStellarMass} />
              ) : null}
            </div>
          </HologramPanel>

          <HologramPanel>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 text-solar" aria-hidden />
              <div>
                <h2 className="font-display text-xl font-semibold text-white">Simulation standard</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  These are educational models. They reveal relationships and classify outcomes without pretending to be mission-grade numerical solvers.
                </p>
              </div>
            </div>
          </HologramPanel>
        </aside>
      </div>
    </div>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="control-label">
        <span>{label}</span>
        <span>
          {formatNumber(value, 2)} {unit}
        </span>
      </span>
      <input
        className="range-control mt-3"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
