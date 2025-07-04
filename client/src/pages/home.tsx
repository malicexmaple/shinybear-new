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
    <div className="min-h-screen bg-white relative" style={{ margin: 0, padding: 0, width: '100vw', overflow: 'hidden' }}>
      <Navigation />
      <HeroSection />
      <InstagramLiveFeed />
      <InstagramFeed />
      <CharacterSection characterName="yaki" usePinkBackground={true} />
      <CharacterSection characterName="dori" useBlueBackground={true} />
      <CharacterSection characterName="yaki" useYellowBackground={true} />
      <DoriScroll />
      <GallerySection />
      <Footer />
    </div>
  );
}
