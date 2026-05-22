import PALETTE from "../constants/palette";

const ITEMS = [
  "Systems Architecture",
  "Cultural Intelligence",
  "Economic Activation",
  "African Continuity",
  "Strategic Futurism",
  "Institutional Frameworks",
];

/**
 * Marquee
 * Continuously scrolling ticker strip between Hero and About.
 * Items are tripled so the loop is seamless.
 */
export default function Marquee() {
  return (
    <div
      style={{
        background: PALETTE.deepCherry,
        padding: "14px 0",
        overflow: "hidden",
        borderTop: `1px solid rgba(201,168,76,0.2)`,
        borderBottom: `1px solid rgba(201,168,76,0.2)`,
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 30s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px",
              color: PALETTE.champagne,
              letterSpacing: "0.15em",
              marginRight: "60px",
              fontStyle: i % 2 === 0 ? "italic" : "normal",
            }}
          >
            {item}{" "}
            <span style={{ color: PALETTE.gold, marginRight: "60px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
