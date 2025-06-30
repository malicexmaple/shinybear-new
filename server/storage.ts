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
    // Create Yaki character
    const yaki = await this.createCharacter({
      name: "Yaki",
      type: "chick",
      color: "yellow",
      personality: ["Energetic and always dancing", "Spreads love and positivity", "Loves making new friends", "Expert at expressing emotions"],
      description: "Yaki is our adorable yellow chick who loves to dance, express love, and bring happiness wherever she goes! She's energetic, loving, and always ready for fun adventures.",
      avatarUrl: "https://media1.giphy.com/media/7iEQNDmKV6xcbtymKd/giphy.gif"
    });

    // Create Dori character
    const dori = await this.createCharacter({
      name: "Dori",
      type: "penguin",
      color: "blue",
      personality: ["Cool and collected penguin", "Loves giving kisses and hugs", "Great at expressing emotions", "Brings calm and peaceful vibes"],
      description: "Dori is our lovable blue penguin who brings cool vibes and warm hearts! He's gentle, caring, and always ready to share a kiss or spread some love.",
      avatarUrl: "https://media3.giphy.com/media/p5fbSOd0S4DaG6iZpo/giphy.gif"
    });

    // Authentic Yaki GIFs from uploaded collection - no duplicates
    const yakiGifs: Array<{ title: string; url: string; category: string; tags: string[] }> = [
      { title: "I Love You Chick", url: "@assets/I Love You Chick Sticker_1751292334055.gif", category: "yaki", tags: ["love", "hearts", "phone"] },
      { title: "Chick Dancing", url: "@assets/Chick Dancing Sticker_1751292354200.gif", category: "yaki", tags: ["dancing", "excited", "fun"] },
      { title: "Excited Chick", url: "@assets/Excited Chick Sticker_1751292354200.gif", category: "yaki", tags: ["excited", "happy", "lying"] },
      { title: "Chick Love Heart", url: "@assets/Chick Love Sticker(1)_1751292354200.gif", category: "yaki", tags: ["love", "heart", "floating"] },
      { title: "Sad To Do", url: "@assets/Sad To Do Sticker_1751292354200.gif", category: "yaki", tags: ["sad", "busy", "work"] },
      { title: "Excited Jump", url: "@assets/Excited Jump Sticker_1751292354200.gif", category: "yaki", tags: ["jumping", "excited", "bounce"] },
      { title: "I Love You Heart", url: "@assets/I Love You Heart Sticker_1751292354200.gif", category: "yaki", tags: ["love", "heart", "lying"] },
      { title: "Love You Heart", url: "@assets/Love You Heart Sticker_1751292354200.gif", category: "yaki", tags: ["love", "paper", "note"] },
      { title: "Chick Kawaii", url: "@assets/Chick Kawai Sticker_1751292354200.gif", category: "yaki", tags: ["kawaii", "heart", "cute"] },
      { title: "Yaki Workout", url: "@assets/download(8)_1751292368299.gif", category: "yaki", tags: ["workout", "exercise", "gym"] },
      { title: "Yaki Sad", url: "@assets/download(7)_1751292368299.gif", category: "yaki", tags: ["sad", "down", "upset"] },
      { title: "Yaki Twerking", url: "@assets/download(6)_1751292368299.gif", category: "yaki", tags: ["twerking", "dancing", "booty"] },
      { title: "Chick in Box", url: "@assets/Chick Sticker_1751292368299.gif", category: "yaki", tags: ["box", "hiding", "cute"] },
      { title: "Way Back Home", url: "@assets/Way Back Home Chick Sticker_1751292368299.gif", category: "yaki", tags: ["headphones", "music", "chill"] },
      { title: "Excited Jump 2", url: "@assets/Excited Jump Sticker(2)_1751292368299.gif", category: "yaki", tags: ["jumping", "excited", "bounce"] },
      { title: "Shake It", url: "@assets/Shakeit Sticker_1751292334055.gif", category: "yaki", tags: ["shaking", "dancing", "wiggle"] },
      { title: "Voted Peace", url: "@assets/Voted Sticker_1751292334055.gif", category: "yaki", tags: ["peace", "vote", "politics"] },
      { title: "Voted Paper", url: "@assets/Voted Sticker(1)_1751292334055.gif", category: "yaki", tags: ["vote", "paper", "ballot"] },
      { title: "Gas Love Yaki", url: "@assets/Gas Love Sticker_1751292334055.gif", category: "yaki", tags: ["gas", "love", "funny"] },
      { title: "Sing A Song", url: "@assets/Sing A Song Singing Sticker_1751292354200.gif", category: "yaki", tags: ["singing", "music", "performance"] }
    ];

    // Authentic Dori GIFs from uploaded collection - no duplicates  
    const doriGifs: Array<{ title: string; url: string; category: string; tags: string[] }> = [
      { title: "Penguin Dancing", url: "@assets/Penguin Dancingpenguin Sticker_1751292334055.gif", category: "dori", tags: ["dancing", "penguin", "fun"] },
      { title: "Penguin Gas", url: "@assets/Penguin Gas Sticker_1751292334055.gif", category: "dori", tags: ["gas", "funny", "cute"] },
      { title: "Penguin Kiss", url: "@assets/Penguin Kiss Sticker_1751292354200.gif", category: "dori", tags: ["kiss", "love", "cuddle"] },
      { title: "I Love You Heart Dori", url: "@assets/I Love You Heart Sticker(1)_1751292354200.gif", category: "dori", tags: ["love", "heart", "penguin"] },
      { title: "Excited Jump Dori", url: "@assets/Excited Jump Sticker(1)_1751292354200.gif", category: "dori", tags: ["jumping", "excited", "happy"] },
      { title: "Dori Amazing", url: "@assets/download(4)_1751292368299.gif", category: "dori", tags: ["amazing", "wow", "surprised"] },
      { title: "Dori Rocket", url: "@assets/download(3)_1751292368299.gif", category: "dori", tags: ["rocket", "flying", "launch"] },
      { title: "Dori Happy", url: "@assets/download(2)_1751292368299.gif", category: "dori", tags: ["happy", "joy", "cute"] },
      { title: "Dori Eating", url: "@assets/download(1)_1751292368299.gif", category: "dori", tags: ["eating", "food", "hungry"] },
      { title: "Dori Kawaii", url: "@assets/download_1751292368299.gif", category: "dori", tags: ["kawaii", "cute", "penguin"] },
      { title: "Dori Lunch Time", url: "@assets/download(5)_1751292368299.gif", category: "dori", tags: ["lunch", "computer", "work"] }
    ];

    // Authentic Together GIFs from uploaded collection - no duplicates
    const togetherGifs: Array<{ title: string; url: string; category: string; tags: string[] }> = [
      { title: "Miss You Kiss", url: "@assets/Miss You Kiss Sticker_1751292334055.gif", category: "together", tags: ["miss", "kiss", "love"] },
      { title: "Chick Spank", url: "@assets/Chick Spank Sticker_1751292334055.gif", category: "together", tags: ["spank", "playful", "together"] }
    ];

    // Create all GIFs
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
    const gif: Gif = { ...insertGif, id };
    this.gifs.set(id, gif);
    return gif;
  }
}

export const storage = new MemStorage();
