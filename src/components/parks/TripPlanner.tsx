import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import TripPlannerInfograph from "./TripPlannerInfograph";
import { MapPin } from "lucide-react";

type Park = {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  images: { url: string }[];
  states: string;
};

type ItineraryItem = Park & {
  arrival: Date | null;
  departure: Date | null;
};

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

const TripPlanner: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(() => {
    const saved = localStorage.getItem("tripItinerary");
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch parks by name or state
  const fetchParks = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://developer.nps.gov/api/v1/parks?q=${encodeURIComponent(
          q
        )}&limit=12&api_key=${API_KEY}`
      );
      const json = await res.json();
      setResults(json.data);
    } catch (e) {
      console.error("Search error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) fetchParks(searchTerm.trim());
  };

  const addToItinerary = (park: Park) => {
    if (itinerary.find((i) => i.id === park.id)) return;
    setItinerary((i) => [...i, { ...park, arrival: null, departure: null }]);
  };

  const updateDates = (
    id: string,
    field: "arrival" | "departure",
    date: Date | null
  ) => {
    setItinerary((list) =>
      list.map((item) => (item.id === id ? { ...item, [field]: date } : item))
    );
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    setItinerary((list) => {
      const newList = [...list];
      const target = newList[index + dir];
      newList[index + dir] = newList[index];
      newList[index] = target;
      return newList;
    });
  };

  const removeItem = (id: string) =>
    setItinerary((list) => list.filter((i) => i.id !== id));

  const saveItinerary = () => {
    localStorage.setItem("tripItinerary", JSON.stringify(itinerary));
    alert("Itinerary saved!");
  };

  const clearItinerary = () => {
    if (window.confirm("Clear your entire itinerary? This cannot be undone.")) {
      setItinerary([]);
      localStorage.removeItem("tripItinerary");
    }
  };

  return (
    <>
      <TripPlannerInfograph />
      <div className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* 1. Search */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Find Parks</h2>
            <form
              onSubmit={handleSearch}
              className="flex gap-2 flex-col sm:flex-row"
            >
              <input
                type="text"
                placeholder="Search by name or state code"
                className="flex-1 px-4 py-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-primary))] placeholder-[rgb(var(--copy-secondary))] focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>

            {results.length > 0 && (
              <div className="grid mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((park) => (
                  <div
                    key={park.id}
                    className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-4 shadow-sm flex flex-col"
                  >
                    {park.images[0] && (
                      <img
                        src={park.images[0].url}
                        alt={park.fullName}
                        className="h-32 w-full object-cover rounded-lg mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-lg mb-2">
                      {park.fullName}
                    </h3>
                    <p className="text-sm text-[rgb(var(--copy-secondary))] flex-1">
                      {park.description.slice(0, 100)}...
                    </p>
                    <button
                      onClick={() => addToItinerary(park)}
                      disabled={
                        itinerary.find((i) => i.id === park.id) !== undefined
                      }
                      className={`mt-3 px-4 py-2 rounded-xl font-medium transition ${
                        itinerary.find((i) => i.id === park.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))]"
                      }`}
                    >
                      {itinerary.find((i) => i.id === park.id)
                        ? "Added"
                        : "Add to Plan"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 2. Itinerary Builder */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Your Itinerary
            </h2>

            {itinerary.length === 0 ? (
              <p className="text-[rgb(var(--copy-secondary))] text-lg">
                No parks added yet. Search above to start your trip.
              </p>
            ) : (
              <div className="space-y-8">
                {itinerary.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-[rgb(var(--copy-primary))]">
                            {item.fullName}
                          </h3>

                          <div className="mt-1 mb-1 flex items-center gap-2 flex-wrap text-[rgb(var(--copy-secondary))]">
                            <MapPin className="w-4 h-4 text-[rgb(var(--cta))]" />
                            {item.states.split(",").map((code) => (
                              <span
                                key={code.trim()}
                                className="inline-block text-xs font-medium uppercase tracking-wide bg-[rgba(var(--cta),0.08)] text-[rgb(var(--cta))] px-2.5 py-1 rounded-full"
                              >
                                {code.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <button
                            disabled={idx === 0}
                            onClick={() => moveItem(idx, -1)}
                            className="px-3 py-1.5 rounded-lg border border-[rgb(var(--cta))] text-[rgb(var(--cta))] hover:bg-[rgba(var(--cta),0.1)] disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            disabled={idx === itinerary.length - 1}
                            onClick={() => moveItem(idx, 1)}
                            className="px-3 py-1.5 rounded-lg border border-[rgb(var(--cta))] text-[rgb(var(--cta))] hover:bg-[rgba(var(--cta),0.1)] disabled:opacity-30"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="px-3 py-1.5 rounded-lg border border-red-500 text-red-500 hover:bg-red-100"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-[rgb(var(--copy-secondary))] mb-1">
                            Arrival Date
                          </label>
                          <DatePicker
                            selected={item.arrival}
                            onChange={(d) => updateDates(item.id, "arrival", d)}
                            className="w-full px-4 py-2 rounded-xl border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] bg-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-[rgb(var(--copy-secondary))] mb-1">
                            Departure Date
                          </label>
                          <DatePicker
                            selected={item.departure}
                            onChange={(d) =>
                              updateDates(item.id, "departure", d)
                            }
                            className="w-full px-4 py-2 rounded-xl border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={saveItinerary}
                    className="px-4 py-2 rounded-2xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] text-lg font-semibold transition-colors"
                  >
                    Save Itinerary
                  </button>
                  <button
                    onClick={clearItinerary}
                    className="px-6 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-100 font-semibold transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 3. Final CTA */}
          <section className="text-center pt-12">
            <button
              onClick={() => navigate("/summary")}
              className="px-6 py-3 rounded-2xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] text-lg font-semibold transition-colors"
            >
              View Trip Summary & Directions
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default TripPlanner;
