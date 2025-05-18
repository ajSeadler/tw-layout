import React from "react";

const FeatureSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-bold text-[rgb(var(--copy-primary))] mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-[rgb(var(--copy-secondary))] leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta.
          </p>
          <p className="text-[rgb(var(--copy-secondary))] leading-relaxed">
            Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia
            nunc.
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow p-8">
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[rgb(var(--cta))] rounded-full mt-2 mr-4"></span>
              <span className="text-[rgb(var(--copy-secondary))]">
                Ultrices eros in cursus turpis massa tincidunt.
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[rgb(var(--cta))] rounded-full mt-2 mr-4"></span>
              <span className="text-[rgb(var(--copy-secondary))]">
                Nisi vitae suscipit tellus mauris a diam.
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[rgb(var(--cta))] rounded-full mt-2 mr-4"></span>
              <span className="text-[rgb(var(--copy-secondary))]">
                Euismod lacinia at quis risus sed vulputate odio.
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[rgb(var(--cta))] rounded-full mt-2 mr-4"></span>
              <span className="text-[rgb(var(--copy-secondary))]">
                Amet est placerat in egestas erat imperdiet sed.
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-medium px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
