import { useQuery } from "@tanstack/react-query";
import { Gif } from "@shared/schema";
import { useEffect, useState } from "react";

interface FloatingGif {
  id: number;
  url: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingGifs() {
  const [floatingGifs, setFloatingGifs] = useState<FloatingGif[]>([]);
  
  const { data: gifs } = useQuery<Gif[]>({
    queryKey: ["/api/gifs"],
  });

  useEffect(() => {
    if (!gifs) return;

    // Select transparent/floating appropriate GIFs
    const transparentGifs = gifs.filter(gif => 
      gif.url.includes("giphy.com") && (
        gif.title.toLowerCase().includes("dancing") ||
        gif.title.toLowerCase().includes("jumping") ||
        gif.title.toLowerCase().includes("floating") ||
        gif.title.toLowerCase().includes("heart") ||
        gif.category === "yaki" || gif.category === "dori"
      )
    ).slice(0, 8); // Limit to 8 floating GIFs

    const newFloatingGifs: FloatingGif[] = transparentGifs.map((gif, index) => ({
      id: gif.id,
      url: gif.url,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: Math.random() * 60 + 20, // 20% to 80% of screen height
      size: Math.random() * 40 + 60, // 60px to 100px
      duration: Math.random() * 10 + 15, // 15s to 25s animation duration
      delay: index * 2, // Stagger the animations
    }));

    setFloatingGifs(newFloatingGifs);
  }, [gifs]);

  if (!floatingGifs.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingGifs.map((gif, index) => {
        const animationClass = index % 3 === 0 ? 'animate-float-around' : 
                              index % 3 === 1 ? 'animate-drift' : 'animate-float';
        
        return (
          <div
            key={gif.id}
            className={`absolute ${animationClass} opacity-40 hover:opacity-70 transition-opacity`}
            style={{
              left: `${gif.x}%`,
              top: `${gif.y}%`,
              width: `${gif.size}px`,
              height: `${gif.size}px`,
              animationDuration: `${gif.duration}s`,
              animationDelay: `${gif.delay}s`,
            }}
          >
            <img
              src={gif.url}
              alt="Floating character"
              className="w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}