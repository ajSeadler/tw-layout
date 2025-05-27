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
      className="
        flex flex-col sm:flex-row
        justify-center items-center
        overflow-hidden
        bg-[rgba(var(--background))]
        min-h-[calc(100vh-4rem)]
        px-4 sm:px-6 lg:px-12 py-12
      "
    >
      {/* Fixed background gradients */}
      <div className="fixed top-[-8rem] left-[-8rem] w-72 h-72 bg-gradient-to-r from-emerald-300 to-teal-500 opacity-30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-8rem] right-[-8rem] w-72 h-72 bg-gradient-to-l from-cyan-300 to-blue-500 opacity-30 rounded-full filter blur-3xl pointer-events-none" />

      {/* Text block */}
      <motion.div
        className="z-10 max-w-md w-full space-y-4 text-center sm:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-[rgba(var(--copy-primary))]">
          Explore America’s National Treasures
        </h1>
        <p className="text-base sm:text-lg text-[rgba(var(--copy-secondary))]">
          Plan your next adventure to one of the United States’ iconic national
          parks. Discover landscapes, history, and experiences that will inspire
          your journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 pt-2">
          <Link
            to="/planner"
            className="
              inline-block rounded-2xl px-5 py-2 text-sm sm:text-base font-medium
              bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))]
              transition hover:shadow-lg hover:bg-[rgb(var(--cta-active))]
              focus:outline-none focus:ring-4 focus:ring-[rgba(var(--cta),0.4)]
            "
          >
            Start Planning
          </Link>
          <Link
            to="/parks"
            className="
              inline-block rounded-2xl px-5 py-2 text-sm sm:text-base font-medium
              border border-[rgba(var(--border))]
              text-[rgba(var(--copy-primary))] bg-[rgba(var(--background),0.8)]
              transition hover:bg-[rgba(var(--card),0.1)]
              focus:outline-none focus:ring-4 focus:ring-[rgba(var(--border),0.4)]
            "
          >
            Browse Parks
          </Link>
        </div>
      </motion.div>

      {/* Featured Park Card */}
      <motion.div
        className="z-10 mt-8 sm:mt-0 sm:ml-8 max-w-sm w-full group"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link
          to={`/park/${park.parkCode}`}
          className="
            block rounded-3xl overflow-hidden
            shadow-lg backdrop-blur-md
            bg-[rgba(var(--card),0.7)]
            border border-[rgba(var(--border))]
            transition-transform transform-gpu
            group-hover:scale-[1.03]
          "
        >
          <div className="relative w-full h-48 sm:h-56 lg:h-64">
            <img
              src={park.images[0].url}
              alt={park.images[0].altText}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
          <div className="p-4 sm:p-6 space-y-1">
            <div className="text-xs uppercase tracking-wide text-[rgba(var(--copy-secondary))]">
              Featured Park
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[rgba(var(--copy-primary))]">
              {park.fullName}
            </h3>
            <p className="text-sm text-[rgba(var(--copy-secondary))] line-clamp-3">
              {park.description}
            </p>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
