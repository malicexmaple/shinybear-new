import { useQuery } from "@tanstack/react-query";
import { Character, Gif } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
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
        minHeight: '70vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        padding: usePinkBackground ? '120px 20px 60px 20px' : '60px 20px',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box'
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center h-full">

        <div className="text-center mb-2 flex flex-col items-center">
          <h2 
            className="text-4xl md:text-[60px] font-bold mb-1 text-[#000000] sinchon-font animate-wiggle-pulse"
            style={{ 
              textShadow: '2px 2px 0px #ffffff, -2px -2px 0px #ffffff, 2px -2px 0px #ffffff, -2px 2px 0px #ffffff, 1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff',
              marginTop: '30px'
            }}
          >
            {t(`character.${characterName}.name`)}
          </h2>
          <div className="space-y-0">
            <p className="text-sm font-semibold text-black uppercase tracking-wide sinchon-font"
               style={{ 
                 textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff'
               }}>
              {t(`character.${characterName}.type`)}
            </p>
            <p className="text-lg text-black max-w-3xl mx-auto sinchon-font"
               style={{ 
                 textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff',
                 marginTop: '60px'
               }}>
              {t(`character.${characterName}.description`)}
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 items-center justify-items-center pt-1 pb-1 mt-0 mb-0 mx-auto max-w-5xl">
          <div className={`space-y-2 ${!isYaki ? 'md:order-2' : ''} flex flex-col justify-center`}>
            <h3 
              className="text-xl md:text-2xl font-bold text-black sinchon-font animate-wiggle-pulse-fast"
              style={{ 
                textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff'
              }}
            >
              {t(`character.${characterName}.personality`)}
            </h3>
            <div className="space-y-1">
              {character.personality.map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index % 4 === 0 ? (isYaki ? 'bg-yellow-400' : 'bg-blue-400') :
                    index % 4 === 1 ? 'bg-pink-400' :
                    index % 4 === 2 ? 'bg-green-400' : 'bg-purple-400'
                  }`}></div>
                  <span className="text-base md:text-lg text-black sinchon-font"
                        style={{ 
                          textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff'
                        }}>{translatePersonality(trait)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {mainGif && (
            <div className={`character-card rounded-3xl p-6 ${!isYaki ? 'md:order-1' : ''} transform scale-[0.7] origin-center`}>
              <img 
                src={isYaki && usePinkBackground ? "/attached_assets/face panda Sticker by Shiny bear_1751641007580.gif" : mainGif.url} 
                alt={mainGif.title} 
                className="w-auto h-auto max-w-full rounded-2xl mt-[-18px] mb-[-18px] mx-auto transform scale-[0.7]" 
              />
              <div className="text-center">
                <h4 
                  className="text-lg md:text-xl font-bold text-black mb-1 sinchon-font animate-wiggle-pulse-alt"
                  style={{ 
                    textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff'
                  }}
                >
                  {translateGifTitle(mainGif.title)}
                </h4>
                <p className="text-sm md:text-base text-black sinchon-font"
                   style={{ 
                     textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff'
                   }}>
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
