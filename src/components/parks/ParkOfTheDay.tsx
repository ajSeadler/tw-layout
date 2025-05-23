import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Park } from "../../types";

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

const ParkOfTheDay: React.FC = () => {
  const [park, setPark] = useState<Park | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("parkOfTheDay");
    const today = new Date().toISOString().split("T")[0];

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setPark(parsed.park);
        return;
      }
    }

    const fetchRandomPark = async () => {
      try {
        const res = await fetch(
          `https://developer.nps.gov/api/v1/parks?limit=50&api_key=${API_KEY}`
        );
        const data = await res.json();
        const filtered = data.data.filter((p: Park) => p.images?.length > 0);
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        setPark(random);
        localStorage.setItem(
          "parkOfTheDay",
          JSON.stringify({ date: today, park: random })
        );
      } catch (err) {
        console.error("Failed to fetch Park of the Day", err);
      }
    };

    fetchRandomPark();
  }, []);

  if (!park) return null;

  const handleClick = () => navigate(`/park/${park.id}`);

  return (
    <section
      className="relative w-full overflow-hidden cursor-pointer transition hover:shadow-xl"
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${park.images[0].url})`,
          filter: "brightness(0.5)",
        }}
      />

      {/* Overlay content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-left text-[rgb(var(--copy-primary))]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Park of the Day: {park.fullName}
        </h2>
        <p className="max-w-2xl text-lg sm:text-xl text-gray-200 drop-shadow-md">
          {park.description.slice(0, 240)}...
        </p>
        <button
          className="mt-6 inline-block px-6 py-3 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold transition"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Learn More
        </button>
      </div>

      {/* Fade gradient at bottom for readability (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-0" />
    </section>
  );
};

export default ParkOfTheDay;
