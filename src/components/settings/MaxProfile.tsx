const MaxProfile = () => {
  return (
    <section
      aria-label="Profile of Max the Mini Aussie-Corgi mix"
      className=" mx-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.01] focus-within:ring-2 focus-within:ring-[rgb(var(--cta))]"
    >
      <img
        src="https://www.rover.com/blog/wp-content/uploads/2014/07/corgi-dog-smiling.jpg"
        alt="Max, a smiling Mini Aussie-Corgi mix"
        className="w-full h-48 object-cover object-center"
      />

      <div className="p-5 space-y-3">
        {/* Name & Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-[rgb(var(--copy-primary))]">
            Max
          </h2>
          <p className="text-sm text-[rgb(var(--copy-secondary))]">
            Mini Aussie/Corgi · 6 yrs · Seattle, WA
          </p>
        </div>

        {/* Short Bio */}
        <p className="text-sm text-[rgb(var(--copy-secondary))]">
          Friendly, playful, and always down for a game of fetch.
        </p>

        {/* Enhanced Tags */}
        <ul className="flex flex-wrap gap-2">
          {["High energy", "House-trained", "Good with kids", "Vaccinated"].map(
            (tag) => (
              <li
                key={tag}
                className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[rgb(var(--cta))]/10 text-[rgb(var(--cta))]"
              >
                {tag}
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <div>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-medium text-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2"
          >
            View Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default MaxProfile;
