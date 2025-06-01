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
    <section
      aria-labelledby="directions-heading"
      className="w-full mx-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-3xl shadow-xl
                 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-40 transition-shadow duration-300 hover:shadow-2xl
                 p-8 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8"
    >
      {/* Left panel: Directions text */}
      <div className="flex flex-col justify-between">
        <header className="flex items-center gap-3 mb-5 text-[rgb(var(--copy-primary))]">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[rgb(var(--cta))] to-[rgb(var(--cta-active))] text-white shadow-lg">
            <MapPin size={24} />
          </div>
          <h2
            id="directions-heading"
            className="text-2xl font-extrabold tracking-tight leading-tight"
          >
            Directions & Location
          </h2>
        </header>

        <article className="mb-6 text-[rgb(var(--copy-secondary))] leading-relaxed text-lg whitespace-pre-line font-sans">
          {directionsInfo}
        </article>

        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[rgb(var(--cta))] font-semibold text-lg underline
                       hover:text-[rgb(var(--cta-active))] focus-visible:outline focus-visible:outline-[rgb(var(--cta))]
                       transition-colors duration-200 group"
          >
            <span>Open in Google Maps</span>
            <ExternalLink
              size={18}
              className="group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </a>
        )}
      </div>

      {/* Right panel: Map embed */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[rgb(var(--border))] shadow-md
                   aspect-[16/9] md:aspect-auto"
      >
        {/* Placeholder background while map loads */}
        <div
          className="absolute inset-0 bg-[rgb(var(--background-alt))] animate-pulse"
          aria-hidden="true"
        />
        <iframe
          title="Park location"
          src={mapSrc}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="relative w-full h-full border-0"
          style={{ minHeight: "250px" }}
        />
      </div>
    </section>
  );
};

export default DirectionsCard;
