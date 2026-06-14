import React, { useState } from "react";
import { Link } from "react-router";

const featureGroups = [
  {
    id: "reading",
    label: "Reading Engine",
    items: [
      {
        title: "Word-level Annotation",
        desc: "Hover any word to see its dictionary form, romanization, meaning, and full grammatical parse — case, gender, number, verb form, aspect, and more.",
        detail: ["Arabic", "Russian", "Persian"],
        status: "Available",
      },
      {
        title: "Inline Transliteration",
        desc: "Toggle phonetic romanization beneath any script with [T]. LexiCore uses scholarly notation (ALA-LC for Arabic, BGN/PCGN for Russian) alongside a simplified learner mode.",
        detail: ["ALA-LC", "BGN/PCGN", "Learner mode"],
        status: "Available",
      },
      {
        title: "Grammar Overlay",
        desc: "Press [G] on any sentence to expand a full parse tree. See how clauses nest, how agreement works, and why a word takes the form it does — anchored to that exact sentence.",
        detail: ["Parse tree", "Agreement chains", "Clause nesting"],
        status: "Available",
      },
      {
        title: "Diacritics Toggle",
        desc: "Arabic and Persian texts can display with full tashkeel (vowel diacritics) or unvoweled — switchable per text. Build your ability to read unsupported text gradually.",
        detail: ["Full tashkeel", "Partial", "Unvoweled"],
        status: "Available",
      },
    ],
  },
  {
    id: "library",
    label: "Library",
    items: [
      {
        title: "Curated Native Texts",
        desc: "Every text is sourced from real publications — journalism, literary fiction, academic prose, and informal dialogue. Nothing is simplified or rewritten for learners.",
        detail: ["Fiction", "Journalism", "Academic", "Dialogue"],
        status: "Available",
      },
      {
        title: "CEFR-Aligned Difficulty",
        desc: "Texts are tagged A2 through C2 based on lexical density, syntactic complexity, and script difficulty. Filter by level and language to find your productive challenge zone.",
        detail: ["A2 → C2", "Lexical density", "Syntactic complexity"],
        status: "Available",
      },
      {
        title: "Progress Tracking",
        desc: "LexiCore tracks words you've encountered, texts you've completed, and vocabulary you've hovered repeatedly — surfacing patterns without gamification.",
        detail: ["Words seen", "Texts completed", "Recurring vocab"],
        status: "Beta",
      },
      {
        title: "Personal Upload",
        desc: "Paste any Arabic, Russian, or Persian text and read it with the full LexiCore annotation engine. Import EPUBs, plain text, or web URLs.",
        detail: ["Plain text", "EPUB", "URL import"],
        status: "Planned",
      },
    ],
  },
  {
    id: "keyboard",
    label: "Keyboard Interface",
    items: [
      {
        title: "Line Navigation",
        desc: "Move forward and backward through sentences with [J] and [K] — familiar to anyone using Vim or less. No mouse required once you're inside a text.",
        detail: ["[J] next", "[K] prev", "[gg] top", "[G] end"],
        status: "Available",
      },
      {
        title: "Shortcut Palette",
        desc: "Press [?] at any time to open the full shortcut reference. Every feature in LexiCore has a keyboard trigger — the mouse is optional everywhere.",
        detail: ["[?] reference", "[/] search", "[Esc] close"],
        status: "Available",
      },
      {
        title: "Focus Mode",
        desc: "Press [F] to collapse the sidebar and center the text on screen with increased line spacing. Eliminate all UI chrome for distraction-free reading sessions.",
        detail: ["[F] toggle", "Auto-hide UI", "Session timer"],
        status: "Available",
      },
    ],
  },
];

const statusColor: Record<string, string> = {
  Available: "#2db54e",
  Beta: "#c8a84b",
  Planned: "#4e4e48",
};

export function FeaturesPage() {
  const [active, setActive] = useState("reading");

  const group = featureGroups.find((g) => g.id === active)!;

  return (
    <main style={{ minHeight: "100vh", background: "#0c0c0f" }}>
      {/* Page header */}
      <section
        style={{
          padding: "100px 24px 64px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#2db54e",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "24px",
            }}
          >
            [ Features ]
          </span>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#e0e0da",
              letterSpacing: "-0.025em",
              margin: "0 0 20px 0",
            }}
          >
            Everything the text needs.
            <br />
            <span style={{ color: "#64645e" }}>Nothing it doesn't.</span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#4e4e48",
              maxWidth: "500px",
              margin: 0,
            }}
          >
            A focused set of tools built around the act of reading — not vocabulary drilling, not spaced repetition, not progress streaks.
          </p>
        </div>
      </section>

      {/* Tab nav + content */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Tabs */}
          <div
            className="flex"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              marginBottom: "60px",
            }}
          >
            {featureGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "16px 24px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: active === g.id ? "#e0e0da" : "#3e3e38",
                  borderBottom: active === g.id ? "1px solid #2db54e" : "1px solid transparent",
                  marginBottom: "-1px",
                  transition: "color 0.15s ease",
                }}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {group.items.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#0c0c0f",
                  padding: "32px 36px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        lineHeight: 1.3,
                        color: "#c4c4be",
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 500,
                        color: statusColor[item.status],
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        border: `1px solid ${statusColor[item.status]}40`,
                        padding: "2px 7px",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: "#4e4e48",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="flex flex-col gap-1" style={{ minWidth: "120px" }}>
                  {item.detail.map((d) => (
                    <span
                      key={d}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        color: "#3e3e38",
                        letterSpacing: "0.06em",
                        textAlign: "right",
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: "64px",
              paddingTop: "40px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Link
              to="/library"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                fontWeight: 500,
                color: "#060608",
                background: "#2db54e",
                textDecoration: "none",
                padding: "12px 28px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "background 0.15s ease",
                display: "inline-block",
              }}
            >
              Browse Library →
            </Link>
            <Link
              to="/methodology"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#4e4e48",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
            >
              Read the methodology
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
