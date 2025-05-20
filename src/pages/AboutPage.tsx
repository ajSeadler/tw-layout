import React from "react";
import {
  Mountain,
  Map,
  CalendarCheck,
  AlertTriangle,
  Save,
  ShieldCheck,
} from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] flex flex-col justify-center px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-20">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            About This Project
          </h1>
          <p className="text-xl text-[rgb(var(--copy-secondary))] max-w-2xl mx-auto">
            Your personal gateway to discovering, exploring, and planning visits
            to America's most breathtaking national parks.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2 border-[rgb(var(--border))]">
            What You Can Do
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[rgb(var(--copy-secondary))] text-lg">
            <li className="flex items-start gap-3">
              <Mountain className="text-[rgb(var(--cta))]" size={24} />
              Search for parks by name or state
            </li>
            <li className="flex items-start gap-3">
              <Map className="text-[rgb(var(--cta))]" size={24} />
              Build and customize your own itinerary
            </li>
            <li className="flex items-start gap-3">
              <CalendarCheck className="text-[rgb(var(--cta))]" size={24} />
              Set visit dates for each park
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="text-[rgb(var(--cta))]" size={24} />
              View real-time alerts and park conditions
            </li>
            <li className="flex items-start gap-3">
              <Save className="text-[rgb(var(--cta))]" size={24} />
              Save your trip for later access
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2 border-[rgb(var(--border))]">
            Data & Attribution
          </h2>
          <p className="text-lg text-[rgb(var(--copy-secondary))] leading-relaxed">
            This project uses data from the{" "}
            <a
              href="https://www.nps.gov/subjects/developer/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--cta))] hover:underline font-semibold"
            >
              National Park Service (NPS) API
            </a>
            , a publicly available resource provided by the U.S. Department of
            the Interior. While we are not affiliated with the NPS, we aim to
            present their data with clarity and care. Alerts, park information,
            and operating conditions are sourced directly from this API and
            updated regularly.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2 border-[rgb(var(--border))]">
            Privacy Policy
          </h2>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] p-3 rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-[rgb(var(--copy-secondary))] text-lg leading-relaxed space-y-4">
              <p>
                We request access to your device’s location only to calculate
                distances from your starting point to each park. Your location
                is <strong>never</strong> sent to any server — calculations
                happen entirely in your browser.
              </p>
              <p>
                Your selected start location (either via geolocation or manual
                city entry) and any trip itinerary data are stored locally in{" "}
                {""}
                <code className="px-3 py-1 bg-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] rounded-xl">
                  localStorage
                </code>{" "}
                and are not shared externally.
              </p>
              <p>
                You can clear this data at any time by using the “Clear
                Itinerary” option in the planner. For more details, please
                review your browser’s privacy settings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
