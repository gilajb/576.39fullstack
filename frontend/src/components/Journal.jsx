import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const POSTS = [
  {
    tag: "Microcultures",
    date: "March 2026",
    title: "On the Appetite Economy: How Desire Shapes African Markets",
    excerpt:
      "Understanding how informal cultural production creates economic mass — and why it remains unmapped.",
  },
  {
    tag: "Systems",
    date: "February 2026",
    title: "The Institutional Memory Problem: Why Africa Restarts Every Generation",
    excerpt:
      "Structural analysis of knowledge loss cycles and the frameworks needed to break them.",
  },
  {
    tag: "Intelligence",
    date: "January 2026",
    title: "Youth as Infrastructure: Behavioral Mapping in the Digital Age",
    excerpt:
      "How demographic data becomes policy blind spots — and what a real intelligence system looks like.",
  },
];

/**
 * Journal
 * Three-column editorial card grid for essays and research pieces.
 * Cards lift on hover and animate in with staggered delays.
 */
export default function Journal() {
  const [ref, visible] = useIntersection(0.1);

  return (
    <section
      id="journal"
      ref={ref}
      style={{
        background: PALETTE.graphite,
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "64px",
          flexWrap: "wrap",
          gap: "24px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s",
        }}
      >
        <div>
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
            — Journal
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
            Intellectual
            <br />
            <em>Authority.</em>
          </h2>
        </div>
        <a
          href="#journal"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: PALETTE.gold,
            textDecoration: "none",
            borderBottom: `1px solid rgba(201,168,76,0.3)`,
            paddingBottom: "4px",
          }}
        >
          All Essays →
        </a>
      </div>

      {/* Card grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
        className="journal-grid"
      >
        {POSTS.map((post, i) => (
          <div
            key={i}
            style={{
              padding: "40px 32px",
              border: `1px solid rgba(201,168,76,0.1)`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              cursor: "pointer",
              background: "rgba(10,7,5,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
              e.currentTarget.style.background = "rgba(107,15,26,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
              e.currentTarget.style.background = "rgba(10,7,5,0.3)";
            }}
          >
            {/* Tag + date */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "9px",
                  color: PALETTE.gold,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  border: `1px solid rgba(201,168,76,0.3)`,
                  padding: "4px 12px",
                }}
              >
                {post.tag}
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "10px",
                  color: PALETTE.ashGray,
                }}
              >
                {post.date}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                color: PALETTE.ivory,
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: "16px",
              }}
            >
              {post.title}
            </h3>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "16px",
                color: "rgba(250,245,236,0.5)",
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              {post.excerpt}
            </p>

            <div
              style={{
                marginTop: "32px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "10px",
                color: PALETTE.gold,
                letterSpacing: "0.2em",
              }}
            >
              Read Essay →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
