import { useState } from "react";
import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const QUOTES = [
  {
    q: "576.39 didn't give us a strategy deck. They gave us a working system. The difference is everything.",
    name: "Director of Economic Planning",
    org: "East African Ministry",
  },
  {
    q: "What they built wasn't just a framework — it was institutional memory. For the first time, our work continues beyond our tenure.",
    name: "Executive Director",
    org: "Pan-African Cultural Foundation",
  },
  {
    q: "The intelligence systems they designed revealed patterns we had no language for. Now we have policy to match.",
    name: "Chief Research Officer",
    org: "Regional Development Bank",
  },
];

/**
 * Testimonials
 * Centred quote rotator with dot navigation.
 * Deep-cherry background for contrast against the dark sections around it.
 */
export default function Testimonials() {
  const [ref, visible] = useIntersection(0.1);
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      style={{
        background: PALETTE.deepCherry,
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            color: PALETTE.gold,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          — Testimonials
        </div>

        {/* Quote */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 3vw, 36px)",
            color: PALETTE.ivory,
            fontStyle: "italic",
            lineHeight: 1.55,
            marginBottom: "48px",
            fontWeight: 300,
            minHeight: "120px",
            transition: "opacity 0.5s",
          }}
        >
          "{QUOTES[active].q}"
        </div>

        {/* Attribution */}
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            color: PALETTE.champagne,
            letterSpacing: "0.2em",
          }}
        >
          {QUOTES[active].name}
        </div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            color: PALETTE.ashGray,
            letterSpacing: "0.15em",
            marginTop: "4px",
          }}
        >
          {QUOTES[active].org}
        </div>

        {/* Dot navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "48px" }}>
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              style={{
                width: i === active ? "32px" : "8px",
                height: "8px",
                background: i === active ? PALETTE.gold : "rgba(201,168,76,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s",
                borderRadius: "4px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
