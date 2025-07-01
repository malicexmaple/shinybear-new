import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import InstagramFeed from "@/components/instagram-feed";
import CharacterSection from "@/components/character-section";
import DoriScroll from "@/components/dori-scroll";
import GallerySection from "@/components/gallery-section";

import InstagramLiveFeed from "@/components/instagram-live-feed";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <Navigation />
      <HeroSection />
      <InstagramLiveFeed />
      <InstagramFeed />
      <CharacterSection characterName="yaki" />
      <DoriScroll />
      <CharacterSection characterName="dori" />
      <GallerySection />
      <Footer />
    </div>
  );
}
