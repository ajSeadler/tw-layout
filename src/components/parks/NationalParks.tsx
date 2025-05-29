import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import type { Park } from "../../types";
import { ArrowLeft, ArrowRight } from "lucide-react";

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";
const perPage = 6;

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

const fetchSearchResults = async (query: string): Promise<Park[]> => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?q=${trimmed}&limit=50&api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.data || [];
};

const NationalParks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const {
    data: popularParks,
    isLoading: loadingPopular,
    isError: errorPopular,
  } = useQuery({
    queryKey: ["popularParks"],
    queryFn: fetchPopularParks,
    staleTime: 1000 * 60 * 60,
  });

  const {
    data: searchResults,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useQuery({
    queryKey: ["searchResults", submittedTerm],
    queryFn: () => fetchSearchResults(submittedTerm),
    enabled: submittedTerm.trim().length > 0,
    staleTime: 1000 * 60 * 10,
  });

  const isLoading = loadingPopular || (submittedTerm && loadingSearch);
  const hasSearchResults = submittedTerm && searchResults?.length;

  const parksToShow = useMemo(() => {
    if (hasSearchResults) {
      const start = page * perPage;
      return searchResults!.slice(start, start + perPage);
    }
    return popularParks || [];
  }, [searchResults, popularParks, page, hasSearchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedTerm(searchTerm);
    setPage(0);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Approximate card width + gap in px (280 + 16 gap + some buffer)
  const cardScrollWidth = 296;

  const scrollByCard = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount =
      direction === "next" ? cardScrollWidth : -cardScrollWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
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
      className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer  bg-[rgb(var(--card))] shadow transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] hover:scale-[1.03]"
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
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Search parks by name or location"
            className="flex-1 px-4 py-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-primary))] placeholder-[rgb(var(--copy-secondary))] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold w-full sm:w-auto"
          >
            Search
          </button>
        </form>

        {isLoading ? (
          <LoadingSpinner />
        ) : errorPopular || errorSearch ? (
          <div className="text-red-600 text-center">
            Failed to load parks. Please try again later.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-[rgb(var(--copy-primary))]">
                {hasSearchResults ? "Search Results" : "Popular Parks"}
              </h2>

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

            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
            >
              {parksToShow.map((park) => (
                <div key={park.id} className="snap-start">
                  {renderParkCard(park)}
                </div>
              ))}
            </div>

            {hasSearchResults && searchResults!.length > perPage && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-lg bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] hover:bg-[rgb(var(--border))] disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPage((p) =>
                      Math.min(
                        p + 1,
                        Math.floor(searchResults!.length / perPage)
                      )
                    )
                  }
                  disabled={page >= Math.floor(searchResults!.length / perPage)}
                  className="px-4 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))]"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NationalParks;
