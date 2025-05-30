import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import type { Park } from "../../types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SearchParks from "../SearchParks";
import RegionalParks from "./RegionalParks";

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

const fetchPopularParks = async (): Promise<Park[]> => {
  const parkCodes = [
    "yell",
    "yose",
    "grca",
    "zion",
    "acad",
    "romo",
    "glac",
    "olym",
    "ever",
  ];
  const responses = await Promise.all(
    parkCodes.map((code) =>
      fetch(
        `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=${API_KEY}`
      ).then((res) => res.json())
    )
  );
  return responses.map((r) => r.data?.[0]).filter(Boolean);
};

const NationalParks: React.FC = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: popularParks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularParks"],
    queryFn: fetchPopularParks,
    staleTime: 1000 * 60 * 60,
  });

  const cardScrollWidth = 296;
  const scrollByCard = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: direction === "next" ? cardScrollWidth : -cardScrollWidth,
      behavior: "smooth",
    });
  };

  const renderParkCard = (park: Park) => (
    <div
      key={park.id}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/park/${park.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/park/${park.id}`);
      }}
      className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer bg-[rgb(var(--card))] shadow transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] hover:scale-[1.03]"
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
        <h3 className="text-md font-bold leading-tight uppercase">
          {park.fullName}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-[rgb(var(--background))]">
      <div className="max-w-7xl mx-auto">
        <SearchParks />

        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-red-600 text-center">
            Failed to load parks. Please try again later.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-[rgb(var(--copy-primary))]">
                Popular Parks
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => scrollByCard("prev")}
                  aria-label="Scroll Left"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => scrollByCard("next")}
                  aria-label="Scroll Right"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
            >
              {popularParks?.map((park) => (
                <div key={park.id} className="snap-start">
                  {renderParkCard(park)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <RegionalParks />
    </div>
  );
};

export default NationalParks;
