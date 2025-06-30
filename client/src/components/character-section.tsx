import { useQuery } from "@tanstack/react-query";
import { Character, Gif } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface CharacterSectionProps {
  characterName: string;
}

export default function CharacterSection({ characterName }: CharacterSectionProps) {
  const { t } = useLanguage();
  const { data: characters, isLoading: charactersLoading } = useQuery<Character[]>({
    queryKey: ["/api/characters"],
  });

  const character = characters?.find(c => c.name.toLowerCase() === characterName.toLowerCase());

  const { data: gifs, isLoading: gifsLoading } = useQuery<Gif[]>({
    queryKey: ["/api/gifs", characterName],
    queryFn: () => fetch(`/api/gifs?category=${characterName}`).then(res => res.json()),
    enabled: !!character,
  });

  if (charactersLoading || !character) {
    return (
      <section className={`py-20 ${characterName === 'yaki' ? 'yaki-yellow-light' : 'dori-blue-light'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-16 bg-white/50 rounded-lg mb-8 mx-auto max-w-md"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-8 bg-white/50 rounded-lg"></div>
                <div className="space-y-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-6 bg-white/50 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="h-80 bg-white/50 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isYaki = characterName === 'yaki';
  const mainGif = gifs?.[0];
  const galleryGifs = gifs?.slice(1, 5) || [];

  return (
    <section 
      id={characterName} 
      className="py-20 dori-blue-light bg-[#ffffff]"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
          >
            {t(`character.${characterName}.name`)} {isYaki ? '🐣' : '🐧'}
          </h2>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-black uppercase tracking-wide" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              {t(`character.${characterName}.type`)}
            </p>
            <p className="text-lg text-black max-w-3xl mx-auto" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>
              {t(`character.${characterName}.description`)}
            </p>
          </div>
        </div>
        
        <div className={`grid md:grid-cols-2 gap-12 items-center mb-16 ${!isYaki ? 'md:grid-flow-col-dense' : ''}`}>
          <div className={`space-y-6 ${!isYaki ? 'md:col-start-2' : ''}`}>
            <h3 
              className="text-3xl font-bold text-black"
              style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}
            >
              {t(`character.${characterName}.personality`)}
            </h3>
            <div className="space-y-4">
              {character.personality.map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index % 4 === 0 ? (isYaki ? 'bg-yellow-400' : 'bg-blue-400') :
                    index % 4 === 1 ? 'bg-pink-400' :
                    index % 4 === 2 ? 'bg-green-400' : 'bg-purple-400'
                  }`}></div>
                  <span className="text-lg text-black" style={{ fontFamily: "'Sinchon Rhapsody', 'Comic Neue', cursive" }}>{trait}</span>
                </div>
              ))}
            </div>
          </div>
          
          {mainGif && (
            <div className={`character-card rounded-3xl p-8 border ${
              isYaki ? 'border-yellow-400' : 'border-blue-400'
            } ${!isYaki ? 'md:col-start-1' : ''}`}>
              <img 
                src={mainGif.url} 
                alt={mainGif.title} 
                className="w-full h-64 object-cover rounded-2xl mb-4" 
              />
              <div className="text-center">
                <h4 
                  className="text-xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: "Comic Neue, cursive" }}
                >
                  {mainGif.title}
                </h4>
                <p className="text-gray-600">
                  {isYaki ? "Yaki loves to share hearts and positive vibes" : "Dori loves creating heart shapes to show affection"}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {!gifsLoading && galleryGifs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryGifs.map((gif) => (
              <div key={gif.id} className="gif-container rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={gif.url} 
                  alt={gif.title} 
                  className="w-full h-32 object-cover" 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
