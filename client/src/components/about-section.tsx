import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 
            className="md:text-6xl font-bold text-black mb-4 text-[70px] animate-wiggle-pulse"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            {t('about.title')}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            {t('about.story')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="character-card rounded-3xl p-8 border border-white/30">
            <h3 
              className="text-3xl font-bold text-black mb-6 animate-wiggle-pulse-fast"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              The Beginning
            </h3>
            <p className="text-black mb-4" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              {t('about.story')}
            </p>
            <p className="text-black mb-4" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              {t('about.mission')}
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <img 
                src="/attached_assets/giphy_logo_icon_181239_1751307753099.png" 
                alt="GIPHY logo" 
                className="w-12 h-12"
              />
              <span className="text-black font-medium" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>925.4M+ GIF Views</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 
              className="text-3xl font-bold text-black animate-wiggle-pulse-slow"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
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
                    className="text-xl font-bold text-black"
                    style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
                  >
                    @sickyaki
                  </h4>
                  <p className="text-black" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Character Creator</p>
                </div>
              </div>
              <p className="text-black" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
                {t('about.creator')}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/sick_yaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 rounded-2xl p-4 text-center text-black hover:bg-gray-200 transition-all"
              >
                <div className="flex justify-center mb-2">
                  <img 
                    src="/attached_assets/black-and-white-outline-instagram-app-logo-icon-7017516951369307x990iaok2_1751310153172.png" 
                    alt="Instagram logo" 
                    className="w-8 h-8"
                  />
                </div>
                <p className="font-medium" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>Instagram</p>
              </a>
              <a 
                href="https://giphy.com/sickyaki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 rounded-2xl p-4 text-center text-black hover:bg-gray-200 transition-all"
              >
                <div className="text-2xl mb-2">🎁</div>
                <p className="font-medium" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>GIPHY</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
