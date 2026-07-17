import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
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
        sans: ["Be Vietnam Pro", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
        display: ["Lora", "Georgia", "serif"]
      },
      // The visual system uses fine alpha steps for editorial hierarchy.
      // Register them once so utilities such as text-white/52,
      // border-white/12 and opacity-58 are emitted in production CSS.
      opacity: {
        8: ".08",
        12: ".12",
        14: ".14",
        15: ".15",
        16: ".16",
        18: ".18",
        28: ".28",
        32: ".32",
        35: ".35",
        38: ".38",
        42: ".42",
        44: ".44",
        45: ".45",
        48: ".48",
        52: ".52",
        55: ".55",
        58: ".58",
        62: ".62",
        65: ".65",
        68: ".68",
        72: ".72",
        78: ".78",
        85: ".85",
        88: ".88",
        92: ".92",
        94: ".94",
        96: ".96"
      },
      spacing: {
        13: "3.25rem"
      },
      boxShadow: {
        soft: "0 24px 60px rgba(25, 48, 42, .12)"
      }
    }
  },
  plugins: []
} satisfies Config;
