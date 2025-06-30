import { useQuery } from "@tanstack/react-query";
import { Gif } from "@shared/schema";
import { useEffect, useState } from "react";

interface FloatingGif {
  id: number;
  url: string;
  angle: number;
  radius: number;
  size: number;
  duration: number;
}

interface FloatingGifsProps {
  targetElement?: string; // CSS selector for the element to circle around
}

export default function FloatingGifs({ targetElement = "#home" }: FloatingGifsProps) {
  const [floatingGifs, setFloatingGifs] = useState<FloatingGif[]>([]);
  
  const { data: gifs } = useQuery<Gif[]>({
    queryKey: ["/api/gifs"],
  });

  useEffect(() => {
    if (!gifs) return;

    // Select authentic GIFs from the uploaded collection for floating animation
    const floatingGifTitles = [
      "Chick Dancing",          // Authentic Yaki dancing
      "Penguin Dancing",        // Authentic Dori dancing  
      "Excited Jump",           // Authentic Yaki jumping
      "Excited Jump Dori",      // Authentic Dori jumping
      "Yaki Twerking",          // Authentic Yaki twerking
      "Way Back Home",          // Authentic Yaki with headphones
      "Penguin Kiss"            // Authentic Dori kiss
    ];

    const floatingGifs = gifs.filter(gif => 
      floatingGifTitles.includes(gif.title)
    ).slice(0, 6); // Limit to 6 floating GIFs

    const newFloatingGifs: FloatingGif[] = floatingGifs.map((gif, index) => ({
      id: gif.id,
      url: gif.url,
      angle: (index * (360 / floatingGifs.length)), // Evenly distribute around circle
      radius: 400, // Distance from video center
      size: 120, // GIF size
      duration: 30, // Animation duration
    }));

    setFloatingGifs(newFloatingGifs);
  }, [gifs]);

  if (!floatingGifs.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {floatingGifs.map((gif) => {
        return (
          <div
            key={gif.id}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationName: 'circleClockwise',
              animationDuration: `${gif.duration}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              transformOrigin: '0 0',
            }}
          >
            <div
              style={{
                width: `${gif.size}px`,
                height: `${gif.size}px`,
                transform: `rotate(${gif.angle}deg) translateX(${gif.radius}px)`,
                opacity: 0.7,
              }}
            >
              <div
                style={{
                  transform: `rotate(-${gif.angle}deg)`,
                  animationName: 'circleCounterClockwise',
                  animationDuration: `${gif.duration}s`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'linear',
                }}
              >
                <img
                  src={gif.url}
                  alt="Floating character"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}