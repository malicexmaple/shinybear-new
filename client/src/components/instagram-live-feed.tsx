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

    // Add white overlay to cover branding text after widget loads
    const observer = new MutationObserver(() => {
      const widget = document.querySelector('.elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b');
      if (widget) {
        // Look for the branding link/text
        const brandingLinks = widget.querySelectorAll('a[href*="elfsight"]');
        brandingLinks.forEach(link => {
          // Create white overlay
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: absolute;
            background: white;
            z-index: 10000;
            pointer-events: none;
            border-radius: 4px;
          `;
          
          // Position overlay over the branding element
          const rect = link.getBoundingClientRect();
          const parentRect = widget.getBoundingClientRect();
          
          overlay.style.left = (rect.left - parentRect.left) + 'px';
          overlay.style.top = (rect.top - parentRect.top) + 'px';
          overlay.style.width = rect.width + 'px';
          overlay.style.height = rect.height + 'px';
          
          // Add overlay to widget with relative positioning
          if (getComputedStyle(widget).position === 'static') {
            (widget as HTMLElement).style.position = 'relative';
          }
          widget.appendChild(overlay);
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Ensure widget container can hold positioned overlays */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b {
          position: relative !important;
        }
        
        /* Hide branding text with CSS as backup */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b a[href*="elfsight"] {
          visibility: hidden !important;
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