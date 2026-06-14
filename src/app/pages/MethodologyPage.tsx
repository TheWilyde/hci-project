import React from "react";
import { Link } from "react-router";

const principles = [
  {
    index: "I",
    title: "Comprehensible Input at the Edge of Competence",
    body: `Stephen Krashen's Input Hypothesis states that language acquisition happens when learners encounter input slightly above their current level — "i+1". LexiCore operationalizes this through difficulty tagging: every text is scored for lexical density, syntactic depth, and script complexity. You choose texts where 85–95% of the vocabulary is known. The remaining gap is bridged by annotation, not avoidance.`,
    ref: "Krashen, S. (1982). Principles and Practice in Second Language Acquisition.",
  },
  {
    index: "II",
    title: "Grammar Through Exposure, Not Isolation",
    body: `Grammatical rules absorbed through real text are retained differently than rules memorized from a table. LexiCore never presents grammar in isolation — every grammatical annotation is anchored to the exact sentence you are reading. When you see that المدينةِ is in the genitive because it follows إلى, that case relationship is encoded in a real sentence you've read, not a conjugation chart you've seen.`,
    ref: "Nation, I.S.P. (2001). Learning Vocabulary in Another Language.",
  },
  {
    index: "III",
    title: "Keyboard Primacy and Flow State",
    body: `Cognitive load research shows that tool-switching — moving between mouse and keyboard, between the text and a dictionary tab — disrupts the reading state and fragments comprehension. LexiCore is entirely keyboard-navigable. Every feature from annotation to navigation has a key binding. The goal is to keep you in the text, in flow, with minimal interface friction between you and the language.`,
    ref: "Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience.",
  },
  {
    index: "IV",
    title: "Scripts as First-Class Citizens",
    body: `Most language learning tools treat non-Latin scripts as an afterthought — rendering Arabic without full diacritics, using fonts that collapse letterforms, or defaulting to romanization at every opportunity. LexiCore renders Arabic, Persian, and Cyrillic with typographically correct fonts, supports diacritics in Arabic and Persian at the learner's discretion, and treats script literacy as a core competency — not an optional extra.`,
    ref: "Bauer, L. & Nation, P. (1993). Word Families. International Journal of Lexicography.",
  },
  {
    index: "V",
    title: "No Gamification. No Streaks.",
    body: `Gamification — streaks, XP, badges, leaderboards — optimizes for daily retention metrics, not language acquisition. Learners begin to protect their streak rather than challenge themselves with harder texts. LexiCore tracks your reading in service of your understanding: words seen, sentences read, recurring vocabulary. No reward systems. No punishments. Just the text.`,
    ref: "Ryan, R.M. & Deci, E.L. (2000). Self-Determination Theory. Psychological Review.",
  },
];

export function MethodologyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0c0c0f" }}>
      {/* Header */}
      <section
        style={{
          padding: "100px 24px 64px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
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
            [ Methodology ]
          </span>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "#e0e0da",
              letterSpacing: "-0.025em",
              margin: "0 0 20px 0",
            }}
          >
            Five principles behind the platform.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#4e4e48",
              margin: 0,
            }}
          >
            LexiCore is grounded in second language acquisition research. These are not design opinions — they are commitments about how language is learned, and why this platform is built the way it is.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {principles.map((p, i) => (
            <div
              key={p.index}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: "32px",
                paddingBottom: "64px",
                marginBottom: i < principles.length - 1 ? "0" : "0",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                paddingLeft: "0",
                position: "relative",
              }}
            >
              {/* Index */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  paddingTop: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "#2db54e",
                    letterSpacing: "0.08em",
                  }}
                >
                  {p.index}
                </span>
                <div
                  style={{
                    width: "1px",
                    flex: 1,
                    background: i < principles.length - 1 ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ paddingBottom: "0" }}>
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "17px",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#c4c4be",
                    margin: "0 0 20px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: 1.85,
                    color: "#4e4e48",
                    margin: "0 0 20px 0",
                  }}
                >
                  {p.body}
                </p>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: "#2e2e32",
                    letterSpacing: "0.04em",
                    fontStyle: "italic",
                    display: "block",
                  }}
                >
                  {p.ref}
                </span>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div
            style={{
              paddingTop: "48px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
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
                display: "inline-block",
              }}
            >
              Enter the Library →
            </Link>
            <Link
              to="/features"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#4e4e48",
                textDecoration: "none",
              }}
            >
              View all features
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
