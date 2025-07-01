import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useEffect } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize background music
    const audio = new Audio('/attached_assets/stream cafe - boba date ♥ (1 hour) _ cute music_1751377086426.mp3');
    audio.loop = true;
    audio.volume = 0.15; // 15% volume
    audio.preload = 'auto';
    
    // Auto-play when user interacts with the page
    const playAudio = () => {
      audio.play().catch(console.warn);
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
    
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    
    return () => {
      audio.pause();
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
