import { useState } from "react";
import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const DIVISIONS = [
  {
    num: "01",
    title: "Strategy Lab",
    sub: "Structural Intelligence",
    desc: "Government advisory, economic systems, logistics architecture, and institutional restructuring. We work with governments, ministries, regional bodies, and large institutions to redesign broken frameworks.",
    clients: ["Governments", "Ministries", "Regional Bodies", "Large Institutions"],
    image: "/public/images/StrategyLab.jpeg",
    mood: "Structured. Monochrome. Architectural.",
  },
  {
    num: "02",
    title: "Cultural Engine",
    sub: "Creative Patronage",
    desc: "Patronage, creative development, storytelling, cultural production, and ecosystem investment. We build the infrastructure that allows African culture to scale without losing its soul.",
    clients: ["Creatives", "Cultural Institutions", "Media Houses", "Foundations"],
    image: "/public/images/CulturalEngine.jpeg",
    mood: "Warmer. Cinematic. Editorial.",
  },
  {
    num: "03",
    title: "Research & Intelligence",
    sub: "Behavioral Systems",
    desc: "Youth mapping, behavioral analysis, microcultures, trend forecasting, and social systems research. This division legitimizes our deeper cultural analysis — understanding the systems that shape how people live.",
    clients: ["Think Tanks", "Brands", "Policy Bodies", "Academic Institutions"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85",
    mood: "Sharp. Precise. Analytical.",
  },
];

/**
 * Divisions
 * Tabbed layout: left sidebar lists the three divisions,
 * right panel shows details + image for the active division.
 */
export default function Divisions() {
  const [ref, visible] = useIntersection(0.05);
  const [active, setActive] = useState(0);
  const current = DIVISIONS[active];

  return (
    <section
      id="divisions"
      ref={ref}
      style={{ background: PALETTE.graphite, padding: "clamp(80px, 12vw, 160px) 0" }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "0 clamp(24px, 6vw, 80px)",
          marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            color: PALETTE.gold,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          — Divisions
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(40px, 5vw, 72px)",
            color: PALETTE.ivory,
            lineHeight: 1.05,
          }}
        >
          Three Arms.
          <br />
          <em>One Vision.</em>
        </h2>
      </div>

      {/* Tab layout */}
      <div
        style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "600px" }}
        className="div-grid"
      >
        {/* Sidebar tabs */}
        <div style={{ borderRight: `1px solid rgba(201,168,76,0.1)` }}>
          {DIVISIONS.map((div, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "40px clamp(24px, 6vw, 80px)",
                borderBottom: `1px solid rgba(201,168,76,0.08)`,
                cursor: "pointer",
                background: active === i ? `rgba(107,15,26,0.4)` : "transparent",
                borderLeft: active === i ? `3px solid ${PALETTE.gold}` : "3px solid transparent",
                transition: "all 0.4s",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: PALETTE.gold,
                  letterSpacing: "0.2em",
                  marginBottom: "8px",
                }}
              >
                {div.num}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  color: active === i ? PALETTE.ivory : PALETTE.ashGray,
                  fontWeight: 300,
                  transition: "color 0.4s",
                }}
              >
                {div.title}
              </div>
            </div>
          ))}
        </div>

        {/* Content pane */}
        <div
          className="div-inner"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "0 clamp(24px, 6vw, 80px)",
            alignContent: "center",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "10px",
                color: PALETTE.gold,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {current.sub}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: PALETTE.ivory,
                marginBottom: "28px",
                lineHeight: 1.1,
              }}
            >
              {current.title}
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "19px",
                color: "rgba(250,245,236,0.65)",
                lineHeight: 1.7,
                marginBottom: "36px",
                fontWeight: 300,
              }}
            >
              {current.desc}
            </p>

            {/* Client tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {current.clients.map((client) => (
                <span
                  key={client}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: PALETTE.champagne,
                    border: `1px solid rgba(201,168,76,0.3)`,
                    padding: "6px 16px",
                    textTransform: "uppercase",
                  }}
                >
                  {client}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: "36px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "15px",
                color: PALETTE.ashGray,
                fontStyle: "italic",
              }}
            >
              {current.mood}
            </div>
          </div>

          {/* Division image */}
          <div
            style={{
              aspectRatio: "4/5",
              overflow: "hidden",
              backgroundImage: `url(${current.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 0.5s",
            }}
          />
        </div>
      </div>
    </section>
  );
}
