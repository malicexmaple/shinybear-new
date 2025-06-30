import { useEffect } from "react";
import yakiGif from "@assets/Shakeit Sticker_1751304703123.gif";

export default function InstagramFeed() {
  useEffect(() => {
    const scrollContainer = document.getElementById('yaki-scroll');
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame (slower)
    const imageWidth = 300; // width of each Yaki image (2x bigger)
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

  // Create multiple copies of Yaki for seamless infinite scroll
  const yakiImages = Array.from({ length: 40 }, (_, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-[300px] h-[300px] flex items-center justify-center ml-[1px] mr-[1px] mt-[-128px] mb-[-128px] relative z-[9999]"
    >
      <img
        src={yakiGif}
        alt="Yaki character"
        className="w-[240px] h-[240px] object-contain relative z-[9999]"
      />
    </div>
  ));

  return (
    <>
      <style>
        {`
          #yaki-scroll::-webkit-scrollbar {
            display: none;
          }
          #yaki-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <section className="w-full overflow-hidden h-[300px] bg-white relative z-[9999]">
        <div
          id="yaki-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full relative z-[9999]"
        >
          {yakiImages}
        </div>
      </section>
    </>
  );
}