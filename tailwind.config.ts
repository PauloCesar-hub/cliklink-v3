import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#F47B20",
          dark: "#d4650f",
          light: "rgba(244,123,32,0.12)",
        },
        dark: {
          DEFAULT: "#0d0d0d",
          1: "#1a1a1a",
          2: "#222222",
          3: "#2a2a2a",
          4: "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
export default config;
