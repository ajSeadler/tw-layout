import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
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
    <section
      aria-label="Hero section"
      className="relative min-h-[720px] bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-24"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
        {/* Left text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h1 className="font-bold text-[3.5rem] sm:text-[4.5rem] leading-[1.1] tracking-tight mb-6">
            Explore America’s National Treasures
          </h1>
          <p className="text-xl sm:text-2xl text-[rgb(var(--copy-secondary))] max-w-lg mb-8 leading-relaxed">
            Plan your next adventure to one of the United States’ iconic
            national parks. Discover landscapes, history, and experiences that
            will inspire your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/planner"
              className="
                inline-block
                rounded-3xl
                bg-[rgb(var(--cta))]
                px-8 py-3
                text-lg font-semibold
                text-[rgb(var(--cta-text))]
                shadow-md
                hover:shadow-xl hover:bg-[rgb(var(--cta-active))]
                transition
                focus:outline-none focus:ring-4 focus:ring-[rgba(var(--cta),0.4)]
              "
            >
              Start Planning
            </Link>
            <Link
              to="/parks"
              className="
                inline-block
                rounded-3xl
                border border-[rgb(var(--border))]
                px-8 py-3
                text-lg font-semibold
                text-[rgb(var(--copy-primary))]
                bg-[rgba(var(--background),0.8)]
                hover:bg-[rgba(var(--card),0.1)]
                transition
                focus:outline-none focus:ring-4 focus:ring-[rgba(var(--border),0.4)]
              "
            >
              Browse Parks
            </Link>
          </div>
        </motion.div>

        {/* Right featured card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 mx-auto w-full max-w-sm rounded-3xl border border-[rgba(var(--border))] bg-[rgba(var(--card),0.8)] shadow-2xl backdrop-blur-md overflow-hidden hover:scale-[1.03] transition-transform cursor-pointer"
        >
          <Link to={`/park/${park.parkCode}`} className="block group">
            <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
              <img
                src={park.images[0].url}
                alt={park.images[0].altText}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-[rgba(var(--copy-secondary))] mb-2">
                Featured Park
              </p>
              <h2 className="text-2xl font-bold text-[rgb(var(--copy-primary))] mb-2">
                {park.fullName}
              </h2>
              <p className="text-[rgba(var(--copy-secondary))] line-clamp-3 leading-relaxed">
                {park.description}
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
