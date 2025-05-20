import React from "react";
import { MapPin, Calendar, ClipboardCheck } from "lucide-react";

const TripPlannerInfograph: React.FC = () => {
  const steps = [
    {
      icon: (
        <MapPin
          className="w-10 h-10 text-[rgb(var(--cta))]"
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
          className="w-10 h-10 text-[rgb(var(--cta))]"
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
          className="w-10 h-10 text-[rgb(var(--cta))]"
          aria-hidden="true"
        />
      ),
      title: "Plan & Save",
      description:
        "Reorder stops, remove parks, and save your custom plan so you can revisit it anytime.",
    },
  ];

  return (
    <section className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Plan Your Trip in 3 Easy Steps
        </h2>
        <p className="mt-3 text-lg text-[rgb(var(--copy-secondary))]">
          A sleek, modern workflow to design your perfect national park
          adventure.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-8 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-5 bg-[rgb(var(--cta))]/10 rounded-full">
              {step.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3">
              <span className="text-[rgb(var(--cta))] mr-2">{idx + 1}.</span>
              {step.title}
            </h3>
            <p className="text-[rgb(var(--copy-secondary))] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TripPlannerInfograph;
