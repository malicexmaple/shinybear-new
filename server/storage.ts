import { users, characters, gifs, type User, type InsertUser, type Character, type InsertCharacter, type Gif, type InsertGif } from "@shared/schema";

export interface IStorage {
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Character methods
  getAllCharacters(): Promise<Character[]>;
  getCharacter(id: number): Promise<Character | undefined>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  
  // GIF methods
  getAllGifs(): Promise<Gif[]>;
  getGifsByCategory(category: string): Promise<Gif[]>;
  getGifsByCharacter(characterId: number): Promise<Gif[]>;
  createGif(gif: InsertGif): Promise<Gif>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private gifs: Map<number, Gif>;
  private currentUserId: number;
  private currentCharacterId: number;
  private currentGifId: number;
  private initialized: boolean = false;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.gifs = new Map();
    this.currentUserId = 1;
    this.currentCharacterId = 1;
    this.currentGifId = 1;
    
    // Initialize with Yaki and Dori data
    this.initializeData();
  }

  private async initializeData() {
    if (this.initialized) return;
    
    try {
      // Create Sickyaki character (original Korean name)
      const yaki = await this.createCharacter({
        name: "Sickyaki",
        type: "chick",
        color: "yellow",
        personality: ["A small, weak chick that is crinkly", "Doesn't have energy to take problems seriously", "Lives in a desolate city, adapting in her own way", "Shy and sleepy with a distinctive peach-shaped bottom"],
        description: "Sickyaki is a sickly yellow chick created by Korean artist Wookiema (@sick_yaki, 1M+ followers). She's gentle, vulnerable, and endearing - often shown being cared for by her penguin companion. Her peach-shaped bottom is her signature feature.",
        avatarUrl: "https://media1.giphy.com/media/7iEQNDmKV6xcbtymKd/giphy.gif"
      });

      // Create Pingdori character (original Korean name)  
      const dori = await this.createCharacter({
        name: "Pingdori", 
        type: "penguin",
        color: "gray",
        personality: ["Round gray penguin who cares for Sickyaki", "Gentle and nurturing companion", "Often shown massaging or comforting Yaki", "Embodies unconditional friendship and support"],
        description: "Pingdori is a round gray penguin who serves as Sickyaki's caring companion. Created by Korean artist Wookiema, Pingdori represents unconditional friendship and often takes care of the vulnerable Sickyaki in their daily slice-of-life adventures.",
        avatarUrl: "https://media3.giphy.com/media/p5fbSOd0S4DaG6iZpo/giphy.gif"
      });

      // All authentic GIFs from complete uploaded collection - comprehensive list with no duplicates
      const addedUrls = new Set<string>();
      const allAuthenticGifs = [
        // Current batch of Yaki GIFs - using verified file paths
        { title: "Yaki I Love You Chick", url: "/attached_assets/I Love You Chick Sticker_1751292334055.gif", category: "yaki", tags: ["love", "hearts", "phone"] },
        { title: "Yaki Gas Love", url: "/attached_assets/Gas Love Sticker_1751292334055.gif", category: "yaki", tags: ["gas", "love", "funny"] },
        { title: "Yaki Miss You Kiss", url: "/attached_assets/Miss You Kiss Sticker_1751292334055.gif", category: "yaki", tags: ["miss", "kiss", "love"] },
        { title: "Yaki Chick Spank", url: "/attached_assets/Chick Spank Sticker_1751292334055.gif", category: "yaki", tags: ["spank", "playful", "cute"] },
        { title: "Yaki Shake It", url: "/attached_assets/Shakeit Sticker_1751292334055.gif", category: "yaki", tags: ["shaking", "dancing", "wiggle"] },
        { title: "Yaki Voted Peace", url: "/attached_assets/Voted Sticker_1751292334055.gif", category: "yaki", tags: ["peace", "vote", "politics"] },
        { title: "Yaki Voted Paper", url: "/attached_assets/Voted Sticker(1)_1751292334055.gif", category: "yaki", tags: ["vote", "paper", "ballot"] },
        { title: "Dori Dancing", url: "/attached_assets/Penguin Dancingpenguin Sticker_1751292334055.gif", category: "dori", tags: ["dancing", "chick", "fun"] },
        { title: "Dori Gas", url: "/attached_assets/Penguin Gas Sticker_1751292334055.gif", category: "dori", tags: ["gas", "funny", "cute"] },
        
        // Additional GIFs with proper categorization
        { title: "Yaki Chick Dancing", url: "/attached_assets/Chick Dancing Sticker_1751292354200.gif", category: "yaki", tags: ["dancing", "excited", "fun"] },
        { title: "Yaki Excited Chick", url: "/attached_assets/Excited Chick Sticker_1751292354200.gif", category: "yaki", tags: ["excited", "happy", "lying"] },
        { title: "Yaki Chick Love Heart", url: "/attached_assets/Chick Love Sticker(1)_1751292354200.gif", category: "yaki", tags: ["love", "heart", "floating"] },
        { title: "Yaki Chick Love", url: "/attached_assets/Chick Love Sticker_1751292354200.gif", category: "yaki", tags: ["love", "heart", "cute"] },
        { title: "Yaki Sad To Do", url: "/attached_assets/Sad To Do Sticker_1751292354200.gif", category: "yaki", tags: ["sad", "busy", "work"] },
        { title: "Yaki Excited Jump", url: "/attached_assets/Excited Jump Sticker_1751292354200.gif", category: "yaki", tags: ["jumping", "excited", "bounce"] },
        { title: "Yaki I Love You Heart", url: "/attached_assets/I Love You Heart Sticker_1751292354200.gif", category: "yaki", tags: ["love", "heart", "lying"] },
        { title: "Yaki Love You Heart", url: "/attached_assets/Love You Heart Sticker_1751292354200.gif", category: "yaki", tags: ["love", "paper", "note"] },
        { title: "Yaki Chick Kawaii", url: "/attached_assets/Chick Kawai Sticker_1751292354200.gif", category: "yaki", tags: ["kawaii", "heart", "cute"] },
        { title: "Dori Kiss", url: "/attached_assets/Penguin Kiss Sticker_1751292354200.gif", category: "dori", tags: ["kiss", "love", "cuddle"] },
        { title: "Dori I Love You Heart", url: "/attached_assets/I Love You Heart Sticker(1)_1751292354200.gif", category: "dori", tags: ["love", "heart", "chick"] },
        { title: "Dori Excited Jump", url: "/attached_assets/Excited Jump Sticker(1)_1751292354200.gif", category: "dori", tags: ["jumping", "excited", "happy"] },
        { title: "Dori I Love You Kiss", url: "/attached_assets/I Love You Kiss Sticker_1751295478948.gif", category: "dori", tags: ["love", "kiss", "heart"] },
        { title: "Dori Kawaii", url: "/attached_assets/Penguin Kawai Sticker_1751342571422.gif", category: "dori", tags: ["kawaii", "chick", "cute"] },
        { title: "Dori Dancing 2", url: "/attached_assets/Penguin Dancingpenguin Sticker(1)_1751292354200.gif", category: "dori", tags: ["dancing", "chick", "excited"] },
        { title: "Yaki Sad Chick", url: "/attached_assets/Sad Chick Sticker_1751292354200.gif", category: "yaki", tags: ["sad", "upset", "down"] },
        { title: "Yaki Shakeit 2", url: "/attached_assets/Shakeit Sticker(1)_1751292354200.gif", category: "yaki", tags: ["shaking", "dancing", "wiggle"] },
        { title: "Yaki Sickyaki", url: "/attached_assets/Sickyaki Sticker_1751292354200.gif", category: "yaki", tags: ["sick", "unwell", "chick"] },
        { title: "Yaki Sing A Song", url: "/attached_assets/Sing A Song Singing Sticker_1751292354200.gif", category: "yaki", tags: ["singing", "music", "performance"] },
      ];

      // Process GIFs with deduplication
      const yakiGifs: any[] = [];
      const doriGifs: any[] = [];
      const togetherGifs: any[] = [];

      for (const gif of allAuthenticGifs) {
        if (!addedUrls.has(gif.url)) {
          addedUrls.add(gif.url);
          
          if (gif.category === 'yaki') {
            yakiGifs.push(gif);
          } else if (gif.category === 'dori') {
            doriGifs.push(gif);
          } else if (gif.category === 'together') {
            togetherGifs.push(gif);
          }
        }
      }

      // Create all GIFs after deduplication
      for (const gif of yakiGifs) {
        await this.createGif({ ...gif, characterId: yaki.id });
      }
      
      for (const gif of doriGifs) {
        await this.createGif({ ...gif, characterId: dori.id });
      }
      
      for (const gif of togetherGifs) {
        await this.createGif({ ...gif, characterId: null });
      }
      
      this.initialized = true;
      console.log(`Initialized storage with ${this.gifs.size} GIFs`);
    } catch (error) {
      console.error('Error initializing storage:', error);
      this.initialized = false;
    }
  }

  // User methods (existing)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Character methods
  async getAllCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }

  async getCharacter(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const id = this.currentCharacterId++;
    const character: Character = { ...insertCharacter, id };
    this.characters.set(id, character);
    return character;
  }

  // GIF methods
  async getAllGifs(): Promise<Gif[]> {
    return Array.from(this.gifs.values());
  }

  async getGifsByCategory(category: string): Promise<Gif[]> {
    return Array.from(this.gifs.values()).filter(gif => gif.category === category);
  }

  async getGifsByCharacter(characterId: number): Promise<Gif[]> {
    return Array.from(this.gifs.values()).filter(gif => gif.characterId === characterId);
  }

  async createGif(insertGif: InsertGif): Promise<Gif> {
    const id = this.currentGifId++;
    const gif: Gif = { 
      id,
      title: insertGif.title,
      url: insertGif.url,
      characterId: insertGif.characterId || null,
      category: insertGif.category,
      tags: insertGif.tags,
    };
    this.gifs.set(id, gif);
    return gif;
  }
}

export const storage = new MemStorage();