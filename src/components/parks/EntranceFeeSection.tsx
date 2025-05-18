import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type EntranceFee = {
  cost: string;
  description: string;
  title: string;
};

type EntranceFeesSectionProps = {
  entranceFees: EntranceFee[];
};

const EntranceFeesSection: React.FC<EntranceFeesSectionProps> = ({
  entranceFees,
}) => {
  const [open, setOpen] = useState(false);

  if (entranceFees.length === 0) return null;

  return (
    <section className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-semibold focus:outline-none"
      >
        <span>Entrance Fees</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && (
        <ul className="space-y-2 px-4 pb-4">
          {entranceFees.map((fee, i) => (
            <li
              key={i}
              className="bg-[rgb(var(--background))] p-4 rounded-xl border border-[rgb(var(--border))] shadow-sm"
            >
              <p>
                <strong>{fee.title}:</strong> ${fee.cost}
              </p>
              <p className="text-sm text-[rgb(var(--copy-secondary))]">
                {fee.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default EntranceFeesSection;
