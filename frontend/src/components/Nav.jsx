import { useState, useEffect } from "react";
import PALETTE from "../constants/palette";

const NAV_LINKS = ["About", "Divisions", "Work", "Journal", "Contact"];


export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "16px 48px" : "28px 48px",
          background: scrolled ? "rgba(10,7,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "22px",
            color: PALETTE.champagne,
            letterSpacing: "0.25em",
            cursor: "pointer",
          }}
        >
          576.39
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                color: PALETTE.ashGray,
                letterSpacing: "0.2em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
              onMouseLeave={(e) => (e.target.style.color = PALETTE.ashGray)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "10px",
              color: PALETTE.obsidian,
              background: PALETTE.gold,
              padding: "10px 24px",
              letterSpacing: "0.2em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = PALETTE.champagne)}
            onMouseLeave={(e) => (e.target.style.background = PALETTE.gold)}
          >
            Engage
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, height: 1, background: PALETTE.champagne, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
          <div style={{ width: 24, height: 1, background: PALETTE.champagne, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 1, background: PALETTE.champagne, marginTop: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(10,7,5,0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px",
                color: PALETTE.champagne,
                letterSpacing: "0.15em",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
