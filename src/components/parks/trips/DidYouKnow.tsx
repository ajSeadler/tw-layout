import React from "react";
import { Lightbulb } from "lucide-react"; // optional icon for flair

const facts = [
  "The tallest tree in the world, Hyperion, is located in Redwood National Park.",
  "Yellowstone was the first National Park established in 1872.",
  "Arches National Park has over 2,000 natural stone arches.",
  "Denali in Alaska is the highest peak in North America.",
  "Acadia is known for having some of the oldest mountains on Earth.",
  "Grand Canyon is over a mile deep and 277 miles long.",
];

const DidYouKnow: React.FC = () => {
  return (
    <section
      aria-label="Did You Know"
      className="bg-[rgba(var(--card))] border border-[rgba(var(--border),0.12)] rounded-xl p-6 max-w-full relative overflow-hidden"
      style={{
        boxShadow: "0 2px 6px rgb(var(--border) / 0.08)",
      }}
    >
      {/* subtle gradient overlay for texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(var(--cta),0.05)] to-transparent rounded-xl"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 flex items-center gap-2 mb-5">
        <Lightbulb className="w-6 h-6 text-[rgba(var(--cta))]" />
        <h3
          className="text-lg font-semibold tracking-wide"
          style={{ color: `rgb(var(--copy-primary))` }}
        >
          Did You Know?
        </h3>
      </div>

      <ul
        className="space-y-3 text-sm leading-snug"
        style={{ color: `rgb(var(--copy-secondary))` }}
      >
        {facts.map((fact, i) => (
          <li
            key={i}
            className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-[rgba(var(--cta))] before:content-[''] transition-transform hover:translate-x-1"
          >
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DidYouKnow;
