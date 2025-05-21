import { useTheme } from "../../hooks/useTheme";
import { PALETTES } from "../../themePalettes";

const Training = () => {
  const { theme } = useTheme();
  const palette = PALETTES[theme];

  return (
    <section className="h-50 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-xl p-5 sm:p-6 space-y-4 transition hover:shadow-2xl">
      <h3 className="text-lg sm:text-xl font-bold text-[rgb(var(--copy-primary))] tracking-tight">
        Training Progress
      </h3>

      {/* Progress Bar */}
      <div className="w-full rounded-full h-2.5 bg-[rgb(var(--border))] overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            backgroundColor: `rgb(${palette.cta})`,
            width: "60%",
            boxShadow: `0 0 8px rgba(${palette.cta}, 0.6)`,
          }}
        />
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-[rgb(var(--copy-secondary))]">
        Max has mastered{" "}
        <strong className="text-[rgb(var(--copy-primary))]">60%</strong> of his
        tricks.
      </p>

      {/* CTA */}
      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2">
        Continue Training
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default Training;
