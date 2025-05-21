import { useTheme } from "../../hooks/useTheme";
import { PALETTES } from "../../themePalettes";

const Training = () => {
  const { theme } = useTheme();
  const palette = PALETTES[theme];

  return (
    <div className="w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-md p-4 sm:p-6 flex flex-col justify-between">
      <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--copy-primary))] mb-4">
        Training Progress
      </h3>
      <div className="w-full bg-[rgb(var(--border))] rounded-full h-2 sm:h-3 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: `rgb(${palette.cta})`,
            width: "60%",
          }}
        />
      </div>
      <p className="text-[rgb(var(--copy-secondary))] text-sm sm:text-base mb-4">
        Max has mastered 60% of his tricks.
      </p>
      <button className="self-start px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-medium transition">
        Continue Training
      </button>
    </div>
  );
};

export default Training;
