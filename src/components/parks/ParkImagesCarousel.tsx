import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility
const wrapIndex = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

export function ParkImageCarousel({
  images,
}: {
  images: { url: string; altText: string; caption?: string }[];
}) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const count = images.length;
  if (count === 0) return null;

  const index = wrapIndex(0, count, page);
  const paginate = (dir: number) => setPage([page + dir, dir]);

  return (
    <>
      <div className="mb-10 w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 md:gap-6">
          <button
            aria-label="Previous"
            onClick={() => paginate(-1)}
            className="p-2 md:p-3 rounded-full shadow-md bg-[rgb(var(--card))] hover:bg-[rgb(var(--card-secondary))] transition-colors"
          >
            <ArrowLeft
              size={20}
              className="text-[rgb(var(--copy))] md:size-6"
            />
          </button>

          <div
            className="relative overflow-hidden rounded-2xl shadow-sm h-64 sm:h-80 md:h-[28rem] w-full cursor-pointer bg-[rgb(var(--card))]"
            onClick={() => setModalOpen(true)}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={images[index].url}
                src={images[index].url}
                alt={images[index].altText}
                className="absolute top-0 left-0 w-full h-full object-cover"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                loading="lazy"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          <button
            aria-label="Next"
            onClick={() => paginate(1)}
            className="p-2 md:p-3 rounded-full shadow-md bg-[rgb(var(--card))] hover:bg-[rgb(var(--card-secondary))] transition-colors"
          >
            <ArrowRight
              size={20}
              className="text-[rgb(var(--copy))] md:size-6"
            />
          </button>
        </div>

        {/* caption */}
        {images[index].caption && (
          <div className="mt-3 px-1 md:px-2 text-sm md:text-base text-[rgb(var(--copy-secondary))] text-center">
            {images[index].caption}
          </div>
        )}

        {/* indicators */}
        <div className="mt-4 flex justify-center space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx - index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-transform focus:outline-none ${
                idx === index
                  ? "bg-[rgb(var(--cta))] scale-125"
                  : "bg-[rgb(var(--copy-secondary))]/60 hover:bg-[rgb(var(--copy-secondary))]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-[rgba(var(--card),0.85)] hover:bg-[rgba(var(--card),1)] shadow-lg"
            aria-label="Close full view"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
          >
            <X size={24} className="text-white" />
          </button>
          <img
            src={images[index].url}
            alt={images[index].altText}
            loading="lazy"
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-xl transition-all"
          />
        </div>
      )}
    </>
  );
}
