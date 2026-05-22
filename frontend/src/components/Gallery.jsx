import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const IMAGES = [
  { src: "/public/images/Gallery(1).jpeg", rows: 2 },
  { src: "/public/images/Gallery(2).jpeg", rows: 1 },
  { src: "/public/images/Gallery(3).jpeg", rows: 2 },
  { src: "/public/images/Gallery(4).jpeg", rows: 1 },
];


export default function Gallery() {
  const [ref, visible] = useIntersection(0.05);

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: PALETTE.obsidian,
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)",
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
            color: PALETTE.gold,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          — Gallery
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
          The Aesthetic
          <br />
          <em>of Systems.</em>
        </h2>
      </div>

      {/* Masonry grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            style={{
              gridRow: `span ${img.rows}`,
              overflow: "hidden",
              cursor: "pointer",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.97)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              aspectRatio: img.rows === 2 ? "3/4" : "5/3",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("img").style.transform = "scale(1.07)";
              e.currentTarget.querySelector(".gallery-overlay").style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("img").style.transform = "scale(1)";
              e.currentTarget.querySelector(".gallery-overlay").style.opacity = "0";
            }}
          >
            <img
              src={img.src}
              alt="576.39 editorial"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                display: "block",
              }}
            />
            <div
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, transparent 40%, rgba(107,15,26,0.8))`,
                opacity: 0,
                transition: "opacity 0.4s",
                display: "flex",
                alignItems: "flex-end",
                padding: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  color: PALETTE.champagne,
                  fontStyle: "italic",
                }}
              >
                576.39
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
