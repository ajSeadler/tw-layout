import HeroSection from "../components/HeroSection";
import NationalParks from "../components/parks/NationalParks";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div id="explore">
        <NationalParks />
      </div>
    </>
  );
};

export default HomePage;
