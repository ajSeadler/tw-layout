import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const RegionalParks: React.FC = () => {
  const [region, setRegion] = useState("West");
  const [parks, setParks] = useState<Park[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 9;

  const navigate = useNavigate();

  useEffect(() => {
    fetchParks(region, 0);
  }, [region]);

  const fetchParks = async (regionKey: string, startIndex: number) => {
    setLoading(true);
    try {
      const states = REGIONS[regionKey].join(",");
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?stateCode=${states}&limit=${limit}&start=${startIndex}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setParks(data.data);
      setStart(startIndex);
    } catch (error) {
      console.error("Failed to fetch regional parks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => fetchParks(region, start + limit);
  const handlePrev = () => fetchParks(region, Math.max(0, start - limit));

  return (
    <section className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] px-6 mb-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Explore by Region</h2>

        {/* Region Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(REGIONS).map((key) => (
            <button
              key={key}
              onClick={() => setRegion(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                region === key
                  ? "bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))]"
                  : "bg-[rgb(var(--card))] text-[rgb(var(--copy-secondary))] border-[rgb(var(--border))]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Park Cards */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {parks.map((park) => (
                <div
                  key={park.id}
                  onClick={() => navigate(`/park/${park.id}`)}
                  className="rounded-2xl overflow-hidden bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow transition hover:shadow-md cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/park/${park.id}`);
                    }
                  }}
                >
                  {park.images[0] && (
                    <img
                      src={park.images[0].url}
                      alt={park.images[0].altText}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">
                      {park.fullName}
                    </h3>
                    <p className="text-sm text-[rgb(var(--copy-secondary))]">
                      {park.description.slice(0, 110)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <button
                disabled={start === 0}
                onClick={handlePrev}
                className="px-4 py-2 rounded-lg bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] hover:bg-[rgb(var(--border))] disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))]"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RegionalParks;
