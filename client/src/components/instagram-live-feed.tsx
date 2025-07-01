import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Copy, Check } from 'lucide-react';

// Declare global ElfSight for TypeScript
declare global {
  interface Window {
    ElfSight?: {
      init: () => void;
    };
  }
}

export default function InstagramLiveFeed() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // Placeholder contract address - will be replaced with real one later
  const contractAddress = "COMING SOON";
  
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
      script.defer = true;
      
      script.onload = () => {
        // Force reinitialize the widget after script loads
        if ((window as any).ElfSight) {
          (window as any).ElfSight.init();
        }
      };
      
      document.head.appendChild(script);
    } else {
      // If script already exists, try to reinitialize
      setTimeout(() => {
        if ((window as any).ElfSight) {
          (window as any).ElfSight.init();
        }
      }, 1000);
    }
  }, []);

  return (
    <>
      <style>{`
        /* Instagram widget styling */
        .instagram-widget-container {
          position: relative;
        }
      `}</style>
      <section className="w-full py-16 bg-gray-50 relative pt-[33px] pb-[33px]" id="instagram">
        <div className="w-full px-4">
          {/* Contract Address Copy Box */}
          <div className="flex justify-center mb-8 relative">
            {/* Floating GIF Layer - Positioned on top line of CA bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:translate-x-12 translate-x-0 z-50 pointer-events-none" style={{ top: '-226px' }}>
              <img 
                src="/attached_assets/download(9)_1751341393068.gif" 
                alt="Cute character working" 
                className="w-48 h-48 md:w-72 md:h-72 object-contain opacity-90"
              />
            </div>
            <div className="bg-white border-2 border-black rounded-lg p-3 max-w-2xl w-full shadow-sm relative z-[100]">
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
            {/* GIF positioned to not interfere with other elements */}
            <div className="relative">
              <img 
                src="/attached_assets/SnapInsta_1751351039676.gif" 
                alt="Sickyaki and Pingdori with stretchy connection" 
                className="absolute left-1/2 transform -translate-x-1/2 opacity-90 z-0"
                style={{ width: 'auto', height: 'auto', top: '-100px' }}
              />
            </div>
          </div>
          
          {/* Instagram Feed Section */}
          <div className="w-full relative z-20 mt-[44px] mb-[44px] pt-[117px] pb-[117px]" style={{ marginTop: '100px' }}>
            
            {/* Fallback Content While Widget Loads */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="text-center mb-8">
                <h3 
                  className="text-4xl md:text-5xl font-bold text-black mb-4"
                  style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                >
                  {t('instagram.title')}
                </h3>
                <p 
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                >
                  {t('instagram.subtitle')}
                </p>
              </div>
              
              {/* Manual Instagram Grid as fallback */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">@sick_yaki</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">925M+ Views</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Korean Artist</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Kawaii</span>
                  </div>
                </div>
              </div>
              
              {/* Instagram Link Button */}
              <div className="text-center">
                <a 
                  href="https://instagram.com/sick_yaki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                  style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                >
                  Follow @sick_yaki on Instagram
                </a>
              </div>
            </div>
            
            {/* Elfsight Widget (Hidden by overlay for now) */}
            <div className="instagram-widget-container opacity-0 absolute inset-0">
              <div 
                className="elfsight-app-b59afb0f-1f09-47b9-b516-e0e9800f365b w-full" 
                data-elfsight-app-lazy
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}