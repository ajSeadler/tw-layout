import React from "react";
import { format } from "date-fns";
import { Calendar, Sun, Moon, Flag, MapPin } from "lucide-react";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  totalNights: number;
  numParks: number;
  totalDistance: number;
  startToFirst?: { miles: number; duration: string };
};

const TripMetaSummary: React.FC<Props> = ({
  startDate,
  endDate,
  totalNights,
  numParks,
  totalDistance,
  startToFirst,
}) => {
  const totalDays = totalNights + 1;
  const fullDistance = totalDistance + (startToFirst?.miles ?? 0);

  const items = [
    {
      icon: Calendar,
      label:
        startDate && endDate
          ? `${format(startDate, "MMM d")}–${format(endDate, "MMM d, yyyy")}`
          : "Dates TBD",
    },
    {
      icon: Sun,
      label: `${totalDays} days`,
    },
    {
      icon: Moon,
      label: `${totalNights} nights`,
    },
    {
      icon: Flag,
      label: `${numParks} parks`,
    },
    {
      icon: MapPin,
      label: `${fullDistance.toFixed(1)}mi`,
    },
  ];

  if (startToFirst) {
    items.push({
      icon: MapPin,
      label: `${startToFirst.duration} drive to first park`,
    });
  }

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-full shadow-md py-3 px-2 w-full">
      <div className="flex flex-row flex-nowrap items-center justify-start gap-4 overflow-x-auto no-scrollbar">
        {items.map(({ icon: Icon, label }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[rgba(var(--cta),0.2)] flex-shrink-0"
          >
            <Icon className="w-5 h-5 text-[rgb(var(--cta))]" />
            <span className="text-[rgb(var(--copy-primary))] font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripMetaSummary;
