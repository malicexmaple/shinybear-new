import { useQuery } from "@tanstack/react-query";
import { Character } from "@shared/schema";
import { Heart } from "lucide-react";

export default function HeroSection() {
  const { data: characters, isLoading } = useQuery<Character[]>({
    queryKey: ["/api/characters"],
  });

  const scrollToGallery = () => {
    const element = document.getElementById("gallery");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section id="home" className="pt-20 pb-16 gradient-kawaii min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-20 bg-white/20 rounded-lg mb-4"></div>
            <div className="h-6 bg-white/20 rounded-lg mb-8"></div>
            <div className="flex justify-center space-x-8">
              <div className="w-40 h-48 bg-white/20 rounded-3xl"></div>
              <div className="w-40 h-48 bg-white/20 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const yaki = characters?.find(c => c.name === "Yaki");
  const dori = characters?.find(c => c.name === "Dori");

  return (
    <section id="home" className="pt-20 pb-16 gradient-kawaii">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="animate-float mb-8">
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ fontFamily: "Comic Neue, cursive" }}
          >
            Yaki & Dori
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            The cutest kawaii characters bringing joy to your day! 🌈✨
          </p>
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="character-card rounded-3xl overflow-hidden border border-white/30 shadow-2xl animate-float">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              controls={false}
              preload="auto"
              className="w-full max-w-2xl h-auto"
            >
              <source src="/attached_assets/videoplayback (online-video-cutter.com)(7)_1751284628193.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        <div className="mt-12">
          <button 
            onClick={scrollToGallery}
            className="inline-flex items-center px-8 py-4 bg-white/90 text-gray-800 rounded-full font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Explore Our World</span>
            <Heart className="ml-2 w-5 h-5 text-pink-500 fill-current" />
          </button>
        </div>
      </div>
    </section>
  );
}
