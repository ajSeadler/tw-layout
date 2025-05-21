import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ParkImageCarousel } from "../parks/ParkImagesCarousel";
import { ExternalLink } from "lucide-react";
import EntranceFeesSection from "../parks/EntranceFeeSection";
import BackButton from "../test/BackButton";

type Park = {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  directionsInfo: string;
  directionsUrl: string;
  weatherInfo: string;
  designation: string;
  states: string;
  latitude: string;
  longitude: string;
  url: string;
  activities: { id: string; name: string }[];
  topics: { id: string; name: string }[];
  operatingHours: {
    description: string;
    standardHours: Record<string, string>;
  }[];
  entranceFees: { cost: string; description: string; title: string }[];
  contacts: {
    phoneNumbers: { phoneNumber: string; type: string }[];
    emailAddresses: { emailAddress: string }[];
  };
  images: { url: string; altText: string; caption: string }[];
};

const ParkDetail: React.FC = () => {
  const { id } = useParams();
  const [park, setPark] = useState<Park | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

  useEffect(() => {
    const fetchPark = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?id=${id}&api_key=${API_KEY}`
        );
        const data = await response.json();
        setPark(data.data[0]);
      } catch (error) {
        console.error("Error fetching park details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPark();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-[rgb(var(--copy-secondary))]">
        Loading park details...
      </div>
    );
  }

  if (!park) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Park not found.
      </div>
    );
  }

  return (
    <div className="bg-[rgb(var(--background))] min-h-screen text-[rgb(var(--copy-primary))]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-start justify-between">
          <h1 className="text-4xl font-bold tracking-tight">{park.fullName}</h1>
          <BackButton />
        </div>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-lg leading-relaxed text-[rgb(var(--copy-secondary))] mb-10">
            {park.description}
          </p>
        </section>

        {park.images.length > 0 && (
          <ParkImageCarousel images={park.images.slice(0, 4)} />
        )}

        <div className="space-y-10">
          <section className="grid sm:grid-cols-2 gap-6 items-start">
            <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Details</h3>
              <p>
                <strong>Designation:</strong> {park.designation}
              </p>
              <p>
                <strong>States:</strong> {park.states}
              </p>
              <div className="mt-4">
                <iframe
                  title="Park location"
                  width="100%"
                  height="250"
                  className="rounded-lg border-0"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBS9_PWMc0SPxL8Pl_EIAWk7vPxh6UDtZY&q=${park.latitude},${park.longitude}&zoom=12`}
                  allowFullScreen
                />
              </div>
              <p className="mt-5 flex items-center space-x-1">
                <a
                  href={park.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(var(--cta))] underline flex items-center"
                >
                  <span>Official Site</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </p>
            </div>

            <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Directions</h3>
              <p>{park.directionsInfo}</p>
              {park.directionsUrl && (
                <a
                  href={park.directionsUrl}
                  className="text-[rgb(var(--cta))] underline mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Map & Directions
                </a>
              )}
            </div>
          </section>

          {park.operatingHours.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Operating Hours</h2>
              <p className="mb-3">{park.operatingHours[0].description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {Object.entries(park.operatingHours[0].standardHours).map(
                  ([day, hours]) => (
                    <div
                      key={day}
                      className="bg-[rgb(var(--card))] p-3 rounded-xl shadow-sm"
                    >
                      <strong className="capitalize">{day}:</strong> {hours}
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          <EntranceFeesSection entranceFees={park.entranceFees} />

          <section>
            <h2 className="text-xl font-semibold mb-2">Activities & Topics</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {park.activities.map((a) => (
                <span
                  key={a.id}
                  className="px-3 py-1 bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] rounded-xl"
                >
                  {a.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-sm mt-3">
              {park.topics.map((t) => (
                <span
                  key={t.id}
                  className="px-3 py-1 bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] rounded-xl"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </section>

          {park.weatherInfo && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Weather Info</h2>
              <p className="text-[rgb(var(--copy-secondary))]">
                {park.weatherInfo}
              </p>
            </section>
          )}

          {park.contacts && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <ul className="text-sm space-y-1">
                {park.contacts.phoneNumbers.map((p, i) => (
                  <li key={i}>
                    <strong>{p.type}:</strong> {p.phoneNumber}
                  </li>
                ))}
                {park.contacts.emailAddresses.map((e, i) => (
                  <li key={i}>
                    <strong>Email:</strong> {e.emailAddress}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkDetail;
