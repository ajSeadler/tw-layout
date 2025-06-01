import React from "react";
import { CheckCircle } from "lucide-react"; // icon for tips

const quickTips = [
  {
    id: 1,
    title: "Pack Smart",
    description: "Bring layers, water, and sunscreen for a comfortable visit.",
  },
  {
    id: 2,
    title: "Plan Ahead",
    description: "Check park alerts and operating hours before you go.",
  },
  {
    id: 3,
    title: "Leave No Trace",
    description: "Respect nature and carry out all your trash.",
  },
  {
    id: 4,
    title: "Stay on Trails",
    description: "Protect wildlife and plants by sticking to designated paths.",
  },
];

const QuickTips: React.FC = () => {
  return (
    <section aria-label="Quick Tips" className="max-w-full relative pt-5">
      <h2 className="text-2xl font-semibold mb-6">Quick Tips</h2>

      <ul className="flex flex-col gap-5">
        {quickTips.map(({ id, title, description }) => (
          <li
            key={id}
            className="group flex flex-col cursor-default border-l-4 border-[rgba(var(--cta))] pl-4"
            tabIndex={0}
            aria-label={`${title}: ${description}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle
                className="w-4 h-4 text-[rgba(var(--cta))] flex-shrink-0"
                aria-hidden="true"
              />
              <h4
                className="text-sm font-semibold"
                style={{ color: `rgb(var(--copy-primary))` }}
              >
                {title}
              </h4>
            </div>

            <p
              className="text-xs leading-relaxed"
              style={{ color: `rgb(var(--copy-secondary))` }}
            >
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuickTips;
