import React from "react";
import { MapPin, Calendar, ClipboardCheck } from "lucide-react";

const TripPlannerInfograph: React.FC = () => {
  const steps = [
    {
      icon: (
        <MapPin
          className="w-12 h-12 text-[rgb(var(--cta))]"
          aria-hidden="true"
        />
      ),
      title: "Search Parks",
      description:
        "Quickly find parks by name, state, or special features, then add them to your itinerary with a tap.",
    },
    {
      icon: (
        <Calendar
          className="w-12 h-12 text-[rgb(var(--cta))]"
          aria-hidden="true"
        />
      ),
      title: "Set Dates",
      description:
        "Pick arrival & departure days for each park to build out your day‑by‑day journey.",
    },
    {
      icon: (
        <ClipboardCheck
          className="w-12 h-12 text-[rgb(var(--cta))]"
          aria-hidden="true"
        />
      ),
      title: "Plan & Save",
      description:
        "Reorder stops, remove parks, and save your custom plan so you can revisit it anytime.",
    },
  ];

  return (
    <section className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-semibold tracking-tight leading-tight">
          Plan Your Trip in 3 Easy Steps
        </h2>
        <p className="mt-4 text-lg text-[rgb(var(--copy-secondary))] max-w-3xl mx-auto">
          A sleek, modern workflow to design your perfect national park
          adventure.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-y-16 gap-x-16">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center max-w-xs mx-auto"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[rgb(var(--cta))] text-white font-bold text-lg select-none">
              {idx + 1}
            </div>
            <div className="mb-6">{step.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
            <p className="text-[rgb(var(--copy-secondary))] leading-relaxed text-base">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TripPlannerInfograph;
