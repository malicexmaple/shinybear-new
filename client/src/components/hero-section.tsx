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
      <section id="home" className="pt-4 pb-4 gradient-kawaii flex items-center" style={{ height: '100vh', minHeight: '600px', margin: '0', padding: '0' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-white/20 rounded-lg mb-4"></div>
          </div>
        </div>
      </section>
    );
  }

  const yaki = characters?.find(c => c.name === "Yaki");
  const dori = characters?.find(c => c.name === "Dori");

  return (
    <section id="home" className="bg-cover bg-center bg-no-repeat pt-[20px] pb-[120px]" style={{ backgroundImage: `url(${heroBackground})`, height: '100vh', minHeight: '600px', margin: '0', padding: '0', backgroundSize: 'cover', backgroundPosition: 'center center', width: '100vw' }}>
      <div className="max-w-6xl mx-auto px-4 text-center h-full flex items-end justify-center">
        <div className="mb-8">
          <h1 
            className="text-6xl md:text-8xl font-bold text-black mb-4 sinchon-font animate-wiggle-pulse"
            style={{ 
              textShadow: '2px 2px 0px #ffffff, -2px -2px 0px #ffffff, 2px -2px 0px #ffffff, -2px 2px 0px #ffffff, 1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff',
              transform: 'perspective(300px) rotateX(25deg)',
              transformOrigin: 'center bottom'
            }}
          >
            {t('character.yaki.name')}
          </h1>
          <h2 
            className="text-2xl md:text-3xl font-bold text-black mb-6 sinchon-font uppercase tracking-wide"
            style={{ 
              textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff'
            }}
          >
            {t('character.yaki.type')}
          </h2>
          
        </div>
      </div>
    </section>
  );
}
