import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        deep: "var(--deep-space)",
        starlight: "var(--starlight)",
        orbit: "var(--orbit-blue)",
        nebula: "var(--nebula-violet)",
        solar: "var(--solar-gold)",
        aurora: "var(--aurora-mint)",
        mars: "var(--mars-coral)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        astro: "0 24px 90px rgba(4, 9, 28, 0.48)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      backgroundImage: {
        "radial-stars":
          "radial-gradient(circle at 20% 20%, rgba(91,167,255,0.18), transparent 28%), radial-gradient(circle at 82% 15%, rgba(157,124,255,0.16), transparent 24%), radial-gradient(circle at 50% 92%, rgba(103,232,208,0.12), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
