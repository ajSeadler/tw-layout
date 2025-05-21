// src/themePalettes.ts
export type ThemeMode =
  | "light"
  | "dark"
  | "red"
  | "darktech"
  | "quantum"
  | "sunset"
  | "forest"
  | "ocean"
  | "desert"
  | "midnight";
export const PALETTES: Record<
  ThemeMode,
  {
    // raw RGB triplets (no "rgb(" wrapper) for CSS vars
    background: string;
    border: string;
    card: string;
    cta: string;
  }
> = {
  light: {
    background: "245, 245, 245",
    border: "212, 212, 212",
    card: "255, 255, 255",
    cta: "139, 92, 246",
  },
  dark: {
    background: "0, 0, 0",
    border: "38, 38, 38",
    card: "23, 23, 23",
    cta: "99, 102, 241",
  },
  red: {
    background: "20, 16, 24",
    border: "50, 40, 60", // Soft teal border
    card: "30, 24, 36", // Ivory cards for cleanliness
    cta: "255, 99, 130", // Coral-peach CTA for contrast
  },
  darktech: {
    background: "18, 18, 18",
    border: "48, 48, 48",
    card: "28, 28, 28",
    cta: "144, 238, 144",
  },

  quantum: {
    background: "10, 12, 16",
    border: "36, 42, 58",
    card: "20, 24, 32",
    cta: "0, 220, 220",
  },

  sunset: {
    background: "255, 94, 77",
    border: "255, 150, 120",
    card: "255, 255, 240",
    cta: "255, 165, 0",
  },
  forest: {
    background: "34, 49, 34",
    border: "28, 40, 28",
    card: "46, 65, 46",
    cta: "124, 252, 0",
  },
  ocean: {
    background: "220, 240, 250", // Light seafoam for readability
    border: "0, 105, 148", // Deep ocean blue for accents
    card: "255, 255, 255", // Crisp white card surface
    cta: "0, 150, 199",
  },
  desert: {
    background: "237, 201, 175",
    border: "210, 180, 140",
    card: "250, 240, 220",
    cta: "204, 102, 0",
  },
  midnight: {
    background: "25, 25, 112",
    border: "18, 18, 90",
    card: "40, 40, 120",
    cta: "173, 216, 230",
  },
};
