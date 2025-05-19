/* src/components/parks/trips/TripSummary.tsx */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";

import TripMetaSummary from "./TripMetaSummary";
import ParkCardDetails from "./ParkCardDetails";
import PackingSuggestions from "./PackingSuggestions";
import BudgetEstimator from "./BudgetEstimator";

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
  };
  distanceToNext?: { miles: number; duration: string };
  activities?: Array<{ name: string; type: string; duration: string }>;
};

type TripSummaryState = {
  itinerary: ItineraryItem[];
  totalNights: number;
  startDate: Date | null;
  endDate: Date | null;
  totalDistance: number;
  startLocation?: {
    latitude: number;
    longitude: number;
  };
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
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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
  const navigate = useNavigate();

  // 1) Load itinerary
  useEffect(() => {
    const saved = localStorage.getItem("tripItinerary");
    if (!saved) return;
    const parsed = JSON.parse(saved) as Omit<
      ItineraryItem,
      "distanceToNext" | "weather" | "activities"
    >[];
    const withDates = parsed.map((item) => ({
      ...item,
      arrival: item.arrival ? new Date(item.arrival) : null,
      departure: item.departure ? new Date(item.departure) : null,
    }));
    setState((s) => ({ ...s, itinerary: withDates }));
  }, []);

  // 2) Compute dates & nights
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

  // 3) Enrich: distance, weather, activities
  useEffect(() => {
    const fetchAll = async () => {
      const { itinerary } = state;
      if (!itinerary.length) return;

      const updated = await Promise.all(
        itinerary.map(async (item, i) => {
          // distance
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
            distanceToNext = {
              miles: rounded,
              duration: `${Math.ceil(rounded * 1.2)}min`,
            };
          }

          // weather (forecast)
          // 3b) Weather via Current Weather Data (free tier)
          let weather;
          try {
            const url = new URL(
              "https://api.openweathermap.org/data/2.5/weather"
            );
            url.searchParams.set("lat", item.latitude.toString());
            url.searchParams.set("lon", item.longitude.toString());
            url.searchParams.set("appid", OPENWEATHER_KEY);
            url.searchParams.set("units", "imperial");

            const res = await fetch(url.toString());
            if (!res.ok) throw new Error(`Weather ${res.status}`);
            const j = await res.json();

            weather = {
              icon: `https://openweathermap.org/img/wn/${j.weather[0].icon}@2x.png`,
              minTemp: Math.round(j.main.temp_min),
              maxTemp: Math.round(j.main.temp_max),
              description: j.weather[0].description,
            };
          } catch (e) {
            console.error("Weather fetch error for", item.fullName, e);
          }

          // activities (NPS)
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
            console.error("Activities fetch error for", item.fullName, e);
          }

          return { ...item, distanceToNext, weather, activities };
        })
      );

      const totalDistance = updated.reduce(
        (sum, it) => sum + (it.distanceToNext?.miles || 0),
        0
      );
      setState((s) => ({ ...s, itinerary: updated, totalDistance }));
    };

    fetchAll();
  }, [state.startDate, state.itinerary.length]);

  // 4) Recompute budget
  useEffect(() => {
    const { budgetInputs, totalNights, totalDistance } = state;
    const { lodgingPerNight, parkFees, gasPerMile } = budgetInputs;
    const estimatedBudget =
      lodgingPerNight * totalNights + parkFees + gasPerMile * totalDistance;
    setState((s) => ({ ...s, estimatedBudget }));
  }, [state.budgetInputs, state.totalNights, state.totalDistance]);

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <p className="text-lg font-semibold text-[rgb(var(--cta))]">
            A complete overview of all your planned national park stops.
          </p>
        </header>

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
            <TripMetaSummary
              startDate={state.startDate}
              endDate={state.endDate}
              totalNights={state.totalNights}
              numParks={state.itinerary.length}
              totalDistance={state.totalDistance}
              estimatedBudget={state.estimatedBudget}
            />

            <section className="grid gap-8">
              {state.itinerary.map((item, idx) => (
                <ParkCardDetails
                  key={item.id}
                  item={item}
                  nextItem={state.itinerary[idx + 1]}
                />
              ))}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PackingSuggestions itinerary={state.itinerary} />
              <BudgetEstimator
                budgetInputs={state.budgetInputs}
                onChange={(inputs) =>
                  setState((s) => ({ ...s, budgetInputs: inputs }))
                }
              />
            </section>

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
