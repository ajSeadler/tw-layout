import HeroSection from "../components/HeroSection";
import NationalParks from "../components/parks/NationalParks";
import ParkNewsOfTheDay from "../components/parks/ParkNewsOfTheDay";
import ParkOfTheDay from "../components/parks/ParkOfTheDay";
import PlanYourVisit from "../components/parks/PlanYourVist";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ParkOfTheDay />
      <ParkNewsOfTheDay />

      <div id="explore">
        <NationalParks />
      </div>
      <PlanYourVisit />
    </>
  );
};

export default HomePage;
