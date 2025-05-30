/* eslint-disable react-hooks/rules-of-hooks */
// src/components/ActivityList.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner";
import type { Park } from "../../../types";

const API_KEY = import.meta.env.VITE_NPS_KEY;

// Fetch the activity metadata
async function fetchActivityById(activityId: string) {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/activities?id=${activityId}&api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch activity details");
  const json = await res.json();
  return json.data[0] as {
    id: string;
    name: string;
    shortDescription?: string;
    description?: string;
  };
}

// Fetch the parks for that activity
async function fetchParksByActivity(activityId: string): Promise<Park[]> {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?activityId=${activityId}&api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch parks for activity");
  const json = await res.json();
  return json.data as Park[];
}

const ActivityList: React.FC = () => {
  // activityId is possibly undefined, so we guard below
  const { id: activityId } = useParams<{ id: string }>();

  // If there's no activityId in the URL, bail out early:
  if (!activityId) {
    return <p className="text-red-600">No activity specified.</p>;
  }

  // React Query: one single options object
  const {
    data: activity,
    isLoading: loadingActivity,
    error: activityError,
  } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => fetchActivityById(activityId),
    enabled: true, // always true here since we guard above
  });

  const {
    data: parks,
    isLoading: loadingParks,
    error: parksError,
  } = useQuery<Park[]>({
    queryKey: ["activityParks", activityId],
    queryFn: () => fetchParksByActivity(activityId),
    enabled: true,
  });

  if (loadingActivity || loadingParks) return <LoadingSpinner />;

  if (activityError)
    return <p className="text-red-600">Error: {activityError.message}</p>;
  if (!activity) return <p className="text-red-600">Activity not found.</p>;

  return (
    <div className="space-y-8">
      {/* Activity Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold">{activity.name}</h1>
        {activity.shortDescription && (
          <p className="text-lg text-[rgb(var(--copy-secondary))]">
            {activity.shortDescription}
          </p>
        )}
        {activity.description && (
          <p className="prose prose-lg max-w-none">{activity.description}</p>
        )}
      </header>

      {/* Parks Offering This Activity */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Parks Offering “{activity.name}”
        </h2>

        {parksError && (
          <p className="text-red-600">Error: {parksError.message}</p>
        )}

        {parks?.length === 0 && (
          <p className="text-sm text-[rgb(var(--copy-secondary))]">
            No parks found for this activity.
          </p>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {parks?.map((park) => (
            <li
              key={park.id}
              className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm hover:shadow-md transition p-4"
            >
              <Link
                to={`/park/${park.parkCode}`}
                className="text-xl font-medium text-[rgb(var(--copy-primary))] hover:text-[rgb(var(--cta))] transition"
              >
                {park.fullName}
              </Link>
              <p className="mt-2 text-sm text-[rgb(var(--copy-secondary))] line-clamp-3">
                {park.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ActivityList;
