/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ParkImageCarousel } from "../parks/ParkImagesCarousel";
import EntranceFeesSection from "../parks/EntranceFeeSection";
import BackButton from "../test/BackButton";
import { fetchWeather, type WeatherData } from "../../utils/fetchWeather";
import WeatherCard from "./WeatherCard";
import DirectionsCard from "./DirectionsCard";
import LoadingSpinner from "../LoadingSpinner";
import { MapPin } from "lucide-react";
import type { Park } from "../../types";

const ParkDetail: React.FC = () => {
  const { id } = useParams();
  const [park, setPark] = useState<Park | null>(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

  useEffect(() => {
    const fetchPark = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?id=${id}&api_key=${API_KEY}`
        );
        const data = await response.json();
        const fetchedPark = data.data[0];
        setPark(fetchedPark);

        if (fetchedPark?.latitude && fetchedPark?.longitude) {
          const lat = parseFloat(fetchedPark.latitude);
          const lon = parseFloat(fetchedPark.longitude);
          const weatherData = await fetchWeather(lat, lon);
          setWeather(weatherData);
        }
      } catch (error) {
        console.error("Error fetching park details:", error);
      } finally {
        setLoading(false);
        setWeatherLoading(false);
      }
    };

    fetchPark();
  }, [id]);

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

  if (loading) return <LoadingSpinner />;

  if (!park) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Park not found.
      </div>
    );
  }

  return (
    <div className="bg-[rgb(var(--background))] min-h-screen text-[rgb(var(--copy-primary))] relative">
      {/* Hero Carousel + Header Overlay */}
      <div className="relative w-full h-[95vh] sm:h-[75vh] md:h-[95vh] mb-10 overflow-hidden">
        {/* Carousel fills entire container */}
        <ParkImageCarousel images={park.images.slice(0, 4)} />

        {/* Top-to-transparent gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-transparent pointer-events-none" />

        {/* Title + Back Button overlaid */}
        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 z-20">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
            {park.fullName}
          </h1>
          <BackButton />
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
        <button
          onClick={saveToItinerary}
          className="mt-6 px-6 py-3 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold transition"
        >
          Save to Itinerary
        </button>

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
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ParkDetail;
