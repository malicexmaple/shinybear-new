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
    'nav.title': 'Sickyaki & Pingdori',
    'nav.home': 'Home',
    'nav.yaki': 'Sickyaki',
    'nav.dori': 'Pingdori',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.instagram': 'Instagram',
    
    // Hero Section
    'hero.title': 'Sickyaki & Pingdori',
    'hero.subtitle': 'Two hearts, one love story - the cutest kawaii couple bringing joy to your day!',
    'hero.videoDescription': 'Watch our adorable characters in action!',
    'hero.exploreButton': 'Explore Our World',
    
    // Character Sections
    'character.yaki.name': 'Sickyaki',
    'character.yaki.type': 'Little Chick',
    'character.yaki.personality': 'Cheerful & Energetic',
    'character.yaki.description': 'Meet Sickyaki, the adorable yellow chick who loves to dance and share special moments with her beloved companion Pingdori!',
    'character.dori.name': 'Pingdori',
    'character.dori.type': 'Baby Penguin',
    'character.dori.personality': 'Sweet & Loving',
    'character.dori.description': 'Say hello to Pingdori, the cutest white penguin who shares an unbreakable bond with Sickyaki and loves expressing affection!',
    
    // Gallery Section
    'gallery.title': 'Gif Gallery',
    'gallery.subtitle': 'Discover our collection of kawaii GIFs',
    'gallery.all': 'All',
    'gallery.yaki': 'Sickyaki',
    'gallery.dori': 'Pingdori',
    
    // About Section
    'about.title': 'About Sickyaki & Pingdori',
    'about.story': 'Born from a love of kawaii culture and adorable characters, Sickyaki & Pingdori have captured hearts around the world with their charming animations and playful personalities.',
    'about.mission': 'Our mission is to spread joy and cuteness through these loveable characters, bringing smiles to people of all ages.',
    'about.creator': 'Created with love for the kawaii community',
    
    // Instagram Section
    'instagram.title': 'Instagram Feed',
    'instagram.subtitle': 'Stay updated with the latest Yaki & Dori adventures on Instagram',
    
    // Footer
    'footer.copyright': '© 2024 Yaki & Dori. Made with love for kawaii fans worldwide.',
    
    // Contract Address
    'contract.label': 'CA:',
    'contract.copy': 'Copy to clipboard',
    
    // Character GIF descriptions
    'character.yaki.gifDescription': 'Sickyaki loves sharing hearts and sweet moments with her dear Pingdori',
    'character.dori.gifDescription': 'Pingdori loves giving kisses and expressing love to his beloved Sickyaki',
    
    // Gallery section
    'gallery.showMore': 'Show More',
    'gallery.showLess': 'Show Less',
    
    // About section
    'about.beginning': 'The Beginning',
    'about.giphyViews': '925.4M+ GIF Views',
    'about.meetCreator': 'Meet the Creator',
  },
  ko: {
    // Navigation
    'nav.title': '식야키 & 핑도리',
    'nav.home': '홈',
    'nav.yaki': '식야키',
    'nav.dori': '핑도리',
    'nav.gallery': '갤러리',
    'nav.about': '소개',
    'nav.instagram': '인스타그램',
    
    // Hero Section
    'hero.title': '식야키 & 핑도리',
    'hero.subtitle': '두 마음, 하나의 사랑 이야기 - 당신의 하루에 기쁨을 가져다주는 가장 귀여운 카와이 커플!',
    'hero.videoDescription': '우리의 사랑스러운 캐릭터들을 만나보세요!',
    'hero.exploreButton': '우리 세상 탐험하기',
    
    // Character Sections
    'character.yaki.name': '식야키',
    'character.yaki.type': '작은 병아리',
    'character.yaki.personality': '밝고 활기찬',
    'character.yaki.description': '춤추기를 좋아하고 사랑하는 동반자 핑도리와 특별한 순간을 나누는 사랑스러운 노란 병아리 식야키를 만나보세요!',
    'character.dori.name': '핑도리',
    'character.dori.type': '아기 펭귄',
    'character.dori.personality': '달콤하고 사랑스러운',
    'character.dori.description': '식야키와 끊을 수 없는 유대감을 공유하고 애정 표현을 좋아하는 가장 귀여운 하얀 펭귄 핑도리에게 인사해보세요!',
    
    // Gallery Section
    'gallery.title': 'Gif 갤러리',
    'gallery.subtitle': '우리의 카와이 GIF 컬렉션을 둘러보세요',
    'gallery.all': '전체',
    'gallery.yaki': '식야키',
    'gallery.dori': '핑도리',
    
    // About Section
    'about.title': '식야키 & 핑도리 소개',
    'about.story': '카와이 문화와 사랑스러운 캐릭터에 대한 사랑에서 태어난 식야키 & 핑도리는 매력적인 애니메이션과 장난기 많은 성격으로 전 세계 사람들의 마음을 사로잡았습니다.',
    'about.mission': '우리의 사명은 이 사랑스러운 캐릭터들을 통해 기쁨과 귀여움을 전파하여 모든 연령대의 사람들에게 미소를 선사하는 것입니다.',
    'about.creator': '카와이 커뮤니티를 위해 사랑으로 제작되었습니다',
    
    // Instagram Section
    'instagram.title': '인스타그램 피드',
    'instagram.subtitle': '인스타그램에서 식야키 & 핑도리의 최신 모험을 만나보세요',
    
    // Footer
    'footer.copyright': '© 2024 식야키 & 핑도리. 전 세계 카와이 팬들을 위해 사랑으로 제작되었습니다.',
    
    // Contract Address
    'contract.label': 'CA:',
    'contract.copy': '클립보드에 복사',
    
    // Character GIF descriptions
    'character.yaki.gifDescription': '야키는 사랑하는 도리와 하트와 달콤한 순간을 나누는 것을 좋아해요',
    'character.dori.gifDescription': '도리는 사랑하는 야키에게 키스하고 사랑을 표현하는 것을 좋아해요',
    
    // Gallery section
    'gallery.showMore': '더 보기',
    'gallery.showLess': '접기',
    
    // About section
    'about.beginning': '시작',
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