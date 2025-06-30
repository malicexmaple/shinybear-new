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

    // Observer to remove branding elements after they're loaded
    const observer = new MutationObserver(() => {
      const widget = document.querySelector('.elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b');
      if (widget) {
        // Remove ALL external links (keep only Instagram links)
        const allLinks = widget.querySelectorAll('a');
        allLinks.forEach(link => {
          const href = link.getAttribute('href') || '';
          if (!href.includes('instagram.com') && !href.includes('#')) {
            link.remove();
          }
        });
        
        // Remove elements containing branding text
        const allElements = widget.querySelectorAll('*');
        allElements.forEach(el => {
          const text = el.textContent?.toLowerCase() || '';
          if (text.includes('free') || 
              text.includes('widget') || 
              text.includes('elfsight') ||
              text.includes('powered by') ||
              text.includes('created with')) {
            el.remove();
          }
        });
        
        // Remove common branding containers
        const brandingSelectors = [
          '[class*="footer"]', '[class*="Footer"]',
          '[class*="brand"]', '[class*="Brand"]', 
          '[class*="credit"]', '[class*="Credit"]',
          '[class*="powered"]', '[class*="Powered"]',
          '[id*="footer"]', '[id*="brand"]', '[id*="credit"]'
        ];
        
        brandingSelectors.forEach(selector => {
          const elements = widget.querySelectorAll(selector);
          elements.forEach(el => el.remove());
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
        /* Comprehensive Elfsight branding hiding */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b a,
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b a[href*="elfsight"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b a[href*="Elfsight"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="footer"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="Footer"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="brand"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="Brand"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="logo"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="Logo"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="credit"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="Credit"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="link"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="Link"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapps"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [class*="eapp"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [id*="eapps"],
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b [id*="eapp"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          position: absolute !important;
          left: -9999px !important;
        }
        
        /* Hide text content containing branding */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *:has-text("free"),
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *:has-text("Free"),
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *:has-text("widget"),
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *:has-text("Widget"),
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *:has-text("elfsight"),
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b *:has-text("Elfsight") {
          display: none !important;
        }
        
        /* Target common footer positioning */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b > div:last-child,
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b > div:last-of-type,
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b div[style*="text-align"] {
          display: none !important;
        }
        
        /* Force hide any remaining links */
        .elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b a:not([href*="instagram.com"]):not([href*="insta"]) {
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