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

    // Select only the most transparent GIFs based on the actual data
    const transparentGifTitles = [
      "Dancing Yaki",           // Known to be transparent
      "Dancing Dori",           // Known to be transparent  
      "Jumping Yaki",           // Character jumping, typically transparent
      "Jumping Dori",           // Character jumping, typically transparent
      "Heart Making Dori",      // Heart animation, likely transparent
      "Heart Throw Dori",       // Heart throwing, likely transparent
      "Twerking Yaki"           // Character animation, likely transparent
    ];

    const transparentGifs = gifs.filter(gif => 
      transparentGifTitles.includes(gif.title)
    ).slice(0, 5); // Limit to 5 floating GIFs

    const newFloatingGifs: FloatingGif[] = transparentGifs.map((gif, index) => ({
      id: gif.id,
      url: gif.url,
      x: Math.random() * 60 + 20, // 20% to 80% of screen width
      y: Math.random() * 40 + 30, // 30% to 70% of screen height
      size: 200, // Fixed 200px size
      duration: Math.random() * 8 + 12, // 12s to 20s animation duration
      delay: index * 4, // Stagger the animations more
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
            className={`absolute ${animationClass} opacity-60 hover:opacity-80 transition-opacity`}
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
              }}
            />
          </div>
        );
      })}
    </div>
  );
}