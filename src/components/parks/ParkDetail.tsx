/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EntranceFeesSection from "../parks/EntranceFeeSection";
import BackButton from "../test/BackButton";
import { fetchWeather, type WeatherData } from "../../utils/fetchWeather";
import WeatherCard from "./WeatherCard";
import DirectionsCard from "./DirectionsCard";
import LoadingSpinner from "../LoadingSpinner";
import { MapPin } from "lucide-react";
import type { Park } from "../../types";
import { ParkImageCarousel } from "./ParkImagesCarousel";

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

// Fetch function explicitly typed to return Park
const fetchParkById = async (id: string): Promise<Park> => {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?id=${id}&api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch park");
  const data = await res.json();
  return data.data[0] as Park;
};

const ParkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scrolled, setScrolled] = useState(false);

  const {
    data: park,
    isLoading,
    isError,
  } = useQuery<Park>({
    queryKey: ["park", id],
    queryFn: () => fetchParkById(id!),
    enabled: !!id,
  });

  const { data: weather, isLoading: weatherLoading } = useQuery<WeatherData>({
    queryKey: ["weather", park?.latitude, park?.longitude],
    queryFn: () =>
      fetchWeather(parseFloat(park!.latitude), parseFloat(park!.longitude)),
    enabled: !!park?.latitude && !!park?.longitude,
  });

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30); // Adjust scroll threshold here
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const saveToItinerary = () => {
    if (!park) return;

    const current = localStorage.getItem("tripItinerary");
    const itinerary = current ? JSON.parse(current) : [];

    const alreadyAdded = itinerary.some((item: any) => item.id === park.id);
    if (alreadyAdded) {
      triggerToast("Already in itinerary!");
      return;
    }

    itinerary.push({
      id: park.id,
      fullName: park.fullName,
      parkCode: park.parkCode,
      latitude: park.latitude,
      longitude: park.longitude,
      states: park.states,
      images: park.images,
      description: park.description,
      arrival: null,
      departure: null,
    });

    localStorage.setItem("tripItinerary", JSON.stringify(itinerary));
    triggerToast("Park added to itinerary!");
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError || !park) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Park not found.
      </div>
    );
  }

  return (
    <div className="bg-[rgb(var(--background))] min-h-screen text-[rgb(var(--copy-primary))] relative">
      {/* Hero Image + Header Overlay with scroll shrinking and rounding */}
      <div
        className={`
    transition-all duration-500 ease-in-out
    ${scrolled ? "px-6 sm:px-12 md:px-20" : "px-0"}
  `}
      >
        <div
          className={`
      relative w-full transition-all duration-500 ease-in-out
      ${scrolled ? "max-w-5xl rounded-3xl shadow-2xl" : "max-w-full"}
      overflow-hidden
      ${scrolled ? "h-[300px]" : "h-[90vh]"}
      mx-auto
    `}
        >
          {park.images?.[0]?.url && (
            <img
              src={park.images[0].url}
              alt={park.images[0].altText || "Park Image"}
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          )}

          <div
            className={`
        absolute bottom-10 left-8 sm:left-16 md:left-20
        text-white drop-shadow-lg
        max-w-xl
        transition-opacity duration-700 ease-in-out
        ${scrolled ? "opacity-80" : "opacity-100"}
      `}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {park.fullName}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="flex items-center gap-2 mb-4">
            <MapPin className="text-[rgb(var(--cta))]" />
            {park.states}
          </p>
          <p className="text-lg leading-relaxed text-[rgb(var(--copy-secondary))] mb-6">
            {park.description}
          </p>
          <WeatherCard weather={weather} loading={weatherLoading} />
        </section>

        <section>
          <DirectionsCard
            directionsInfo={park.directionsInfo}
            directionsUrl={park.directionsUrl}
            latitude={park.latitude}
            longitude={park.longitude}
          />
        </section>

        <ParkImageCarousel images={park.images.slice(0, 4)} />

        {park.operatingHours.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Operating Hours</h2>
            <p className="mb-3">{park.operatingHours[0].description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {Object.entries(park.operatingHours[0].standardHours).map(
                ([day, hours]) => (
                  <div
                    key={day}
                    className="bg-[rgb(var(--card))] p-3 rounded-xl shadow-sm"
                  >
                    <strong className="capitalize">{day}:</strong> {hours}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        <section>
          <EntranceFeesSection entranceFees={park.entranceFees} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Activities & Topics</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {park.activities.map((a) => (
              <span
                key={a.id}
                className="px-3 py-1 bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] rounded-xl"
              >
                {a.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-sm mt-3">
            {park.topics.map((t) => (
              <span
                key={t.id}
                className="px-3 py-1 bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] rounded-xl"
              >
                {t.name}
              </span>
            ))}
          </div>
        </section>

        {park.weatherInfo && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Weather Info</h2>
            <p className="text-[rgb(var(--copy-secondary))]">
              {park.weatherInfo}
            </p>
          </section>
        )}

        {park.contacts && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <ul className="text-sm space-y-1">
              {park.contacts.phoneNumbers.map((p, i) => (
                <li key={i}>
                  <strong>{p.type}:</strong> {p.phoneNumber}
                </li>
              ))}
              {park.contacts.emailAddresses.map((e, i) => (
                <li key={i}>
                  <strong>Email:</strong> {e.emailAddress}
                </li>
              ))}
            </ul>
          </section>
        )}

        <button
          onClick={saveToItinerary}
          className="self-start sm:self-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold text-sm sm:text-base transition-all shadow-md"
        >
          Save to Itinerary
        </button>
        <BackButton />
      </div>

      {/* Toast */}
      {showToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-xl z-50 bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] text-sm sm:text-base font-medium backdrop-blur-sm ring-1 ring-[rgb(var(--border))] transition-all duration-300 ease-out"
          role="status"
          aria-live="polite"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ParkDetail;
