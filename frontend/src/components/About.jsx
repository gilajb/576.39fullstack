import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const STATS = [
  ["03", "Divisions"],
  ["12+", "Nations"],
  ["∞", "Potential"],
];


export default function About() {
  const [ref, visible] = useIntersection(0.1);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: PALETTE.obsidian,
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
      }}
    >
      {/* Left column */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            color: PALETTE.gold,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          — Who We Are
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(40px, 5vw, 72px)",
            color: PALETTE.ivory,
            lineHeight: 1.05,
            marginBottom: "40px",
          }}
        >
          Quiet
          <br />
          Strategic
          <br />
          <em style={{ color: PALETTE.gold }}>Power.</em>
        </h2>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px",
            color: "rgba(250,245,236,0.7)",
            lineHeight: 1.7,
            marginBottom: "24px",
            fontWeight: 300,
          }}
        >
          576.39 is a systems architecture institution focused on unlocking underutilized economic
          and cultural sectors across Africa. We design scalable operational frameworks that connect
          infrastructure, logistics, governance, and cultural production.
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            color: "rgba(250,245,236,0.5)",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Africa does not lack talent. It lacks systems continuity, operational infrastructure,
          strategic positioning, and institutional memory.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "48px", marginTop: "56px" }}>
          {STATS.map(([number, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "48px",
                  color: PALETTE.gold,
                  fontWeight: 300,
                }}
              >
                {number}
              </div>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "10px",
                  color: PALETTE.ashGray,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — image */}
      <div
        style={{
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      >
        <div
          style={{
            aspectRatio: "3/4",
            overflow: "hidden",
            backgroundImage:
              'url("/public/images/WhoWeArePower.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center top",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        
      </div>
    </section>
  );
}
