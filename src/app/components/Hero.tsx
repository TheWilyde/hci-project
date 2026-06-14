import React from "react";
import { Link } from "react-router";
import { KbdBadge } from "./KbdBadge";

export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{ minHeight: "100vh", padding: "0 24px" }}
    >
      {/* Version badge */}
      <div
        className="flex items-center gap-2 mb-10"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#2db54e",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "4px 10px",
          border: "1px solid rgba(45,181,78,0.25)",
          background: "rgba(45,181,78,0.06)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#2db54e",
          }}
        />
        v0.9 — Early Access · Arabic · Russian · Persian
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2.6rem, 6vw, 5rem)",
          fontWeight: 300,
          lineHeight: 1.08,
          color: "#e0e0da",
          letterSpacing: "-0.03em",
          maxWidth: "820px",
          margin: "0 0 28px 0",
        }}
      >
        Read deeply.
        <br />
        <span style={{ color: "#2db54e" }}>Understand natively.</span>
      </h1>

      {/* Subheadline */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "17px",
          fontWeight: 400,
          lineHeight: 1.7,
          color: "#64645e",
          maxWidth: "520px",
          margin: "0 0 52px 0",
        }}
      >
        LexiCore is a focused reading environment for Arabic, Russian, and
        Persian. No flashcards. No streaks. No gamification. Just{" "}
        <em style={{ color: "#9a9a94", fontStyle: "italic" }}>text</em>.
      </p>

      {/* CTA row */}
      <div className="flex items-center gap-5 flex-wrap justify-center">
        <Link
          to="/library"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            fontWeight: 500,
            color: "#060608",
            background: "#2db54e",
            textDecoration: "none",
            padding: "13px 32px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "all 0.15s ease",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#35d45c";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#2db54e";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Start Reading
          <kbd
            style={{
              fontSize: "10px",
              fontWeight: 500,
              color: "rgba(6,6,8,0.6)",
              background: "rgba(6,6,8,0.2)",
              border: "none",
              padding: "2px 6px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Enter
          </kbd>
        </Link>

        <Link
          to="/methodology"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#64645e",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.15s ease",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e0e0da")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64645e")}
        >
          <span style={{ color: "#2db54e" }}>→</span> View Methodology
        </Link>
      </div>

      {/* Keyboard hint strip */}
      <div
        className="flex items-center gap-6 flex-wrap justify-center mt-14"
        style={{
          paddingTop: "40px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          width: "100%",
          maxWidth: "560px",
        }}
      >
        <KbdBadge keys={["Space"]} label="continue" />
        <KbdBadge keys={["J"]} label="next line" />
        <KbdBadge keys={["K"]} label="prev line" />
        <KbdBadge keys={["T"]} label="transliterate" />
        <KbdBadge keys={["G"]} label="grammar" />
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          animation: "float-down 2.2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, transparent, rgba(45,181,78,0.5))",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            color: "#3e3e38",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>

      <style>{`
        @keyframes float-down {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
          50% { transform: translateX(-50%) translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
