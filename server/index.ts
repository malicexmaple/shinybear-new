import express, { type Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Simple logging
const log = (message: string) => {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [html-server] ${message}`);
};

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve index.html at the root
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Catch all other routes to serve index.html (for SPA-like behavior)
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    log(`HTML website serving at http://0.0.0.0:${port}`);
});