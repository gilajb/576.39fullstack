import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const CASES = [
  {
    n: "01",
    title: "Economic Activation Framework",
    loc: "East Africa",
    tag: "Strategy Lab",
    problem: "Fragmented logistics creating 40% loss in regional trade efficiency",
    outcome: "Unified operational model connecting 6 ministries across 3 nations",
  },
  {
    n: "02",
    title: "Cultural Production System",
    loc: "West Africa",
    tag: "Cultural Engine",
    problem: "Unmonetized creative output with no institutional backing",
    outcome: "Sustainable patronage model generating $2M+ in cultural GDP",
  },
  {
    n: "03",
    title: "Youth Behavioral Mapping",
    loc: "Pan-African",
    tag: "Research Lab",
    problem: "Policy built on outdated demographic assumptions",
    outcome: "Real-time intelligence system informing 12 government decisions",
  },
];

/**
 * CaseStudy
 * Full-width table-style case study listing on a cream background.
 * Each row slides in from the left and highlights on hover.
 */
export default function CaseStudy() {
  const [ref, visible] = useIntersection(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: PALETTE.cream,
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            color: PALETTE.deepCherry,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          — Case Studies
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(40px, 5vw, 72px)",
            color: PALETTE.obsidian,
            lineHeight: 1.05,
          }}
        >
          Transformation
          <br />
          <em style={{ color: PALETTE.deepCherry }}>Architecture.</em>
        </h2>
      </div>

      {/* Case rows */}
      <div>
        {CASES.map((c, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr 1fr 140px",
              alignItems: "center",
              padding: "40px 0",
              borderTop: `1px solid rgba(74,55,40,0.15)`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              cursor: "pointer",
              gap: "24px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(107,15,26,0.05)";
              e.currentTarget.style.paddingLeft = "16px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
          >
            {/* Number */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px",
                color: PALETTE.gold,
                letterSpacing: "0.2em",
              }}
            >
              {c.n}
            </div>

            {/* Title + location */}
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  color: PALETTE.obsidian,
                  fontWeight: 400,
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "10px",
                  color: PALETTE.ashGray,
                  letterSpacing: "0.2em",
                  marginTop: "4px",
                }}
              >
                {c.loc}
              </div>
            </div>

            {/* Problem */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "15px",
                color: PALETTE.warmBrown,
                lineHeight: 1.5,
              }}
            >
              {c.problem}
            </div>

            {/* Outcome */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "15px",
                color: PALETTE.deepCherry,
                lineHeight: 1.5,
              }}
            >
              {c.outcome}
            </div>

            {/* Tag pill */}
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "9px",
                color: PALETTE.gold,
                letterSpacing: "0.2em",
                border: `1px solid ${PALETTE.gold}`,
                padding: "6px 16px",
                textAlign: "center",
                whiteSpace: "nowrap",
                minWidth: "120px",
              }}
            >
              {c.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
