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
        /* Hide Elfsight branding text */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapps-instagram-feed-posts-view-header-logo"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapps-instagram-feed-posts-view-header-text"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b a[href*="elfsight.com"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapps-link"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapps-instagram-feed-footer"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapp-instagram-feed-footer"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b div[style*="text-align: center"] a,
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b div[style*="text-align:center"] a {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
        }
        
        /* Hide any footer or branding elements */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b > div:last-child {
          display: none !important;
        }
        
        /* General branding text hiding */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *[class*="brand"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *[class*="logo"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *[class*="footer"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *[class*="credit"] {
          display: none !important;
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
          <div className="w-full">
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