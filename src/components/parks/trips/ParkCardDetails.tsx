import React from "react";
import { format } from "date-fns";
import type { ItineraryItem } from "../trips/TripSummary";

type Props = {
  item: ItineraryItem;
  nextItem?: ItineraryItem;
};

const ParkCardDetails: React.FC<Props> = ({ item, nextItem }) => (
  <div
    className="
      relative
      bg-[rgb(var(--card))]
      border border-[rgb(var(--border))]
      rounded-3xl
      p-6
      shadow-sm
      transition
      hover:shadow-lg hover:-translate-y-1
      duration-200
    "
  >
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_150px] gap-6">
      {/* 1. Park Image */}
      {item.images[0] && (
        <div className="overflow-hidden rounded-xl w-full h-32 lg:h-full">
          <img
            src={item.images[0].url}
            alt={item.fullName}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* 2. Main Info */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold leading-snug">{item.fullName}</h2>
        <p className="text-sm text-[rgb(var(--copy-secondary))] leading-relaxed">
          {item.description.length > 120
            ? item.description.slice(0, 120) + "…"
            : item.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Arrival</p>
            <p className="text-[rgb(var(--copy-secondary))]">
              {item.arrival ? format(item.arrival, "MMM d, yyyy") : "TBD"}
            </p>
          </div>
          <div>
            <p className="font-medium">Departure</p>
            <p className="text-[rgb(var(--copy-secondary))]">
              {item.departure ? format(item.departure, "MMM d, yyyy") : "TBD"}
            </p>
          </div>
          {item.distanceToNext && nextItem && (
            <div className="sm:col-span-2">
              <p className="font-medium">
                Drive → {nextItem.fullName.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-[rgb(var(--copy-secondary))]">
                {item.distanceToNext.miles}mi • {item.distanceToNext.duration}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Weather Panel */}
      <div
        className="
          bg-[rgb(var(--background))]
          border border-[rgb(var(--border))]
          rounded-2xl
          p-4
          flex flex-col items-center
          text-center
          text-sm
        "
      >
        {item.weather ? (
          <>
            <img
              src={item.weather.icon}
              alt={item.weather.description}
              className="w-12 h-12 mb-2"
            />
            <p className="font-medium">{item.weather.description}</p>
            <p className="text-[rgb(var(--copy-secondary))]">
              {item.weather.minTemp}°{item.weather.maxTemp}°
            </p>
          </>
        ) : (
          <p className="text-[rgb(var(--copy-secondary))]">Weather N/A</p>
        )}
      </div>
    </div>

    {/* Activities */}
    {item.activities && item.activities.length > 0 && (
      <>
        <hr className="my-6 border-[rgb(var(--border))]" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Recommended Activities</h3>
          <ul className="list-disc list-inside text-sm text-[rgb(var(--copy-secondary))]">
            {item.activities.map((a) => (
              <li key={a.name} className="leading-snug">
                <span className="font-medium text-[rgb(var(--copy-primary))]">
                  {a.name}
                </span>{" "}
                <span>({a.type})</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    )}
  </div>
);

export default ParkCardDetails;
