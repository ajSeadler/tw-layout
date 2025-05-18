import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionalParks from "./RegionalParks";

type Park = {
  id: string;
  fullName: string;
  description: string;
  images: { url: string; altText: string }[];
};

const NationalParks: React.FC = () => {
  const [popularParks, setPopularParks] = useState<Park[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";
  const navigate = useNavigate();

  const fetchParks = async (query = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?q=${query}&limit=6&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to fetch parks:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPopular = async () => {
      const codes = ["yell", "yose", "grca", "zion", "acad", "romo"]; // 6 popular parks
      const results = await Promise.all(
        codes.map((code) =>
          fetch(
            `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=${API_KEY}`
          ).then((res) => res.json())
        )
      );
      const parks = results.map((r) => r.data[0]);
      setPopularParks(parks);
    };
    loadPopular();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await fetchParks(searchTerm);
    setSearchResults(results);
  };

  const renderParkCard = (park: Park) => (
    <div
      key={park.id}
      onClick={() => navigate(`/park/${park.id}`)}
      className="cursor-pointer transition hover:shadow-md rounded-2xl p-4 bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-sm"
    >
      {park.images[0] && (
        <img
          src={park.images[0].url}
          alt={park.images[0].altText}
          loading="lazy"
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
      )}
      <h3 className="text-xl font-semibold text-[rgb(var(--copy-primary))] mb-1">
        {park.fullName}
      </h3>
      <p className="text-sm text-[rgb(var(--copy-secondary))]">
        {park.description.slice(0, 120)}...
      </p>
    </div>
  );

  return (
    <>
      <div className="p-6 bg-[rgb(var(--background))]">
        <div className="max-w-5xl w-full mx-auto">
          <h1 className="text-3xl font-bold text-[rgb(var(--copy-primary))] mb-4">
            U.S. National Parks Explorer
          </h1>

          <form
            onSubmit={handleSearch}
            className="mb-6 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="Search parks by name or location"
              className="flex-1 w-full px-4 py-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-primary))] placeholder-[rgb(var(--copy-secondary))] focus:outline-none"
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
            <p className="text-[rgb(var(--copy-secondary))]">
              Loading parks...
            </p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[rgb(var(--copy-primary))] mb-3">
                {searchResults.length > 0 ? "Search Results" : "Popular Parks"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(searchResults.length > 0 ? searchResults : popularParks).map(
                  renderParkCard
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <RegionalParks />
    </>
  );
};

export default NationalParks;
