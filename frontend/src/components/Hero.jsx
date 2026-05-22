import { useState, useEffect } from "react";
import PALETTE from "../constants/palette";
import { useParallax } from "../hooks/useIntersection";


export default function Hero() {
  const parallax = useParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "120px",
        }}
    >
      {/* Parallax background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/public/images/HomeArchitecture.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: `translateY(${parallax * 0.3}px)`,
          transition: "transform 0s linear",
        }}
      />

      {/* Dark overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, rgba(10,7,5,0.3) 0%, rgba(107,15,26,0.2) 40%, rgba(10,7,5,0.85) 100%)`,
        }}
      />

      {/* Film grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
      />

      {/* Vertical gold rule */}
      <div
        style={{
          position: "absolute",
          left: "48px",
          top: "50%",
          width: "1px",
          height: "80px",
          background: `linear-gradient(180deg, transparent, ${PALETTE.gold})`,
          transform: "translateY(-50%)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 clamp(32px, 6vw, 80px)",
          maxWidth: "900px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}
      >
        {/*<div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            fontWeight: 10000,
            color: PALETTE.white,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          — Systems Architecture Institution
        </div>*/}

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(52px, 8vw, 108px)",
            color: PALETTE.ivory,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            marginBottom: "32px",
          }}
        >
          Architecting
          <br />
          <em style={{ fontStyle: "italic", color: PALETTE.champagne }}>Africa's</em>
          <br />
          Next Era.
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgba(242,234,211,0.7)",
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: "520px",
            marginBottom: "48px",
          }}
        >
          A systems architecture and cultural intelligence institution designing operational
          frameworks for Africa's next economic era.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a
            href="#about"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: PALETTE.obsidian,
              background: PALETTE.gold,
              padding: "16px 36px",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = PALETTE.champagne;
              e.target.style.paddingRight = "44px";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = PALETTE.gold;
              e.target.style.paddingRight = "36px";
            }}
          >
            Enter Institution
          </a>
          <a
            href="#divisions"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: PALETTE.champagne,
              border: `1px solid rgba(201,168,76,0.4)`,
              padding: "16px 36px",
              transition: "all 0.4s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = PALETTE.gold;
              e.target.style.color = PALETTE.gold;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(201,168,76,0.4)";
              e.target.style.color = PALETTE.champagne;
            }}
          >
            Our Divisions
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s 1.5s",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9px",
            color: PALETTE.ashGray,
            letterSpacing: "0.3em",
            writingMode: "vertical-rl",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: `linear-gradient(180deg, ${PALETTE.gold}, transparent)`,
            animation: "pulse 2s infinite",
          }}
        />
      </div>
    </section>
  );
}
