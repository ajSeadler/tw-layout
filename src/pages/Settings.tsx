import { useMemo } from "react";
import { useTheme, type ThemeMode } from "../hooks/useTheme";
import { PALETTES } from "../themePalettes";
import BackButton from "../components/test/BackButton";

import WildlifeSpotlight from "../components/settings/WildlifeSpotlight";
import BisonHabitat from "../components/settings/BisonHabitat";
import BisonPhysicalCard from "../components/settings/BisonPhysicalCard";
import BisonConservationStatus from "../components/settings/BisonConservationStatus";

const OPTIONS = (Object.keys(PALETTES) as ThemeMode[]).map((name) => ({
  name,
  label: name.charAt(0).toUpperCase() + name.slice(1),
  colors: [
    `rgb(${PALETTES[name].background})`,
    `rgb(${PALETTES[name].card})`,
    `rgb(${PALETTES[name].cta})`,
  ],
}));

export default function Settings() {
  const { theme, setMode } = useTheme();
  const current = useMemo(
    () => OPTIONS.find((o) => o.name === theme)!,
    [theme]
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))]">
      {/* Mobile Palette Selector at Top */}
      <div className="lg:hidden p-4 sm:p-6">
        <h2 className="text-xl font-bold mb-3">Select a Theme</h2>
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(({ name, label, colors }) => {
            const isActive = name === theme;
            return (
              <button
                key={name}
                onClick={() => setMode(name)}
                disabled={isActive}
                aria-label={label}
                className={`w-full flex flex-col items-center p-3 rounded-lg transition-all ${
                  isActive
                    ? "border-2 border-[rgb(var(--cta))] bg-[rgb(var(--cta))/10] pointer-events-none"
                    : "hover:shadow-md hover:bg-[rgb(var(--card))]/50"
                }`}
              >
                <div className="flex w-full h-3 rounded-full overflow-hidden mb-2">
                  {colors.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex-1"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {isActive ? "Selected" : "Apply"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Palette Selector (desktop only) */}
      <aside className="hidden lg:flex flex-col w-72 bg-[rgba(var(--card),0.6)] backdrop-blur-md border-r border-[rgb(var(--border))] p-4 sm:p-6 lg:p-8 space-y-4">
        <h2 className="text-2xl font-bold">Palettes</h2>
        <nav className="flex-1 overflow-y-auto space-y-2">
          {OPTIONS.map(({ name, label, colors }) => {
            const isActive = name === theme;
            return (
              <button
                key={name}
                onClick={() => setMode(name)}
                disabled={isActive}
                aria-label={label}
                className={`w-full flex items-center gap-3 p-2 sm:p-3 rounded-lg transition-all ${
                  isActive
                    ? "border-2 border-[rgb(var(--cta))] bg-[rgb(var(--cta))/10] pointer-events-none"
                    : "hover:shadow-lg hover:bg-[rgb(var(--card))]/50"
                }`}
              >
                <div className="flex-1 flex h-3 sm:h-4 rounded-full overflow-hidden">
                  {colors.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex-1"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="sr-only">{label}</span>
                {isActive && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[rgb(var(--cta))]"
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
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="relative bg-[rgb(var(--card))] rounded-2xl shadow-xl p-4 sm:p-6 lg:p-10 overflow-hidden">
            <div className="absolute inset-2 sm:inset-4 border border-[rgb(var(--border))] rounded-2xl pointer-events-none" />

            <div className="relative z-10 w-full">
              <div className="flex justify-between items-center flex-row mb-6">
                <h2 className="inline-block text-xs md:text-sm font-semibold px-2 py-1 rounded-full border border-[rgb(var(--cta))] bg-[rgb(var(--cta))/10] text-[rgb(var(--cta))]">
                  {current.label}
                </h2>
                <p className="text-lg font-semibold text-[rgb(var(--cta))]">
                  Theme example
                </p>
                <BackButton />
              </div>

              {/* Components Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <WildlifeSpotlight />
                <BisonHabitat />
                <BisonPhysicalCard />
                <BisonConservationStatus />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
