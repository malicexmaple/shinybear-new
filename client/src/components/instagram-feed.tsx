import { useEffect } from "react";

interface InstagramPhoto {
  id: string;
  imageUrl: string;
}

// Instagram photos for infinite scroll
const basePhotos: InstagramPhoto[] = [
  { id: "1", imageUrl: "https://picsum.photos/200/200?random=1" },
  { id: "2", imageUrl: "https://picsum.photos/200/200?random=2" },
  { id: "3", imageUrl: "https://picsum.photos/200/200?random=3" },
  { id: "4", imageUrl: "https://picsum.photos/200/200?random=4" },
  { id: "5", imageUrl: "https://picsum.photos/200/200?random=5" },
  { id: "6", imageUrl: "https://picsum.photos/200/200?random=6" },
  { id: "7", imageUrl: "https://picsum.photos/200/200?random=7" },
  { id: "8", imageUrl: "https://picsum.photos/200/200?random=8" },
  { id: "9", imageUrl: "https://picsum.photos/200/200?random=9" },
  { id: "10", imageUrl: "https://picsum.photos/200/200?random=10" },
  { id: "11", imageUrl: "https://picsum.photos/200/200?random=11" },
  { id: "12", imageUrl: "https://picsum.photos/200/200?random=12" },
];

// Create multiple copies for infinite effect
const createInfinitePhotos = () => {
  const copies = 4; // Number of copies to create seamless loop
  const photos: InstagramPhoto[] = [];
  
  for (let i = 0; i < copies; i++) {
    basePhotos.forEach((photo) => {
      photos.push({
        id: `${photo.id}-copy-${i}`,
        imageUrl: photo.imageUrl
      });
    });
  }
  
  return photos;
};

export default function InstagramFeed() {
  const photos = createInfinitePhotos();

  useEffect(() => {
    const scrollContainer = document.getElementById('instagram-scroll');
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const photoWidth = 200; // width of each photo
    const totalWidth = basePhotos.length * photoWidth;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      
      // Reset scroll when we've scrolled through one full set
      if (scrollAmount >= totalWidth) {
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

  return (
    <>
      <style>
        {`
          #instagram-scroll::-webkit-scrollbar {
            display: none;
          }
          #instagram-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <section className="w-full overflow-hidden h-[200px]">
        <div
          id="instagram-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full"
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-[200px] h-[200px] overflow-hidden"
            >
              <img
                src={photo.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/200x200/f0f0f0/333333?text=Photo`;
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}