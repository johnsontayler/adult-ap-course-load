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
        neon: {
          yellow: "#FFEE58",
          pink: "#FF79C6",
          blue: "#7AD7F0",
        },
        paper: "#FFFEF7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderColor: {
        border: "#e5e7eb", // matches Tailwind's default gray-200 border
      },
    },
  },
  plugins: [],
};
export default config;
