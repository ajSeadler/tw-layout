// HeroSection.tsx
import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import SearchParks from "./SearchParks";

const HeroSection: React.FC = () => {
  // Parallax transform for heading
  const { scrollY } = useViewportScroll();
  const yTransform = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section
      aria-label="Hero section"
      className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen px-6 py-20 sm:px-10 md:px-16 lg:px-24 text-[rgb(var(--copy-primary))]"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Blob 1: rotates slowly using --cta as base gradient */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute top-[-30%] left-[-25%] w-[140%] h-[140%] 
               bg-gradient-to-tr from-[rgba(var(--cta),0.3)] to-[rgba(var(--border),0.2)] 
               opacity-20 blur-3xl rounded-full"
        />
        {/* Blob 2: rotates in opposite direction using --border */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          className="absolute bottom-[-35%] right-[-20%] w-[160%] h-[160%] 
               bg-gradient-to-br from-[rgba(var(--border),0.3)] to-[rgba(var(--cta),0.2)] 
               opacity-20 blur-3xl rounded-full"
        />
      </div>

      {/* === Glassmorphic Overlay === */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center space-y-8">
        {/* === Parallax Heading with Gradient Text === */}
        <motion.h1
          style={{ y: yTransform }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] 
                     font-extrabold tracking-tight leading-tight 
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-[rgb(var(--cta))] to-[rgb(var(--cta-active))]"
        >
          Explore America’s National Treasures
        </motion.h1>

        {/* === Subheading with Underline Reveal === */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="relative group text-lg sm:text-xl md:text-2xl text-[rgb(var(--copy-secondary))] 
                     max-w-2xl leading-relaxed"
        >
          Plan your next adventure with confidence. Discover landscapes,
          wildlife, and stories that define the spirit of America’s national
          parks.
          <span
            className="absolute left-1/2 bottom-[-4px] block h-[3px] w-0 
                           bg-gradient-to-r from-[rgb(var(--cta))] to-[rgb(var(--cta-active))] 
                           transition-all duration-700 ease-in-out"
          />
        </motion.p>

        {/* === Glassmorphic Search Container === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-xl p-1 overflow-hidden"
        >
          <div className="">
            <SearchParks />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
