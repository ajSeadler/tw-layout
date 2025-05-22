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
        background: "rgba(var(--background))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",
        grape: "rgba(var(--grape))",
      },
      keyframes: {
        bar: {
          "0%, 100%": { transform: "scaleY(0.6)", opacity: "0.7" },
          "50%": { transform: "scaleY(1.2)", opacity: "1" },
        },
        fadein: {
          from: { opacity: 0, transform: "translateY(0.2em)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        bar: "bar 1s ease-in-out infinite",
        fadein: "fadein 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
