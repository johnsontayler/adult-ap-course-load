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
        report: {
          coral: "#FC7B69",
          yellow: "#EBE553",
          blue: "#72B5EA",
          pink: "#F5A9C1",
          purple: "#C1A1E2",
          orange: "#FFC740",
          dark: "#1a1a1a",
        },
        neon: {
          yellow: "#FFEE58",
          pink: "#FF79C6",
          blue: "#7AD7F0",
        },
        paper: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      borderColor: {
        border: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
export default config;
