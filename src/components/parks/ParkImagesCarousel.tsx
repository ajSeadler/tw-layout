import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// same wrapIndex & variants as before
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
      <div className="mb-10 w-full max-w-7xl mx-auto">
        {/* arrows + image in a flex row */}
        <div className="flex items-center justify-between">
          <button
            aria-label="Previous"
            onClick={() => paginate(-1)}
            className="p-2 rounded-full shadow-md bg-[rgb(var(--card))] hover:bg-[rgb(var(--card-secondary))]"
          >
            <ArrowLeft size={24} className="text-[rgb(var(--copy))]" />
          </button>

          <div
            className="relative overflow-hidden rounded-2xl shadow-sm h-64 w-full mx-4 bg-[rgb(var(--card))] cursor-pointer"
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
                exit="exit"
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          <button
            aria-label="Next"
            onClick={() => paginate(1)}
            className="p-2 rounded-full shadow-md bg-[rgb(var(--card))] hover:bg-[rgb(var(--card-secondary))]"
          >
            <ArrowRight size={24} className="text-[rgb(var(--copy))]" />
          </button>
        </div>

        {/* caption beneath image */}
        {images[index].caption && (
          <div className="mt-3 px-2 text-sm text-[rgb(var(--copy-secondary))]">
            {images[index].caption}
          </div>
        )}

        {/* indicators beneath that */}
        <div className="mt-4 flex justify-center space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx - index)}
              className={`w-3 h-3 rounded-full focus:outline-none transition-transform ${
                idx === index
                  ? "bg-[rgb(var(--cta))] scale-125"
                  : "bg-[rgb(var(--copy-secondary))]/60 hover:bg-[rgb(var(--copy-secondary))]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* full‑screen modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-[rgba(var(--card),0.8)] hover:bg-[rgba(var(--card),1)] shadow-md"
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
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
}
