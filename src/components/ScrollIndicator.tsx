/* eslint-disable react-hooks/exhaustive-deps */
// src/components/ScrollIndicator.tsx
import { useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: [0, -10, 0, -6, 0, -4, 0], // 3 bounce keyframes
    transition: {
      duration: 3.6, // full sequence of 3 bounces
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function ScrollIndicator() {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  const fadeOut = () => {
    controls.start("exit").then(() => setIsVisible(false));
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(false);
      return;
    }

    controls.start("visible");

    const timeout = setTimeout(fadeOut, 3600); // after visible animation
    return () => clearTimeout(timeout);
  }, [controls, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        fadeOut();
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls, shouldReduceMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[rgb(var(--cta))]/80 text-white backdrop-blur-md rounded-full shadow-lg ring-1 ring-white/20 z-50"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <span className="text-sm font-medium">Scroll for details</span>
    </motion.div>
  );
}
