import { useQuery } from "@tanstack/react-query";
import { Character } from "@shared/schema";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroVideo from "@assets/e21e-910b-46ef-833c-72f1024cb81e_1751285187310.mp4";
import heroBackground from "@assets/5c89c3_63d7527fc15547e5afd6317102edd986~mv2_d_3508_2480_s_4_2_1751636222448.png";

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
    <section id="home" className="bg-cover bg-center bg-no-repeat pt-[81px] pb-[81px]" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="animate-float mb-2">
          <h1 
            className="text-6xl md:text-8xl font-bold text-[#000000] mt-[-22px] mb-[-22px] pt-[29px] pb-[29px] sinchon-font wiggle-pulse-text"
          >
            {t('hero.title')}
          </h1>

        </div>
        
        <div className="flex justify-center items-center mt-2 relative">
          <div className="relative">
            <video 
              src={heroVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              controls={false}
              className="w-full h-auto rounded-2xl mt-[-41px] mb-[-41px]"
              style={{ maxHeight: "575px", objectFit: "contain" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        
      </div>
    </section>
  );
}
