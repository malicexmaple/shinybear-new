import { useState, useEffect } from "react";
import { Instagram, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/language-toggle";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm" : "bg-white"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              SHINY BEAR
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-black hover:text-black transition-colors font-medium"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection("yaki")}
              className="text-black hover:text-black transition-colors font-medium"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('nav.yaki')}
            </button>
            <button 
              onClick={() => scrollToSection("dori")}
              className="text-black hover:text-black transition-colors font-medium"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('nav.dori')}
            </button>
            <button 
              onClick={() => scrollToSection("gallery")}
              className="text-black hover:text-black transition-colors font-medium"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('nav.gallery')}
            </button>
            <button 
              onClick={() => scrollToSection("instagram")}
              className="text-black hover:text-black transition-colors font-medium"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('nav.instagram')}
            </button>
            <a 
              href="https://www.casetify.com/artist/sickyaki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-black transition-colors font-medium"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('nav.casetify')}
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <a 
              href="https://instagram.com/sick_yaki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://giphy.com/sickyaki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors"
            >
              <img 
                src="/attached_assets/giphy_logo_icon_181239_1751338296091.png" 
                alt="GIPHY logo" 
                className="w-5 h-5"
              />
            </a>
            
            <a 
              href="https://e.kakao.com/creator/YBG2CC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors"
            >
              <img 
                src="/attached_assets/kakao-talk-3vhu8cdsn1gfqeaiz55k9m_1751357984978.webp" 
                alt="KakaoTalk logo" 
                className="w-5 h-5"
              />
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-black hover:text-gray-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-left text-black hover:text-gray-600 transition-colors font-medium"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection("yaki")}
                className="text-left text-black hover:text-gray-600 transition-colors font-medium"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {t('nav.yaki')}
              </button>
              <button 
                onClick={() => scrollToSection("dori")}
                className="text-left text-black hover:text-gray-600 transition-colors font-medium"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {t('nav.dori')}
              </button>
              <button 
                onClick={() => scrollToSection("gallery")}
                className="text-left text-black hover:text-gray-600 transition-colors font-medium"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {t('nav.gallery')}
              </button>
              <button 
                onClick={() => scrollToSection("instagram")}
                className="text-left text-black hover:text-gray-600 transition-colors font-medium"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {t('nav.instagram')}
              </button>
              <a 
                href="https://www.casetify.com/artist/sickyaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-left text-black hover:text-gray-600 transition-colors font-medium"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {t('nav.casetify')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
