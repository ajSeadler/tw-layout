import { Link } from "react-router-dom";

const HeroSection = () => {
  // Static park data
  const park = {
    fullName: "Yellowstone National Park",
    parkCode: "F58C6D24-8D10-4573-9826-65D42B8B83AD",
    description:
      "Yellowstone National Park is renowned for its wildlife and geothermal features, especially Old Faithful geyser.",
    images: [
      {
        url: "https://www.genuinemontana.com/wp-content/uploads/2018/03/grand-canyon-at-yellowstone.jpg",
        altText: "A breathtaking view of Yellowstone National Park",
      },
    ],
  };

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-12 py-20 bg-[rgba(var(--background))]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[rgba(var(--copy-primary))]">
            Explore America’s National Treasures
          </h1>
          <p className="text-lg text-[rgba(var(--copy-secondary))] max-w-xl">
            Plan your next adventure to one of the United States’ iconic
            national parks. Discover landscapes, history, and experiences that
            will inspire your journey.
          </p>
          <div className="flex gap-4 pt-2">
            <Link
              to="/planner"
              className="rounded-xl px-6 py-3 text-sm font-medium transition bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] hover:bg-[rgb(var(--cta-active))]"
            >
              Start Planning
            </Link>
            <Link
              to="/parks"
              className="rounded-xl px-6 py-3 text-sm font-medium border border-[rgba(var(--border))] text-[rgba(var(--copy-primary))] hover:bg-[rgba(var(--card),0.1)]"
            >
              Browse Parks
            </Link>
          </div>
        </div>

        {/* Right: Featured Park Card */}
        <div className="relative">
          <Link
            to={`/park/${park.parkCode}`}
            className="block rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm bg-[rgba(var(--card),0.65)] border border-[rgba(var(--border))] p-6 flex flex-col gap-4 hover:scale-[1.02] transition duration-300"
          >
            <div className="text-sm uppercase tracking-wide text-[rgba(var(--copy-secondary))]">
              Featured Park
            </div>
            <div
              className="w-full h-64 bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url(${park.images[0].url})` }}
              role="img"
              aria-label={park.images[0].altText}
            />
            <h3 className="text-xl font-semibold text-[rgba(var(--copy-primary))]">
              {park.fullName}
            </h3>
            <p className="text-sm text-[rgba(var(--copy-secondary))] line-clamp-3">
              {park.description}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
