import React from "react";
import type { ItineraryItem } from "../trips/TripSummary";
import { CheckCircle } from "lucide-react";

type Props = {
  itinerary: ItineraryItem[];
};

const PackingSuggestions: React.FC<Props> = ({ itinerary }) => {
  const suggestions = new Set<string>();

  itinerary.forEach((it) => {
    if (it.weather) {
      if (it.weather.minTemp < 50) suggestions.add("Warm jacket");
      if (it.weather.maxTemp > 85) suggestions.add("Lightweight shorts & tee");
      if (it.weather.description.toLowerCase().includes("rain"))
        suggestions.add("Raincoat or poncho");
    }
    suggestions.add("Comfortable hiking shoes");
    suggestions.add("Sunscreen & hat");
    suggestions.add("Reusable water bottle");
  });

  return (
    <section className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 text-[rgb(var(--copy-primary))]">
      <header className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Packing Suggestions
        </h2>
      </header>

      <ul className="space-y-4 text-sm md:text-base">
        {Array.from(suggestions).map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-[rgb(var(--cta))] mt-0.5 flex-shrink-0" />
            <span className="text-[rgb(var(--copy-secondary))] leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PackingSuggestions;
