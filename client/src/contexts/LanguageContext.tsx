import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.title': 'Yaki & Dori',
    'nav.home': 'Home',
    'nav.yaki': 'Yaki',
    'nav.dori': 'Dori',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.instagram': 'Instagram',
    
    // Hero Section
    'hero.title': 'Yaki & Dori',
    'hero.subtitle': 'The cutest kawaii characters bringing joy to your day!',
    'hero.videoDescription': 'Watch our adorable characters in action!',
    'hero.exploreButton': 'Explore Our World',
    
    // Character Sections
    'character.yaki.name': 'Yaki',
    'character.yaki.type': 'Little Chick',
    'character.yaki.personality': 'Cheerful & Energetic',
    'character.yaki.description': 'Meet Yaki, the adorable yellow chick who loves to dance and spread happiness wherever she goes!',
    'character.dori.name': 'Dori',
    'character.dori.type': 'Baby Penguin',
    'character.dori.personality': 'Sweet & Playful',
    'character.dori.description': 'Say hello to Dori, the cutest white penguin who brings smiles and loves making new friends!',
    
    // Gallery Section
    'gallery.title': 'GIF Gallery',
    'gallery.subtitle': 'Discover our collection of kawaii GIFs',
    'gallery.all': 'All',
    'gallery.yaki': 'Yaki',
    'gallery.dori': 'Dori',
    
    // About Section
    'about.title': 'About Yaki & Dori',
    'about.story': 'Born from a love of kawaii culture and adorable characters, Yaki & Dori have captured hearts around the world with their charming animations and playful personalities.',
    'about.mission': 'Our mission is to spread joy and cuteness through these loveable characters, bringing smiles to people of all ages.',
    'about.creator': 'Created with love for the kawaii community',
    
    // Instagram Section
    'instagram.title': 'Follow Our Journey',
    'instagram.subtitle': 'Stay updated with the latest Yaki & Dori adventures on Instagram',
    
    // Footer
    'footer.copyright': '© 2024 Yaki & Dori. Made with love for kawaii fans worldwide.',
  },
  ko: {
    // Navigation
    'nav.title': '야키 & 도리',
    'nav.home': '홈',
    'nav.yaki': '야키',
    'nav.dori': '도리',
    'nav.gallery': '갤러리',
    'nav.about': '소개',
    'nav.instagram': '인스타그램',
    
    // Hero Section
    'hero.title': '야키 & 도리',
    'hero.subtitle': '당신의 하루에 기쁨을 가져다주는 가장 귀여운 카와이 캐릭터들!',
    'hero.videoDescription': '우리의 사랑스러운 캐릭터들을 만나보세요!',
    'hero.exploreButton': '우리 세상 탐험하기',
    
    // Character Sections
    'character.yaki.name': '야키',
    'character.yaki.type': '작은 병아리',
    'character.yaki.personality': '밝고 활기찬',
    'character.yaki.description': '춤추기를 좋아하고 어디서든 행복을 전파하는 사랑스러운 노란 병아리 야키를 만나보세요!',
    'character.dori.name': '도리',
    'character.dori.type': '아기 펭귄',
    'character.dori.personality': '달콤하고 장난기 많은',
    'character.dori.description': '미소를 선사하고 새로운 친구 사귀기를 좋아하는 가장 귀여운 하얀 펭귄 도리에게 인사해보세요!',
    
    // Gallery Section
    'gallery.title': 'GIF 갤러리',
    'gallery.subtitle': '우리의 카와이 GIF 컬렉션을 둘러보세요',
    'gallery.all': '전체',
    'gallery.yaki': '야키',
    'gallery.dori': '도리',
    
    // About Section
    'about.title': '야키 & 도리 소개',
    'about.story': '카와이 문화와 사랑스러운 캐릭터에 대한 사랑에서 태어난 야키 & 도리는 매력적인 애니메이션과 장난기 많은 성격으로 전 세계 사람들의 마음을 사로잡았습니다.',
    'about.mission': '우리의 사명은 이 사랑스러운 캐릭터들을 통해 기쁨과 귀여움을 전파하여 모든 연령대의 사람들에게 미소를 선사하는 것입니다.',
    'about.creator': '카와이 커뮤니티를 위해 사랑으로 제작되었습니다',
    
    // Instagram Section
    'instagram.title': '우리의 여정을 따라오세요',
    'instagram.subtitle': '인스타그램에서 야키 & 도리의 최신 모험을 만나보세요',
    
    // Footer
    'footer.copyright': '© 2024 야키 & 도리. 전 세계 카와이 팬들을 위해 사랑으로 제작되었습니다.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};