import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gif } from "@shared/schema";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GallerySection() {
  const { t, translateGifTitle, translateTag } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const { data: gifs, isLoading } = useQuery<Gif[]>({
    queryKey: ["/api/gifs"],
  });

  const filteredGifs = gifs?.filter(gif => {
    if (activeFilter === "all") return true;
    return gif.category === activeFilter;
  }) || [];

  const displayedGifs = showAll ? filteredGifs : filteredGifs.slice(0, visibleCount);
  const hasMoreGifs = filteredGifs.length > visibleCount;

  const filterButtons = [
    { key: "all", label: t('gallery.all') },
    { key: "yaki", label: t('gallery.yaki') },
    { key: "dori", label: t('gallery.dori') },
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
    <section id="gallery" className="py-12 bg-white mt-[-41px] mb-[-41px]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 
            className="text-5xl md:text-6xl font-bold text-black animate-wiggle-pulse mt-[13px] mb-[13px]"
            style={{ fontFamily: "'QianTuXiaoTuTi', 'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            {t('gallery.title')}
          </h2>
          
        </div>
        
        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 flex space-x-2">
            {filterButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => setActiveFilter(button.key)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeFilter === button.key
                    ? "bg-black text-white"
                    : "text-black hover:bg-black hover:text-white"
                }`}
                style={{ fontFamily: "'QianTuXiaoTuTi', 'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedGifs.map((gif) => (
            <div key={gif.id} className="gif-container rounded-2xl overflow-hidden animate-bounce-subtle">
              <img 
                src={gif.url} 
                alt={gif.title} 
                className="w-full h-56 object-contain" 
              />
              <div className="p-3 bg-white border-t border-gray-100">
                <p className="text-sm font-medium text-black" style={{ fontFamily: "'QianTuXiaoTuTi', 'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
                  {translateGifTitle(gif.title)}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {gif.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full"
                      style={{ fontFamily: "'QianTuXiaoTuTi', 'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                    >
                      {translateTag(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreGifs && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:opacity-80 transition-all transform hover:scale-105"
              style={{ fontFamily: "'QianTuXiaoTuTi', 'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              <span>{showAll ? t('gallery.showLess') : `${t('gallery.showMore')} (${filteredGifs.length - visibleCount} ${t('gallery.moreCount')})`}</span>
              {showAll ? (
                <ChevronUp className="ml-2 w-5 h-5" />
              ) : (
                <ChevronDown className="ml-2 w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
