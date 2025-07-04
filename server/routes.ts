import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets for GIFs with better error handling
  app.use("/attached_assets", express.static(path.resolve(process.cwd(), "attached_assets"), {
    maxAge: '1d', // Cache for 1 day to reduce load
    etag: true,
    lastModified: true
  }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    const usage = process.memoryUsage();
    res.json({
      status: "ok",
      memory: {
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + "MB",
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + "MB",
        external: Math.round(usage.external / 1024 / 1024) + "MB"
      },
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Get all characters
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacters();
      res.json(characters);
    } catch (error) {
      log(`Error fetching characters: ${error}`);
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });

  // Get specific character
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const character = await storage.getCharacter(id);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });

  // Get all GIFs
  app.get("/api/gifs", async (req, res) => {
    try {
      const { category } = req.query;
      let gifs;
      
      if (category && typeof category === 'string') {
        gifs = await storage.getGifsByCategory(category);
      } else {
        gifs = await storage.getAllGifs();
      }
      
      res.json(gifs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GIFs" });
    }
  });

  // Get GIFs by character
  app.get("/api/characters/:id/gifs", async (req, res) => {
    try {
      const characterId = parseInt(req.params.id);
      const gifs = await storage.getGifsByCharacter(characterId);
      res.json(gifs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character GIFs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
