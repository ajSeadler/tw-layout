import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import type { Park } from "../../types";

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

const NationalParks: React.FC = () => {
  const [popularParks, setPopularParks] = useState<Park[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 6;

  const navigate = useNavigate();

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://developer.nps.gov/api/v1/parks?q=${query}&limit=50&api_key=${API_KEY}`
      );
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error("Search failed:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularParks = async () => {
    const codes = [
      "yell", // Yellowstone
      "yose", // Yosemite
      "grca", // Grand Canyon
      "zion", // Zion
      "acad", // Acadia
      "romo", // Rocky Mountain
      "glac", // Glacier
      "olym", // Olympic
      "ever", // Everglades
    ];
    const results = await Promise.all(
      codes.map((code) =>
        fetch(
          `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=${API_KEY}`
        ).then((res) => res.json())
      )
    );
    setPopularParks(results.map((r) => r.data[0]));
  };

  useEffect(() => {
    fetchPopularParks();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await fetchSearchResults(searchTerm);
    setSearchResults(results);
    setPage(0); // reset to first page
  };

  const handlePaginate = (direction: "prev" | "next") => {
    setPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, Math.floor(searchResults.length / perPage))
        : Math.max(prev - 1, 0)
    );
  };

  const visibleResults = searchResults.slice(
    page * perPage,
    page * perPage + perPage
  );

  const renderParkCard = (park: Park) => (
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
      className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] hover:scale-[1.03]"
    >
      {park.images[0] && (
        <img
          src={park.images[0].url}
          alt={park.images[0].altText || park.fullName}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-70" />

      <div className="absolute top-5 left-5 right-5 text-white drop-shadow-lg">
        <h3 className="text-lg font-semibold leading-tight">{park.fullName}</h3>
      </div>
    </div>
  );

  return (
    <>
      <div className="p-6 bg-[rgb(var(--background))]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-(var--cta-text) drop-shadow-lg">
            Parks Explorer
          </h2>

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

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[rgb(var(--copy-primary))] mb-3">
                {searchResults.length > 0 ? "Search Results" : "Popular Parks"}
              </h2>

              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2">
                {(searchResults.length > 0 ? visibleResults : popularParks).map(
                  (park) => (
                    <div key={park.id} className="snap-start">
                      {renderParkCard(park)}
                    </div>
                  )
                )}
              </div>

              {/* Pagination */}
              {searchResults.length > perPage && (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => handlePaginate("prev")}
                    disabled={page === 0}
                    className="px-4 py-2 rounded-lg bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] hover:bg-[rgb(var(--border))] disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePaginate("next")}
                    disabled={
                      page >= Math.floor(searchResults.length / perPage)
                    }
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
    </>
  );
};

export default NationalParks;
