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
    <nav
      aria-label="Popular Parks"
      className="flex flex-col bg-[rgba(var(--background))] rounded-xl border border-[rgba(var(--border),0.1)]"
    >
      <h3
        className="font-semibold text-lg mb-4 select-none"
        style={{ color: `rgb(var(--copy-primary))` }}
      >
        Popular Parks
      </h3>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(var(--cta),0.3)] scrollbar-track-transparent">
        {isLoading && (
          <p
            className="text-sm italic text-center"
            style={{ color: `rgb(var(--copy-secondary))` }}
          >
            Loading parks…
          </p>
        )}

        {error && (
          <p
            className="text-sm font-medium text-center"
            style={{ color: `rgb(var(--cta))` }}
          >
            Error: {error.message}
          </p>
        )}

        {parks?.map((park) => (
          <Link
            key={park.id}
            to={`/park/${park.id}`}
            onClick={onClose}
            className="group flex items-center gap-3 mb-2 last:mb-0 rounded-lg border border-[rgba(var(--border),0.15)] bg-[rgba(var(--card))] px-2 py-1.5 transition-shadow duration-200 hover:shadow-md hover:shadow-[rgba(var(--cta),0.25)]"
            aria-label={`View details for ${park.fullName}`}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-[rgba(var(--border),0.1)] shadow-sm">
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

            <div className="flex flex-col overflow-hidden">
              <h4
                className="text-xs font-semibold truncate leading-tight"
                style={{ color: `rgb(var(--copy-primary))` }}
              >
                {park.fullName}
              </h4>
              <p
                className="text-[10px] mt-0.5 truncate leading-none"
                style={{ color: `rgb(var(--copy-secondary))` }}
                title={park.states}
              >
                {park.states}
              </p>
              <p
                className="text-[10px] mt-0.5 font-medium uppercase tracking-wide truncate leading-none"
                style={{ color: `rgb(var(--cta))` }}
                title={park.designation}
              >
                {park.designation}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default PopularParks;
