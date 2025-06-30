import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InstagramLiveFeed() {
  const { t } = useLanguage();

  useEffect(() => {
    // Load the Elfsight script if not already loaded
    const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50" id="instagram">
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl font-bold text-black mb-4"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            {t('instagram.title')}
          </h2>
        </div>
        
        {/* Elfsight Instagram Feed - Full Width */}
        <div className="w-full">
          <div 
            className="elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b w-full" 
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
}