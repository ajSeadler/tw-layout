import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { MountainIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Parks", path: "/parks" },
    { name: "Plan Visit", path: "/planner" },
    { name: "About", path: "/about" },
    { name: "My Trip", path: "/summary" },
    { name: "Alerts", path: "/alerts" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(var(--card),0.85)] border-b border-[rgba(var(--border),0.3)] shadow-md transition-transform duration-350 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/")}
          onKeyDown={(e) => (e.key === "Enter" ? navigate("/") : null)}
          className="flex items-center gap-3 cursor-pointer select-none group"
          aria-label="Navigate to homepage"
        >
          <MountainIcon className="w-7 h-7 text-[rgb(var(--cta))] group-hover:text-[rgb(var(--cta-active))] transition-colors duration-300" />
          <span className="text-2xl font-extrabold text-[rgb(var(--copy-primary))] tracking-tight select-text">
            ExploreParks
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-10">
          {links.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="relative text-[rgb(var(--copy-secondary))] font-semibold text-sm uppercase tracking-wide hover:text-[rgb(var(--copy-primary))] transition-colors duration-300 px-1"
            >
              {name}
              <span
                className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[rgb(var(--cta))] transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <ThemeSwitcher />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={`${menuOpen ? "Close" : "Open"} navigation menu`}
            aria-expanded={menuOpen}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1 cursor-pointer"
          >
            {/* Hamburger lines */}
            <span
              className={`block w-6 h-[2px] bg-[rgb(var(--copy-primary))] rounded transition-transform duration-300 ease-in-out origin-left ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[rgb(var(--copy-primary))] rounded transition-opacity duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[rgb(var(--copy-primary))] rounded transition-transform duration-300 ease-in-out origin-left ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden max-w-full bg-[rgba(var(--card),0.95)] border-t border-[rgba(var(--border),0.3)] backdrop-blur-sm overflow-hidden transition-max-height duration-500 ease-in-out ${
          menuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {links.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="text-[rgb(var(--copy-primary))] font-semibold text-lg uppercase tracking-wide hover:text-[rgb(var(--cta))] transition-colors duration-300"
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
