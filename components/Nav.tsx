"use client";
import { useState, useEffect } from "react";

const links = ["About", "Projects", "Skills", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-end">
        <ul className="flex items-center gap-8">
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
      </div>
    </nav>
  );
}
