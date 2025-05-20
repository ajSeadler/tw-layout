import React from "react";
import { useNavigate } from "react-router-dom";
import { Map, CalendarCheck, Info } from "lucide-react";

const VisitPromoCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      onClick={() => navigate("/planner")}
      className="relative w-screen h-[500px] mx-auto overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
      aria-label="Plan Your Visit Promotion"
      style={{
        backgroundImage: `url("src/assets/images/j-tree.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--cta),0.15)] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-6 py-24 sm:py-32 text-left text-white">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-8">
          {/* Icon Badge */}
          <div className="bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] p-4 rounded-full shadow-md flex-shrink-0">
            <Map className="w-8 h-8" aria-hidden="true" />
          </div>

          {/* Text */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
              Plan Your National Park Journey
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed drop-shadow-md">
              Explore curated destinations and build your own custom adventure.
              Whether you're dreaming of mountain peaks, desert canyons, or
              coastal trails—start crafting your trip with ease and confidence.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Info
                  className="w-5 h-5 text-[rgb(var(--cta))]"
                  aria-hidden="true"
                />
                Curated suggestions
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck
                  className="w-5 h-5 text-[rgb(var(--cta))]"
                  aria-hidden="true"
                />
                Date‑based itinerary
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/planner");
            }}
            className="inline-flex items-center justify-center px-6 py-3 bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-medium rounded-lg shadow transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <CalendarCheck className="w-5 h-5 mr-2" aria-hidden="true" />
            Plan a Visit
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default VisitPromoCard;
