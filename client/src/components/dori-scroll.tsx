import { useEffect } from "react";
import doriGif from "@assets/Penguin Dancingpenguin Sticker_1751304751701.gif";

export default function DoriScroll() {
  useEffect(() => {
    const scrollContainer = document.getElementById('dori-scroll');
    if (!scrollContainer) return;

    const imageWidth = 300; // width of each Dori image (2x bigger)
    const totalImages = 20; // number of copies we create
    const totalWidth = totalImages * imageWidth;
    
    // Start from the end for reverse scrolling
    let scrollAmount = totalWidth;
    const scrollSpeed = 1; // positive speed, but we'll decrement (slower)

    const scroll = () => {
      scrollAmount -= scrollSpeed;
      
      // Reset scroll when we've gone back to the beginning
      if (scrollAmount <= 0) {
        scrollAmount = totalWidth / 2; // Reset to middle to maintain seamless loop
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  // Create multiple copies of Dori for seamless infinite scroll
  const doriImages = Array.from({ length: 40 }, (_, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-[300px] h-[300px] flex items-center justify-center ml-[1px] mr-[1px] mt-[-128px] mb-[-128px] relative z-[9999]"
    >
      <img
        src={doriGif}
        alt="Dori character"
        className="w-[240px] h-[240px] object-contain relative z-[9999]"
      />
    </div>
  ));

  return (
    <>
      <style>
        {`
          #dori-scroll::-webkit-scrollbar {
            display: none;
          }
          #dori-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <section className="w-full overflow-hidden h-[300px] bg-white relative z-[9999]">
        <div
          id="dori-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full relative z-[9999] mt-[-2px] mb-[-2px]"
        >
          {doriImages}
        </div>
      </section>
    </>
  );
}