export default function AboutSection() {
  return (
    <section id="about" className="py-20 gradient-kawaii">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "Comic Neue, cursive" }}
          >
            About Our Story 📖
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover the magical world of Yaki and Dori, where kawaii meets creativity!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="character-card rounded-3xl p-8 border border-white/30">
            <h3 
              className="text-3xl font-bold text-gray-800 mb-6"
              style={{ fontFamily: "Comic Neue, cursive" }}
            >
              The Beginning
            </h3>
            <p className="text-gray-700 mb-4">
              Yaki and Dori started as simple doodles that captured hearts around the world. 
              These adorable characters represent the pure joy and innocence that we all need in our daily lives.
            </p>
            <p className="text-gray-700 mb-4">
              With over 925.4M GIF views on GIPHY, Yaki and Dori have become beloved symbols 
              of kawaii culture, spreading happiness one animation at a time.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <div className="bg-yellow-400 rounded-full p-3">
                <span className="text-white text-xl">❤️</span>
              </div>
              <span className="text-gray-700 font-medium">925.4M+ GIF Views</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "Comic Neue, cursive" }}
            >
              Meet the Creator
            </h3>
            <div className="character-card rounded-3xl p-6 border border-white/30">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="https://media.giphy.com/avatars/sick_yaki/M409kV7BMr1m/200h.gif" 
                  alt="Sick Yaki creator avatar" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h4 
                    className="text-xl font-bold text-gray-800"
                    style={{ fontFamily: "Comic Neue, cursive" }}
                  >
                    @sickyaki
                  </h4>
                  <p className="text-gray-600">Character Creator</p>
                </div>
              </div>
              <p className="text-gray-700">
                The creative mind behind these adorable characters, bringing kawaii culture 
                to life through expressive animations and heartwarming stories.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/sick_yaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center text-white hover:bg-white/30 transition-all"
              >
                <div className="text-2xl mb-2">📷</div>
                <p className="font-medium">Instagram</p>
              </a>
              <a 
                href="https://giphy.com/sickyaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center text-white hover:bg-white/30 transition-all"
              >
                <div className="text-2xl mb-2">🎁</div>
                <p className="font-medium">GIPHY</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
