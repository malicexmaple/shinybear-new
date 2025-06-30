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

    // Select only transparent GIFs (avoiding ones with white backgrounds)
    const transparentGifs = gifs.filter(gif => {
      const title = gif.title.toLowerCase();
      // Prefer GIFs that are more likely to be transparent
      return gif.url.includes("giphy.com") && (
        title.includes("dancing") ||
        title.includes("jumping") ||
        title.includes("heart") ||
        title.includes("love") ||
        title.includes("bounce") ||
        title.includes("float")
      ) && 
      // Exclude GIFs that might have white backgrounds
      !title.includes("button") &&
      !title.includes("busy") &&
      !title.includes("workout") &&
      !title.includes("rocket");
    }).slice(0, 6); // Limit to 6 floating GIFs

    const newFloatingGifs: FloatingGif[] = transparentGifs.map((gif, index) => ({
      id: gif.id,
      url: gif.url,
      x: Math.random() * 70 + 15, // 15% to 85% of screen width
      y: Math.random() * 50 + 25, // 25% to 75% of screen height
      size: Math.random() * 60 + 100, // 100px to 160px (much bigger)
      duration: Math.random() * 8 + 12, // 12s to 20s animation duration
      delay: index * 3, // Stagger the animations more
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