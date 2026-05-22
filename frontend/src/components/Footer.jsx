import PALETTE from "../constants/palette";

const FOOTER_LINKS = ["Strategy Lab", "Cultural Engine", "Research", "Journal"];

export default function Footer() {
  return (
    <footer
      style={{
        background: PALETTE.obsidian,
        borderTop: `1px solid rgba(201,168,76,0.12)`,
        padding: "48px clamp(24px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* Wordmark */}
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "24px",
              color: PALETTE.champagne,
              letterSpacing: "0.2em",
              marginBottom: "8px",
            }}
          >
            576.39
          </div>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "10px",
              color: PALETTE.ashGray,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Systems Architecture Institution
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "10px",
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
        </div>

        {/* Copyright */}
      </div> 

      {/* Decorative gold gradient rule */}
      <div
        style={{
          marginTop: "48px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${PALETTE.gold}, transparent)`,
          opacity: 0.3,
        }}
      />
    </footer>
  );
}
