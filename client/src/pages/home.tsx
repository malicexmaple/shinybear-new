import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import InstagramFeed from "@/components/instagram-feed";
import CharacterSection from "@/components/character-section";
import GallerySection from "@/components/gallery-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen cream relative">
      <Navigation />
      <HeroSection />
      <InstagramFeed />
      <CharacterSection characterName="yaki" />
      <CharacterSection characterName="dori" />
      <GallerySection />
      <AboutSection />
      <Footer />
    </div>
  );
}
