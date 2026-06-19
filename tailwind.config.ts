import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Zinc monochrome design system
        surface:  "#111111",
        border:   "#27272A",
        "border-hover": "#3F3F46",
        "text-secondary": "#A1A1AA",
        "text-muted":     "#71717A",
        accent:   "#E4E4E7",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      boxShadow: {
        // No glow shadows — depth via borders only
        "card": "none",
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      letterSpacing: {
        tight: "-0.02em",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;