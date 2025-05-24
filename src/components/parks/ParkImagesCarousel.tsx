/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ScrollIndicator } from "../ScrollIndicator";

type Image = { url: string; altText: string; caption?: string };

const wrapIndex = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const swipeThreshold = 10000;
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 200 : -200, opacity: 0 }),
};

export function ParkImageCarousel({ images }: { images: Image[] }) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const count = images.length;
  const index = wrapIndex(0, count, page);

  const paginate = (dir: number) => setPage([page + dir, dir]);

  const onDragEnd = (_: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeThreshold) paginate(1);
    else if (swipe > swipeThreshold) paginate(-1);
  };

  return (
    <>
      {/* Carousel */}
      <div className="relative max-w-[100%] sm:max-w-3xl lg:max-w-5xl mx-auto aspect-[16/9] sm:rounded-2xl overflow-hidden shadow-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={images[index].url}
            src={images[index].url}
            alt={images[index].altText}
            className="absolute inset-0 w-full h-full object-cover object-center cursor-zoom-in"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={onDragEnd}
            onClick={() => setIsModalOpen(true)}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          aria-label="Previous"
          onClick={() => paginate(-1)}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[rgb(var(--cta))]/30 hover:bg-[rgb(var(--cta))]/60 text-white z-30 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          aria-label="Next"
          onClick={() => paginate(1)}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[rgb(var(--cta))]/30 hover:bg-[rgb(var(--cta))]/60 text-white z-30 transition-colors"
        >
          <ArrowRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 px-3 py-1 rounded-full bg-[rgb(var(--cta))]/25 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx - index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                idx === index
                  ? "bg-white scale-110"
                  : "bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <ScrollIndicator />
      </div>

      {/* Caption below carousel */}
      {images[index].caption && (
        <div
          className="max-w-2xl mx-auto mt-6 px-6 py-4 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--copy-secondary))] text-center text-base sm:text-lg leading-relaxed tracking-wide shadow-md italic"
          aria-live="polite"
        >
          <div className="mb-2 border-t border-[rgb(var(--cta))] w-12 mx-auto" />
          <p>{images[index].caption}</p>
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.img
              key={images[index].url + "-modal"}
              src={images[index].url}
              alt={images[index].altText}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // prevent modal close on image click
              loading="lazy"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={onDragEnd}
            />

            {/* Modal Navigation */}
            <button
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[rgb(var(--cta))]/60 hover:bg-[rgb(var(--cta))]/90 text-white transition-colors z-60"
            >
              <X size={28} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[rgb(var(--cta))]/60 hover:bg-[rgb(var(--cta))]/90 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[rgb(var(--cta))]/60 hover:bg-[rgb(var(--cta))]/90 text-white transition-colors"
            >
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
