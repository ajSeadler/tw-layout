const BisonHabitat = () => {
  return (
    <section
      aria-label="Bison Habitat Details"
      className="max-w-md mx-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Left Image Section */}
        <div className="h-40 sm:h-auto sm:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1596635633457-2f3ab80a6d49?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymlzb258ZW58MHx8MHx8fDA%3D"
            alt="Bison grazing in an open prairie"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Content Section */}
        <div className="p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-[rgb(var(--copy-primary))] mb-1">
              Where Bison Thrive
            </h3>
            <p className="text-sm text-[rgb(var(--copy-secondary))]">
              Bison are highly adaptable and thrive in ecosystems with open
              landscapes, sparse tree cover, and a mix of grasses and sedges.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-[rgb(var(--copy-secondary))]">
            <div>
              <span className="font-semibold text-[rgb(var(--copy-primary))]">
                Elevation Range:
              </span>{" "}
              2,000 – 8,000 ft
            </div>
            <div>
              <span className="font-semibold text-[rgb(var(--copy-primary))]">
                Climate:
              </span>{" "}
              Cold winters, warm summers
            </div>
            <div>
              <span className="font-semibold text-[rgb(var(--copy-primary))]">
                Preferred Terrain:
              </span>{" "}
              Rolling plains, river valleys
            </div>
            <div>
              <span className="font-semibold text-[rgb(var(--copy-primary))]">
                Seasonal Behavior:
              </span>{" "}
              Migratory, tracking grazing zones
            </div>
          </div>

          <div>
            <button className="inline-block px-4 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-medium text-sm transition">
              Learn About Ecosystems
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BisonHabitat;
