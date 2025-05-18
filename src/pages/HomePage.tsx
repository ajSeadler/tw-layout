import HeroSection from "../components/HeroSection";
import NationalParks from "../components/parks/NationalParks";
import ParkOfTheDay from "../components/parks/ParkOfTheDay";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ParkOfTheDay />
      <div id="explore">
        <NationalParks />
      </div>
    </>
  );
};

export default HomePage;
