import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-black hover:bg-white"
      style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? '中文' : 'English'}
      </span>
    </Button>
  );
}