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
      // Current batch of Yaki GIFs
      { title: "Yaki I Love You Chick", url: "/attached_assets/I Love You Chick Sticker_1751292334055.gif", category: "yaki", tags: ["love", "hearts", "phone"] },
      { title: "Yaki Gas Love", url: "/attached_assets/Gas Love Sticker_1751292334055.gif", category: "yaki", tags: ["gas", "love", "funny"] },
      { title: "Yaki Miss You Kiss", url: "/attached_assets/Miss You Kiss Sticker_1751292334055.gif", category: "yaki", tags: ["miss", "kiss", "love"] },
      { title: "Yaki Chick Spank", url: "/attached_assets/Chick Spank Sticker_1751292334055.gif", category: "yaki", tags: ["spank", "playful", "cute"] },
      { title: "Yaki Shake It", url: "/attached_assets/Shakeit Sticker_1751292334055.gif", category: "yaki", tags: ["shaking", "dancing", "wiggle"] },
      { title: "Yaki Voted Peace", url: "/attached_assets/Voted Sticker_1751292334055.gif", category: "yaki", tags: ["peace", "vote", "politics"] },
      { title: "Yaki Voted Paper", url: "/attached_assets/Voted Sticker(1)_1751292334055.gif", category: "yaki", tags: ["vote", "paper", "ballot"] },
      { title: "Dori Dancing", url: "/attached_assets/Penguin Dancingpenguin Sticker_1751292334055.gif", category: "dori", tags: ["dancing", "chick", "fun"] },
      { title: "Dori Gas", url: "/attached_assets/Penguin Gas Sticker_1751292334055.gif", category: "dori", tags: ["gas", "funny", "cute"] },
      
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
      
      // Latest batch from newest uploads
      { title: "Yaki Workout", url: "/attached_assets/download(8)_1751292368299.gif", category: "yaki", tags: ["workout", "exercise", "gym"] },
      { title: "Yaki Sad", url: "/attached_assets/download(7)_1751292368299.gif", category: "yaki", tags: ["sad", "down", "upset"] },
      { title: "Yaki Twerking", url: "/attached_assets/download(6)_1751292368299.gif", category: "yaki", tags: ["twerking", "dancing", "booty"] },
      { title: "Dori Lunch Time", url: "/attached_assets/download(5)_1751292368299.gif", category: "dori", tags: ["lunch", "computer", "work"] },
      { title: "Dori Amazing", url: "/attached_assets/download(4)_1751292368299.gif", category: "dori", tags: ["amazing", "wow", "surprised"] },
      { title: "Dori Rocket", url: "/attached_assets/download(3)_1751292368299.gif", category: "dori", tags: ["rocket", "flying", "launch"] },
      { title: "Dori Happy", url: "/attached_assets/download(2)_1751292368299.gif", category: "dori", tags: ["happy", "joy", "cute"] },
      { title: "Dori Eating", url: "/attached_assets/download(1)_1751292368299.gif", category: "dori", tags: ["eating", "food", "hungry"] },
      { title: "Dori Kawaii", url: "/attached_assets/download_1751292368299.gif", category: "dori", tags: ["kawaii", "cute", "penguin"] },
      { title: "Yaki Chick in Box", url: "/attached_assets/Chick Sticker_1751292368299.gif", category: "yaki", tags: ["box", "hiding", "cute"] },
      { title: "Yaki Way Back Home", url: "/attached_assets/Way Back Home Chick Sticker_1751292368299.gif", category: "yaki", tags: ["headphones", "music", "chill"] },
      { title: "Yaki Excited Jump 2", url: "/attached_assets/Excited Jump Sticker(2)_1751292368299.gif", category: "yaki", tags: ["jumping", "excited", "bounce"] },
      
      // Additional authentic GIFs from older batches
      { title: "Yaki Chick Dancing Old", url: "/attached_assets/Chick Dancing Sticker_1751292281717.gif", category: "yaki", tags: ["dancing", "excited", "retro"] },
      { title: "Yaki Chick Love Old", url: "/attached_assets/Chick Love Sticker(1)_1751292281717.gif", category: "yaki", tags: ["love", "heart", "classic"] },
      { title: "Yaki Chick in Box Old", url: "/attached_assets/Chick Sticker_1751292281717.gif", category: "yaki", tags: ["box", "hiding", "vintage"] },
      { title: "Yaki Excited Chick Old", url: "/attached_assets/Excited Chick Sticker_1751292281717.gif", category: "yaki", tags: ["excited", "happy", "classic"] },
      { title: "Dori Excited Jump Old", url: "/attached_assets/Excited Jump Sticker(1)_1751292281717.gif", category: "dori", tags: ["jumping", "excited", "vintage"] },
      { title: "Yaki Excited Jump 3", url: "/attached_assets/Excited Jump Sticker(2)_1751292281717.gif", category: "yaki", tags: ["jumping", "bounce", "classic"] },
      { title: "Yaki Excited Jump Classic", url: "/attached_assets/Excited Jump Sticker_1751292281717.gif", category: "yaki", tags: ["jumping", "excited", "retro"] },
      { title: "Yaki Sad To Do Old", url: "/attached_assets/Sad To Do Sticker_1751292281717.gif", category: "yaki", tags: ["sad", "busy", "vintage"] },
      { title: "Yaki Sing A Song Old", url: "/attached_assets/Sing A Song Singing Sticker_1751292281717.gif", category: "yaki", tags: ["singing", "music", "classic"] },
      { title: "Yaki Way Back Home Old", url: "/attached_assets/Way Back Home Chick Sticker_1751292281717.gif", category: "yaki", tags: ["headphones", "music", "vintage"] },
      { title: "Dori Dancing Classic", url: "/attached_assets/Penguin Dancingpenguin Sticker_1751290780488.gif", category: "dori", tags: ["dancing", "chick", "retro"] },
      { title: "Yaki Shakeit Classic", url: "/attached_assets/Shakeit Sticker_1751290682699.gif", category: "yaki", tags: ["shaking", "dancing", "vintage"] },
      
      // Download series from older batch - correctly categorized as Dori (chicks)
      { title: "Dori Eating Classic", url: "/attached_assets/download(1)_1751292281717.gif", category: "dori", tags: ["eating", "classic", "cute"] },
      { title: "Dori Happy Classic", url: "/attached_assets/download(2)_1751292281717.gif", category: "dori", tags: ["happy", "vintage", "joy"] },
      { title: "Dori Rocket Classic", url: "/attached_assets/download(3)_1751292281717.gif", category: "dori", tags: ["rocket", "retro", "flying"] },
      { title: "Dori Amazing Classic", url: "/attached_assets/download(4)_1751292281717.gif", category: "dori", tags: ["amazing", "classic", "excited"] },
      { title: "Dori Computer Classic", url: "/attached_assets/download(5)_1751292281717.gif", category: "dori", tags: ["computer", "vintage", "work"] },
      { title: "Yaki Twerking Classic", url: "/attached_assets/download(6)_1751292281717.gif", category: "yaki", tags: ["twerking", "retro", "fun"] },
      { title: "Yaki Sad Classic", url: "/attached_assets/download(7)_1751292281717.gif", category: "yaki", tags: ["sad", "classic", "down"] },
      { title: "Yaki Workout Classic", url: "/attached_assets/download(8)_1751292281717.gif", category: "yaki", tags: ["workout", "vintage", "exercise"] },
      { title: "Dori Cutie Patootie Classic", url: "/attached_assets/download_1751292281717.gif", category: "dori", tags: ["kawaii", "retro", "cute"] },
      { title: "Dori Kawai", url: "/attached_assets/Penguin Kawai Sticker_1751364031633.gif", category: "dori", tags: ["kawaii", "cute", "penguin"] }
    ];

    // Deduplicate and categorize
    const yakiGifs: Array<{ title: string; url: string; category: string; tags: string[] }> = [];
    const doriGifs: Array<{ title: string; url: string; category: string; tags: string[] }> = [];
    const togetherGifs: Array<{ title: string; url: string; category: string; tags: string[] }> = [];

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
      characterId: insertGif.characterId ?? null,
      category: insertGif.category,
      tags: insertGif.tags
    };
    this.gifs.set(id, gif);
    return gif;
  }
}

export const storage = new MemStorage();
