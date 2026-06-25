"use client";

import type { CelestialObject } from "@/types/domain";
import { cn } from "@/lib/utils";

export function ObjectField({
  objects,
  selectedSlug,
  onSelect,
}: {
  objects: CelestialObject[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="relative min-h-[25rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050714]/78">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(91,167,255,0.18),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(157,124,255,0.12),transparent_28%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 900 520" aria-hidden>
        <path d="M85 355 C 230 115, 420 100, 812 180" fill="none" stroke="rgba(91,167,255,.18)" strokeWidth="1.4" />
        <path d="M130 130 C 318 320, 510 372, 760 286" fill="none" stroke="rgba(103,232,208,.14)" strokeWidth="1.2" />
        <path d="M250 450 C 356 220, 580 136, 820 70" fill="none" stroke="rgba(255,209,102,.13)" strokeWidth="1.2" />
      </svg>
      <div className="relative h-[25rem]">
        {objects.map((object, index) => {
          const left = 10 + ((index * 19) % 76);
          const top = 12 + ((index * 31) % 70);
          const selected = object.slug === selectedSlug;
          return (
            <button
              key={object.slug}
              className={cn(
                "star-map-node absolute rounded-full border transition duration-200",
                selected
                  ? "z-20 scale-110 border-solar bg-solar/25"
                  : "border-white/20 bg-white/10 hover:border-aurora hover:bg-aurora/12",
              )}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${object.radius * 2.4}px`,
                height: `${object.radius * 2.4}px`,
                boxShadow: `0 0 ${object.radius * 1.5}px ${object.color}55`,
              }}
              type="button"
              onClick={() => onSelect(object.slug)}
              aria-label={`Select ${object.name}`}
            >
              <span
                className="absolute inset-[18%] rounded-full"
                style={{ background: object.color }}
                aria-hidden
              />
              <span className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 rounded-full bg-black/45 px-2 py-1 text-[0.65rem] font-semibold text-white">
                {object.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
