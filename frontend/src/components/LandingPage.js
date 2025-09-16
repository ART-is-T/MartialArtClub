import HeroSection from "./sections/HeroSection";
import MartialArtsSection from "./sections/MartialArtsSection";
import GymSection from "./sections/GymSection";
import TrainersSection from "./sections/TrainersSection";
import ReviewsSection from "./sections/ReviewsSection";
import ContactSection from "./sections/ContactSection";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = location.hash.replace("#", "");
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: true,
          offset: -90,
          duration: 500,
        });
      }, 300);
    }
  }, [location]);
  return (
    <>
      <HeroSection />
      <MartialArtsSection />
      <GymSection />
      <TrainersSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}

export default LandingPage;