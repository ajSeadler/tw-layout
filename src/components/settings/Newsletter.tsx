const Newsletter = () => {
  return (
    <>
      {" "}
      <div className="w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--copy-primary))] mb-3">
          Stay Updated
        </h3>
        <p className="text-[rgb(var(--copy-secondary))] mb-4 text-sm sm:text-base">
          Subscribe for Max’s adventures and tips.
        </p>
        <div className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 mb-2 sm:mb-0 px-3 py-2 border border-[rgb(var(--border))] rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]"
          />
          <button className="px-4 py-2 bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] rounded-lg sm:rounded-l-none font-medium transition">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
