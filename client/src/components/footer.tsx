import { Instagram, Gift } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full gradient-kawaii flex items-center justify-center">
                <span className="text-2xl">🐣</span>
              </div>
              <h3 
                className="text-2xl font-bold"
                style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
              >
                Yaki & Dori
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              Spreading joy and kawaii culture through adorable animations. 
              Join our community of 925.4M+ viewers worldwide!
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/sick_yaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 kawaii-pink rounded-full flex items-center justify-center hover:opacity-80 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://giphy.com/sickyaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 kawaii-lavender rounded-full flex items-center justify-center hover:opacity-80 transition-colors"
              >
                <Gift className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Characters</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection("yaki")}
                  className="hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                >
                  Yaki 🐣
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("dori")}
                  className="hover:text-blue-400 transition-colors"
                  style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                >
                  Dori 🐧
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("gallery")}
                  className="hover:text-pink-400 transition-colors"
                  style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                >
                  Gallery
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Collections</h4>
            <ul className="space-y-2 text-gray-400">
              <li style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Pingdori</li>
              <li style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Sickyaki</li>
              <li style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Yaki & Dori</li>
              <li style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Events</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
          <p style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>&copy; 2024 Yaki & Dori. Bringing kawaii culture to the world with love! 💕</p>
        </div>
      </div>
    </footer>
  );
}
