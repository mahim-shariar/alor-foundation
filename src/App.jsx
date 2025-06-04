import AboutSection from "./components/home/AboutSection";
import FeaturedStoriesSection from "./components/home/FeaturedStoriesSection";
import GallerySection from "./components/home/GallerySection";
import HeroSection from "./components/home/HeroSection";
import NewsSection from "./components/home/NewsSection";
import PartnerSection from "./components/home/PartnerSection";
import TeamSection from "./components/home/TeamSection";

import WhatWeDoSection from "./components/home/whatWeDoSection";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <FeaturedStoriesSection />
      <TeamSection />
      <GallerySection />
      <NewsSection />
      <PartnerSection />
      <Footer />
    </div>
  );
}

export default App;
