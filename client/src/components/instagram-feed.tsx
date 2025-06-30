import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: string;
  isVideo?: boolean;
}

// Sample Instagram posts based on @sick_yaki content
const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVvcDlmdHp5cGI4djlhODlkNHVvNG9hbWM0dmZjc2k2M2E5anAyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aPYrFwkI4LoA4zKrT7/giphy.gif",
    caption: "Yaki spreading love and positive vibes! 💛",
    likes: "2.5K"
  },
  {
    id: "2", 
    imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3QxczA4NjFrOGUzeXZ1ZzloYmNtZHE4NGg4OXdjeDQ1a3hrc3NzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LlhXLGk7pBsHKjvzh4/giphy.gif",
    caption: "Dori's heart dance! So cute 💙",
    likes: "3.1K"
  },
  {
    id: "3",
    imageUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVvcDlmdHp5cGI4djlhODlkNHVvNG9hbWM0dmZjc2k2M2E5anAyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aPYrFwkI4LoA4zKrT7/giphy.gif",
    caption: "Behind the scenes: Creating Yaki animations ✨",
    likes: "1.8K"
  },
  {
    id: "4",
    imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3QxczA4NjFrOGUzeXZ1ZzloYmNtZHE4NGg4OXdjeDQ1a3hrc3NzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LlhXLGk7pBsHKjvzh4/giphy.gif",
    caption: "New Dori stickers coming soon! 🐧",
    likes: "4.2K"
  },
  {
    id: "5",
    imageUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVvcDlmdHp5cGI4djlhODlkNHVvNG9hbWM0dmZjc2k2M2E5anAyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aPYrFwkI4LoA4zKrT7/giphy.gif",
    caption: "Yaki's morning routine 🌅",
    likes: "2.9K"
  },
  {
    id: "6",
    imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3QxczA4NjFrOGUzeXZ1ZzloYmNtZHE4NGg4OXdjeDQ1a3hrc3NzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LlhXLGk7pBsHKjvzh4/giphy.gif",
    caption: "Weekend vibes with Dori! 🎉",
    likes: "3.7K"
  }
];

export default function InstagramFeed() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      const scrollAmount = newIndex * 320; // width of each post + gap
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxIndex = instagramPosts.length - 3; // Show 3 posts at a time
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      setCurrentIndex(newIndex);
      const scrollAmount = newIndex * 320; // width of each post + gap
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-black mr-3" />
            <h2 
              className="text-4xl md:text-5xl font-bold text-black"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              @sick_yaki
            </h2>
          </div>
          <p 
            className="text-lg text-black max-w-2xl mx-auto"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            Follow our latest adventures and behind-the-scenes content
          </p>
          <a 
            href="https://www.instagram.com/sick_yaki?igsh=MWJmd21sYWZiZnF0bg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow on Instagram
          </a>
        </div>

        {/* Feed Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-black rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          
          <button
            onClick={scrollRight}
            disabled={currentIndex >= instagramPosts.length - 3}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-black rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Posts Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth px-12"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden border-2 border-black shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Post Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">SY</span>
                    </div>
                    <span 
                      className="font-semibold text-black"
                      style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                    >
                      sick_yaki
                    </span>
                  </div>
                  
                  <p 
                    className="text-sm text-black mb-3 line-clamp-2"
                    style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                  >
                    {post.caption}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-black">❤️ {post.likes}</span>
                      <span className="text-sm text-black">💬 {Math.floor(Math.random() * 200) + 50}</span>
                    </div>
                    <span className="text-xs text-black">
                      {Math.floor(Math.random() * 7) + 1}d
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.max(1, instagramPosts.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: index * 320,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-black' : 'bg-black/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}