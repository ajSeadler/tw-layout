import React from "react";
import {
  FaSearchLocation,
  FaCalendarAlt,
  FaClipboardCheck,
} from "react-icons/fa";

const TripPlannerInfograph: React.FC = () => {
  const steps = [
    {
      icon: <FaSearchLocation className="text-3xl text-[rgb(var(--cta))]" />,
      title: "1. Search Parks",
      description:
        "Use the search bar to find national parks by name or state and add them to your itinerary.",
    },
    {
      icon: <FaCalendarAlt className="text-3xl text-[rgb(var(--cta))]" />,
      title: "2. Set Dates",
      description:
        "Choose your arrival and departure dates for each park to create a timeline for your trip.",
    },
    {
      icon: <FaClipboardCheck className="text-3xl text-[rgb(var(--cta))]" />,
      title: "3. Plan & Save",
      description:
        "Reorder parks, remove stops, and save your itinerary for later or start a new plan anytime.",
    },
  ];

  return (
    <section className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How to Use the Trip Planner</h2>
        <p className="text-[rgb(var(--copy-secondary))] mb-12">
          Plan your national park adventure in just a few easy steps.
        </p>
        <div className="grid gap-10 sm:grid-cols-3 text-left">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-[rgb(var(--copy-secondary))]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripPlannerInfograph;
