"use client";

import { useEffect, useRef } from "react";

import { useAstraStore } from "@/store/astra-store";

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  tone: number;
  layer: number;
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
      size: 0.35 + ((index * 13) % 21) / 18,
      speed: 0.025 + ((index * 7) % 13) / 150,
      tone: index % 3,
      layer: index % 5,
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
      stars = createStars(Math.round(Math.min(460, Math.max(180, width / 3.9))), width, height);
    }

    function drawNebula() {
      const blue = ctx.createRadialGradient(
        width * 0.78 + pointerX * 12,
        height * 0.18 + pointerY * 10,
        20,
        width * 0.78,
        height * 0.18,
        width * 0.68,
      );
      blue.addColorStop(0, "rgba(91, 167, 255, 0.24)");
      blue.addColorStop(0.34, "rgba(157, 124, 255, 0.1)");
      blue.addColorStop(1, "rgba(5, 7, 20, 0)");
      ctx.fillStyle = blue;
      ctx.fillRect(0, 0, width, height);

      const mint = ctx.createRadialGradient(
        width * 0.18 - pointerX * 10,
        height * 0.72 - pointerY * 12,
        10,
        width * 0.2,
        height * 0.78,
        width * 0.54,
      );
      mint.addColorStop(0, "rgba(103, 232, 208, 0.1)");
      mint.addColorStop(0.42, "rgba(91, 167, 255, 0.055)");
      mint.addColorStop(1, "rgba(5, 7, 20, 0)");
      ctx.fillStyle = mint;
      ctx.fillRect(0, 0, width, height);
    }

    function drawTelemetryGrid() {
      ctx.save();
      ctx.globalAlpha = 0.36;
      ctx.strokeStyle = "rgba(91, 167, 255, 0.055)";
      ctx.lineWidth = 1;
      const grid = width < 700 ? 58 : 84;
      for (let x = ((frame * 0.08) % grid) - grid; x < width + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x + pointerX * 8, 0);
        ctx.lineTo(x + pointerX * 8, height);
        ctx.stroke();
      }
      for (let y = ((frame * 0.05) % grid) - grid; y < height + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y + pointerY * 8);
        ctx.lineTo(width, y + pointerY * 8);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawConstellationTrace() {
      const nodes = [
        [0.1, 0.28],
        [0.18, 0.22],
        [0.28, 0.32],
        [0.38, 0.2],
        [0.5, 0.34],
        [0.62, 0.27],
      ];
      ctx.save();
      ctx.globalAlpha = width < 700 ? 0.18 : 0.32;
      ctx.strokeStyle = "rgba(168, 182, 216, 0.28)";
      ctx.fillStyle = "rgba(234, 244, 255, 0.86)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      nodes.forEach(([nodeX, nodeY], index) => {
        const x = nodeX * width + pointerX * (8 + index);
        const y = nodeY * height + pointerY * (6 + index);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      nodes.forEach(([nodeX, nodeY], index) => {
        const x = nodeX * width + pointerX * (8 + index);
        const y = nodeY * height + pointerY * (6 + index);
        ctx.beginPath();
        ctx.arc(x, y, index % 2 === 0 ? 1.7 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(3, 6, 18, 0.96)";
      ctx.fillRect(0, 0, width, height);
      drawNebula();
      drawTelemetryGrid();

      for (const star of stars) {
        const drift = still ? 0 : frame * star.speed;
        const depth = 1 + star.layer * 0.22;
        const x = (star.x + pointerX * 18 * depth + drift * depth) % width;
        const y = (star.y + pointerY * 12 * depth + drift * 0.22) % height;
        const twinkle = still ? 1 : 0.74 + Math.sin(frame * 0.018 + star.x) * 0.26;
        const alpha = (star.tone === 0 ? 0.78 : star.tone === 1 ? 0.5 : 0.28) * twinkle;
        const color = star.tone === 0 ? "234, 244, 255" : star.tone === 1 ? "143, 211, 255" : "255, 209, 102";
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size * (0.82 + star.layer * 0.12), 0, Math.PI * 2);
        ctx.fill();
      }

      drawConstellationTrace();

      ctx.strokeStyle = "rgba(91, 167, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          width * (0.18 + i * 0.1) + pointerX * 18,
          height * (0.84 - i * 0.055) + pointerY * 10,
          width * (0.48 + i * 0.12),
          height * (0.075 + i * 0.016),
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
