import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TurfCarouselProps = {
  images: string[];
  height?: string;
  altBase?: string;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
};

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

const TurfCarousel: React.FC<TurfCarouselProps> = ({
  images,
  height = "h-32",
  altBase = "Turf Photo",
  showDots = true,
  showArrows = true,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const total = images.length;
  const canGoPrev = index > 0;
  const canGoNext = index < total - 1;

  // Snap to a specific slide
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = clamp(i, 0, total - 1);
    const x = target * track.clientWidth;
    track.scrollTo({ left: x, behavior: "smooth" });
    setIndex(target);
  };

  const onArrow = (dir: -1 | 1) => {
    goTo(index + dir);
  };

  // Update index on scroll (supports touch/drag)
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) setIndex(clamp(i, 0, total - 1));
  };

  // Resize: keep snap aligned
  useEffect(() => {
    const onResize = () => goTo(index);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, total]);

  // If only one image, just show it without carousel
  if (total <= 1) {
    return (
      <div
        className={`relative rounded-lg overflow-hidden ${height} ${className}`}>
        <img
          src={images[0]}
          alt={`${altBase} 1`}
          className="w-full h-full object-cover border-2 border-green"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-black ${height} ${className}`}>
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex w-full h-full overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") onArrow(-1);
          if (e.key === "ArrowRight") onArrow(1);
        }}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-none w-full h-full snap-center">
            <img
              src={src}
              alt={`${altBase} ${i + 1}`}
              draggable={false}
              className="w-full h-full object-cover block pointer-events-none border-2 border-green"
            />
          </div>
        ))}
      </div>

      {/* Counter badge (top-right) */}
      <div
        className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black bg-opacity-55 text-white text-xs font-semibold leading-none tracking-wide"
        aria-label="image counter">
        {index + 1} / {total}
      </div>

      {/* Gradient chevrons (Instagram-like) */}
      {showArrows && (
        <>
          {/* Left */}
          <button
            onClick={() => onArrow(-1)}
            disabled={!canGoPrev}
            aria-label="Previous photo"
            className={`absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 grid place-items-center border-none rounded-full cursor-pointer text-white opacity-95 transition-opacity ${
              canGoPrev
                ? "bg-gradient-to-r from-black from-45% to-black to-5% hover:opacity-100"
                : "opacity-30 cursor-not-allowed bg-gradient-to-r from-black from-45% to-black to-5%"
            }`}>
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right */}
          <button
            onClick={() => onArrow(1)}
            disabled={!canGoNext}
            aria-label="Next photo"
            className={`absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 grid place-items-center border-none rounded-full cursor-pointer text-white opacity-95 transition-opacity ${
              canGoNext
                ? "bg-gradient-to-l from-black from-45% to-black to-5% hover:opacity-100"
                : "opacity-30 cursor-not-allowed bg-gradient-to-l from-black from-45% to-black to-5%"
            }`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots (bottom-center) */}
      {showDots && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full border-none p-0 outline-none cursor-pointer transition-colors ${
                i === index ? "bg-white" : "bg-white bg-opacity-40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TurfCarousel;
