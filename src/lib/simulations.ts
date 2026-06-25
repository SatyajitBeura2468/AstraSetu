import { clamp } from "@/lib/utils";

export type OrbitClassification =
  | "surface impact"
  | "suborbital arc"
  | "elliptical orbit"
  | "near circular orbit"
  | "escape trajectory";

export type OrbitInput = {
  centralMassEarths: number;
  distanceEarthRadii: number;
  velocityKms: number;
};

export function circularVelocityKms(input: Pick<OrbitInput, "centralMassEarths" | "distanceEarthRadii">) {
  const earthMu = 398600.4418;
  const earthRadiusKm = 6371;
  const mu = earthMu * input.centralMassEarths;
  const radius = Math.max(0.1, input.distanceEarthRadii) * earthRadiusKm;
  return Math.sqrt(mu / radius);
}

export function escapeVelocityKms(input: Pick<OrbitInput, "centralMassEarths" | "distanceEarthRadii">) {
  return circularVelocityKms(input) * Math.SQRT2;
}

export function classifyOrbit(input: OrbitInput): OrbitClassification {
  if (input.distanceEarthRadii < 1.08) return "surface impact";

  const circular = circularVelocityKms(input);
  const escape = escapeVelocityKms(input);
  const ratio = input.velocityKms / circular;

  if (input.velocityKms < circular * 0.62) return "suborbital arc";
  if (input.velocityKms >= escape) return "escape trajectory";
  if (ratio > 0.92 && ratio < 1.08) return "near circular orbit";
  return "elliptical orbit";
}

export function orbitEnergyScore(input: OrbitInput) {
  const circular = circularVelocityKms(input);
  const escape = escapeVelocityKms(input);
  return clamp((input.velocityKms - circular * 0.5) / (escape - circular * 0.5), 0, 1);
}

export function transitDepthPercent(starRadiusSolar: number, planetRadiusEarth: number) {
  const earthToSolarRadius = 0.0091577;
  const ratio = (planetRadiusEarth * earthToSolarRadius) / Math.max(0.1, starRadiusSolar);
  return Math.pow(ratio, 2) * 100;
}

export function generateTransitCurve({
  starRadiusSolar,
  planetRadiusEarth,
  orbitalPeriodDays,
}: {
  starRadiusSolar: number;
  planetRadiusEarth: number;
  orbitalPeriodDays: number;
}) {
  const depth = transitDepthPercent(starRadiusSolar, planetRadiusEarth);
  const duration = clamp(0.16 + starRadiusSolar / Math.max(orbitalPeriodDays, 0.5) / 4, 0.12, 0.34);
  return Array.from({ length: 72 }, (_, index) => {
    const phase = index / 71;
    const center = 0.5;
    const distance = Math.abs(phase - center);
    const ingress = clamp((duration - distance) / duration, 0, 1);
    const smooth = ingress * ingress * (3 - 2 * ingress);
    return {
      phase,
      brightness: 100 - depth * smooth,
    };
  });
}

export function lensAmplification(alignment: number, lensMass: number) {
  const normalizedAlignment = clamp(1 - Math.abs(alignment) / 100, 0, 1);
  return 1 + normalizedAlignment * clamp(lensMass / 12, 0.1, 2.2);
}

export function gravityForceIndex(massA: number, massB: number, separation: number) {
  return (massA * massB) / Math.pow(Math.max(0.1, separation), 2);
}

export function stellarStages(massSolar: number) {
  if (massSolar < 0.5) {
    return ["Protostar", "Red dwarf", "Long main sequence", "Cool remnant"];
  }
  if (massSolar < 8) {
    return ["Protostar", "Main sequence", "Red giant", "Planetary nebula", "White dwarf"];
  }
  return ["Protostar", "Massive main sequence", "Red supergiant", "Supernova", "Neutron star or black hole"];
}

export function stellarLifetimeBillionsYears(massSolar: number) {
  return 10 / Math.pow(Math.max(0.1, massSolar), 2.5);
}
