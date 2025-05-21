const MaxProfile = () => {
  return (
    <>
      <div className="w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-md overflow-hidden">
        <img
          src="https://www.rover.com/blog/wp-content/uploads/2014/07/corgi-dog-smiling.jpg"
          alt="Max the corgi"
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[rgb(var(--copy-primary))] mb-2">
            Max
          </h3>
          <p className="text-[rgb(var(--copy-secondary))] text-sm sm:text-base mb-4">
            Energetic corgi, lover of fetch and belly rubs.
          </p>
          <button className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-medium transition">
            View Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default MaxProfile;
