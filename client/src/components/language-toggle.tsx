import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-gray-800 hover:bg-white/20"
      style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? '한국어' : 'English'}
      </span>
    </Button>
  );
}