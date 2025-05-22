/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { fetchWeather } from "../../../utils/fetchWeather";

import TripMetaSummary from "./TripMetaSummary";
import ParkCardDetails from "./ParkCardDetails";
import PackingSuggestions from "./PackingSuggestions";
import LoadingSpinner from "../../LoadingSpinner";
import { Loader, MapPin, Navigation2 } from "lucide-react";

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string;
const NPS_KEY = import.meta.env.VITE_NPS_KEY as string;

export type ItineraryItem = {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  images: { url: string }[];
  latitude: number;
  longitude: number;
  arrival: Date | null;
  departure: Date | null;
  weather?: {
    icon: string;
    minTemp: number;
    maxTemp: number;
    description: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    pressure: number;
  } | null;

  distanceToNext?: { miles: number; duration: string };
  activities?: Array<{ name: string; type: string; duration: string }>;
};

export type TripSummaryState = {
  itinerary: ItineraryItem[];
  totalNights: number;
  startDate: Date | null;
  endDate: Date | null;
  totalDistance: number;
  startLocation?: { latitude: number; longitude: number };
  startLocationName?: string;
  startToFirst?: { miles: number; duration: string };
  budgetInputs: {
    lodgingPerNight: number;
    parkFees: number;
    gasPerMile: number;
  };
  estimatedBudget: number;
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const TripSummary: React.FC = () => {
  const [state, setState] = useState<TripSummaryState>({
    itinerary: [],
    totalNights: 0,
    startDate: null,
    endDate: null,
    totalDistance: 0,
    budgetInputs: { lodgingPerNight: 0, parkFees: 0, gasPerMile: 0 },
    estimatedBudget: 0,
    startLocationName: "",
  });
  const [manualCity, setManualCity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // Simple debounced fetch for city autocomplete
  const fetchCitySuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
      url.searchParams.set("q", query);
      url.searchParams.set("limit", "5");
      url.searchParams.set("appid", OPENWEATHER_KEY);

      const res = await fetch(url.toString());
      const data = await res.json();
      setSuggestions(
        data.map((c: any) =>
          [c.name, c.state, c.country].filter(Boolean).join(", ")
        )
      );
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("tripItinerary");
    if (!saved) {
      setLoading(false);
      return;
    }
    const parsed = JSON.parse(saved) as Omit<
      ItineraryItem,
      "distanceToNext" | "weather" | "activities"
    >[];
    setState((s) => ({
      ...s,
      itinerary: parsed.map((item) => ({
        ...item,
        arrival: item.arrival ? new Date(item.arrival) : null,
        departure: item.departure ? new Date(item.departure) : null,
      })),
    }));
  }, []);

  useEffect(() => {
    const { itinerary } = state;
    if (!itinerary.length) return;
    const sorted = [...itinerary].sort(
      (a, b) => (a.arrival?.getTime() || 0) - (b.arrival?.getTime() || 0)
    );
    const startDate = sorted[0].arrival;
    const endDate = sorted[sorted.length - 1].departure;
    const totalNights =
      startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;
    setState((s) => ({ ...s, startDate, endDate, totalNights }));
  }, [state.itinerary]);

  useEffect(() => {
    const fetchAll = async () => {
      const { itinerary } = state;
      if (!itinerary.length) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const updated = await Promise.all(
        itinerary.map(async (item, i) => {
          let distanceToNext;
          if (i < itinerary.length - 1) {
            const next = itinerary[i + 1];
            const miles = haversineDistance(
              item.latitude,
              item.longitude,
              next.latitude,
              next.longitude
            );
            const rounded = +miles.toFixed(1);
            const mins = Math.ceil(rounded * 1.2);
            distanceToNext = {
              miles: rounded,
              duration: formatDuration(mins),
            };
          }

          let weather;
          try {
            weather = await fetchWeather(item.latitude, item.longitude);
          } catch (e) {
            console.error("Weather fetch error", e);
          }

          let activities: ItineraryItem["activities"] = [];
          try {
            const aurl = new URL("https://developer.nps.gov/api/v1/activities");
            aurl.searchParams.set("parkCode", item.parkCode);
            aurl.searchParams.set("api_key", NPS_KEY);
            const ares = await fetch(aurl.toString());
            const aj = await ares.json();
            activities = aj.data.slice(0, 3).map((a: any) => ({
              name: a.name,
              type: a.activityTypeName,
              duration: "Varies",
            }));
          } catch (e) {
            console.error("Activities fetch error", e);
          }

          return { ...item, distanceToNext, weather, activities };
        })
      );

      const totalDistance = updated.reduce(
        (sum, it) => sum + (it.distanceToNext?.miles || 0),
        0
      );

      let startToFirst: { miles: number; duration: string };
      if (state.startLocation && updated.length) {
        const miles = haversineDistance(
          state.startLocation.latitude,
          state.startLocation.longitude,
          updated[0].latitude,
          updated[0].longitude
        );
        const rounded = +miles.toFixed(1);
        const mins = Math.ceil(rounded * 1.2);
        startToFirst = {
          miles: rounded,
          duration: formatDuration(mins),
        };
      }

      setState((s) => ({
        ...s,
        itinerary: updated,
        totalDistance,
        startToFirst,
      }));

      setLoading(false);
    };

    fetchAll();
  }, [state.startDate, state.itinerary.length, state.startLocation]);

  useEffect(() => {
    const { budgetInputs, totalNights, totalDistance } = state;
    const { lodgingPerNight, parkFees, gasPerMile } = budgetInputs;
    const estimatedBudget =
      lodgingPerNight * totalNights + parkFees + gasPerMile * totalDistance;
    setState((s) => ({ ...s, estimatedBudget }));
  }, [state.budgetInputs, state.totalNights, state.totalDistance]);

  const getLocation = () => {
    setLoadingStart(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState((s) => ({
          ...s,
          startLocation: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          startLocationName: "Current Location",
        }));
        setLoadingStart(false);
      },
      () => {
        alert("Failed to get current location.");
        setLoadingStart(false);
      }
    );
  };

  if (loading) return <LoadingSpinner message="Loading your trip summary..." />;

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <p className="text-lg font-semibold text-[rgb(var(--cta))]">
            A complete overview of all your planned national park stops.
          </p>
        </header>

        {/* Start‐location controls */}
        <div className="w-full max-w-md mx-auto bg-[rgb(var(--card))] p-2 rounded-full shadow-sm">
          <div className="flex items-center space-x-2">
            {/* — Current Location Button — */}
            <button
              onClick={getLocation}
              disabled={loadingStart}
              className="flex items-center justify-center p-2 rounded-full bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-medium shadow transition-transform duration-200 ease-in-out hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
              aria-label="Use Current Location"
            >
              {loadingStart ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5" />
              )}
            </button>

            {/* — Manual City Input & dropdown — */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter starting city"
                value={manualCity}
                onChange={(e) => {
                  const val = e.target.value;
                  setManualCity(val);
                  if (timerRef.current) clearTimeout(timerRef.current);
                  timerRef.current = window.setTimeout(() => {
                    fetchCitySuggestions(val);
                  }, 300); // debounce delay
                }}
                className="w-full px-4 py-2 rounded-full border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:border-transparent shadow-sm text-base"
                aria-label="Starting City"
              />

              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-lg shadow-lg max-h-48 overflow-auto z-20">
                  {suggestions.map((s) => (
                    <li
                      key={s}
                      onClick={() => {
                        setManualCity(s);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 cursor-pointer text-[rgb(var(--copy-primary))] hover:bg-[rgb(var(--cta))] hover:text-[rgb(var(--cta-text))] transition-colors duration-150"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* — Set Start Button — */}
            <button
              onClick={async () => {
                if (!manualCity) return;
                setLoadingStart(true);
                try {
                  const url = new URL(
                    "https://api.openweathermap.org/geo/1.0/direct"
                  );
                  url.searchParams.set("q", manualCity);
                  url.searchParams.set("limit", "1");
                  url.searchParams.set("appid", OPENWEATHER_KEY);

                  const res = await fetch(url.toString());
                  const data = await res.json();
                  if (!data.length) throw new Error("City not found");
                  const { lat, lon } = data[0];

                  setState((s) => ({
                    ...s,
                    startLocation: { latitude: lat, longitude: lon },
                    startLocationName: manualCity,
                  }));
                } catch {
                  alert("Failed to find coordinates for city.");
                } finally {
                  setLoadingStart(false);
                }
              }}
              className="flex items-center justify-center p-2 rounded-full bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-medium shadow transition-transform duration-200 ease-in-out hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
              aria-label="Set Start City"
            >
              <Navigation2 className="w-5 h-5 mr-1" />
              <span>Set Start</span>
            </button>
          </div>
        </div>

        {/* Distance to first park */}
        {state.startToFirst && (
          <p className="text-center text-sm text-[rgb(var(--copy-secondary))]">
            Distance from{" "}
            <strong>
              {state.startLocationName || "your starting location"}
            </strong>{" "}
            to first park: <strong>{state.startToFirst.miles} miles</strong> (
            {state.startToFirst.duration})
          </p>
        )}

        {/* No‐itinerary fallback */}
        {state.itinerary.length === 0 ? (
          <div className="flex flex-col items-center space-y-4 py-20">
            <p className="text-xl text-[rgb(var(--copy-secondary))]">
              You haven’t planned a trip yet.
            </p>
            <button
              onClick={() => navigate("/planner")}
              className="inline-block px-6 py-3 bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold rounded-full transition"
            >
              Start Planning
            </button>
          </div>
        ) : (
          <>
            <section className="">
              <TripMetaSummary
                startDate={state.startDate}
                endDate={state.endDate}
                totalNights={state.totalNights}
                numParks={state.itinerary.length}
                totalDistance={state.totalDistance}
                startToFirst={state.startToFirst}
              />
            </section>

            <section className="grid gap-8">
              {state.itinerary.map((item, idx) => (
                <ParkCardDetails
                  key={item.id}
                  item={item}
                  nextItem={state.itinerary[idx + 1]}
                />
              ))}
            </section>

            <div className="text-center">
              <PackingSuggestions itinerary={state.itinerary} />
              <button
                onClick={() => navigate("/planner")}
                className="inline-block mt-4 px-6 py-3 bg-transparent border-2 border-[rgb(var(--cta))] hover:bg-[rgb(var(--cta))] hover:text-[rgb(var(--cta-text))] text-[rgb(var(--cta))] font-medium rounded-full transition"
              >
                Edit Your Itinerary
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TripSummary;
