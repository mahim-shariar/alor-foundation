import PageTransition from "../components/PageTransition";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import WhatWeDoSection from "../components/home/whatWeDoSection";
import FeaturedStoriesSection from "../components/home/FeaturedStoriesSection";
import TeamSection from "../components/home/TeamSection";
import GallerySection from "../components/home/GallerySection";
import NewsSection from "../components/home/NewsSection";
import PartnerSection from "../components/home/PartnerSection";

export default function HomePage() {
  return (
    <PageTransition padTop={false}>
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <FeaturedStoriesSection />
      <TeamSection />
      <GallerySection />
      <NewsSection />
      <PartnerSection />
    </PageTransition>
  );
}
