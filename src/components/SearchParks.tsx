/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

const API_KEY = import.meta.env.VITE_NPS_KEY;
const API_URL = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${API_KEY}`;

// Map state codes to full state names
const stateNameMap: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const stateOptions = [
  "",
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
const designationOptions = [
  "",
  "National Park",
  "National Monument",
  "National Preserve",
  "National Historic Site",
  "National Recreation Area",
];

type Park = {
  id: string;
  fullName: string;
  description: string;
  states: string; // CSV of codes
  designation: string;
  stateNames: string; // full names
};

const SearchParks: React.FC = () => {
  const navigate = useNavigate();
  const [parks, setParks] = useState<Park[]>([]);
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [filteredResults, setFilteredResults] = useState<Park[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Fetch and enrich parks
  useEffect(() => {
    const fetchParks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const enriched = (data.data || []).map((p: any) => {
          const codes = p.states.split(",");
          const names = codes.map((c: string | number) => stateNameMap[c] || c);
          return { ...p, stateNames: names.join(" ") } as Park;
        });
        setParks(enriched);
        setFilteredResults(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParks();
  }, []);

  // Prepare Fuse on filtered base
  const fuse = useMemo(() => {
    const base = parks.filter(
      (p) =>
        (stateFilter ? p.states.split(",").includes(stateFilter) : true) &&
        (designationFilter ? p.designation === designationFilter : true)
    );
    return new Fuse(base, {
      keys: ["fullName", "description", "designation", "states", "stateNames"],
      threshold: 0.4,
    });
  }, [parks, stateFilter, designationFilter]);

  // Debounced search
  useEffect(() => {
    const handle = setTimeout(() => {
      if (!query.trim()) {
        setFilteredResults(
          fuse.getIndex()
            ? []
            : parks.filter(
                (p) =>
                  (stateFilter
                    ? p.states.split(",").includes(stateFilter)
                    : true) &&
                  (designationFilter
                    ? p.designation === designationFilter
                    : true)
              )
        );
      } else {
        setFilteredResults(fuse.search(query).map((r) => r.item));
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [query, fuse, parks, stateFilter, designationFilter]);

  const handleSelect = (id: string) => {
    navigate(`/park/${id}`);
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-[rgb(var(--copy-primary))]">
        Search National Parks
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-[rgba(var(--card))] text-[rgb(var(--copy-primary))] border-[rgba(var(--border))] focus:outline-none"
        >
          {stateOptions.map((s) => (
            <option key={s} value={s}>
              {s ? stateNameMap[s] : "All States"}
            </option>
          ))}
        </select>
        <select
          value={designationFilter}
          onChange={(e) => setDesignationFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-[rgba(var(--card))] text-[rgb(var(--copy-primary))] border-[rgba(var(--border))] focus:outline-none"
        >
          {designationOptions.map((d) => (
            <option key={d} value={d}>
              {d || "All Types"}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder="Type park name, state, or type..."
          className="w-full px-5 py-3 rounded-xl border bg-[rgba(var(--card))] text-[rgb(var(--copy-primary))] border-[rgba(var(--border))] placeholder-[rgb(var(--copy-secondary))] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--cta))] transition"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />

        {/* Dropdown Suggestions */}
        {isFocused && (
          <div className="mt-2 w-full max-h-80 overflow-y-auto rounded-xl bg-[rgba(var(--card))] border border-[rgba(var(--border))] shadow-lg no-scrollbar">
            {isLoading ? (
              <div className="p-4 text-[rgb(var(--copy-secondary))]">
                Loading parks…
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.slice(0, 8).map((park) => (
                <button
                  key={park.id}
                  onClick={() => handleSelect(park.id)}
                  className="w-full text-left px-5 py-3 hover:bg-[rgba(var(--cta)/0.1)] transition"
                >
                  <div className="font-medium text-[rgb(var(--copy-primary))]">
                    {park.fullName}
                  </div>
                  <div className="text-sm text-[rgb(var(--copy-secondary))]">
                    {park.designation} – {park.stateNames}
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-[rgb(var(--copy-secondary))]">
                No parks found matching “{query}”
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchParks;
