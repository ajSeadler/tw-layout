import React from "react";
import { X } from "lucide-react";
import PopularParks from "./PopularParks";
import QuickTips from "./QuickTips";
import DidYouKnow from "./DidYouKnow";

interface TableOfContentsProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "photos", label: "Photos" },
  { id: "weather-info", label: "Weather Info" },

  { id: "directions", label: "Directions" },

  { id: "hours", label: "Operating Hours" },
  { id: "fees", label: "Entrance Fees" },
  { id: "activities", label: "Activities & Topics" },
];

const TableOfContents: React.FC<TableOfContentsProps> = ({ open, onClose }) => {
  return (
    <>
      {/* ✅ Mobile Slide-In Sidebar */}
      <div
        className={`fixed inset-0 z-[99] sm:hidden transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[90%] max-w-[420px] bg-[rgb(var(--background))] p-6 shadow-xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto`}
          style={{ maxHeight: "100vh" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[rgb(var(--border))]"
            aria-label="Close Table of Contents"
          >
            <X className="w-6 h-6 text-[rgb(var(--copy-primary))]" />
          </button>

          <h2 className="text-3xl font-semibold mb-8">Contents</h2>
          <nav className="space-y-4 text-lg font-medium">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={onClose}
                className="block px-4 py-3 rounded-2xl bg-[rgb(var(--card))] hover:bg-[rgb(var(--cta))] hover:text-white transition"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="space-y-6 mt-10">
            <PopularParks onClose={onClose} />
            <QuickTips />
            <DidYouKnow />
          </div>
        </div>
      </div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col p-4 w-[280px] space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contents</h2>
          <nav className="space-y-3 text-base font-medium">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={onClose}
                className="block px-4 py-3 rounded-xl hover:bg-[rgb(var(--cta))] hover:text-white transition"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <PopularParks onClose={onClose} />
          <QuickTips />
          <DidYouKnow />
        </div>
      </aside>
    </>
  );
};

export default TableOfContents;
