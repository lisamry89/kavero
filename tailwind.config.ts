import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        kavero: {
          bg: "#0A0A0C",
          surface: "#141416",
          surfaceLight: "#1C1C1F",
          border: "#26262A",
          accent: "#7CFFB2",
          accentSoft: "#2ECC71",
          amber: "#FFB454",
          indigo: "#8B8CF9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        premium: "0 8px 40px -12px rgba(0,0,0,0.6)",
        glow: "0 0 40px -10px rgba(124,255,178,0.35)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
