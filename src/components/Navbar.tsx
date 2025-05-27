import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { MountainIcon, Menu as MenuIcon, X as XIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      const current = window.scrollY;
      setShowNavbar(!(current > lastScrollY && current > 80));
      lastScrollY = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(var(--card),0.85)]shadow-md transition-transform duration-350 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          className="flex items-center gap-3 cursor-pointer select-none group"
          aria-label="Navigate to homepage"
        >
          <MountainIcon className="w-7 h-7 text-[rgb(var(--cta))] group-hover:text-[rgb(var(--cta-active))] transition-colors duration-300" />
          <span className="text-2xl font-extrabold text-[rgb(var(--copy-primary))] tracking-tight">
            ExploreParks
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-10">
          {links.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`relative text-[rgb(var(--copy-secondary))] font-semibold text-sm uppercase tracking-wide hover:text-[rgb(var(--copy-primary))] transition-colors duration-300 px-1 ${
                  isActive ? "text-[rgb(var(--cta))]" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[rgb(var(--cta))] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Desktop theme toggle */}
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2"
          >
            {menuOpen ? (
              <XIcon className="w-6 h-6 text-[rgb(var(--copy-primary))]" />
            ) : (
              <MenuIcon className="w-6 h-6 text-[rgb(var(--copy-primary))]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed inset-x-0 top-[64px] bg-[rgba(var(--card),0.95)]  backdrop-blur-sm overflow-hidden transition-max-height duration-500 ease-in-out ${
          menuOpen ? "max-h-screen py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 space-y-6">
          {links.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`text-[rgb(var(--copy-primary))] font-semibold text-lg uppercase tracking-wide hover:text-[rgb(var(--cta))] transition-colors duration-300 ${
                  isActive ? "text-[rgb(var(--cta))]" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {name}
              </Link>
            );
          })}

          {/* Mobile theme toggle */}
          <div className="pt-6 border-t border-[rgba(var(--border),0.3)]">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
