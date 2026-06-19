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
        // Editorial token system — mirror of globals.css :root
        ink:        "var(--ink)",
        surface:    "var(--surface)",
        "surface-2": "var(--surface-2)",
        line:       "var(--line)",
        "line-2":   "var(--line-2)",
        bone:       "var(--bone)",
        "bone-dim": "var(--bone-dim)",
        "bone-faint": "var(--bone-faint)",
        ember:      "var(--ember)",
        danger:     "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans:    ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      maxWidth: {
        wrap: "var(--maxw)",
      },
      transitionTimingFunction: {
        editorial: "var(--ease)",
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
