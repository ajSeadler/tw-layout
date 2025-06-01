import React from "react";
import HeroSection from "../components/HeroSection";
import ParkNewsOfTheDay from "../components/parks/ParkNewsOfTheDay";
import ParkOfTheDay from "../components/parks/ParkOfTheDay";
import VisitPromoCard from "../components/parks/VisitPromoCard";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

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
