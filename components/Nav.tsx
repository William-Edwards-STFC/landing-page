"use client";
import { useState, useEffect } from "react";

const links = ["About", "Projects", "Skills", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || menuOpen ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 ml-auto">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(232,232,240,0.6)" }}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/stats"
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(232,232,240,0.6)" }}
            >
              Stats
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-opacity duration-200 hover:opacity-80"
              style={{ background: "var(--accent)", color: "white" }}
            >
              Admin
            </a>
          </li>
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: "rgba(232,232,240,0.8)",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: "rgba(232,232,240,0.8)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: "rgba(232,232,240,0.8)",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm py-1"
              style={{ color: "rgba(232,232,240,0.7)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="/stats"
            className="text-sm py-1"
            style={{ color: "rgba(232,232,240,0.7)" }}
            onClick={() => setMenuOpen(false)}
          >
            Stats
          </a>
          <a
            href="/admin"
            className="self-start px-4 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "var(--accent)", color: "white" }}
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </a>
        </div>
      )}
    </nav>
  );
}
