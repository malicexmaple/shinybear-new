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
    <>
      <style>{`
        /* Overlay to cover branding without touching widget code */
        .instagram-widget-container {
          position: relative;
          overflow: hidden;
        }
        
        /* Create a white box positioned to cover the bottom-right corner where branding typically appears */
        .instagram-widget-container::after {
          content: '';
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 200px;
          height: 30px;
          background: #f3f4f6;
          border-radius: 6px;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Alternative overlay for center-bottom positioning if needed */
        .instagram-widget-container::before {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 25px;
          background: #f3f4f6;
          border-radius: 4px;
          pointer-events: none;
          z-index: 9998;
        }
      `}</style>
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
          <div className="w-full instagram-widget-container">
            <div 
              className="elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b w-full" 
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}