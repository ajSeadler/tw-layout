import React from "react";
import { format } from "date-fns";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  totalNights: number;
  numParks: number;
  totalDistance: number;
  estimatedBudget: number;
};

const TripMetaSummary: React.FC<Props> = ({
  startDate,
  endDate,
  totalNights,
  numParks,
  totalDistance,
  estimatedBudget,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6">
    <div className="space-y-1">
      <p className="text-sm text-[rgb(var(--copy-secondary))]">Dates</p>
      <p className="font-semibold">
        {startDate && endDate
          ? `${format(startDate, "MMM d, yyyy")} – ${format(
              endDate,
              "MMM d, yyyy"
            )}`
          : "TBD"}
      </p>
    </div>
    <div className="space-y-1">
      <p className="text-sm text-[rgb(var(--copy-secondary))]">Total Nights</p>
      <p className="font-semibold">{totalNights}</p>
    </div>
    <div className="space-y-1">
      <p className="text-sm text-[rgb(var(--copy-secondary))]">Parks</p>
      <p className="font-semibold">{numParks}</p>
    </div>
    <div className="space-y-1">
      <p className="text-sm text-[rgb(var(--copy-secondary))]">Distance</p>
      <p className="font-semibold">{totalDistance.toFixed(1)}mi</p>
    </div>
    <div className="space-y-1 sm:col-span-2">
      <p className="text-sm text-[rgb(var(--copy-secondary))]">Est. Budget</p>
      <p className="font-semibold">${estimatedBudget.toFixed(2)}</p>
    </div>
  </div>
);

export default TripMetaSummary;
