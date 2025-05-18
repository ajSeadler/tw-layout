import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Barns_grand_tetons.jpg/1200px-Barns_grand_tetons.jpg')",
      }}
    >
      {/* Adaptive gradient overlay */}
      <div
        className={`
          absolute inset-0 
          bg-gradient-to-r 
          from-white/90 to-transparent 
          dark:from-black/70
          dark:to-transparent
        `}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
          Discover America’s Treasures
        </h1>
        <p className="text-lg mb-8 text-gray-200">
          Explore the beauty and heritage of U.S. National Parks. From iconic
          landscapes to hidden rural gems.
        </p>
        <a
          href="#explore"
          className="inline-block px-6 py-3 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] text-lg font-semibold transition"
        >
          Start Exploring
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
