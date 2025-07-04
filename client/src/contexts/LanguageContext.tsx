import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh';

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
  zh: {
    // Navigation
    'nav.title': '病鸡 & 胖企鹅',
    'nav.home': '首页',
    'nav.yaki': '病鸡',
    'nav.dori': '胖企鹅',
    'nav.gallery': '图库',
    'nav.about': '关于',
    'nav.instagram': 'Instagram',
    
    // Hero Section
    'hero.title': '病鸡 & 胖企鹅',
    'hero.subtitle': '',
    'hero.videoDescription': '快来认识我们可爱的角色们！',
    'hero.exploreButton': '探索我们的世界',
    
    // Character Sections
    'character.yaki.name': '病鸡',
    'character.yaki.type': '小鸡',
    'character.yaki.personality': '开朗活泼',
    'character.yaki.description': '认识病鸡，这只可爱的黄色小鸡喜欢跳舞，也喜欢与心爱的同伴胖企鹅分享特殊时刻！',
    'character.dori.name': '胖企鹅',
    'character.dori.type': '小企鹅',
    'character.dori.personality': '甜蜜可爱',
    'character.dori.description': '跟胖企鹅打个招呼吧！这只最可爱的白色企鹅与病鸡有着不可分割的纽带，喜欢表达爱意！',
    
    // Gallery Section
    'gallery.title': 'GIF 图库',
    'gallery.subtitle': '探索我们的可爱 GIF 收藏',
    'gallery.all': '全部',
    'gallery.yaki': '病鸡',
    'gallery.dori': '胖企鹅',
    
    // About Section
    'about.title': '关于病鸡 & 胖企鹅',
    'about.story': '病鸡和胖企鹅诞生于对卡哇伊文化和可爱角色的热爱，凭借迷人的动画和顽皮的性格俘获了全世界人们的心。',
    'about.mission': '我们的使命是通过这些可爱的角色传播快乐和可爱，为各个年龄段的人们带来微笑。',
    'about.creator': '为卡哇伊社区用爱制作',
    
    // Instagram Section
    'instagram.title': 'Instagram 动态',
    'instagram.subtitle': '在 Instagram 上关注病鸡和胖企鹅的最新冒险',
    
    // Footer
    'footer.copyright': '© 2024 病鸡 & 胖企鹅. 为全世界的卡哇伊粉丝用爱制作。',
    
    // Contract Address
    'contract.label': '即将推出',
    'contract.copy': '复制到剪贴板',
    
    // Character GIF descriptions
    'character.yaki.gifDescription': '病鸡喜欢与心爱的胖企鹅分享心形和甜蜜时刻',
    'character.dori.gifDescription': '胖企鹅喜欢给心爱的病鸡亲吻和表达爱意',
    
    // Gallery section
    'gallery.showMore': '显示更多',
    'gallery.showLess': '收起',
    'gallery.moreCount': '个更多',
    
    // About section
    'about.beginning': '开始',
    'about.giphyViews': '9.254亿+ GIF 浏览量',
    'about.meetCreator': '认识创作者',
    
    // Navigation links
    'nav.casetify': 'Casetify',
    
    // About section additional
    'about.characterCreator': '角色创造者',
    
    // Character personality translations
    'personality.round_gray_penguin': '照顾病鸡的圆圆的灰色企鹅',
    'personality.gentle_nurturing': '温和善良的伙伴',
    'personality.massaging_comforting': '经常给病鸡按摩或安慰的样子',
    'personality.unconditional_friendship': '象征无条件友谊和支持',
    'personality.small_weak_chick': '容易受伤的小小弱鸡',
    'personality.no_energy_problems': '没有精力认真对待问题',
    'personality.desolate_city_adapting': '在荒凉的城市里以自己的方式适应生活',
    'personality.shy_sleepy_bottom': '害羞嗜睡，有着独特桃子形状屁股的特征',

    // GIF Action translations
    'gif.yaki': '病鸡',
    'gif.dori': '胖企鹅',
    'gif.dancing': '跳舞',
    'gif.love': '爱',
    'gif.kiss': '亲吻',
    'gif.excited': '兴奋',
    'gif.sad': '伤心',
    'gif.heart': '心形',
    'gif.chick': '小鸡',
    'gif.gas': '气体',
    'gif.shake': '摇摆',
    'gif.jump': '跳跃',
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
    translatedTitle = translatedTitle.replace(/\bShaking\b/gi, '摇摆');
    translatedTitle = translatedTitle.replace(/\bJump\b/gi, t('gif.jump'));
    translatedTitle = translatedTitle.replace(/\bVote\b/gi, '投票');
    translatedTitle = translatedTitle.replace(/\bPeace\b/gi, '和平');
    translatedTitle = translatedTitle.replace(/\bSpank\b/gi, '打击');
    translatedTitle = translatedTitle.replace(/\bPlayful\b/gi, '顽皮');
    translatedTitle = translatedTitle.replace(/\bKawaii\b/gi, '可爱');
    translatedTitle = translatedTitle.replace(/\bSing\b/gi, '唱歌');
    translatedTitle = translatedTitle.replace(/\bSinging\b/gi, '唱歌');
    translatedTitle = translatedTitle.replace(/\bWay\b/gi, '道路');
    translatedTitle = translatedTitle.replace(/\bBack\b/gi, '回来');
    translatedTitle = translatedTitle.replace(/\bHome\b/gi, '家');
    translatedTitle = translatedTitle.replace(/\bMiss\b/gi, '想念');
    translatedTitle = translatedTitle.replace(/\bYou\b/gi, '你');
    translatedTitle = translatedTitle.replace(/\bSick\b/gi, '生病');
    translatedTitle = translatedTitle.replace(/\bWorkout\b/gi, '锻炼');
    translatedTitle = translatedTitle.replace(/\bExercise\b/gi, '运动');
    translatedTitle = translatedTitle.replace(/\bDown\b/gi, '下来');
    translatedTitle = translatedTitle.replace(/\bTwerking\b/gi, '扭动');
    translatedTitle = translatedTitle.replace(/\bBox\b/gi, '盒子');
    translatedTitle = translatedTitle.replace(/\bHiding\b/gi, '隐藏');
    translatedTitle = translatedTitle.replace(/\bHeadphones\b/gi, '耳机');
    translatedTitle = translatedTitle.replace(/\bMusic\b/gi, '音乐');
    translatedTitle = translatedTitle.replace(/\bRetro\b/gi, '复古');
    translatedTitle = translatedTitle.replace(/\bClassic\b/gi, '经典');
    translatedTitle = translatedTitle.replace(/\bVintage\b/gi, '复古');
    translatedTitle = translatedTitle.replace(/\bLunch\b/gi, '午餐');
    translatedTitle = translatedTitle.replace(/\bComputer\b/gi, '电脑');
    translatedTitle = translatedTitle.replace(/\bAmazing\b/gi, '惊人');
    translatedTitle = translatedTitle.replace(/\bWow\b/gi, '哇');
    translatedTitle = translatedTitle.replace(/\bRocket\b/gi, '火箭');
    translatedTitle = translatedTitle.replace(/\bJoy\b/gi, '快乐');
    translatedTitle = translatedTitle.replace(/\bEating\b/gi, '吃饭');
    translatedTitle = translatedTitle.replace(/\bFood\b/gi, '食物');
    translatedTitle = translatedTitle.replace(/\bCutie\b/gi, '可爱');
    translatedTitle = translatedTitle.replace(/\bPatootie\b/gi, '小宝贝');
    
    return translatedTitle;
  };

  const translatePersonality = (trait: string): string => {
    if (language === 'en') return trait;
    
    // Map English personality traits to Chinese translations
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
    
    // Translate common GIF tags to Chinese
    const tagTranslations: { [key: string]: string } = {
      'dancing': '跳舞',
      'love': '爱',
      'kiss': '亲吻',
      'excited': '兴奋',
      'sad': '伤心',
      'heart': '心形',
      'chick': '小鸡',
      'gas': '气体',
      'shake': '摇摆',
      'shaking': '摇摆',
      'jump': '跳跃',
      'jumping': '跳跃',
      'happy': '快乐',
      'cute': '可爱',
      'funny': '有趣',
      'bounce': '弹跳',
      'lying': '躺下',
      'floating': '飘浮',
      'work': '工作',
      'busy': '忙碌',
      'paper': '纸张',
      'note': '笔记',
      'fun': '有趣',
      'vote': '投票',
      'peace': '和平',
      'spank': '打击',
      'playful': '顽皮',
      'kawaii': '可爱',
      'sing': '唱歌',
      'singing': '唱歌',
      'way': '道路',
      'back': '回来',
      'home': '家',
      'miss': '想念',
      'you': '你',
      'sick': '生病',
      'yaki': '病鸡',
      'workout': '锻炼',
      'exercise': '运动',
      'down': '下来',
      'twerking': '扭动',
      'box': '盒子',
      'hiding': '隐藏',
      'headphones': '耳机',
      'music': '音乐',
      'retro': '复古',
      'classic': '经典',
      'vintage': '复古',
      'lunch': '午餐',
      'computer': '电脑',
      'amazing': '惊人',
      'wow': '哇',
      'rocket': '火箭',
      'joy': '快乐',
      'eating': '吃饭',
      'food': '食物',
      'cutie': '可爱',
      'patootie': '小宝贝'
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