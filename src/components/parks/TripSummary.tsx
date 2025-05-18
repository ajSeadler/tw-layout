import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Park = {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  images: { url: string }[];
};

type ItineraryItem = Park & {
  arrival: Date | string | null;
  departure: Date | string | null;
};

const TripSummary: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("tripItinerary");
    if (saved) {
      const parsed = JSON.parse(saved) as ItineraryItem[];
      // Convert ISO date strings back to Date objects
      const withDates = parsed.map((item) => ({
        ...item,
        arrival: item.arrival ? new Date(item.arrival) : null,
        departure: item.departure ? new Date(item.departure) : null,
      }));
      setItinerary(withDates);
    }
  }, []);

  return (
    <div className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center mb-6">Trip Summary</h1>

        {itinerary.length === 0 ? (
          <p className="text-center text-[rgb(var(--copy-secondary))]">
            You haven't planned a trip yet. Go back and create your itinerary.
          </p>
        ) : (
          itinerary.map((item) => (
            <div
              key={item.id}
              className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {item.images[0] && (
                  <img
                    src={item.images[0].url}
                    alt={item.fullName}
                    className="w-full sm:w-40 h-28 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{item.fullName}</h2>
                  <p className="text-sm text-[rgb(var(--copy-secondary))]">
                    {item.description.slice(0, 120)}...
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Arrival:</strong>{" "}
                    {item.arrival
                      ? new Date(item.arrival).toLocaleDateString()
                      : "Not set"}
                    <br />
                    <strong>Departure:</strong>{" "}
                    {item.departure
                      ? new Date(item.departure).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="text-center">
          <button
            onClick={() => navigate("/planner")}
            className="mt-6 px-6 py-3 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold"
          >
            Back to Planner
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
