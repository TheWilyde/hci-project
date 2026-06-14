import React, { useState } from "react";
import { Link } from "react-router";
import { libraryTexts, langColors, langLabels, type Lang as LangType } from "../data/library";

type LangFilter = "all" | LangType;
type Level = "all" | "A2" | "B1" | "B2" | "C1" | "C2";

const levelOrder = ["A2", "B1", "B2", "C1", "C2"];

export function LibraryPage() {
  const [lang, setLang] = useState<LangFilter>("all");
  const [level, setLevel] = useState<Level>("all");
  const [search, setSearch] = useState("");

  const texts = libraryTexts;
  const filtered = texts.filter((t) => {
    if (lang !== "all" && t.lang !== lang) return false;
    if (level !== "all" && t.level !== level) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !t.title.toLowerCase().includes(q) &&
        !t.titleEn.toLowerCase().includes(q) &&
        !t.author.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0d" }}>
      {/* Header */}
      <div
        style={{
          padding: "72px 24px 0",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="flex items-center justify-between mb-5">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "#2db54e",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              [ Library · {texts.length} texts ]
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3e3e38", background: "#1a1a1d", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "2px solid rgba(255,255,255,0.05)", padding: "2px 7px" }}>/</kbd>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32" }}>global search</span>
            </span>
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "360px", marginBottom: "32px" }}>
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#3e3e38",
              }}
            >
              /
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or author..."
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "#e0e0da",
                background: "#111114",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "9px 14px 9px 28px",
                width: "100%",
                outline: "none",
                caretColor: "#2db54e",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,78,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-6 flex-wrap pb-0">
            {/* Language filter */}
            <div className="flex items-center gap-1">
              {(["all", "arabic", "russian", "persian"] as LangFilter[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 500,
                    padding: "5px 12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    background: lang === l ? "#2db54e" : "transparent",
                    color: lang === l ? "#060608" : "#3e3e38",
                    borderBottom: lang === l ? "none" : "1px solid transparent",
                  }}
                >
                  {l === "all" ? "All" : langLabels[l]}
                </button>
              ))}
            </div>

            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.08)" }} />

            {/* Level filter */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLevel("all")}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  padding: "5px 10px",
                  letterSpacing: "0.06em",
                  border: "none",
                  cursor: "pointer",
                  background: level === "all" ? "#2db54e" : "transparent",
                  color: level === "all" ? "#060608" : "#3e3e38",
                }}
              >
                All
              </button>
              {levelOrder.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv as Level)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    padding: "5px 10px",
                    letterSpacing: "0.06em",
                    border: "none",
                    cursor: "pointer",
                    background: level === lv ? "#2db54e" : "transparent",
                    color: level === lv ? "#060608" : "#3e3e38",
                    transition: "all 0.15s ease",
                  }}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>

          {/* Tab bar underline */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginTop: "0" }} />
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#2e2e32",
                letterSpacing: "0.06em",
              }}
            >
              No texts match your filters.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              {filtered.map((text) => (
                <TextCard key={text.id} text={text} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function TextCard({ text }: { text: typeof texts[0] }) {
  const [hovered, setHovered] = useState(false);
  const isRtl = text.lang === "arabic" || text.lang === "persian";

  return (
    <Link
      to={`/library/${text.id}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: hovered ? "#0e0e11" : "#0a0a0d",
          padding: "28px 28px 24px",
          transition: "background 0.15s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                fontWeight: 500,
                color: langColors[text.lang],
                letterSpacing: "0.1em",
                border: `1px solid ${langColors[text.lang]}40`,
                padding: "2px 6px",
              }}
            >
              {langLabels[text.lang]}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "#3e3e38",
                letterSpacing: "0.08em",
              }}
            >
              {text.level}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              color: "#2e2e32",
              letterSpacing: "0.06em",
            }}
          >
            {text.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif",
            fontSize: isRtl ? "19px" : "16px",
            fontWeight: 500,
            lineHeight: 1.3,
            color: hovered ? "#e0e0da" : "#9a9a94",
            margin: "0 0 4px 0",
            direction: isRtl ? "rtl" : "ltr",
            transition: "color 0.15s ease",
          }}
        >
          {text.title}
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "#3e3e38",
            margin: "0 0 16px 0",
            letterSpacing: "0.01em",
          }}
        >
          {text.titleEn} · {text.author}
        </p>

        {/* Excerpt */}
        <p
          dir={isRtl ? "rtl" : "ltr"}
          style={{
            fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif",
            fontSize: isRtl ? "14px" : "12px",
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#2e2e32",
            margin: "0 0 20px 0",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text.excerpt}
        </p>

        {/* Tags + arrow */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {text.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  color: "#2e2e32",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
                {tag !== text.tags.slice(0, 2).at(-1) ? " ·" : ""}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: hovered ? "#2db54e" : "#2e2e32",
              transition: "color 0.15s ease",
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
