/* eslint-disable @typescript-eslint/no-unused-vars */
/* src/components/parks/trips/TripSummary.tsx */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { fetchWeather } from "../../../utils/fetchWeather"; // adjust the path as needed

import TripMetaSummary from "./TripMetaSummary";
import ParkCardDetails from "./ParkCardDetails";
import PackingSuggestions from "./PackingSuggestions";
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

type TripSummaryState = {
  itinerary: ItineraryItem[];
  totalNights: number;
  startDate: Date | null;
  endDate: Date | null;
  totalDistance: number;
  startLocation?: { latitude: number; longitude: number };
  startToFirst?: { miles: number; duration: string };
  budgetInputs: {
    lodgingPerNight: number;
    parkFees: number;
    gasPerMile: number;
  };
  estimatedBudget: number;
};

// compute great‐circle distance in miles
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8; // miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// format minutes into “Xh Ym” or “Zm”
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
  });
  const [manualCity, setManualCity] = useState("");
  const [loadingStart, setLoadingStart] = useState(false);
  const navigate = useNavigate();

  // 1) load saved itinerary
  useEffect(() => {
    const saved = localStorage.getItem("tripItinerary");
    if (!saved) return;
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

  // 2) compute start/end dates & nights
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

  // 3) fetch distances, weather, activities
  useEffect(() => {
    const fetchAll = async () => {
      const { itinerary } = state;
      if (!itinerary.length) return;

      const updated = await Promise.all(
        itinerary.map(async (item, i) => {
          // distance & duration to next park
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

          // current weather
          let weather;
          try {
            weather = await fetchWeather(item.latitude, item.longitude);
          } catch (e) {
            console.error("Weather fetch error", e);
          }

          // top 3 NPS activities
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

      // distance & duration from start location → first park
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
    };

    fetchAll();
  }, [state.startDate, state.itinerary.length, state.startLocation]);

  // 4) recompute budget
  useEffect(() => {
    const { budgetInputs, totalNights, totalDistance } = state;
    const { lodgingPerNight, parkFees, gasPerMile } = budgetInputs;
    const estimatedBudget =
      lodgingPerNight * totalNights + parkFees + gasPerMile * totalDistance;
    setState((s) => ({ ...s, estimatedBudget }));
  }, [state.budgetInputs, state.totalNights, state.totalDistance]);

  // get device location
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
        }));
        setLoadingStart(false);
      },
      () => {
        alert("Failed to get current location.");
        setLoadingStart(false);
      }
    );
  };

  // geocode manual city
  const resolveCityToCoords = async () => {
    if (!manualCity) return;
    setLoadingStart(true);
    try {
      const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
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
      }));
    } catch {
      alert("Failed to find coordinates for city.");
    } finally {
      setLoadingStart(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <p className="text-lg font-semibold text-[rgb(var(--cta))]">
            A complete overview of all your planned national park stops.
          </p>
        </header>

        {/* Start‐location controls */}
        <div className="w-full max-w-md mx-auto p-4 bg-[rgb(var(--card))] rounded-xl shadow-sm">
          <div className="flex flex-col space-y-3">
            {/* — Current Location Button — */}
            <button
              onClick={getLocation}
              disabled={loadingStart}
              className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-medium shadow transition-transform duration-200 ease-in-out hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
              aria-label="Use Current Location"
            >
              {loadingStart ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5" />
              )}
              <span className="ml-2">Current Location</span>
            </button>

            {/* — Manual City Input & Set Button — */}
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <input
                type="text"
                placeholder="Enter starting city"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:border-transparent shadow-sm text-base"
                aria-label="Starting City"
              />
              <button
                onClick={resolveCityToCoords}
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-medium shadow transition-transform duration-200 ease-in-out hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
                aria-label="Set Start City"
              >
                <Navigation2 className="w-5 h-5 mr-1" />
                <span>Set Start</span>
              </button>
            </div>
          </div>
        </div>

        {/* Distance to first park */}
        {state.startToFirst && (
          <p className="text-center text-sm text-[rgb(var(--copy-secondary))]">
            Distance from your starting location to first park:{" "}
            <strong>{state.startToFirst.miles} miles</strong> (
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
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Summary cards */}
              <TripMetaSummary
                startDate={state.startDate}
                endDate={state.endDate}
                totalNights={state.totalNights}
                numParks={state.itinerary.length}
                totalDistance={state.totalDistance}
                startToFirst={state.startToFirst}
              />
              <PackingSuggestions itinerary={state.itinerary} />
            </section>

            {/* Park details */}
            <section className="grid gap-8">
              {state.itinerary.map((item, idx) => (
                <ParkCardDetails
                  key={item.id}
                  item={item}
                  nextItem={state.itinerary[idx + 1]}
                />
              ))}
            </section>

            {/* Packing & budget */}

            {/* Edit button */}
            <div className="text-center">
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
