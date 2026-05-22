import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

export default function Founder() {
  const [ref, visible] = useIntersection(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: PALETTE.obsidian,
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
      }}
      className="founder-grid"
    >
      {/* Portrait */}
      <div
        style={{
          aspectRatio: "4/5",
          overflow: "hidden",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <img
          src="/public/images/Nasambu(replace).jpeg"
          alt="Nasambu Kong'ani — Founder"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(10,7,5,0.7))",
          }}
        />
        {/* Name caption */}
        <div style={{ position: "absolute", bottom: "32px", left: "32px" }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "28px",
              color: PALETTE.ivory,
            }}
          >
            Nasambu Kong'ani
          </div>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "10px",
              color: PALETTE.gold,
              letterSpacing: "0.3em",
              marginTop: "4px",
            }}
          >
            Founder &amp; Systems Architect
          </div>
        </div>
      </div>

      {/* Copy */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
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
          — The Architect
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 4vw, 60px)",
            color: PALETTE.ivory,
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          Not a voice.
          <br />
          <em>A framework.</em>
        </h2>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px",
            color: "rgba(250,245,236,0.65)",
            lineHeight: 1.75,
            marginBottom: "24px",
            fontWeight: 300,
          }}
        >
          Nasambu Kong'ani is a strategist, systems thinker, institutional architect, and cultural
          analyst. She does not build brands — she builds the structures that make brands inevitable.
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            color: "rgba(250,245,236,0.45)",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          Her work sits at the intersection of cultural intelligence and operational design — a rare
          combination that 576.39 has systematized into institutional capacity.
        </p>

        {/* Pull quote */}
        <div
          style={{
            marginTop: "48px",
            padding: "32px",
            border: `1px solid rgba(201,168,76,0.2)`,
            background: "rgba(107,15,26,0.2)",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              color: PALETTE.champagne,
              fontStyle: "italic",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            "We understand the system deeply enough to redesign parts of it."
          </p>
        </div>
      </div>
    </section>
  );
}
