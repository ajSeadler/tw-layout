// src/components/ThemeSwitcher.tsx
import { useTheme, type ThemeMode } from "../hooks/useTheme";
import { useState, useRef, useEffect } from "react";
import { PALETTES } from "../themePalettes";

const OPTIONS = (Object.keys(PALETTES) as ThemeMode[]).map((name) => ({
  name,
  label: name.charAt(0).toUpperCase() + name.slice(1),
  colors: [
    `rgb(${PALETTES[name].background})`,
    `rgb(${PALETTES[name].card})`,
    `rgb(${PALETTES[name].cta})`,
  ],
}));

export default function ThemeSwitcher() {
  const { theme, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = OPTIONS.find((o) => o.name === theme)!;

  return (
    <div className="relative" ref={ref}>
      {/* Trigger with advanced hover indicator */}
      <div className="group relative">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Select theme"
          className="flex items-center gap-1 p-2 rounded-full bg-[rgb(var(--background))] hover:scale-105 hover:shadow-[0_0_12px_rgba(var(--cta),0.5)] transition-all duration-200 ease-out border border-[rgb(var(--border))] cursor-pointer"
        >
          {current.colors.map((col, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: col }}
            />
          ))}
        </button>

        {/* Tooltip */}
        <div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 text-xs font-medium text-[rgb(var(--copy-primary))] 
             bg-[rgb(var(--card))]/80 backdrop-blur-md border border-[rgb(var(--border))] 
             rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 
             transition-all duration-300 ease-out z-20 pointer-events-none"
        >
          Theme
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute right-0 mt-2 w-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-lg overflow-hidden z-10">
          {OPTIONS.map(({ name, colors }) => (
            <li key={name}>
              <button
                onClick={() => {
                  setMode(name);
                  setOpen(false);
                }}
                className={`
                  flex items-center gap-3 w-full px-4 py-2 text-left
                  ${
                    theme === name
                      ? "bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))]"
                      : "hover:bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))]"
                  }
                `}
              >
                <div className="flex gap-1">
                  {colors.map((col, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>

                {theme === name && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
