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
  { id: "directions", label: "Directions" },
  { id: "photos", label: "Photos" },
  { id: "hours", label: "Operating Hours" },
  { id: "fees", label: "Entrance Fees" },
  { id: "activities", label: "Activities & Topics" },
  { id: "weather-info", label: "Weather Info" },
];

const TableOfContents: React.FC<TableOfContentsProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Mobile Slide-In TOC */}
      <div
        className={`fixed inset-0 z-50 bg-[rgb(var(--background))] p-6 transition-transform duration-300 ease-in-out sm:hidden shadow-xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative max-w-[420px] w-full h-full mx-auto">
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
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col p-4 w-auto space-y-10 border-r border-[rgb(var(--border))] bg-[rgb(var(--background))] shadow-sm">
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
