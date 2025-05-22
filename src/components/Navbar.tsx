import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { MountainIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Parks", path: "/parks" },
    { name: "Plan Visit", path: "/planner" },
    { name: "About", path: "/about" },
    { name: "My Trip", path: "/summary" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[rgb(var(--card))] border-b border-[rgb(var(--border))]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          className="text-xl font-bold text-[rgb(var(--copy-primary))] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <MountainIcon />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[rgb(var(--copy-secondary))] hover:text-[rgb(var(--copy-primary))] transition font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Theme Switcher */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {/* Hamburger Menu (mobile) */}
          <button
            className="md:hidden text-[rgb(var(--copy-primary))] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden px-6 pb-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-[rgb(var(--copy-secondary))] hover:text-[rgb(var(--copy-primary))] font-medium transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
