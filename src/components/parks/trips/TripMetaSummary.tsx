import React, { useRef, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Sun, Moon, Flag, MapPin, Info } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const totalDays = totalNights + 1;
  const fullDistance = totalDistance + (startToFirst?.miles ?? 0);

  // Scroll peek effect on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      const mobileWidth = 640; // sm breakpoint in Tailwind
      if (window.innerWidth < mobileWidth) {
        const el = containerRef.current;
        // Peek scroll to indicate scrollability
        el.scrollTo({ left: 150, behavior: "smooth" });
        const timer = setTimeout(() => {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const items = [
    {
      icon: Calendar,
      label:
        startDate && endDate
          ? `${format(startDate, "MMM d")}–${format(endDate, "MMM d, yyyy")}`
          : "Dates TBD",
    },
    { icon: Sun, label: `${totalDays} days` },
    { icon: Moon, label: `${totalNights} nights` },
    { icon: Flag, label: `${numParks} parks` },
    { icon: MapPin, label: `${fullDistance.toFixed(1)}mi` },
  ];

  return (
    <div className="relative w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-full shadow-md py-3 px-3 sm:px-4">
      <div
        ref={containerRef}
        className="flex flex-nowrap items-center gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar rounded-full"
      >
        {items.map(({ icon: Icon, label }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[rgba(var(--cta),0.2)] flex-shrink-0"
          >
            <Icon className="w-5 h-5 text-[rgb(var(--cta))]" />
            <span className="text-[rgb(var(--copy-primary))] text-sm sm:text-base font-medium">
              {label}
            </span>
          </div>
        ))}

        {startToFirst ? (
          <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[rgba(var(--cta),0.2)] flex-shrink-0">
            <MapPin className="w-5 h-5 text-[rgb(var(--cta))]" />
            <span className="text-[rgb(var(--copy-primary))] text-sm sm:text-base font-medium">
              {startToFirst.duration} drive to first park
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[rgba(var(--cta),0.2)] flex-shrink-0">
            <Info className="w-5 h-5 text-[rgb(var(--copy-secondary))]" />
            <span className="text-[rgb(var(--copy-secondary))] text-sm sm:text-base italic">
              Choose a start location to view drive info
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripMetaSummary;
