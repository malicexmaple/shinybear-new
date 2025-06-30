import { useState, useEffect } from "react";
import { Instagram, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/language-toggle";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-pink-200/20 transition-all duration-300 ${
      isScrolled ? "nav-sticky" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full gradient-kawaii flex items-center justify-center animate-float">
              <span className="text-xl">🐣</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              Yaki & Dori
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection("yaki")}
              className="text-gray-700 hover:text-yellow-500 transition-colors font-medium"
            >
              Yaki
            </button>
            <button 
              onClick={() => scrollToSection("dori")}
              className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
            >
              Dori
            </button>
            <button 
              onClick={() => scrollToSection("gallery")}
              className="text-gray-700 hover:text-purple-500 transition-colors font-medium"
            >
              {t('nav.gallery')}
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              {t('nav.about')}
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <a 
              href="https://instagram.com/sick_yaki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://giphy.com/sickyaki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-400 transition-colors"
            >
              <Gift className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
