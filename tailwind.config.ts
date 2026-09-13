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
        brandNavy: "#0F172A",      // Deep Regal Slate (Slightly darker, more modern navy)
        brandGold: "#C5A059",      // Brushed Champagne Gold (Less harsh, muted luxury finish)
        brandAmber: "#B45309",     // Rich Warm Amber (Subdued, high-contrast CTA tone)
        brandAmberDark: "#78350F", // Deep Espresso Amber (Deeper hover state)
      },
    },
  },
  plugins: [],
};

export default config;