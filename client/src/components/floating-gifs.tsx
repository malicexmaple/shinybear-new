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
  x: number;
  y: number;
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

    // Find the video element position specifically
    const updateCenterPosition = () => {
      const videoElement = document.querySelector('#home video');
      if (videoElement) {
        const rect = videoElement.getBoundingClientRect();
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

    // Calculate video position for positioning GIFs
    const videoElement = document.querySelector('#home video');
    if (!videoElement) return;
    
    const videoRect = videoElement.getBoundingClientRect();
    const videoCenterX = videoRect.left + videoRect.width / 2;
    const videoCenterY = videoRect.top + videoRect.height / 2;
    
    const newFloatingGifs: FloatingGif[] = transparentGifs.map((gif, index) => {
      const angle = (index * (360 / transparentGifs.length));
      const angleRad = (angle * Math.PI) / 180;
      const radius = 400; // Distance from video center
      
      return {
        id: gif.id,
        url: gif.url,
        angle: angle,
        radius: radius,
        size: 120,
        duration: 30,
        x: videoCenterX + Math.cos(angleRad) * radius,
        y: videoCenterY + Math.sin(angleRad) * radius,
      };
    });

    setFloatingGifs(newFloatingGifs);

    return () => {
      window.removeEventListener('scroll', updateCenterPosition);
      window.removeEventListener('resize', updateCenterPosition);
    };
  }, [gifs]);

  if (!floatingGifs.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {floatingGifs.map((gif) => {
        return (
          <div
            key={gif.id}
            className="absolute opacity-70 hover:opacity-90 transition-opacity"
            style={{
              left: `${gif.x}px`,
              top: `${gif.y}px`,
              width: `${gif.size}px`,
              height: `${gif.size}px`,
              transform: 'translate(-50%, -50%)',
              animationName: 'circleClockwise',
              animationDuration: `${gif.duration}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              transformOrigin: `${gif.radius}px 0px`,
            }}
          >
            <div
              style={{
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
        );
      })}
    </div>
  );
}