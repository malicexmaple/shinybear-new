import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gif } from "@shared/schema";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GallerySection() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: gifs, isLoading } = useQuery<Gif[]>({
    queryKey: ["/api/gifs"],
  });

  const filteredGifs = gifs?.filter(gif => {
    if (activeFilter === "all") return true;
    return gif.category === activeFilter;
  }) || [];

  const filterButtons = [
    { key: "all", label: t('gallery.all') },
    { key: "yaki", label: t('gallery.yaki') },
    { key: "dori", label: t('gallery.dori') },
    { key: "together", label: "Together" },
  ];

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-200 rounded-lg mb-4 mx-auto max-w-md animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg mx-auto max-w-2xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl font-bold text-black mb-4"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            {t('gallery.title')} 🎨
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-2 flex space-x-2">
            {filterButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => setActiveFilter(button.key)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeFilter === button.key
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGifs.map((gif) => (
            <div key={gif.id} className="gif-container rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={gif.url} 
                alt={gif.title} 
                className="w-full h-40 object-cover" 
              />
              <div className={`p-3 ${
                gif.category === 'yaki' ? 'yaki-yellow-light' :
                gif.category === 'dori' ? 'dori-blue-light' :
                'bg-pink-50'
              }`}>
                <p className="text-sm font-medium text-gray-700">{gif.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://giphy.com/sickyaki" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 kawaii-pink text-white rounded-full font-semibold hover:opacity-80 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>View More on GIPHY</span>
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
