import { useEffect } from "react";
import doriGif from "@assets/Penguin Dancingpenguin Sticker_1751290780488.gif";

export default function DoriScroll() {
  useEffect(() => {
    const scrollContainer = document.getElementById('dori-scroll');
    if (!scrollContainer) return;

    const imageWidth = 150; // width of each Dori image
    const totalImages = 20; // number of copies we create
    const totalWidth = totalImages * imageWidth;
    
    // Start from the end for reverse scrolling
    let scrollAmount = totalWidth;
    const scrollSpeed = 2; // positive speed, but we'll decrement

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
      className="flex-shrink-0 w-[150px] h-[150px] flex items-center justify-center"
    >
      <img
        src={doriGif}
        alt="Dori character"
        className="w-[120px] h-[120px] object-contain"
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
      <section className="w-full overflow-hidden h-[150px] bg-white">
        <div
          id="dori-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full"
        >
          {doriImages}
        </div>
      </section>
    </>
  );
}