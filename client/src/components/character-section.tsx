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
      <section className="py-20 bg-white">
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
  const mainGif = isYaki 
    ? gifs?.[0] 
    : gifs?.find(gif => gif.title === 'Dori Kawaii') || gifs?.[0];

  return (
    <section 
      id={characterName} 
      className="py-12 bg-white pt-[27px] pb-[27px] mt-[0px] mb-[0px]"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 
            className="md:text-6xl font-bold mb-2 text-[#000000] text-[90px] sinchon-font wiggle-pulse-text"
          >
            {t(`character.${characterName}.name`)}
          </h2>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-black uppercase tracking-wide sinchon-font">
              {t(`character.${characterName}.type`)}
            </p>
            <p className="text-lg text-black max-w-3xl mx-auto sinchon-font">
              {t(`character.${characterName}.description`)}
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 items-center pt-[0px] pb-[0px] mt-[-15px] mb-[-15px] ml-[220px] mr-[220px]">
          <div className={`space-y-3 ${!isYaki ? 'md:order-2' : ''}`}>
            <h3 
              className="text-3xl font-bold text-black sinchon-font"
            >
              {t(`character.${characterName}.personality`)}
            </h3>
            <div className="space-y-2">
              {character.personality.map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index % 4 === 0 ? (isYaki ? 'bg-yellow-400' : 'bg-blue-400') :
                    index % 4 === 1 ? 'bg-pink-400' :
                    index % 4 === 2 ? 'bg-green-400' : 'bg-purple-400'
                  }`}></div>
                  <span className="text-lg text-black sinchon-font">{trait}</span>
                </div>
              ))}
            </div>
          </div>
          
          {mainGif && (
            <div className={`character-card rounded-3xl p-6 ${!isYaki ? 'md:order-1' : ''}`}>
              <img 
                src={mainGif.url} 
                alt={mainGif.title} 
                className="w-full h-80 object-contain rounded-2xl mt-[-18px] mb-[-18px]" 
              />
              <div className="text-center">
                <h4 
                  className="text-xl font-bold text-black mb-1 sinchon-font"
                >
                  {mainGif.title}
                </h4>
                <p className="text-black sinchon-font">
                  {isYaki ? "Yaki loves to share hearts and positive vibes" : "Dori loves sharing kisses and spreading love"}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
