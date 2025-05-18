/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Alert = {
  id: string;
  title: string;
  description: string;
  parkCode: string;
  category: string;
  url: string;
};

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

const badgeClasses: Record<string, string> = {
  Danger: "bg-red-700 text-white",
  Closure: "bg-red-500 text-white",
  Warning: "bg-orange-500 text-black",
  Caution: "bg-yellow-500 text-black",
  Information: "bg-blue-500 text-white",
};

const PlanYourVisit: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const fetchAlerts = async (search = "", category = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: "30",
        api_key: API_KEY,
      });

      if (search) params.append("q", search);
      if (category) params.append("category", category);

      const res = await fetch(
        `https://developer.nps.gov/api/v1/alerts?${params.toString()}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setAlerts(json.data || []);
    } catch (err: any) {
      console.error("Failed to fetch alerts:", err);
      setError("Unable to load park alerts at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAlerts(searchTerm.trim(), categoryFilter);
  };

  return (
    <section className="bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
        <p className="text-[rgb(var(--copy-secondary))] mb-8">
          Search park alerts by name, state code, or alert category.
        </p>

        {/* Search / Filter Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Enter park name or state code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] placeholder-[rgb(var(--copy-secondary))]"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-primary))]"
          >
            <option value="">All Categories</option>
            <option value="Danger">Danger</option>
            <option value="Closure">Closure</option>
            <option value="Warning">Warning</option>
            <option value="Caution">Caution</option>
            <option value="Information">Information</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold"
          >
            Filter Alerts
          </button>
        </form>

        {/* Alerts */}
        {loading ? (
          <p className="text-[rgb(var(--copy-secondary))]">Loading alerts…</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : alerts.length === 0 ? (
          <p className="text-[rgb(var(--copy-secondary))]">
            No current alerts found for your search.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {alerts.map((a) => {
              const categoryKey = Object.keys(badgeClasses).find((key) =>
                a.category.toLowerCase().includes(key.toLowerCase())
              );
              const badgeClass = categoryKey
                ? badgeClasses[categoryKey]
                : "bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))]";

              return (
                <div
                  key={a.id}
                  className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <span
                    className={`inline-block text-xs font-semibold mb-2 px-2 py-1 rounded-full ${badgeClass}`}
                  >
                    {a.category}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
                  <p className="text-sm text-[rgb(var(--copy-secondary))] mb-3">
                    {a.description.slice(0, 100)}...
                  </p>
                  {a.url && a.url.startsWith("http") ? (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[rgb(var(--cta))] font-medium hover:underline"
                    >
                      Read Alert
                    </a>
                  ) : (
                    <span className="text-sm text-[rgb(var(--copy-secondary))] italic">
                      No link available
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate("/planner")}
            className="inline-block px-8 py-3 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold transition"
          >
            Launch Trip Planner
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisit;
