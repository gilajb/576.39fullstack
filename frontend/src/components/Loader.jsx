import { useState, useEffect } from "react";
import PALETTE from "../constants/palette";

/**
 * Loader
 * Full-screen cinematic intro screen with animated progress bar.
 * Calls onDone() when the animation completes.
 */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFade(true);
            setTimeout(onDone, 700);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: PALETTE.obsidian,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transition: "opacity 0.7s ease",
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? "none" : "all",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 5vw, 52px)",
          color: PALETTE.champagne,
          letterSpacing: "0.3em",
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
          letterSpacing: "0.4em",
          marginBottom: "48px",
          textTransform: "uppercase",
        }}
      >
        Systems Architecture
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "200px",
          height: "1px",
          background: PALETTE.graphite,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${Math.min(pct, 100)}%`,
            background: `linear-gradient(90deg, ${PALETTE.gold}, ${PALETTE.champagne})`,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "10px",
          color: PALETTE.ashGray,
          letterSpacing: "0.3em",
          marginTop: "16px",
        }}
      >
        {Math.min(Math.round(pct), 100)}
      </div>
    </div>
  );
}
