/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from "react";

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

const THEMES: ThemeMode[] = [
  "light",
  "dark",
  "red",
  "darktech",
  "quantum",
  "sunset",
  "forest",
  "ocean",
  "desert",
  "midnight",
];

type ThemeContextType = {
  theme: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // 1) Initialize state from localStorage (or default to 'light')
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light"; // SSR safety
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    return saved && THEMES.includes(saved) ? saved : "light";
  });

  // 2) Sync <html> class & localStorage whenever theme changes
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setMode = (mode: ThemeMode) => {
    if (THEMES.includes(mode)) setTheme(mode);
  };

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setMode, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
