import express, { type Request, Response } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";

const app = express();
const port = 5000;

// JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes and initialize server
async function startServer() {
  try {
    // Register API routes
    const server = await registerRoutes(app);
    
    // Setup Vite for development
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      // Serve static files in production
      serveStatic(app);
    }
    
    // Start server
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running at http://0.0.0.0:${port}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();