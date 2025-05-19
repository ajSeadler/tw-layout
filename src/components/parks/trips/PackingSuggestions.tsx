import React from "react";
import type { ItineraryItem } from "../trips/TripSummary";

type Props = { itinerary: ItineraryItem[] };

const PackingSuggestions: React.FC<Props> = ({ itinerary }) => {
  const suggestions = new Set<string>();

  itinerary.forEach((it) => {
    if (it.weather) {
      if (it.weather.minTemp < 50) suggestions.add("Warm jacket");
      if (it.weather.maxTemp > 85) suggestions.add("Lightweight shorts & tee");
      if (it.weather.description.includes("rain"))
        suggestions.add("Raincoat or poncho");
    }
    suggestions.add("Comfortable hiking shoes");
    suggestions.add("Sunscreen & hat");
    suggestions.add("Reusable water bottle");
  });

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 space-y-3">
      <h2 className="text-xl font-semibold">Packing Suggestions</h2>
      <ul className="list-disc list-inside text-sm">
        {Array.from(suggestions).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default PackingSuggestions;
