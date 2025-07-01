import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Copy, Check } from 'lucide-react';

export default function InstagramLiveFeed() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // Placeholder contract address - will be replaced with real one later
  const contractAddress = "0x1234567890123456789012345678901234567890";
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
        /* Simple full-width bottom overlay to block any branding */
        .instagram-widget-container {
          position: relative;
        }
        
        .instagram-widget-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 60px;
          background: white;
          pointer-events: auto;
          z-index: 99999;
        }
      `}</style>
      <section className="w-full py-16 bg-gray-50 relative" id="instagram">
        <div className="w-full px-4">
          {/* Contract Address Copy Box */}
          <div className="flex justify-center mb-8 relative">
            {/* Floating GIF Layer - Positioned on top line of CA bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:translate-x-12 translate-x-0 z-10 pointer-events-none" style={{ top: '-226px' }}>
              <img 
                src="/attached_assets/download(9)_1751341393068.gif" 
                alt="Cute character working" 
                className="w-48 h-48 md:w-72 md:h-72 object-contain opacity-90"
              />
            </div>
            <div className="bg-white border-2 border-black rounded-lg p-3 max-w-2xl w-full shadow-sm relative z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 mr-3">
                  <span 
                    className="text-xs md:text-sm font-bold text-black mr-2"
                    style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                  >
                    {t('contract.label')}
                  </span>
                  <code 
                    className="text-xs md:text-sm text-gray-800 truncate"
                    style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                  >
                    {contractAddress}
                  </code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center w-8 h-8 bg-black hover:bg-gray-800 text-white rounded-md transition-colors flex-shrink-0"
                  title={t('contract.copy')}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-12 text-center relative z-10">
            <h2 
              className="text-4xl font-bold text-black mb-4 animate-wiggle-pulse-alt pt-[24px] pb-[24px] relative z-10"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t('instagram.title')}
            </h2>
            
            {/* GIF directly under the Instagram title - positioned absolutely to not affect layout */}
            <div className="relative">
              <img 
                src="/attached_assets/longfi_1751346995548.gif" 
                alt="Yaki and Dori with stretchy connection" 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-90 z-0 mt-[-86px] mb-[-86px]"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
          
          {/* Elfsight Instagram Feed - Full Width */}
          <div className="w-full instagram-widget-container relative z-20 pb-12">
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