import { useState } from "react";
import PALETTE from "../constants/palette";
import { useIntersection } from "../hooks/useIntersection";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const CONTACT_DETAILS = ["Nairobi, Kenya", "inquiries@576.39.co", "@576point39"];

const INPUT_STYLE = {
  background: "transparent",
  border: "none",
  borderBottom: `1px solid rgba(201,168,76,0.2)`,
  padding: "16px 0",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "17px",
  color: PALETTE.ivory,
  outline: "none",
  width: "100%",
  transition: "border-color 0.3s",
};

export default function Contact() {
  const [ref, visible] = useIntersection(0.1);

  const [form, setForm] = useState({
    name: "", organisation: "", email: "", division: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFocus = (e) => (e.target.style.borderBottomColor = PALETTE.gold);
  const handleBlur  = (e) => (e.target.style.borderBottomColor = "rgba(201,168,76,0.2)");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/inquiries/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        const msg = Object.values(data).flat().join(" ");
        setErrorMsg(msg || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not reach the server. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: PALETTE.obsidian,
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
      }}
      className="contact-grid"
    >
      {/* Left: context */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", color: PALETTE.gold, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "24px" }}>
          — Engage
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(40px, 5vw, 72px)", color: PALETTE.ivory, lineHeight: 1.05, marginBottom: "32px" }}>
          Enter the<br /><em style={{ color: PALETTE.gold }}>Institution.</em>
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(250,245,236,0.55)", lineHeight: 1.7, fontWeight: 300 }}>
          We work with governments, institutions, cultural bodies, and strategic partners. If you are building something that requires systems — not just strategy — we want to hear from you.
        </p>
        <div style={{ marginTop: "56px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {CONTACT_DETAILS.map((detail, i) => (
            <div key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(250,245,236,0.5)", borderBottom: `1px solid rgba(201,168,76,0.1)`, paddingBottom: "16px" }}>
              {detail}
            </div>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(30px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
      }}>
        {status === "success" ? (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "64px", color: PALETTE.gold, marginBottom: "16px" }}>✦</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: PALETTE.ivory, marginBottom: "12px" }}>Received.</div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: PALETTE.ashGray, letterSpacing: "0.2em" }}>We will be in touch.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {["name", "organisation", "email"].map((field, i) => (
              <input
                key={field}
                name={field}
                placeholder={["Your Name", "Organization", "Email Address"][i]}
                value={form[field]}
                onChange={handleChange}
                style={INPUT_STYLE}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            ))}

            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              style={{ ...INPUT_STYLE, color: form.division ? PALETTE.ivory : PALETTE.ashGray, cursor: "pointer", appearance: "none" }}
            >
              <option value="" style={{ background: PALETTE.obsidian }}>Division of Interest</option>
              <option style={{ background: PALETTE.obsidian }}>Strategy Lab</option>
              <option style={{ background: PALETTE.obsidian }}>Cultural Engine</option>
              <option style={{ background: PALETTE.obsidian }}>Research &amp; Intelligence</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us what you're building."
              rows={4}
              value={form.message}
              onChange={handleChange}
              style={{ ...INPUT_STYLE, resize: "none" }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {errorMsg && (
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: "#e07070", letterSpacing: "0.1em" }}>
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              style={{
                background: status === "loading" ? PALETTE.graphite : PALETTE.gold,
                border: "none",
                padding: "18px 48px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: PALETTE.obsidian,
                cursor: status === "loading" ? "not-allowed" : "pointer",
                marginTop: "16px",
                alignSelf: "flex-start",
                transition: "all 0.4s",
              }}
              onMouseEnter={(e) => { if (status !== "loading") { e.target.style.background = PALETTE.champagne; e.target.style.paddingRight = "60px"; }}}
              onMouseLeave={(e) => { if (status !== "loading") { e.target.style.background = PALETTE.gold; e.target.style.paddingRight = "48px"; }}}
            >
              {status === "loading" ? "Sending..." : "Submit Inquiry"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
