/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EntranceFeesSection from "../parks/EntranceFeeSection";
import BackButton from "../test/BackButton";
import { fetchWeather, type WeatherData } from "../../utils/fetchWeather";
import WeatherCard from "./WeatherCard";
import DirectionsCard from "./DirectionsCard";
import LoadingSpinner from "../LoadingSpinner";
import { MapPin, PanelLeft, PanelRight } from "lucide-react";
import type { Park } from "../../types";
import { ParkImageCarousel } from "./ParkImagesCarousel";
import TableOfContents from "./trips/TableOfContents";
import { ParkProvider } from "../../ParkContext";

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // open on desktop by default

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

  useEffect(() => {
    const maxScroll = 120;
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrollProgress(Math.min(scrollY / maxScroll, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="p-8 text-center text-red-600 font-semibold text-lg">
        Park not found.
      </div>
    );
  }

  const maxHeroHeight = 480;
  const minHeroHeight = 96;
  const heroHeight =
    maxHeroHeight - scrollProgress * (maxHeroHeight - minHeroHeight);
  const titleScale = 1 - scrollProgress * 0.5;
  const titleOpacity = 1 - scrollProgress * 0.7;

  return (
    <ParkProvider park={park ?? null}>
      <div className="flex bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] min-h-screen relative">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-72" : "w-0"
          } sm:pt-20 transition-all duration-300 ease-in-out bg-[rgb(var(--background))] border-r border-[rgb(var(--border))] overflow-hidden fixed sm:static z-40 h-full`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border))] sm:hidden">
            <h3 className="text-lg font-semibold text-[rgb(var(--copy-primary))]">
              Contents
            </h3>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close Table of Contents"
              className="p-2 rounded-md hover:bg-[rgb(var(--card-hover))] transition-colors"
            >
              <PanelLeft className="w-5 h-5 text-[rgb(var(--copy-secondary))]" />
            </button>
          </div>
          <div className="px-4 pt-4 sm:pt-0">
            {sidebarOpen && (
              <TableOfContents
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            )}
          </div>
        </aside>

        {/* Toggle Button for Desktop */}
        <div
          className="hidden sm:flex absolute top-10 h-14 w-14 z-50 bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-md rounded-r-full items-center justify-center cursor-pointer hover:bg-[rgb(var(--card-hover))] transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <button
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="focus:outline-none"
          >
            {sidebarOpen ? (
              <PanelLeft className="w-6 h-6 text-[rgb(var(--copy-secondary))]" />
            ) : (
              <PanelRight className="w-6 h-6 text-[rgb(var(--copy-secondary))]" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden ml-0 sm:ml-0">
          {/* Hero Section */}
          <section
            className="relative w-full top-0 z-30 flex items-end overflow-hidden"
            style={{
              height: heroHeight,
              transition: "height 0.3s ease",
            }}
          >
            {park.images?.[0]?.url && (
              <img
                src={park.images[0].url}
                alt={park.images[0].altText || `${park.fullName} main view`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            <div
              className="relative z-10 p-6 sm:p-10 max-w-5xl mx-auto w-full text-center"
              style={{
                transform: `scale(${titleScale})`,
                opacity: titleOpacity,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
            >
              <h1
                className="text-white font-extrabold leading-tight tracking-wide drop-shadow-lg select-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                {park.fullName}
              </h1>
              <p className="mt-4 inline-flex items-center gap-2 text-base sm:text-lg font-medium text-white px-3 py-1.5 rounded-full backdrop-blur-md bg-black/20 border border-white/20 shadow-sm select-none">
                <MapPin className="w-5 h-5 stroke-white/80" strokeWidth={1.8} />
                <span>{park.states}</span>
              </p>
            </div>
          </section>

          {/* Main Park Details */}
          <section className="max-w-6xl mx-auto px-6 sm:px-12 py-10 space-y-12">
            <article id="overview">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-md bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-md hover:bg-[rgb(var(--card-hover))] transition-colors z-10"
              >
                {sidebarOpen ? (
                  <PanelLeft className="w-5 h-5 text-[rgb(var(--copy-secondary))]" />
                ) : (
                  <PanelRight className="w-5 h-5 text-[rgb(var(--copy-secondary))]" />
                )}
              </button>
              <h2 className="text-3xl font-semibold mb-4 border-b-2 border-[rgb(var(--border))] pb-2">
                Overview
              </h2>
              <p className="text-lg leading-relaxed text-[rgb(var(--copy-secondary))] mb-6 whitespace-pre-line">
                {park.description}
              </p>
              <WeatherCard weather={weather} loading={weatherLoading} />
            </article>
            <article id="photos">
              <ParkImageCarousel images={park.images.slice(0, 6)} />
            </article>
            <article id="directions">
              <DirectionsCard
                directionsInfo={park.directionsInfo}
                directionsUrl={park.directionsUrl}
                latitude={park.latitude}
                longitude={park.longitude}
              />
            </article>

            {park.operatingHours.length > 0 && (
              <article id="hours">
                <h2 className="text-2xl font-semibold mb-4 border-b border-[rgb(var(--border))] pb-2">
                  Operating Hours
                </h2>
                <p className="mb-4 text-[rgb(var(--copy-secondary))] leading-relaxed whitespace-pre-line">
                  {park.operatingHours[0].description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  {Object.entries(park.operatingHours[0].standardHours).map(
                    ([day, hours]) => (
                      <div
                        key={day}
                        className="bg-[rgb(var(--card))] rounded-lg p-3 shadow-sm"
                      >
                        <strong className="capitalize">{day}:</strong> {hours}
                      </div>
                    )
                  )}
                </div>
              </article>
            )}

            <article id="fees">
              <EntranceFeesSection entranceFees={park.entranceFees} />
            </article>

            <article id="activities">
              <h2 className="text-2xl font-semibold mb-4 border-b border-[rgb(var(--border))] pb-2">
                Activities & Topics
              </h2>
              <div className="flex flex-wrap gap-3 text-sm">
                {park.activities.map((a) => (
                  <span
                    key={a.id}
                    className="px-4 py-1 rounded-full bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))]"
                  >
                    {a.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm mt-4">
                {park.topics.map((t) => (
                  <span
                    key={t.id}
                    className="px-4 py-1 rounded-full bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))]"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </article>

            {park.weatherInfo && (
              <article id="weather-info">
                <h2 className="text-2xl font-semibold mb-2 border-b border-[rgb(var(--border))] pb-1">
                  Weather Info
                </h2>
                <p className="text-[rgb(var(--copy-secondary))] whitespace-pre-line">
                  {park.weatherInfo}
                </p>
              </article>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={saveToItinerary}
                className="rounded-full bg-[rgb(var(--cta))] text-white px-6 py-3 text-lg font-semibold shadow-md hover:bg-[rgb(var(--cta-hover))] transition-colors"
              >
                Save to Itinerary
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <BackButton />
            </div>
          </section>

          {showToast && (
            <div
              role="alert"
              aria-live="assertive"
              className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-md bg-[rgb(var(--cta))] text-white px-5 py-3 shadow-lg z-50 select-none animate-fadeInOut"
            >
              {toastMessage}
            </div>
          )}
        </main>
      </div>
    </ParkProvider>
  );
};

export default ParkDetail;
