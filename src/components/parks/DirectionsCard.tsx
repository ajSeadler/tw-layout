import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

type DirectionsCardProps = {
  directionsInfo: string;
  directionsUrl?: string;
  latitude: string;
  longitude: string;
};

const DirectionsCard: React.FC<DirectionsCardProps> = ({
  directionsInfo,
  directionsUrl,
  latitude,
  longitude,
}) => {
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBS9_PWMc0SPxL8Pl_EIAWk7vPxh6UDtZY&center=${latitude},${longitude}&zoom=14&maptype=satellite`;

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 rounded-2xl shadow-md transition hover:shadow-lg w-full">
      <div className="flex items-center gap-2 mb-3 text-[rgb(var(--copy-primary))]">
        <MapPin size={20} />
        <h3 className="text-xl font-semibold tracking-tight">Directions</h3>
      </div>

      <p className="text-[rgb(var(--copy-secondary))] leading-relaxed">
        {directionsInfo}
      </p>

      {directionsUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--cta))] underline hover:text-opacity-80 transition"
        >
          View Map & Directions
          <ExternalLink size={16} />
        </a>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-[rgb(var(--border))]">
        <iframe
          title="Park location"
          width="100%"
          height="250"
          className="w-full border-0"
          src={mapSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default DirectionsCard;
