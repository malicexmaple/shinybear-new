import { useQuery } from "@tanstack/react-query";
import { Character, Gif } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import characterBackground from "@assets/5c89c3_a238bc5784294ab4a208adf22de1ca03~mv2_d_3508_2480_s_4_2_1751637207667.png";
import characterBackgroundBlue from "@assets/5c89c3_bb89df4410964acd9c27b6df5e796547~mv2_d_3508_2480_s_4_2_1751637395119.png";
import characterBackgroundPink from "@assets/Untitled-7_1751637493174.png";

interface CharacterSectionProps {
  characterName: string;
  useYellowBackground?: boolean;
  useBlueBackground?: boolean;
  usePinkBackground?: boolean;
}

export default function CharacterSection({ characterName, useYellowBackground = false, useBlueBackground = false, usePinkBackground = false }: CharacterSectionProps) {
  const { t, translateGifTitle, translatePersonality } = useLanguage();
  const { data: characters, isLoading: charactersLoading } = useQuery<Character[]>({
    queryKey: ["/api/characters"],
  });

  const character = characters?.find(c => {
    const name = c.name.toLowerCase();
    const searchName = characterName.toLowerCase();
    return name === searchName || 
           (searchName === 'yaki' && name === 'sickyaki') ||
           (searchName === 'dori' && name === 'pingdori') ||
           (searchName === 'sickyaki' && name === 'sickyaki') ||
           (searchName === 'pingdori' && name === 'pingdori');
  });

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

  // Map character names to translation keys
  const getTranslationKey = (name: string) => {
    if (name === 'sickyaki' || name === 'yaki') return 'yaki';
    if (name === 'pingdori' || name === 'dori') return 'dori';
    return name;
  };
  
  const translationKey = getTranslationKey(characterName);
  const isYaki = translationKey === 'yaki';
  const mainGif = isYaki 
    ? gifs?.[0] 
    : gifs?.find(gif => gif.title === 'Dori Kawai') || gifs?.[0];

  let backgroundImage = null;
  let hasBackground = false;
  
  if (useYellowBackground) {
    backgroundImage = "/attached_assets/5c89c3_a238bc5784294ab4a208adf22de1ca03~mv2_d_3508_2480_s_4_2_1751637207667.png";
    hasBackground = true;
  } else if (useBlueBackground) {
    backgroundImage = "/attached_assets/5c89c3_bb89df4410964acd9c27b6df5e796547~mv2_d_3508_2480_s_4_2_1751637395119.png";
    hasBackground = true;
  } else if (usePinkBackground) {
    backgroundImage = "/attached_assets/Untitled-7_1751637493174.png";
    hasBackground = true;
  }

  return (
    <section 
      id={characterName}
      className="w-full relative block"
      style={{
        backgroundImage: hasBackground ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundColor: hasBackground ? 'transparent' : 'white',
        height: '50vh',
        minHeight: '300px',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        padding: '0',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box'
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center h-full">
        <div className="text-center mb-2 flex flex-col items-center">
          <h2 
            className="text-4xl md:text-[60px] font-bold mb-2 text-[#000000] sinchon-font wiggle-pulse-text animate-wiggle-pulse"
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
        
        <div className="grid md:grid-cols-2 gap-4 items-center pt-[0px] pb-[0px] mt-[-5px] mb-[-5px] mx-auto max-w-4xl">
          <div className={`space-y-3 ${!isYaki ? 'md:order-2' : ''}`}>
            <h3 
              className="text-xl md:text-2xl font-bold text-black sinchon-font animate-wiggle-pulse-fast"
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
                  <span className="text-base md:text-lg text-black sinchon-font">{translatePersonality(trait)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {mainGif && (
            <div className={`character-card rounded-3xl p-6 ${!isYaki ? 'md:order-1' : ''}`}>
              <img 
                src={mainGif.url} 
                alt={mainGif.title} 
                className="w-full h-40 object-contain rounded-2xl mt-[-18px] mb-[-18px]" 
              />
              <div className="text-center">
                <h4 
                  className="text-lg md:text-xl font-bold text-black mb-1 sinchon-font animate-wiggle-pulse-alt"
                >
                  {translateGifTitle(mainGif.title)}
                </h4>
                <p className="text-sm md:text-base text-black sinchon-font">
                  {isYaki ? t('character.yaki.gifDescription') : t('character.dori.gifDescription')}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
