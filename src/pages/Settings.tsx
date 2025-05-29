import { useState, useEffect } from "react";
import { useTheme, type ThemeMode } from "../hooks/useTheme";
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

export default function Settings() {
  const { theme, setMode } = useTheme();

  // Location state
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [geoError, setGeoError] = useState<string | null>(null);

  // Try to get saved location from localStorage on mount
  useEffect(() => {
    const savedLat = localStorage.getItem("user-latitude");
    const savedLon = localStorage.getItem("user-longitude");
    if (savedLat && savedLon) {
      setLatitude(savedLat);
      setLongitude(savedLon);
    }
  }, []);

  // Save location to localStorage when updated
  useEffect(() => {
    if (latitude && longitude) {
      localStorage.setItem("user-latitude", latitude);
      localStorage.setItem("user-longitude", longitude);
    }
  }, [latitude, longitude]);

  // Handle geolocation button click
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        setGeoStatus("idle");
      },
      (err) => {
        setGeoError(err.message);
        setGeoStatus("error");
      }
    );
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-1">
          <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-[rgb(var(--copy-secondary))]">
            Customize your appearance and preferences
          </p>
        </header>

        {/* Theme Selector */}
        <section className="rounded-3xl backdrop-blur-md bg-[rgba(var(--card),0.6)] border border-[rgb(var(--border))] p-6 sm:p-10 shadow-xl space-y-6">
          <h2 className="text-xl font-semibold">Appearance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {OPTIONS.map(({ name, label, colors }) => {
              const isActive = name === theme;
              return (
                <button
                  key={name}
                  onClick={() => setMode(name)}
                  disabled={isActive}
                  className={`relative p-4 rounded-3xl border transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                    isActive
                      ? "border-[rgb(var(--cta))] bg-[rgb(var(--cta))/15] pointer-events-none"
                      : "border-transparent hover:shadow-lg hover:bg-[rgba(var(--card),0.35)]"
                  }`}
                  aria-label={label}
                  aria-pressed={isActive}
                >
                  {/* Palette preview pills container */}
                  <div className="flex space-x-2 w-full max-w-[120px] rounded-full overflow-hidden">
                    {colors.map((c, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-6 ${
                          idx === 0
                            ? "rounded-l-full"
                            : idx === colors.length - 1
                            ? "rounded-r-full"
                            : ""
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      isActive
                        ? "text-[rgb(var(--cta))]"
                        : "text-[rgb(var(--copy-primary))]"
                    }`}
                  >
                    {label}
                  </div>

                  {isActive && (
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[rgb(var(--cta))]" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Location Section */}
        <section className="rounded-3xl backdrop-blur-md bg-[rgba(var(--card),0.6)] border border-[rgb(var(--border))] p-6 sm:p-10 shadow-xl space-y-6">
          <h2 className="text-xl font-semibold">Location</h2>
          <p className="text-[rgb(var(--copy-secondary))] text-sm max-w-xl">
            Set your location manually or use your device's location.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Just prevent default, changes auto saved on input blur/change
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl"
          >
            <label className="flex flex-col gap-1 text-sm font-medium text-[rgb(var(--copy-primary))]">
              Latitude
              <input
                type="number"
                step="0.000001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-[rgb(var(--copy-primary))] shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
                placeholder="e.g. 37.7749"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-[rgb(var(--copy-primary))]">
              Longitude
              <input
                type="number"
                step="0.000001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-[rgb(var(--copy-primary))] shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
                placeholder="e.g. -122.4194"
              />
            </label>
          </form>

          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={geoStatus === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--cta))] px-5 py-2 text-white font-semibold shadow-md transition hover:bg-[rgb(var(--cta))/90] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {geoStatus === "loading" ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              "Use Current Location"
            )}
          </button>

          {geoError && (
            <p className="text-sm text-red-500 mt-2 max-w-xl">{geoError}</p>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-[rgb(var(--copy-secondary))] pt-8">
          © {new Date().getFullYear()} YourApp. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
