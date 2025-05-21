const WildlifeSpotlight = () => {
  return (
    <section
      aria-label="Wildlife Spotlight: American Bison"
      className=" mx-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.01] focus-within:ring-2 focus-within:ring-[rgb(var(--cta))]"
    >
      <img
        src="https://images.unsplash.com/photo-1624370945184-8bf927b64e8e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpc29ufGVufDB8fDB8fHww"
        alt="An American Bison standing in grassland"
        className="w-full h-48 object-cover object-center"
      />

      <div className="p-5 space-y-3">
        {/* Name & Classification */}
        <div>
          <h2 className="text-xl font-bold text-[rgb(var(--copy-primary))]">
            American Bison
          </h2>
          <p className="text-sm text-[rgb(var(--copy-secondary))]">
            Species: <em>Bison bison</em> · Mammal · Commonly found in:
            Yellowstone, Badlands, and Wind Cave National Parks
          </p>
        </div>

        {/* Short Bio */}
        <p className="text-sm text-[rgb(var(--copy-secondary))]">
          The largest land mammal in North America, bison are iconic symbols of
          the American wilderness — known for their size, strength, and grazing
          herds.
        </p>

        {/* Enhanced Tags */}
        <ul className="flex flex-wrap gap-2">
          {["Grazing", "Herd animal", "Protected", "Roams open plains"].map(
            (trait) => (
              <li
                key={trait}
                className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[rgb(var(--cta))]/10 text-[rgb(var(--cta))]"
              >
                {trait}
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
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default WildlifeSpotlight;
