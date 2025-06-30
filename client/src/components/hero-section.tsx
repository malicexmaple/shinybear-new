import { useQuery } from "@tanstack/react-query";
import { Character } from "@shared/schema";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroVideo from "@assets/e21e-910b-46ef-833c-72f1024cb81e_1751285187310.mp4";

export default function HeroSection() {
  const { t } = useLanguage();
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
    <section id="home" className="pt-20 pb-4 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="animate-float mb-8">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 text-[#000000]"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            {t('hero.title')}
          </h1>
          <div className="curved-text-container relative z-10">
            <svg 
              width="100%" 
              height="200" 
              viewBox="0 0 1600 200" 
              className="curved-text-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  id="textcurve"
                  d="M 50,160 Q 800,60 1550,160"
                  stroke="none"
                  fill="none"
                />
              </defs>
              
              <text 
                fontSize="28"
                fontFamily="'Sinchon Rhapsody', 'Comic Neue', cursive, sans-serif"
                fontWeight="600"
                fill="black"
                stroke="white"
                strokeWidth="1"
              >
                <textPath 
                  href="#textcurve"
                  startOffset="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {t('hero.subtitle')}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-8 relative">
          <div className="character-card rounded-3xl p-8 border border-white/30 max-w-4xl w-full animate-float relative">
            <div className="relative">
              <video 
                src={heroVideo}
                autoPlay 
                loop 
                muted 
                playsInline
                controls={false}
                className="w-full h-auto rounded-2xl"
                style={{ maxHeight: "575px", objectFit: "contain" }}
              >
                Your browser does not support the video tag.
              </video>
              

            </div>
            
          </div>
        </div>
        
        
      </div>
    </section>
  );
}
