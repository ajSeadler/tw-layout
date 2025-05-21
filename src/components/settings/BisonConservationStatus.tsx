import { TrendingUp, AlertTriangle, CheckCircle2, Leaf } from "lucide-react";

const BisonConservationStatus = () => {
  return (
    <section
      aria-label="Bison Conservation Status"
      className="mx-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-2xl p-6 space-y-6"
    >
      <h3 className="text-xl font-semibold text-[rgb(var(--copy-primary))] tracking-wide">
        Conservation Status
      </h3>

      <ul className="space-y-5">
        <li className="flex items-center space-x-4">
          <TrendingUp
            className="w-6 h-6 text-[rgb(var(--cta))]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-[rgb(var(--copy-primary))]">
              Population Trend
            </p>
            <p className="text-sm text-[rgb(var(--copy-secondary))]">
              Stable with slight increases in protected areas
            </p>
          </div>
        </li>

        <li className="flex items-center space-x-4">
          <AlertTriangle
            className="w-6 h-6 text-[rgb(var(--cta))]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-[rgb(var(--copy-primary))]">
              Primary Threats
            </p>
            <p className="text-sm text-[rgb(var(--copy-secondary))]">
              Habitat loss, disease, and human encroachment
            </p>
          </div>
        </li>

        <li className="flex items-center space-x-4">
          <CheckCircle2
            className="w-6 h-6 text-[rgb(var(--cta))]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-[rgb(var(--copy-primary))]">
              Protection
            </p>
            <p className="text-sm text-[rgb(var(--copy-secondary))]">
              Listed as Near Threatened by IUCN, protected in national parks
            </p>
          </div>
        </li>

        <li className="flex items-center space-x-4">
          <Leaf className="w-6 h-6 text-[rgb(var(--cta))]" aria-hidden="true" />
          <div>
            <p className="font-semibold text-[rgb(var(--copy-primary))]">
              Conservation Efforts
            </p>
            <p className="text-sm text-[rgb(var(--copy-secondary))]">
              Habitat restoration, population monitoring, and public education
            </p>
          </div>
        </li>
      </ul>

      <button
        type="button"
        className="w-full mt-4 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2"
      >
        Learn More
      </button>
    </section>
  );
};

export default BisonConservationStatus;
