// src/components/ThemeToggle.tsx
import { useEffect, useState, type JSX } from "react";
import { Sun, Moon, Palette } from "lucide-react";

type Theme = "light" | "dark" | "red";

const themes: { name: Theme; icon: JSX.Element }[] = [
  { name: "light", icon: <Sun className="w-5 h-5" /> },
  { name: "dark", icon: <Moon className="w-5 h-5" /> },
  { name: "red", icon: <Palette className="w-5 h-5" /> },
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const htmlClass = document.documentElement.classList;
    if (htmlClass.contains("dark")) return "dark";
    if (htmlClass.contains("red")) return "red";
    return "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark", "red");
    html.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex gap-2 bg-card border border-border p-2 rounded-2xl shadow-sm">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          aria-label={`Set ${t.name} theme`}
          className={`p-2 rounded-xl transition-colors ${
            theme === t.name
              ? "bg-cta text-white"
              : "bg-transparent text-copy-secondary hover:bg-border"
          }`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
