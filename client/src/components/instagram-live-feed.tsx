import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Copy, Check } from 'lucide-react';
import instagramBackground from "@assets/Untitled-7_1751636439392.png";

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
        
        /* Smooth horizontal scroll animation */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <section className="w-full py-4 bg-black relative mt-[-22px] mb-[-22px] pt-[10px] pb-[10px] min-h-[300px]" id="instagram">
        <div className="w-full px-4">
          {/* Contract Address Copy Box */}
          <div className="flex justify-center mb-4 relative">
            
            <div className="bg-white border-4 border-black rounded-lg p-5 max-w-4xl w-full shadow-sm relative z-[100]">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 mr-3 justify-center">
                  <code 
                    className="text-xl md:text-2xl font-bold text-black"
                    style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                  >
                    {contractAddress}
                  </code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-md transition-colors flex-shrink-0 border-2 border-black"
                  title={t('contract.copy')}
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          
          
          {/* Instagram Feed Section */}
          <div className="w-full relative z-20 mt-[10px] mb-[10px] pt-[10px] pb-[10px]" style={{ marginTop: '20px' }}>
            
            {/* Fallback Content While Widget Loads */}
            <div className="w-full mb-4">
              <div className="text-center mb-4 max-w-6xl mx-auto">
                <h3 
                  className="text-5xl md:text-7xl font-bold text-white mb-4 wiggle-pulse-text"
                  style={{ 
                    fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive"
                  }}
                >
                  {t('instagram.title')}
                </h3>
                
              </div>
              
              {/* Instagram Content Scroll - Full Width */}
              <div className="w-full overflow-hidden mb-8">
                <div className="flex animate-scroll gap-4">
                  {/* First set of content */}
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-10T093914.000Z_1751368166510.jpg"
                      alt="Yaki and Dori comic"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-10T093914.000Z_1_1751368166510.jpg"
                      alt="Yaki and Dori in rain"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-22T113635.000Z_1751368166510.jpg"
                      alt="Yaki working comic"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-22T113635.000Z_1_1751368166510.jpg"
                      alt="Yaki and Dori night scene"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-05-07T091208.000Z_1751368166510.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-05-07T091208.000Z_1_1751368166510.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-05-18T052355.000Z_1751368166511.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-05-18T052355.000Z_1_1751368166511.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-05-28T073601.000Z_1751368166511.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-05-28T073601.000Z_1_1751368166511.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-06-17T044833.000Z_1751368166511.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <video 
                      src="/attached_assets/sick_yaki__2025-06-17T044833.000Z_1_1751368166511.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </a>
                  
                  {/* Duplicate set for seamless infinite scroll */}
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-10T093914.000Z_1751368166510.jpg"
                      alt="Yaki and Dori comic"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-10T093914.000Z_1_1751368166510.jpg"
                      alt="Yaki and Dori in rain"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-22T113635.000Z_1751368166510.jpg"
                      alt="Yaki working comic"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://instagram.com/sick_yaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/attached_assets/sick_yaki__2025-04-22T113635.000Z_1_1751368166510.jpg"
                      alt="Yaki and Dori night scene"
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>
              
              {/* Instagram Link Button */}
              <div className="text-center max-w-6xl mx-auto">
                <a 
                  href="https://instagram.com/sick_yaki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105"
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