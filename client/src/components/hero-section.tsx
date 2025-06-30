import { useQuery } from "@tanstack/react-query";
import { Character } from "@shared/schema";
import { Heart } from "lucide-react";
import heroVideo from "@assets/e21e-910b-46ef-833c-72f1024cb81e_1751285187310.mp4";

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
            className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg text-[#000000]"
            style={{ fontFamily: "Comic Neue, cursive" }}
          >
            Yaki & Dori
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            The cutest kawaii characters bringing joy to your day! 🌈✨
          </p>
        </div>
        
        <div className="flex justify-center items-center mt-12">
          <div className="character-card rounded-3xl p-8 border border-white/30 max-w-4xl w-full">
            <div className="relative">
              <video 
                src={heroVideo}
                autoPlay 
                loop 
                muted 
                playsInline
                controls={false}
                className="w-full h-auto rounded-2xl shadow-lg"
                style={{ maxHeight: "500px", objectFit: "contain" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-center mt-4">
              <h3 
                className="text-2xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: "Comic Neue, cursive" }}
              >
                Meet Yaki & Dori
              </h3>
              <p className="text-gray-600">Watch our adorable characters in action!</p>
            </div>
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
