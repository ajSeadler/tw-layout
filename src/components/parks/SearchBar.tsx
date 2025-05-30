/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { Park } from "../../types";

const API_KEY = import.meta.env.VITE_NPS_KEY;
const API_URL = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${API_KEY}`;

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

type Props = {
  onResults: (results: Park[]) => void;
};

const SearchBar: React.FC<Props> = ({ onResults }) => {
  const [parks, setParks] = useState<Park[]>([]);
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const enriched = (data.data || []).map((p: any) => {
          const codes = p.states.split(",");
          const names = codes.map((c: string) => stateNameMap[c] || c);
          return { ...p, stateNames: names.join(" ") } as Park;
        });
        setParks(enriched);
        onResults(enriched);
      })
      .catch(console.error);
  }, []);

  const fuse = useMemo(() => {
    const base = parks.filter(
      (p) =>
        (!stateFilter || p.states.split(",").includes(stateFilter)) &&
        (!designationFilter || p.designation === designationFilter)
    );
    return new Fuse(base, {
      keys: ["fullName", "description", "designation", "states", "stateNames"],
      threshold: 0.4,
    });
  }, [parks, stateFilter, designationFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = query.trim()
        ? fuse.search(query).map((r) => r.item)
        : fuse.getIndex()
        ? []
        : parks;
      onResults(results);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, fuse]);

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <input
        type="text"
        placeholder="Search parks by name or location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-primary))] placeholder-[rgb(var(--copy-secondary))] focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
