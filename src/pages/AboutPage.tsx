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
    <section
      className="
        min-h-screen
        bg-[rgba(var(--background))]
        text-[rgba(var(--copy-primary))]
        flex flex-col justify-center
        px-8 py-20 sm:px-16 lg:px-32
      "
    >
      <div className="max-w-5xl mx-auto space-y-28">
        {/* Header */}
        <header className="space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-semibold leading-tight tracking-tight">
            About This Project
          </h1>
          <p
            className="text-xl leading-relaxed"
            style={{ color: "rgba(var(--copy-secondary))" }}
          >
            Your personal gateway to discovering, exploring, and planning visits
            to America’s most breathtaking national parks.
          </p>
        </header>

        {/* What You Can Do */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <h2
            className="text-3xl font-semibold border-b pb-3"
            style={{ borderColor: "rgba(var(--border))" }}
          >
            What You Can Do
          </h2>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12"
            style={{ color: "rgba(var(--copy-secondary))" }}
          >
            {[
              {
                icon: <Mountain size={24} />,
                text: "Search for parks by name or state",
              },
              {
                icon: <Map size={24} />,
                text: "Build and customize your own itinerary",
              },
              {
                icon: <CalendarCheck size={24} />,
                text: "Set visit dates for each park",
              },
              {
                icon: <AlertTriangle size={24} />,
                text: "View real-time alerts and park conditions",
              },
              {
                icon: <Save size={24} />,
                text: "Save your trip for later access",
              },
            ].map(({ icon, text }, i) => (
              <li key={i} className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(var(--cta))",
                    color: "rgba(var(--cta-text))",
                  }}
                >
                  {icon}
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data & Attribution */}
        <section className="max-w-4xl mx-auto space-y-4">
          <h2
            className="text-3xl font-semibold border-b pb-3"
            style={{ borderColor: "rgba(var(--border))" }}
          >
            Data & Attribution
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(var(--copy-secondary))" }}
          >
            This project uses data from the{" "}
            <a
              href="https://www.nps.gov/subjects/developer/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: "rgba(var(--cta))" }}
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

        {/* Privacy Policy */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2
            className="text-3xl font-semibold border-b pb-3"
            style={{ borderColor: "rgba(var(--border))" }}
          >
            Privacy Policy
          </h2>
          <div className="flex gap-6">
            <div
              className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full"
              style={{
                backgroundColor: "rgba(var(--cta))",
                color: "rgba(var(--cta-text))",
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div
              className="text-lg leading-relaxed space-y-4"
              style={{ color: "rgba(var(--copy-secondary))" }}
            >
              <p>
                We request access to your device’s location only to calculate
                distances from your starting point to each park. Your location
                is <strong>never</strong> sent to any server — calculations
                happen entirely in your browser.
              </p>
              <p>
                Your selected start location (either via geolocation or manual
                city entry) and any trip itinerary data are stored locally in{" "}
                <code
                  className="px-2 py-1 rounded-lg font-mono text-sm"
                  style={{
                    backgroundColor: "rgba(var(--border))",
                    color: "rgba(var(--copy-secondary))",
                  }}
                >
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
