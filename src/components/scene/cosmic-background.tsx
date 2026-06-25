"use client";

import { useEffect, useRef } from "react";

import { useAstraStore } from "@/store/astra-store";

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  tone: number;
};

function createStars(count: number, width: number, height: number): Star[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = Math.sin(index * 999) * 10000;
    const rand = seed - Math.floor(seed);
    const seed2 = Math.sin(index * 457) * 10000;
    const rand2 = seed2 - Math.floor(seed2);
    return {
      x: rand * width,
      y: rand2 * height,
      size: 0.5 + ((index * 13) % 17) / 16,
      speed: 0.05 + ((index * 7) % 11) / 120,
      tone: index % 3,
    };
  });
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useAstraStore((state) => state.settings.reducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const cnv = canvas;
    const ctx = context;

    let frame = 0;
    let animationId = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let pointerX = 0;
    let pointerY = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = reducedMotion || prefersReducedMotion;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      cnv.width = width * ratio;
      cnv.height = height * ratio;
      cnv.style.width = `${width}px`;
      cnv.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = createStars(Math.round(Math.min(220, Math.max(110, width / 8))), width, height);
    }

    function drawNebula() {
      const gradient = ctx.createRadialGradient(
        width * 0.78 + pointerX * 12,
        height * 0.18 + pointerY * 10,
        20,
        width * 0.78,
        height * 0.18,
        width * 0.68,
      );
      gradient.addColorStop(0, "rgba(91, 167, 255, 0.18)");
      gradient.addColorStop(0.34, "rgba(157, 124, 255, 0.08)");
      gradient.addColorStop(1, "rgba(5, 7, 20, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(5, 7, 20, 0.84)";
      ctx.fillRect(0, 0, width, height);
      drawNebula();

      for (const star of stars) {
        const drift = still ? 0 : frame * star.speed;
        const x = (star.x + pointerX * 10 + drift) % width;
        const y = (star.y + pointerY * 7 + drift * 0.24) % height;
        const alpha = star.tone === 0 ? 0.74 : star.tone === 1 ? 0.46 : 0.28;
        ctx.fillStyle = `rgba(234, 244, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(91, 167, 255, 0.11)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          width * (0.18 + i * 0.08) + pointerX * 14,
          height * (0.82 - i * 0.05) + pointerY * 8,
          width * (0.48 + i * 0.08),
          height * (0.08 + i * 0.014),
          -0.18 - i * 0.07,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      frame += 1;
      if (!still) animationId = requestAnimationFrame(draw);
    }

    function handlePointer(event: PointerEvent) {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20"
      aria-hidden="true"
    />
  );
}
