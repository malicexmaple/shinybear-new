import { useEffect } from "react";
import sickyakiGif from "@assets/Shakeit Sticker_1751304703123.gif";
import pingdoriGif from "@assets/Penguin Dancingpenguin Sticker_1751304751701.gif";

export default function InstagramFeed() {
  useEffect(() => {
    const scrollContainer = document.getElementById('character-scroll');
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame (slower)
    const imageWidth = 300; // width of each character image (2x bigger)
    const totalImages = 20; // number of copies we create
    const totalWidth = totalImages * imageWidth;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      
      // Reset scroll when we've scrolled through half the images to create seamless loop
      if (scrollAmount >= totalWidth / 2) {
        scrollAmount = 0;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

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
          id="character-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full relative z-[9999]"
        >
          {characterImages}
        </div>
      </section>
    </>
  );
}