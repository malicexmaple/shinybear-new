import { useEffect, useState, useRef } from "react";

interface InstagramPhoto {
  id: string;
  imageUrl: string;
  postUrl: string;
}

// Instagram photos for infinite scroll - linking to @sick_yaki
const basePhotos: InstagramPhoto[] = [
  { id: "1", imageUrl: "https://picsum.photos/200/200?random=1", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "2", imageUrl: "https://picsum.photos/200/200?random=2", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "3", imageUrl: "https://picsum.photos/200/200?random=3", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "4", imageUrl: "https://picsum.photos/200/200?random=4", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "5", imageUrl: "https://picsum.photos/200/200?random=5", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "6", imageUrl: "https://picsum.photos/200/200?random=6", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "7", imageUrl: "https://picsum.photos/200/200?random=7", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "8", imageUrl: "https://picsum.photos/200/200?random=8", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "9", imageUrl: "https://picsum.photos/200/200?random=9", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "10", imageUrl: "https://picsum.photos/200/200?random=10", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "11", imageUrl: "https://picsum.photos/200/200?random=11", postUrl: "https://www.instagram.com/sick_yaki" },
  { id: "12", imageUrl: "https://picsum.photos/200/200?random=12", postUrl: "https://www.instagram.com/sick_yaki" },
];

// Create multiple copies for infinite effect
const createInfinitePhotos = () => {
  const copies = 4; // Number of copies to create seamless loop
  const photos: InstagramPhoto[] = [];
  
  for (let i = 0; i < copies; i++) {
    basePhotos.forEach((photo) => {
      photos.push({
        id: `${photo.id}-copy-${i}`,
        imageUrl: photo.imageUrl,
        postUrl: photo.postUrl
      });
    });
  }
  
  return photos;
};

export default function InstagramFeed() {
  const photos = createInfinitePhotos();
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef<number>();

  const handlePhotoClick = (postUrl: string) => {
    window.open(postUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('instagram-scroll');
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const photoWidth = 200; // width of each photo
    const totalWidth = basePhotos.length * photoWidth;

    const scroll = () => {
      if (isPlaying) {
        scrollAmount += scrollSpeed;
        
        // Reset scroll when we've scrolled through one full set
        if (scrollAmount >= totalWidth) {
          scrollAmount = 0;
        }
        
        scrollContainer.scrollLeft = scrollAmount;
      }
      
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

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
      <section className="w-full overflow-hidden h-[200px] relative group">
        <div
          id="instagram-scroll"
          className="flex gap-0 overflow-x-hidden w-full h-full"
          onClick={toggleAnimation}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-[200px] h-[200px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
              onClick={(e) => {
                e.stopPropagation();
                handlePhotoClick(photo.postUrl);
              }}
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
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
            </div>
          ))}
        </div>
        
        {/* Play/Pause indicator - only visible on hover */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-3 py-1 rounded-full text-sm pointer-events-none">
          {isPlaying ? 'Click to Pause' : 'Click to Play'}
        </div>
      </section>
    </>
  );
}