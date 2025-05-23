/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ScrollIndicator } from "../ScrollIndicator";

type Image = { url: string; altText: string; caption?: string };

const wrapIndex = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const swipeThreshold = 10000;
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

export function ParkImageCarousel({ images }: { images: Image[] }) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const count = images.length;
  const index = wrapIndex(0, count, page);

  const paginate = (dir: number) => setPage([page + dir, dir]);

  const onDragEnd = (_: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeThreshold) paginate(1);
    else if (swipe > swipeThreshold) paginate(-1);
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={images[index].url}
          src={images[index].url}
          alt={images[index].altText}
          className="absolute inset-0 w-full h-full object-cover object-center"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={onDragEnd}
          loading="lazy"
        />
      </AnimatePresence>

      {/* Navigation Arrows with CTA-tinted background */}
      <button
        aria-label="Previous"
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[rgb(var(--cta))]/30 hover:bg-[rgb(var(--cta))]/60 text-white z-20"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        aria-label="Next"
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[rgb(var(--cta))]/30 hover:bg-[rgb(var(--cta))]/60 text-white z-20"
      >
        <ArrowRight size={24} />
      </button>

      {/* Dot Indicators with CTA background */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 p-2 rounded-full bg-[rgb(var(--cta))]/25 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => paginate(idx - index)}
            className={`w-3 h-3 rounded-full transition-transform ${
              idx === index
                ? "bg-white scale-125"
                : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <ScrollIndicator />
    </div>
  );
}
