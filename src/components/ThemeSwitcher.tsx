// src/components/ThemeSwitcher.tsx
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ThemeSwitcher() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/settings")}
      aria-label="Open Theme Settings"
      className="
        flex items-center gap-2 p-2 rounded-full
        bg-[rgb(var(--background))]
        border border-[rgb(var(--border))]
        hover:scale-105 hover:shadow-[0_0_12px_rgba(var(--cta),0.5)]
        transition-all duration-200 ease-out
        cursor-pointer
      "
    >
      {/* Mini-preview dots */}
      {/* <span className="w-4 h-4 rounded-full bg-[rgb(var(--background))] border border-gray-300" />
      <span className="w-4 h-4 rounded-full bg-[rgb(var(--card))] border border-gray-300" />
      <span className="w-4 h-4 rounded-full bg-[rgb(var(--cta))] border border-gray-300" /> */}

      <span className="text-sm font-medium text-[rgb(var(--copy-primary))]">
        <Settings />
      </span>
    </button>
  );
}
