import HeroSection from "../components/HeroSection";
import NationalParks from "../components/parks/NationalParks";
import ParkNewsOfTheDay from "../components/parks/ParkNewsOfTheDay";
import ParkOfTheDay from "../components/parks/ParkOfTheDay";
import RegionalParks from "../components/parks/RegionalParks";
import VisitPromoCard from "../components/parks/VisitPromoCard";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div id="explore">
        <NationalParks />
        <RegionalParks />
      </div>
      <ParkOfTheDay />
      <ParkNewsOfTheDay />
      <VisitPromoCard />
    </>
  );
};

export default HomePage;
