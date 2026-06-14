import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const STORAGE_KEY = "lexicore_onboarded";

const steps = [
  {
    index: "01",
    title: "Welcome to LexiCore.",
    body: "You're reading native Arabic, Russian, and Persian — not simplified learner texts. Everything here is sourced from real authors, journalists, and classical poets.",
    visual: (
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { lang: "AR", script: "مرحباً بك", color: "#c8a84b" },
          { lang: "RU", script: "Добро пожаловать", color: "#4a8fd4" },
          { lang: "FA", script: "خوش آمدید", color: "#c0706a" },
        ].map((l) => (
          <div
            key={l.lang}
            style={{
              background: "#0e0e11",
              border: `1px solid ${l.color}30`,
              padding: "10px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: "18px", color: "#c4c4be", direction: "rtl" }}>{l.script}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: l.color, letterSpacing: "0.1em" }}>{l.lang}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    index: "02",
    title: "Hover any underlined word.",
    body: "Every annotated word shows its dictionary form, romanization, English meaning, and full grammatical parse — case, aspect, verb form, agreement — anchored to the sentence you're reading.",
    visual: (
      <div
        style={{
          background: "#0e0e11",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 20px",
        }}
      >
        {/* Arabic sentence */}
        <p style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: "20px", color: "#c4c4be", direction: "rtl", margin: "0 0 12px", lineHeight: 1.8 }}>
          <span style={{ borderBottom: "1px solid rgba(45,181,78,0.3)", paddingBottom: "1px" }}>كانَ</span>
          {" في قديمِ الزمانِ "}
          <span style={{ color: "#e0e0da", borderBottom: "1px solid #2db54e", paddingBottom: "1px" }}>تاجرٌ</span>
        </p>

        {/* Static tooltip card — no absolute positioning */}
        <div style={{
          background: "#161619",
          border: "1px solid rgba(45,181,78,0.3)",
          borderLeft: "2px solid #2db54e",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          direction: "ltr",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: "16px", color: "#e0e0da", direction: "rtl" }}>تاجرٌ</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64645e", fontStyle: "italic" }}>tājirun</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#2db54e" }}>a merchant</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#3e3e38", letterSpacing: "0.04em" }}>Noun · nom. · masc. · indef.</span>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32", margin: "10px 0 0", fontStyle: "italic" }}>
          Once upon a time there was a merchant...
        </p>
      </div>
    ),
  },
  {
    index: "03",
    title: "Everything has a keyboard shortcut.",
    body: "LexiCore is designed for keyboard-first reading. You never need the mouse once you're inside a text. Learn these four and you're set.",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          { keys: ["J", "K"], label: "Navigate lines forward and back" },
          { keys: ["Space"], label: "Advance to the next line" },
          { keys: ["T"], label: "Toggle transliteration" },
          { keys: ["G"], label: "Open grammar note for this sentence" },
          { keys: ["/"], label: "Search the library from anywhere" },
          { keys: ["?"], label: "Show all shortcuts" },
        ].map(({ keys, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", gap: "4px", minWidth: "72px" }}>
              {keys.map((k) => (
                <kbd
                  key={k}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "#9a9a94",
                    background: "#1a1a1d",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderBottom: "2px solid rgba(255,255,255,0.07)",
                    padding: "2px 7px",
                    minWidth: "22px",
                    textAlign: "center",
                  }}
                >
                  {k}
                </kbd>
              ))}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#4e4e48" }}>{label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    index: "04",
    title: "Ready to read.",
    body: "Pick a text from the library. Start easy — Al-Fatiha at A2, or Chekhov's The Student at B2. Work up to Tolstoy and Hafez. There are no streaks to break.",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {[
          { level: "A2", title: "سورة الفاتحة", titleEn: "Al-Fatiha", lang: "AR", color: "#c8a84b" },
          { level: "B2", title: "Студент", titleEn: "The Student", lang: "RU", color: "#4a8fd4" },
          { level: "C1", title: "بوف کور", titleEn: "The Blind Owl", lang: "FA", color: "#c0706a" },
          { level: "C2", title: "Анна Каренина", titleEn: "Anna Karenina", lang: "RU", color: "#4a8fd4" },
        ].map((t) => (
          <div
            key={t.titleEn}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              background: "#0e0e11",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: t.color, border: `1px solid ${t.color}40`, padding: "1px 5px", flexShrink: 0 }}>{t.lang}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#2e2e32", flexShrink: 0, minWidth: "24px" }}>{t.level}</span>
            <span style={{ fontFamily: t.lang !== "RU" ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif", fontSize: t.lang !== "RU" ? "15px" : "12px", color: "#9a9a94", direction: t.lang !== "RU" ? "rtl" : "ltr" }}>{t.title}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32", marginLeft: "auto" }}>{t.titleEn}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function OnboardingModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const finish = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    navigate("/library");
  };

  if (!visible) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(8,8,10,0.88)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#111114",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Progress bar */}
        <div style={{ height: "2px", background: "rgba(255,255,255,0.06)" }}>
          <div
            style={{
              height: "100%",
              width: `${((step + 1) / steps.length) * 100}%`,
              background: "#2db54e",
              transition: "width 0.35s ease",
            }}
          />
        </div>

        <div style={{ padding: "32px 36px 28px" }}>
          {/* Step index */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2db54e", letterSpacing: "0.12em" }}>
              {current.index} / {String(steps.length).padStart(2, "0")}
            </span>
            <button
              onClick={dismiss}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2e2e32", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4e4e48")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2e2e32")}
            >
              Skip
            </button>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.25,
              color: "#e0e0da",
              letterSpacing: "-0.015em",
              margin: "0 0 10px",
            }}
          >
            {current.title}
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#4e4e48",
              margin: "0 0 24px",
            }}
          >
            {current.body}
          </p>

          {/* Visual */}
          <div style={{ marginBottom: "28px" }}>{current.visual}</div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: step === 0 ? "#1e1e20" : "#3e3e38",
                background: "transparent",
                border: `1px solid ${step === 0 ? "#1e1e20" : "rgba(255,255,255,0.08)"}`,
                padding: "9px 18px",
                cursor: step === 0 ? "default" : "pointer",
                letterSpacing: "0.06em",
                transition: "all 0.15s ease",
              }}
            >
              ← Back
            </button>

            {/* Step dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  style={{
                    width: i === step ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "0",
                    background: i === step ? "#2db54e" : "rgba(255,255,255,0.12)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={isLast ? finish : () => setStep((s) => s + 1)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "#060608",
                background: "#2db54e",
                border: "none",
                padding: "9px 20px",
                cursor: "pointer",
                letterSpacing: "0.06em",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#35d45c")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2db54e")}
            >
              {isLast ? "Open Library →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
