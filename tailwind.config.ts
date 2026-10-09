import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        brand: {
          green: "#0b5d3b",
          greenDark: "#084a2f",
          greenLight: "#e8f2ec",
          gold: "#d9a404",
          goldLight: "#fbf2d6",
          ink: "#1f2933",
          body: "#3b4752",
          muted: "#6b7280",
          line: "#e5e7eb",
          soft: "#f7f8f7",
          deep: "#0f1e17",
        },
        /* Dark-mode palette — used via `dark:` variants */
        night: {
          bg: "#0b1210",
          surface: "#121d18",
          elevated: "#16231d",
          line: "#1f3029",
          text: "#e6eeea",
          heading: "#ffffff",
          muted: "#8fa39a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.05)",
        card: "0 6px 20px rgba(15,23,42,0.07)",
        hero: "0 20px 45px rgba(15,23,42,0.12)",
      },
      borderRadius: {
        "brand-sm": "8px",
        "brand-md": "12px",
        "brand-lg": "18px",
        "brand-xl": "26px",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(14px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.22s ease forwards",
        slideUp: "slideUp 0.28s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;