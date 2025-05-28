/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

type Image = { url: string; altText: string; caption?: string };

const wrapIndex = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const swipeConfidenceThreshold = 10000;
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function ParkImageCarousel({ images }: { images: Image[] }) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const count = images.length;
  const index = wrapIndex(0, count, page);

  const paginate = (dir: number) => setPage([page + dir, dir]);

  const onDragEnd = (_: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  return (
    <>
      {/* Top Right Navigation Buttons */}
      <div className="max-w-5xl mx-auto px-4 mb-2 flex justify-end">
        <div className="flex space-x-3">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous image"
            className="p-2 rounded-full bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next image"
            className="p-2 rounded-full bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full sm:max-w-5xl mx-auto aspect-[9/16] sm:aspect-[16/9] overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--bg))] rounded-3xl shadow-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={images[index].url}
            src={images[index].url}
            alt={images[index].altText}
            className="absolute inset-0 w-full h-full object-cover object-center select-none cursor-zoom-in"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            onClick={() => setIsModalOpen(true)}
            loading="lazy"
            decoding="async"
            draggable={false}
            aria-label={`Image ${index + 1} of ${count}`}
          />
        </AnimatePresence>
      </div>

      {/* Caption */}
      {images[index].caption && (
        <figcaption
          className="max-w-3xl mx-auto mt-5 px-6 text-center text-sm sm:text-base text-[rgb(var(--copy-secondary))] font-light italic"
          aria-live="polite"
        >
          {images[index].caption}
        </figcaption>
      )}

      {/* Pagination Dots */}
      <div className="max-w-3xl mx-auto mt-3 px-6 flex justify-center gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => paginate(idx - index)}
            aria-current={idx === index ? "true" : undefined}
            aria-label={`Go to image ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === index
                ? "bg-[rgb(var(--cta))] scale-110 shadow-[0_0_6px_rgba(0,0,0,0.4)]"
                : "bg-[rgb(var(--cta))]/40 hover:bg-[rgb(var(--cta))]/70"
            }`}
            type="button"
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            aria-modal="true"
            role="dialog"
            aria-label="Fullscreen image view"
          >
            {/* Modal Controls */}
            <div className="absolute top-5 right-5 flex space-x-4 z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="w-11 h-11 rounded-full bg-white text-gray-800 shadow-md hover:shadow-lg flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close fullscreen view"
              >
                <X size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                className="w-11 h-11 rounded-full bg-white text-gray-800 shadow-md hover:shadow-lg flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                className="w-11 h-11 rounded-full bg-white text-gray-800 shadow-md hover:shadow-lg flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next image"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <motion.img
              key={images[index].url + "-modal"}
              src={images[index].url}
              alt={images[index].altText}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-xl select-none"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
              decoding="async"
              draggable={false}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              aria-label={`Fullscreen image ${index + 1} of ${count}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
