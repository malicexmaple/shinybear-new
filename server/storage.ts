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

    // Add Yaki GIFs - Complete collection from GIPHY
    const yakiGifs = [
      { title: "Dancing Yaki", url: "https://media1.giphy.com/media/7iEQNDmKV6xcbtymKd/giphy.gif", category: "yaki", tags: ["dancing", "excited", "fun"] },
      { title: "Love Button Yaki", url: "https://media4.giphy.com/media/mmfnDaNegqw6wc6KnM/giphy.gif", category: "yaki", tags: ["love", "button", "heart"] },
      { title: "Jumping Yaki", url: "https://media0.giphy.com/media/a73hd7MRKmel50my8F/giphy.gif", category: "yaki", tags: ["jumping", "excited", "happy"] },
      { title: "Twerking Yaki", url: "https://media0.giphy.com/media/DkTw1nvliDssnqp3tl/giphy.gif", category: "yaki", tags: ["twerking", "fun", "dancing"] },
      { title: "Sad Yaki", url: "https://media3.giphy.com/media/oew9USQmtsvRZO6JxY/giphy.gif", category: "yaki", tags: ["sad", "crying", "emotional"] },
      { title: "Shake It Yaki", url: "https://media3.giphy.com/media/btrdlM9TkGwKMoJ1ih/giphy.gif", category: "yaki", tags: ["shaking", "dancing", "booty"] },
      { title: "Busy Yaki", url: "https://media0.giphy.com/media/Gw4JnbB9d07B4RaOui/giphy.gif", category: "yaki", tags: ["busy", "working", "tasks"] },
      { title: "Workout Yaki", url: "https://media2.giphy.com/media/iq5HoRZgBq5uFfPgHF/giphy.gif", category: "yaki", tags: ["workout", "tired", "legday"] },
      { title: "Love Heart Yaki", url: "https://media0.giphy.com/media/Lv2VhwHrt6ljhvZ6LF/giphy.gif", category: "yaki", tags: ["love", "heart", "iloveyou"] },
      { title: "Bouncy Yaki", url: "https://media0.giphy.com/media/fh5eelVRFjjODhkAki/giphy.gif", category: "yaki", tags: ["jumping", "belly", "bouncy"] },
      { title: "Happy Yaki", url: "https://media4.giphy.com/media/YmVNzDnboYr2VrXzOo/giphy.gif", category: "yaki", tags: ["happy", "joy", "cute"] },
      { title: "Excited Yaki", url: "https://media2.giphy.com/media/XzkGfRsUweB9VrPWOo/giphy.gif", category: "yaki", tags: ["excited", "energy", "bounce"] },
      { title: "Sleepy Yaki", url: "https://media3.giphy.com/media/eNMKzYHwbmOlGO6ZjA/giphy.gif", category: "yaki", tags: ["sleepy", "tired", "rest"] },
      { title: "Cool Yaki", url: "https://media1.giphy.com/media/f6VbKTaUCWPSGDGVeX/giphy.gif", category: "yaki", tags: ["cool", "sunglasses", "swagger"] },
      { title: "Party Yaki", url: "https://media2.giphy.com/media/SSQuHAbQNM3QcVQfGt/giphy.gif", category: "yaki", tags: ["party", "celebration", "fun"] },
      { title: "Flying Yaki", url: "https://media4.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif", category: "yaki", tags: ["flying", "wings", "freedom"] },
      { title: "Surprise Yaki", url: "https://media1.giphy.com/media/h8HmN0UcEKR0xWnv3R/giphy.gif", category: "yaki", tags: ["surprise", "shocked", "wow"] },
      { title: "Thinking Yaki", url: "https://media3.giphy.com/media/l1J9APRq3KpgBZhkY/giphy.gif", category: "yaki", tags: ["thinking", "confused", "question"] },
      { title: "Angry Yaki", url: "https://media2.giphy.com/media/YrD1PQldGsstG/giphy.gif", category: "yaki", tags: ["angry", "mad", "upset"] },
      { title: "Laughing Yaki", url: "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", category: "yaki", tags: ["laughing", "funny", "joy"] }
    ];

    // Add Dori GIFs - Complete collection from GIPHY
    const doriGifs = [
      { title: "Dancing Dori", url: "https://media3.giphy.com/media/p5fbSOd0S4DaG6iZpo/giphy.gif", category: "dori", tags: ["dancing", "penguin", "fun"] },
      { title: "Heart Gas Dori", url: "https://media3.giphy.com/media/gxrPwY33qN4SeYxOKu/giphy.gif", category: "dori", tags: ["gas", "heart", "funny"] },
      { title: "Jumping Dori", url: "https://media0.giphy.com/media/iUVfgxPrzpeRpzDSF2/giphy.gif", category: "dori", tags: ["jumping", "excited", "happy"] },
      { title: "Rocket Dori", url: "https://media4.giphy.com/media/PV1biGIxur4ZFX3asi/giphy.gif", category: "dori", tags: ["rocket", "bye", "launch"] },
      { title: "Kawaii Dori", url: "https://media2.giphy.com/media/nqBfOunAYh8ZMFbqka/giphy.gif", category: "dori", tags: ["kawaii", "cute", "penguin"] },
      { title: "Amazing Dori", url: "https://media0.giphy.com/media/FXa5jwwhMTNWaPhqrv/giphy.gif", category: "dori", tags: ["wow", "amazing", "surprised"] },
      { title: "Hungry Dori", url: "https://media1.giphy.com/media/80YE2AlUNazZeYXf9C/giphy.gif", category: "dori", tags: ["hungry", "lunch", "eating"] },
      { title: "Gas Dori", url: "https://media4.giphy.com/media/zkrtaMqb1aA5MaNf3q/giphy.gif", category: "dori", tags: ["gas", "funny", "cute"] },
      { title: "Heart Making Dori", url: "https://media4.giphy.com/media/oatDUchF0P6pFKnG5h/giphy.gif", category: "dori", tags: ["heart", "love", "making"] },
      { title: "Heart Throw Dori", url: "https://media4.giphy.com/media/mHdQ2jlBwDAfQYyA2c/giphy.gif", category: "dori", tags: ["heart", "throwing", "ninja"] },
      { title: "Silly Dori", url: "https://media1.giphy.com/media/KmHueA88mFABT8crGG/giphy.gif", category: "dori", tags: ["silly", "goofy", "funny"] },
      { title: "Swimming Dori", url: "https://media2.giphy.com/media/XeCWYOtJ9KhGGf33Kx/giphy.gif", category: "dori", tags: ["swimming", "water", "penguin"] },
      { title: "Winking Dori", url: "https://media3.giphy.com/media/l0HU7yHIK6Nc3WcE0/giphy.gif", category: "dori", tags: ["wink", "flirt", "cute"] },
      { title: "Sleeping Dori", url: "https://media4.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif", category: "dori", tags: ["sleeping", "tired", "rest"] },
      { title: "Excited Dori", url: "https://media1.giphy.com/media/3oEjHAUOqG3lSS0f1C/giphy.gif", category: "dori", tags: ["excited", "happy", "joy"] },
      { title: "Cool Dori", url: "https://media2.giphy.com/media/l0Iy69UBN8H2z7Q6Q/giphy.gif", category: "dori", tags: ["cool", "sunglasses", "chill"] },
      { title: "Flying Dori", url: "https://media3.giphy.com/media/xT9IgBhbr8pGKSY2EE/giphy.gif", category: "dori", tags: ["flying", "wings", "freedom"] },
      { title: "Laughing Dori", url: "https://media4.giphy.com/media/l0Iy4bBfV0pK4lfig/giphy.gif", category: "dori", tags: ["laughing", "funny", "joy"] },
      { title: "Shy Dori", url: "https://media1.giphy.com/media/xT9IgKWQeoclXKLJaE/giphy.gif", category: "dori", tags: ["shy", "cute", "blush"] },
      { title: "Party Dori", url: "https://media2.giphy.com/media/l0Iy5fjHFBXcg5Q2c/giphy.gif", category: "dori", tags: ["party", "celebration", "fun"] }
    ];

    // Add together GIFs - Complete collection from GIPHY
    const togetherGifs = [
      { title: "Sweet Kiss", url: "https://media1.giphy.com/media/xR5cPyPoL5HVXSphqA/giphy.gif", category: "together", tags: ["kiss", "love", "together"] },
      { title: "Silly Together", url: "https://media4.giphy.com/media/nE59vl2e7rWzbskQZ9/giphy.gif", category: "together", tags: ["silly", "butt", "together"] },
      { title: "Belly Kiss", url: "https://media1.giphy.com/media/BZUFTK3TYuCDG5N9jd/giphy.gif", category: "together", tags: ["belly", "kiss", "cute"] },
      { title: "Missing You", url: "https://media3.giphy.com/media/cM4xsRxMkOsPlE1eFf/giphy.gif", category: "together", tags: ["miss", "kiss", "love"] },
      { title: "Dancing Together", url: "https://media2.giphy.com/media/l0HU20BZ6LbSEITzG/giphy.gif", category: "together", tags: ["dancing", "couple", "fun"] },
      { title: "Hugging", url: "https://media3.giphy.com/media/xT9IgKrqTcIKqECLiw/giphy.gif", category: "together", tags: ["hug", "love", "cuddle"] },
      { title: "Playing Together", url: "https://media4.giphy.com/media/l0Iy2F0fV4cGrK5fG/giphy.gif", category: "together", tags: ["playing", "fun", "friendship"] },
      { title: "Love Hearts", url: "https://media1.giphy.com/media/xT9IgDzY0BYv3kpQ0g/giphy.gif", category: "together", tags: ["hearts", "love", "romance"] },
      { title: "Adventure Together", url: "https://media2.giphy.com/media/l0Iy67L9BBhOnIr2w/giphy.gif", category: "together", tags: ["adventure", "journey", "together"] },
      { title: "Celebration", url: "https://media3.giphy.com/media/xT9IgHqYCGP7T8nGKY/giphy.gif", category: "together", tags: ["celebration", "party", "happy"] }
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
