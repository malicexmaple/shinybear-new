import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateGifTitle: (title: string) => string;
  translateTag: (tag: string) => string;
  translatePersonality: (trait: string) => string;
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
    'hero.subtitle': '',
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
    'contract.label': 'COMING SOON',
    'contract.copy': 'Copy to clipboard',
    
    // Character GIF descriptions
    'character.yaki.gifDescription': 'Sickyaki loves sharing hearts and sweet moments with her dear Pingdori',
    'character.dori.gifDescription': 'Pingdori loves giving kisses and expressing love to his beloved Sickyaki',
    
    // Gallery section
    'gallery.showMore': 'Show More',
    'gallery.showLess': 'Show Less',
    'gallery.moreCount': 'more',
    
    // About section
    'about.beginning': 'The Beginning',
    'about.giphyViews': '925.4M+ GIF Views',
    'about.meetCreator': 'Meet the Creator',
    
    // Navigation links
    'nav.casetify': 'Casetify',
    
    // About section additional
    'about.characterCreator': 'Character Creator',
    
    // GIF Action translations
    'gif.yaki': 'Sickyaki',
    'gif.dori': 'Pingdori',
    'gif.dancing': 'Dancing',
    'gif.love': 'Love',
    'gif.kiss': 'Kiss',
    'gif.excited': 'Excited',
    'gif.sad': 'Sad',
    'gif.heart': 'Heart',
    'gif.chick': 'Chick',
    'gif.gas': 'Gas',
    'gif.shake': 'Shake',
    'gif.jump': 'Jump',
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
    'hero.subtitle': '',
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
    'contract.label': 'COMING SOON',
    'contract.copy': '클립보드에 복사',
    
    // Character GIF descriptions
    'character.yaki.gifDescription': '식야키는 사랑하는 핑도리와 하트와 달콤한 순간을 나누는 것을 좋아해요',
    'character.dori.gifDescription': '핑도리는 사랑하는 식야키에게 키스하고 사랑을 표현하는 것을 좋아해요',
    
    // Gallery section
    'gallery.showMore': '더 보기',
    'gallery.showLess': '접기',
    'gallery.moreCount': '개 더',
    
    // About section
    'about.beginning': '시작',
    'about.giphyViews': '9억 2540만+ GIF 조회수',
    'about.meetCreator': '크리에이터 만나기',
    
    // Navigation links
    'nav.casetify': '케이스티파이',
    
    // About section additional
    'about.characterCreator': '캐릭터 크리에이터',
    
    // Character personality translations
    'personality.round_gray_penguin': '식야키를 돌보는 동그란 회색 펭귄',
    'personality.gentle_nurturing': '부드럽고 돌봄이 많은 동반자',
    'personality.massaging_comforting': '자주 야키를 마사지해주거나 위로해주는 모습',
    'personality.unconditional_friendship': '무조건적인 우정과 지지를 상징하는',
    'personality.small_weak_chick': '구겨지기 쉬운 작고 약한 병아리',
    'personality.no_energy_problems': '문제를 심각하게 받아들일 에너지가 없는',
    'personality.desolate_city_adapting': '황량한 도시에서 자신만의 방식으로 적응하며 살아가는',
    'personality.shy_sleepy_bottom': '수줍음이 많고 졸린 성격에 독특한 복숭아 모양 엉덩이가 특징인',

    // GIF Action translations
    'gif.yaki': '식야키',
    'gif.dori': '핑도리',
    'gif.dancing': '댄싱',
    'gif.love': '러브',
    'gif.kiss': '키스',
    'gif.excited': '신나는',
    'gif.sad': '슬픈',
    'gif.heart': '하트',
    'gif.chick': '병아리',
    'gif.gas': '가스',
    'gif.shake': '흔들기',
    'gif.jump': '점프',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const translateGifTitle = (title: string): string => {
    if (language === 'en') return title;
    
    let translatedTitle = title;
    
    // Replace character names
    translatedTitle = translatedTitle.replace(/\bYaki\b/g, t('gif.yaki'));
    translatedTitle = translatedTitle.replace(/\bDori\b/g, t('gif.dori'));
    
    // Replace common action words
    translatedTitle = translatedTitle.replace(/\bDancing\b/gi, t('gif.dancing'));
    translatedTitle = translatedTitle.replace(/\bLove\b/gi, t('gif.love'));
    translatedTitle = translatedTitle.replace(/\bKiss\b/gi, t('gif.kiss'));
    translatedTitle = translatedTitle.replace(/\bExcited\b/gi, t('gif.excited'));
    translatedTitle = translatedTitle.replace(/\bSad\b/gi, t('gif.sad'));
    translatedTitle = translatedTitle.replace(/\bHeart\b/gi, t('gif.heart'));
    translatedTitle = translatedTitle.replace(/\bChick\b/gi, t('gif.chick'));
    translatedTitle = translatedTitle.replace(/\bGas\b/gi, t('gif.gas'));
    translatedTitle = translatedTitle.replace(/\bShake\b/gi, t('gif.shake'));
    translatedTitle = translatedTitle.replace(/\bShaking\b/gi, '흔들기');
    translatedTitle = translatedTitle.replace(/\bJump\b/gi, t('gif.jump'));
    translatedTitle = translatedTitle.replace(/\bVote\b/gi, '투표');
    translatedTitle = translatedTitle.replace(/\bPeace\b/gi, '평화');
    translatedTitle = translatedTitle.replace(/\bSpank\b/gi, '때리기');
    translatedTitle = translatedTitle.replace(/\bPlayful\b/gi, '장난스러운');
    translatedTitle = translatedTitle.replace(/\bKawaii\b/gi, '카와이');
    translatedTitle = translatedTitle.replace(/\bSing\b/gi, '노래');
    translatedTitle = translatedTitle.replace(/\bSinging\b/gi, '노래');
    translatedTitle = translatedTitle.replace(/\bWay\b/gi, '길');
    translatedTitle = translatedTitle.replace(/\bBack\b/gi, '돌아가기');
    translatedTitle = translatedTitle.replace(/\bHome\b/gi, '집');
    translatedTitle = translatedTitle.replace(/\bMiss\b/gi, '그리워');
    translatedTitle = translatedTitle.replace(/\bYou\b/gi, '너를');
    translatedTitle = translatedTitle.replace(/\bSick\b/gi, '아픈');
    translatedTitle = translatedTitle.replace(/\bWorkout\b/gi, '운동');
    translatedTitle = translatedTitle.replace(/\bExercise\b/gi, '운동');
    translatedTitle = translatedTitle.replace(/\bDown\b/gi, '다운');
    translatedTitle = translatedTitle.replace(/\bTwerking\b/gi, '트워킹');
    translatedTitle = translatedTitle.replace(/\bBox\b/gi, '박스');
    translatedTitle = translatedTitle.replace(/\bHiding\b/gi, '숨기');
    translatedTitle = translatedTitle.replace(/\bHeadphones\b/gi, '헤드폰');
    translatedTitle = translatedTitle.replace(/\bMusic\b/gi, '음악');
    translatedTitle = translatedTitle.replace(/\bRetro\b/gi, '레트로');
    translatedTitle = translatedTitle.replace(/\bClassic\b/gi, '클래식');
    translatedTitle = translatedTitle.replace(/\bVintage\b/gi, '빈티지');
    translatedTitle = translatedTitle.replace(/\bLunch\b/gi, '점심');
    translatedTitle = translatedTitle.replace(/\bComputer\b/gi, '컴퓨터');
    translatedTitle = translatedTitle.replace(/\bAmazing\b/gi, '놀라운');
    translatedTitle = translatedTitle.replace(/\bWow\b/gi, '와우');
    translatedTitle = translatedTitle.replace(/\bRocket\b/gi, '로켓');
    translatedTitle = translatedTitle.replace(/\bJoy\b/gi, '기쁨');
    translatedTitle = translatedTitle.replace(/\bEating\b/gi, '먹기');
    translatedTitle = translatedTitle.replace(/\bFood\b/gi, '음식');
    translatedTitle = translatedTitle.replace(/\bCutie\b/gi, '귀염둥이');
    translatedTitle = translatedTitle.replace(/\bPatootie\b/gi, '꼬마');
    
    return translatedTitle;
  };

  const translatePersonality = (trait: string): string => {
    if (language === 'en') return trait;
    
    // Map English personality traits to Korean translations
    const personalityMap: { [key: string]: string } = {
      'Round gray penguin who cares for Sickyaki': t('personality.round_gray_penguin'),
      'Gentle and nurturing companion': t('personality.gentle_nurturing'),
      'Often shown massaging or comforting Yaki': t('personality.massaging_comforting'),
      'Embodies unconditional friendship and support': t('personality.unconditional_friendship'),
      'A small, weak chick that is crinkly': t('personality.small_weak_chick'),
      'Doesn\'t have energy to take problems seriously': t('personality.no_energy_problems'),
      'Lives in a desolate city, adapting in her own way': t('personality.desolate_city_adapting'),
      'Shy and sleepy with a distinctive peach-shaped bottom': t('personality.shy_sleepy_bottom')
    };
    
    return personalityMap[trait] || trait;
  };

  const translateTag = (tag: string): string => {
    if (language === 'en') return tag;
    
    // Translate common GIF tags to Korean
    const tagTranslations: { [key: string]: string } = {
      'dancing': '댄싱',
      'love': '러브',
      'kiss': '키스',
      'excited': '신남',
      'sad': '슬픔',
      'heart': '하트',
      'chick': '병아리',
      'gas': '가스',
      'shake': '흔들기',
      'shaking': '흔들기',
      'jump': '점프',
      'jumping': '점프',
      'happy': '행복',
      'cute': '귀여움',
      'funny': '재미',
      'bounce': '튀기',
      'lying': '누움',
      'floating': '둥둥',
      'work': '일',
      'busy': '바쁨',
      'paper': '종이',
      'note': '노트',
      'fun': '재미',
      'vote': '투표',
      'peace': '평화',
      'spank': '때리기',
      'playful': '장난스러운',
      'kawaii': '카와이',
      'sing': '노래',
      'singing': '노래',
      'way': '길',
      'back': '돌아가기',
      'home': '집',
      'miss': '그리워',
      'you': '너를',
      'sick': '아픈',
      'yaki': '야키',
      'workout': '운동',
      'exercise': '운동',
      'down': '다운',
      'twerking': '트워킹',
      'box': '박스',
      'hiding': '숨기',
      'headphones': '헤드폰',
      'music': '음악',
      'retro': '레트로',
      'classic': '클래식',
      'vintage': '빈티지',
      'lunch': '점심',
      'computer': '컴퓨터',
      'amazing': '놀라운',
      'wow': '와우',
      'rocket': '로켓',
      'joy': '기쁨',
      'eating': '먹기',
      'food': '음식',
      'cutie': '귀염둥이',
      'patootie': '꼬마'
    };
    
    return tagTranslations[tag.toLowerCase()] || tag;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateGifTitle, translateTag, translatePersonality }}>
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