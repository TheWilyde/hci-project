import React, { useState } from "react";

function GrammarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="4" x2="14" y2="12" stroke="#2db54e" strokeWidth="1.2" />
      <line x1="14" y1="12" x2="7" y2="20" stroke="#2db54e" strokeWidth="1.2" />
      <line x1="14" y1="12" x2="21" y2="20" stroke="#2db54e" strokeWidth="1.2" />
      <circle cx="14" cy="4" r="2" stroke="#2db54e" strokeWidth="1.2" />
      <circle cx="7" cy="22" r="2" stroke="#2db54e" strokeWidth="1.2" />
      <circle cx="21" cy="22" r="2" stroke="#2db54e" strokeWidth="1.2" />
    </svg>
  );
}

function ContextIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="22" height="3" rx="0" stroke="#2db54e" strokeWidth="1.2" />
      <rect x="3" y="12" width="16" height="3" rx="0" stroke="#2db54e" strokeWidth="1.2" />
      <rect x="3" y="19" width="19" height="3" rx="0" stroke="#2db54e" strokeWidth="1.2" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="24" height="14" rx="0" stroke="#2db54e" strokeWidth="1.2" />
      <rect x="5" y="10" width="3" height="3" rx="0" stroke="#2db54e" strokeWidth="1" />
      <rect x="10" y="10" width="3" height="3" rx="0" stroke="#2db54e" strokeWidth="1" />
      <rect x="15" y="10" width="3" height="3" rx="0" stroke="#2db54e" strokeWidth="1" />
      <rect x="20" y="10" width="3" height="3" rx="0" stroke="#2db54e" strokeWidth="1" />
      <rect x="8" y="16" width="12" height="3" rx="0" stroke="#2db54e" strokeWidth="1" />
    </svg>
  );
}

const features = [
  {
    icon: <GrammarIcon />,
    index: "01",
    title: "Grammar Deep Dives",
    body: "Every word is annotated with its grammatical role: case, aspect, conjugation, and agreement. Tap any word for a full morphological breakdown tied to the sentence you're reading.",
    detail: "Case · Aspect · Agreement · Morphology",
  },
  {
    icon: <ContextIcon />,
    index: "02",
    title: "Native Context",
    body: "All texts are sourced from native speakers — journalism, literature, informal speech, and formal registers. You build intuition from real language, not curated learner-speak.",
    detail: "Journalism · Literature · Formal · Informal",
  },
  {
    icon: <KeyboardIcon />,
    index: "03",
    title: "Keyboard Driven",
    body: "Every action has a keyboard shortcut. Navigate lines, toggle transliteration, open grammar notes, and advance through texts — all without touching the mouse.",
    detail: "[ J / K ] · [ T ] · [ G ] · [ Space ]",
  },
];

export function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="methodology"
      style={{ padding: "120px 24px", background: "#0a0a0d" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          className="flex items-end justify-between flex-wrap gap-4 mb-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "20px" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#2db54e",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            [ Core Capabilities ]
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#3e3e38",
              letterSpacing: "0.02em",
            }}
          >
            Three principles. One environment.
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.index}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "#0e0e11" : "#0a0a0d",
                padding: "40px 36px",
                transition: "background 0.2s ease",
                cursor: "default",
              }}
            >
              <div className="flex items-start justify-between mb-8">
                <div
                  style={{
                    padding: "10px",
                    background: hovered === i ? "rgba(45,181,78,0.08)" : "transparent",
                    border: "1px solid rgba(45,181,78,0.15)",
                    transition: "background 0.2s ease",
                  }}
                >
                  {f.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: "#2e2e32",
                    letterSpacing: "0.1em",
                  }}
                >
                  {f.index}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: hovered === i ? "#e0e0da" : "#9a9a94",
                  margin: "0 0 14px 0",
                  transition: "color 0.2s ease",
                }}
              >
                {f.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#4e4e48",
                  margin: "0 0 24px 0",
                }}
              >
                {f.body}
              </p>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: "#2db54e",
                  letterSpacing: "0.08em",
                  opacity: hovered === i ? 1 : 0.5,
                  transition: "opacity 0.2s ease",
                }}
              >
                {f.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
