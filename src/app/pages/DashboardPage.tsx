import React, { useState } from "react";
import { Link } from "react-router";

const recentTexts = [
  { id: "chekhov-student", title: "Студент", titleEn: "The Student", lang: "russian", progress: 75, lastRead: "2 hours ago", linesRead: 3, totalLines: 4 },
  { id: "1001-nights-sinbad", title: "سندباد البحري", titleEn: "Sinbad the Sailor", lang: "arabic", progress: 33, lastRead: "Yesterday", linesRead: 1, totalLines: 3 },
  { id: "hafez-ghazal", title: "غزل حافظ", titleEn: "Ghazal of Hafez", lang: "persian", progress: 0, lastRead: "Never", linesRead: 0, totalLines: 6 },
];

const savedWords = [
  { word: "сафарَ", roman: "sāfara", meaning: "he traveled", lang: "arabic", seenCount: 4 },
  { word: "читал", roman: "chital", meaning: "was reading", lang: "russian", seenCount: 7 },
  { word: "المدينةِ", roman: "al-madīnati", meaning: "the city", lang: "arabic", seenCount: 3 },
  { word: "библиотеке", roman: "biblioteke", meaning: "library", lang: "russian", seenCount: 5 },
  { word: "کوه", roman: "kuh", meaning: "mountain", lang: "persian", seenCount: 2 },
  { word: "تاجرٌ", roman: "tājirun", meaning: "a merchant", lang: "arabic", seenCount: 2 },
];

const stats = [
  { label: "Lines read", value: "47" },
  { label: "Words seen", value: "312" },
  { label: "Texts started", value: "3" },
  { label: "Days active", value: "6" },
];

const langColors: Record<string, string> = {
  russian: "#4a8fd4",
  arabic: "#c8a84b",
  persian: "#c0706a",
};

const langLabels: Record<string, string> = {
  russian: "RU",
  arabic: "AR",
  persian: "FA",
};

type Tab = "reading" | "vocabulary";

export function DashboardPage() {
  const [tab, setTab] = useState<Tab>("reading");

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0d" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "72px 24px 32px",
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
              marginBottom: "16px",
            }}
          >
            [ Dashboard ]
          </span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#e0e0da",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Good evening.
            </h1>
            <Link
              to="/library"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "#060608",
                background: "#2db54e",
                textDecoration: "none",
                padding: "9px 20px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Open Library →
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px 100px" }}>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            marginBottom: "48px",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{ background: "#0a0a0d", padding: "24px 20px" }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 400,
                  color: "#e0e0da",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "#3e3e38",
                  letterSpacing: "0.02em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "32px",
          }}
        >
          {(["reading", "vocabulary"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 20px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: tab === t ? "#e0e0da" : "#3e3e38",
                borderBottom: tab === t ? "1px solid #2db54e" : "1px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.15s ease",
              }}
            >
              {t === "reading" ? "Recent Reading" : "Vocabulary Seen"}
            </button>
          ))}
        </div>

        {/* Reading tab */}
        {tab === "reading" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
            {recentTexts.map((text) => {
              const isRtl = text.lang === "arabic" || text.lang === "persian";
              return (
                <div
                  key={text.id}
                  style={{
                    background: "#0a0a0d",
                    padding: "20px 24px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          color: langColors[text.lang],
                          border: `1px solid ${langColors[text.lang]}40`,
                          padding: "1px 5px",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {langLabels[text.lang]}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Noto Naskh Arabic', serif",
                          fontSize: isRtl ? "16px" : "13px",
                          color: "#9a9a94",
                          direction: isRtl ? "rtl" : "ltr",
                        }}
                      >
                        {text.title}
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#3e3e38" }}>
                        · {text.titleEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Progress bar */}
                      <div style={{ width: "120px", height: "2px", background: "rgba(255,255,255,0.07)", position: "relative" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${text.progress}%`, background: "#2db54e", transition: "width 0.3s ease" }} />
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3e3e38", letterSpacing: "0.06em" }}>
                        {text.linesRead}/{text.totalLines} lines
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32" }}>
                        {text.lastRead}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/library/${text.id}`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: "#2db54e",
                      textDecoration: "none",
                      border: "1px solid rgba(45,181,78,0.25)",
                      padding: "6px 14px",
                      letterSpacing: "0.06em",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(45,181,78,0.08)"; e.currentTarget.style.borderColor = "rgba(45,181,78,0.5)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(45,181,78,0.25)"; }}
                  >
                    {text.progress === 0 ? "Start" : text.progress === 100 ? "Review" : "Continue"} →
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Vocabulary tab */}
        {tab === "vocabulary" && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#3e3e38", margin: "0 0 20px", letterSpacing: "0.01em" }}>
              Words you've hovered at least twice — sorted by frequency.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1px",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {savedWords.sort((a, b) => b.seenCount - a.seenCount).map((w) => {
                const isRtl = w.lang === "arabic" || w.lang === "persian";
                return (
                  <div
                    key={w.word}
                    style={{ background: "#0a0a0d", padding: "16px 18px" }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span
                        style={{
                          fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif",
                          fontSize: isRtl ? "18px" : "15px",
                          color: "#c4c4be",
                          direction: isRtl ? "rtl" : "ltr",
                        }}
                      >
                        {w.word}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          color: "#2e2e32",
                          letterSpacing: "0.06em",
                        }}
                      >
                        ×{w.seenCount}
                      </span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4e4e48", fontStyle: "italic", display: "block", marginBottom: "2px" }}>
                      {w.roman}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#2db54e" }}>
                      {w.meaning}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Settings link */}
        <div
          style={{
            marginTop: "56px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            gap: "24px",
          }}
        >
          {[
            { label: "Account settings", href: "/settings" },
            { label: "Export vocabulary", href: "#" },
            { label: "Sign out", href: "/signin" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#3e3e38",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
