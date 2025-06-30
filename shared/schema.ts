import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'chick' or 'penguin'
  color: text("color").notNull(),
  personality: text("personality").array().notNull(),
  description: text("description").notNull(),
  avatarUrl: text("avatar_url").notNull(),
});

export const gifs = pgTable("gifs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  characterId: integer("character_id"),
  category: text("category").notNull(), // 'yaki', 'dori', 'together'
  tags: text("tags").array().notNull(),
});

export const insertCharacterSchema = createInsertSchema(characters).omit({
  id: true,
});

export const insertGifSchema = createInsertSchema(gifs).omit({
  id: true,
});

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;
export type InsertGif = z.infer<typeof insertGifSchema>;
export type Gif = typeof gifs.$inferSelect;

// Keep existing user schema for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
