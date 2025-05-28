import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react"; // make sure lucide-react is installed
import LoadingSpinner from "../LoadingSpinner";
import type { Park } from "../../types";

const REGIONS: { [key: string]: string[] } = {
  West: ["CA", "WA", "OR", "NV", "ID"],
  Southwest: ["AZ", "NM", "TX", "UT"],
  Midwest: [
    "ND",
    "SD",
    "NE",
    "KS",
    "MN",
    "IA",
    "MO",
    "WI",
    "IL",
    "IN",
    "OH",
    "MI",
  ],
  South: ["FL", "GA", "AL", "SC", "NC", "KY", "TN", "LA", "MS", "AR", "OK"],
  Northeast: ["NY", "NJ", "PA", "MA", "ME", "VT", "NH", "RI", "CT", "DE", "MD"],
};

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";
const limit = 9;

const fetchRegionParks = async (regionKey: string): Promise<Park[]> => {
  const states = REGIONS[regionKey].join(",");
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${states}&limit=${limit}&api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.data || [];
};

const RegionalParks: React.FC = () => {
  const [region, setRegion] = useState("West");
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: parks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["regionParks", region],
    queryFn: () => fetchRegionParks(region),
    staleTime: 1000 * 60 * 10,
  });

  // Card width + gap must match CSS for scroll amount
  const cardWidth = 320; // md:w-[320px]
  const cardGap = 16; // gap-4 = 1rem = 16px

  const scrollByCard = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const scrollAmount = cardWidth + cardGap;
    scrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] px-6 mb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header + arrows */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Explore by Region</h2>

          <div className="flex gap-2">
            <button
              onClick={() => scrollByCard("prev")}
              aria-label="Scroll Left"
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-white shadow-md
                hover:bg-gray-100
                active:bg-gray-200
                transition-colors duration-200
                text-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-400
              "
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scrollByCard("next")}
              aria-label="Scroll Right"
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-white shadow-md
                hover:bg-gray-100
                active:bg-gray-200
                transition-colors duration-200
                text-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-400
              "
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.keys(REGIONS).map((key) => (
            <button
              key={key}
              onClick={() => setRegion(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  region === key
                    ? "bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] border-transparent ring-offset-[rgb(var(--card))]"
                    : "bg-[rgb(var(--card))] text-[rgb(var(--copy-secondary))] border-[rgb(var(--border))] hover:shadow-md hover:bg-[rgb(var(--card-hover))]"
                }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Park Cards */}
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-red-600 text-center">
            Failed to load parks. Please try again later.
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2 mb-6"
          >
            {parks.map((park) => (
              <div
                key={park.id}
                onClick={() => navigate(`/park/${park.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/park/${park.id}`);
                  }
                }}
                className="snap-start relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] hover:scale-[1.03] flex-shrink-0"
              >
                {park.images?.[0] && (
                  <img
                    src={park.images[0].url}
                    alt={park.images[0].altText || park.fullName}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-70" />

                <div className="absolute top-5 left-5 right-5 text-white drop-shadow-lg">
                  <h3 className="text-md font-semibold leading-tight uppercase">
                    {park.fullName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionalParks;
