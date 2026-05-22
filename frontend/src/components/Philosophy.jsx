import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const BELIEFS = [
  "Economic Activation Systems",
  "Creative Infrastructure",
  "Institutional Frameworks",
  "Logistics & Distribution",
  "Cultural Intelligence Systems",
];

/**
 * Philosophy
 * Deep-cherry background strip with five service pillars in a flex grid.
 * Each card fades and slides up on scroll entry with staggered delays.
 */
export default function Philosophy() {
  const [ref, visible] = useIntersection(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: PALETTE.deepCherry,
        padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
      }}
    >
      {/* Section heading */}
      <div
        style={{
          textAlign: "center",
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
          — What We Build
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 64px)",
            color: PALETTE.ivory,
            lineHeight: 1.1,
          }}
        >
          Systems that <em>endure.</em>
        </h2>
      </div>

      {/* Pillar cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
        {BELIEFS.map((belief, i) => (
          <div
            key={belief}
            style={{
              flex: "1 1 200px",
              padding: "40px 32px",
              background: `rgba(10,7,5,${0.3 + i * 0.08})`,
              border: `1px solid rgba(201,168,76,0.1)`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(107,15,26,0.6)`;
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(10,7,5,${0.3 + i * 0.08})`;
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                color: PALETTE.gold,
                letterSpacing: "0.2em",
                marginBottom: "16px",
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                color: PALETTE.ivory,
                fontWeight: 300,
              }}
            >
              {belief}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
