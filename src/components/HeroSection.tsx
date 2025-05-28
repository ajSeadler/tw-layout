import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      aria-label="Hero section"
      className="relative min-h-[720px] bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 sm:py-24"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="font-bold text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] leading-tight tracking-tight mb-6">
            Explore America’s National Treasures
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[rgb(var(--copy-secondary))] max-w-lg mx-auto mb-8 leading-relaxed">
            Plan your next adventure to one of the United States’ iconic
            national parks. Discover landscapes, history, and experiences that
            will inspire your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/planner"
              className="
      inline-block
      rounded-3xl
      bg-[rgb(var(--cta))]
      px-6 py-2
      sm:px-8 sm:py-3
      text-base
      sm:text-lg
      font-semibold
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
      px-6 py-2
      sm:px-8 sm:py-3
      text-base
      sm:text-lg
      font-semibold
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
      </div>
    </section>
  );
};

export default HeroSection;
