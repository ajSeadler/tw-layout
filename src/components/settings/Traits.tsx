import { Sparkles, PawPrint, Smile, Heart, Brain } from "lucide-react";

const traits = [
  { label: "Playful", icon: Sparkles },
  { label: "Loyal", icon: Heart },
  { label: "Curious", icon: Brain },
  { label: "Friendly", icon: Smile },
  { label: "Adventurous", icon: PawPrint },
];

const Traits = () => {
  return (
    <div className="w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/corgi-paw-bg.svg')] bg-repeat" />

      <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--copy-primary))] mb-4 relative z-10">
        Max’s Traits
      </h3>

      <div className="flex flex-wrap gap-3 relative z-10">
        {traits.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-3 py-1.5 text-sm sm:text-base rounded-full bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-medium shadow-sm hover:scale-105 transition-transform"
          >
            <Icon className="w-4 h-4" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Traits;
