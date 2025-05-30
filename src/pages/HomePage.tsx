import React from "react";
import HeroSection from "../components/HeroSection";
import ParkNewsOfTheDay from "../components/parks/ParkNewsOfTheDay";
import ParkOfTheDay from "../components/parks/ParkOfTheDay";
import VisitPromoCard from "../components/parks/VisitPromoCard";
import SearchPage from "../components/SearchPage";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <div className="max-w-4xl mx-auto">
        <SearchPage />
      </div>

      {/* Park of the Day */}
      <ParkOfTheDay />

      {/* Park News of the Day */}
      <ParkNewsOfTheDay />

      {/* Visit Promo Card */}
      <VisitPromoCard />
    </>
  );
};

export default HomePage;
