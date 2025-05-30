import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Park {
  id: string;
  fullName: string;
  states: string;
  designation: string;
  images: { url: string; altText?: string }[];
}

const curatedParkCodes = [
  "yose",
  "yell",
  "zion",
  "grca",
  "romo",
  "olym",
  "acad",
  "glac",
  "dena",
  "arches",
  "ever",
  "bibe",
  "cuva",
  "shen",
];

const fetchParks = async (): Promise<Park[]> => {
  const apiKey = import.meta.env.VITE_NPS_KEY;
  if (!apiKey) throw new Error("Missing NPS API key");
  const codesParam = curatedParkCodes.join(",");
  const url = `https://developer.nps.gov/api/v1/parks?parkCode=${codesParam}&api_key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch parks");
  const data = await res.json();
  return data.data as Park[];
};

interface PopularParksProps {
  onClose: () => void;
}

const PopularParks: React.FC<PopularParksProps> = ({ onClose }) => {
  const {
    data: parks,
    isLoading,
    error,
  } = useQuery<Park[], Error>({
    queryKey: ["curatedParks"],
    queryFn: fetchParks,
    staleTime: 600000,
  });

  return (
    <div className=" ">
      <h3 className="text-2xl font-semibold mb-6">Popular Parks</h3>

      <div className="space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(var(--cta),0.3)] scrollbar-track-transparent">
        {isLoading && (
          <p className="text-sm italic text-center text-[rgb(var(--copy-secondary))]">
            Loading parks…
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-center text-[rgb(var(--cta))]">
            Error: {error.message}
          </p>
        )}

        {parks?.map((park) => (
          <Link
            key={park.id}
            to={`/park/${park.id}`}
            onClick={onClose}
            className="group flex gap-4 items-center rounded-xl bg-[rgb(var(--background))] border border-[rgba(var(--border),0.12)] px-3 py-3 transition hover:shadow-md hover:shadow-[rgba(var(--cta),0.2)]"
            aria-label={`View details for ${park.fullName}`}
          >
            <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-[rgba(var(--border),0.08)] shadow-sm">
              {park.images?.[0]?.url ? (
                <img
                  src={park.images[0].url}
                  alt={park.images[0].altText || park.fullName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold truncate text-[rgb(var(--copy-primary))]">
                {park.fullName}
              </h4>
              <p
                className="text-xs truncate text-[rgb(var(--copy-secondary))]"
                title={park.states}
              >
                {park.states}
              </p>
              <p
                className="text-[10px] font-medium uppercase tracking-wide text-[rgb(var(--cta))] truncate"
                title={park.designation}
              >
                {park.designation}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularParks;
