import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { libraryTexts, langColors, langLabels } from "../data/library";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim().length === 0
    ? libraryTexts.slice(0, 5)
    : libraryTexts.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.titleEn.toLowerCase().includes(q) ||
          t.author.toLowerCase().includes(q) ||
          t.lang.includes(q) ||
          t.level.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      });

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const go = useCallback((id: string) => {
    close();
    navigate(`/library/${id}`);
  }, [close, navigate]);

  // Global [/] listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept if already typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "/" && !open) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, openSearch]);

  // Arrow key + enter + esc navigation inside overlay
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[activeIndex]) { go(results[activeIndex].id); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, activeIndex, results, close, go]);

  // Reset active index when results change
  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15vh",
        background: "rgba(8,8,10,0.85)",
        backdropFilter: "blur(6px)",
      }}
      onClick={close}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "580px",
          margin: "0 16px",
          background: "#111114",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            gap: "10px",
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#2db54e" }}>/</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, language, level..."
            style={{
              flex: 1,
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#e0e0da",
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "16px 0",
              caretColor: "#2db54e",
            }}
          />
          <kbd
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#3e3e38",
              background: "#1a1a1d",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "2px 6px",
              cursor: "pointer",
            }}
            onClick={close}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: "360px", overflowY: "auto" }}>
          {results.length === 0 ? (
            <div
              style={{
                padding: "32px 20px",
                textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#2e2e32",
                letterSpacing: "0.06em",
              }}
            >
              No texts match "{query}"
            </div>
          ) : (
            results.map((text, i) => {
              const isRtl = text.lang === "arabic" || text.lang === "persian";
              const isActive = i === activeIndex;
              return (
                <div
                  key={text.id}
                  onClick={() => go(text.id)}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 18px",
                    cursor: "pointer",
                    background: isActive ? "rgba(45,181,78,0.06)" : "transparent",
                    borderLeft: isActive ? "2px solid #2db54e" : "2px solid transparent",
                    transition: "background 0.1s ease",
                  }}
                >
                  {/* Lang badge */}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 500,
                      color: langColors[text.lang],
                      border: `1px solid ${langColors[text.lang]}40`,
                      padding: "2px 6px",
                      flexShrink: 0,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {langLabels[text.lang]}
                  </span>

                  {/* Titles */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif",
                          fontSize: isRtl ? "16px" : "13px",
                          color: isActive ? "#e0e0da" : "#9a9a94",
                          direction: isRtl ? "rtl" : "ltr",
                          transition: "color 0.1s ease",
                        }}
                      >
                        {text.title}
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#3e3e38" }}>
                        {text.titleEn}
                      </span>
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32" }}>
                      {text.author}
                    </span>
                  </div>

                  {/* Level + time */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#3e3e38", letterSpacing: "0.06em" }}>
                      {text.level}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#2e2e32" }}>
                      {text.readingTime}
                    </span>
                  </div>

                  {/* Enter hint */}
                  {isActive && (
                    <kbd
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        color: "#2db54e",
                        background: "rgba(45,181,78,0.1)",
                        border: "1px solid rgba(45,181,78,0.25)",
                        padding: "2px 5px",
                        flexShrink: 0,
                      }}
                    >
                      ↵
                    </kbd>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "8px 18px",
            display: "flex",
            gap: "16px",
          }}
        >
          {[
            { key: "↑ ↓", label: "navigate" },
            { key: "↵", label: "open" },
            { key: "Esc", label: "close" },
          ].map(({ key, label }) => (
            <span key={key} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#3e3e38", background: "#1a1a1d", border: "1px solid rgba(255,255,255,0.07)", padding: "1px 5px" }}>
                {key}
              </kbd>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#2e2e32" }}>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
