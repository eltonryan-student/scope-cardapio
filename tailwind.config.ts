import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          50: "#f7f5fa",
          100: "#efeaf5",
          200: "#dfd5eb",
          300: "#c5b3de",
          500: "#9b7ebb",
          600: "#8462a6",
          700: "#6c4f88",
          900: "#48345c",
        },
      },
    },
  },
  plugins: [],
};
export default config;