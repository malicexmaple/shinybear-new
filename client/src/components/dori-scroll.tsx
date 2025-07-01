import { useEffect, useRef } from "react";

export default function DoriScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled one full cycle
      if (scrollPosition >= 602) { // 2 images × 301px width
        scrollPosition = 0;
      }
      
      scrollElement.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  const sickyakiGif = "/attached_assets/I Love You Kiss Sticker_1751295478948.gif";
  const pingdoriGif = "/attached_assets/Penguin Kawai Sticker_1751342571422.gif";

  // Create multiple copies alternating between Sickyaki and Pingdori for seamless infinite scroll
  const characterImages = Array.from({ length: 40 }, (_, index) => {
    const isSickyaki = index % 2 === 0;
    return (
      <div
        key={index}
        className="flex-shrink-0 w-[300px] h-[300px] flex items-center justify-center ml-[1px] mr-[1px] mt-[-100px] mb-[-100px] relative z-[9999]"
      >
        <img
          src={isSickyaki ? sickyakiGif : pingdoriGif}
          alt={isSickyaki ? "Sickyaki character" : "Pingdori character"}
          className="w-[240px] h-[240px] object-contain relative z-[9999]"
        />
      </div>
    );
  });

  return (
    <>
      <style>
        {`
          #character-scroll::-webkit-scrollbar {
            display: none;
          }
          #character-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <section className="w-full overflow-hidden h-[350px] bg-white relative z-[9999] transform -rotate-2">
        <div
          ref={scrollRef}
          id="character-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full relative z-[9999]"
        >
          {characterImages}
        </div>
      </section>
    </>
  );
}