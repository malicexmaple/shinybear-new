import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="text-white py-8 bg-[#000000]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center text-white">
          <p style={{ fontFamily: "'QianTuXiaoTuTi', 'Sinchon Rhapsody', 'Comic Neue', cursive" }}>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}