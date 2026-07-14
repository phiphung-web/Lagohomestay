import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lago: {
          ink: "#17312b",
          forest: "#234f43",
          moss: "#6f8065",
          sand: "#e7d8c0",
          cream: "#f6f1e8",
          clay: "#b86f52",
          mist: "#dce7e0"
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(25, 48, 42, .12)"
      }
    }
  },
  plugins: []
} satisfies Config;
