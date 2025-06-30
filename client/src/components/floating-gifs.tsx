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
  delay: number;
}

interface FloatingGifsProps {
  targetElement?: string; // CSS selector for the element to circle around
}

export default function FloatingGifs({ targetElement = "#home" }: FloatingGifsProps) {
  const [floatingGifs, setFloatingGifs] = useState<FloatingGif[]>([]);
  const [centerPosition, setCenterPosition] = useState({ x: 50, y: 50 });
  
  const { data: gifs } = useQuery<Gif[]>({
    queryKey: ["/api/gifs"],
  });

  useEffect(() => {
    if (!gifs) return;

    // Find the video container position
    const updateCenterPosition = () => {
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
        const centerY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
        setCenterPosition({ x: centerX, y: centerY });
      }
    };

    // Update position on scroll and resize
    updateCenterPosition();
    window.addEventListener('scroll', updateCenterPosition);
    window.addEventListener('resize', updateCenterPosition);

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
      angle: (index * (360 / transparentGifs.length)), // Evenly distribute around circle
      radius: 450 + (index * 60), // Varying radius 450-690px - much further from video
      size: 200, // Fixed 200px size
      duration: 30 + (index * 3), // 30s to 42s animation duration
      delay: index * 5, // More staggered animations
    }));

    setFloatingGifs(newFloatingGifs);

    return () => {
      window.removeEventListener('scroll', updateCenterPosition);
      window.removeEventListener('resize', updateCenterPosition);
    };
  }, [gifs]);

  if (!floatingGifs.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingGifs.map((gif, index) => {
        const isClockwise = index % 2 === 0;
        const animationName = isClockwise ? 'circleClockwise' : 'circleCounterClockwise';
        const counterAnimationName = isClockwise ? 'circleCounterClockwise' : 'circleClockwise';
        
        return (
          <div
            key={gif.id}
            className="absolute opacity-60 hover:opacity-80 transition-opacity"
            style={{
              left: `${centerPosition.x}%`,
              top: `${centerPosition.y}%`,
              animationName: animationName,
              animationDuration: `${gif.duration}s`,
              animationDelay: `${gif.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              transformOrigin: '0 0',
              transform: `translate(-50%, -50%) rotate(${gif.angle}deg)`,
            }}
          >
            <div
              style={{
                width: `${gif.size}px`,
                height: `${gif.size}px`,
                transform: `translateX(${gif.radius}px) translateY(-${gif.size/2}px)`,
                animationName: counterAnimationName,
                animationDuration: `${gif.duration}s`,
                animationDelay: `${gif.delay}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
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
          </div>
        );
      })}
    </div>
  );
}