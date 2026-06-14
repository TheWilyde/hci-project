import React, { useState } from "react";
import { Link } from "react-router";
import { libraryTexts, langColors, langLabels } from "../data/library";

type Section = "account" | "preferences" | "history" | "shortcuts";

const allShortcuts = [
  { category: "Navigation", items: [
    { keys: ["J", "Space"], label: "Advance to next line" },
    { keys: ["K"], label: "Go to previous line" },
    { keys: ["gg"], label: "Jump to first line" },
    { keys: ["G"], label: "Jump to last line" },
  ]},
  { category: "Annotation", items: [
    { keys: ["Hover"], label: "Show vocabulary tooltip" },
    { keys: ["T"], label: "Toggle transliteration" },
    { keys: ["G"], label: "Open grammar note" },
  ]},
  { category: "Interface", items: [
    { keys: ["F"], label: "Toggle focus mode" },
    { keys: ["/"], label: "Open global search" },
    { keys: ["?"], label: "Show shortcut reference" },
    { keys: ["Esc"], label: "Close modals / dialogs" },
  ]},
  { category: "Library", items: [
    { keys: ["/"], label: "Search texts by title, author, level" },
    { keys: ["↑", "↓"], label: "Navigate search results" },
    { keys: ["↵"], label: "Open selected result" },
  ]},
];

const historyData = libraryTexts.map((t, i) => ({
  ...t,
  linesRead: [4, 2, 3, 5, 0, 1, 4, 3][i] ?? 0,
  lastRead: ["2h ago", "Yesterday", "3 days ago", "1 week ago", "Never", "4 days ago", "2 weeks ago", "5 days ago"][i] ?? "Never",
}));

export function SettingsPage() {
  const [section, setSection] = useState<Section>("account");
  const [displayName, setDisplayName] = useState("Reader");
  const [email] = useState("reader@example.com");
  const [diacritics, setDiacritics] = useState(true);
  const [autoTranslit, setAutoTranslit] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [saved, setSaved] = useState(false);

  const savePreferences = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const navItems: { id: Section; label: string }[] = [
    { id: "account", label: "Account" },
    { id: "preferences", label: "Preferences" },
    { id: "history", label: "Reading History" },
    { id: "shortcuts", label: "Shortcuts" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0c0c0f" }}>
      {/* Header */}
      <div style={{ padding: "72px 24px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2db54e", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            [ Settings ]
          </span>

          {/* Section tabs */}
          <div style={{ display: "flex", gap: "0" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "14px 20px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: section === item.id ? "#e0e0da" : "#3e3e38",
                  borderBottom: section === item.id ? "1px solid #2db54e" : "1px solid transparent",
                  marginBottom: "-1px",
                  transition: "color 0.15s ease",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "48px 24px 120px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>

          {/* Account */}
          {section === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <SettingsGroup label="Profile">
                <SettingsField label="Display name">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#e0e0da",
                      background: "#111114",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "9px 12px",
                      width: "100%",
                      outline: "none",
                      caretColor: "#2db54e",
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,78,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </SettingsField>
                <SettingsField label="Email">
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#4e4e48", padding: "9px 0" }}>{email}</div>
                </SettingsField>
              </SettingsGroup>

              <SettingsGroup label="Danger zone">
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#3e3e38", margin: 0, lineHeight: 1.6 }}>
                    Deleting your account removes all reading activity, vocabulary data, and preferences permanently. This cannot be undone.
                  </p>
                  <button
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "#c0392b",
                      background: "transparent",
                      border: "1px solid rgba(192,57,43,0.3)",
                      padding: "9px 16px",
                      cursor: "pointer",
                      letterSpacing: "0.06em",
                      alignSelf: "flex-start",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,57,43,0.08)"; e.currentTarget.style.borderColor = "rgba(192,57,43,0.6)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(192,57,43,0.3)"; }}
                  >
                    Delete Account
                  </button>
                </div>
              </SettingsGroup>
            </div>
          )}

          {/* Preferences */}
          {section === "preferences" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <SettingsGroup label="Script display">
                <SettingsField label="Show diacritics by default" hint="Vowel marks (tashkeel) for Arabic and Persian texts">
                  <Toggle value={diacritics} onChange={setDiacritics} />
                </SettingsField>
                <SettingsField label="Auto-transliterate on open" hint="Show romanization beneath script when entering a text">
                  <Toggle value={autoTranslit} onChange={setAutoTranslit} />
                </SettingsField>
              </SettingsGroup>

              <SettingsGroup label="Reading">
                <SettingsField label="Script font size">
                  <div style={{ display: "flex", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setFontSize(s)}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          padding: "7px 16px",
                          border: "none",
                          cursor: "pointer",
                          background: fontSize === s ? "#2db54e" : "#111114",
                          color: fontSize === s ? "#060608" : "#3e3e38",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </SettingsField>
              </SettingsGroup>

              <button
                onClick={savePreferences}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: saved ? "#060608" : "#e0e0da",
                  background: saved ? "#2db54e" : "transparent",
                  border: `1px solid ${saved ? "#2db54e" : "rgba(255,255,255,0.12)"}`,
                  padding: "10px 24px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  alignSelf: "flex-start",
                  transition: "all 0.2s ease",
                }}
              >
                {saved ? "✓ Saved" : "Save Preferences"}
              </button>
            </div>
          )}

          {/* Reading History */}
          {section === "history" && (
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#3e3e38", margin: "0 0 24px", lineHeight: 1.6 }}>
                All texts you've opened, sorted by last activity. Your progress is saved automatically.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
                {historyData.map((text) => {
                  const isRtl = text.lang === "arabic" || text.lang === "persian";
                  const pct = text.lines ? Math.round((text.linesRead / text.lines) * 100) : 0;
                  return (
                    <div key={text.id} style={{ background: "#0c0c0f", padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: langColors[text.lang], border: `1px solid ${langColors[text.lang]}40`, padding: "1px 5px" }}>{langLabels[text.lang]}</span>
                          <span style={{ fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif", fontSize: isRtl ? "15px" : "13px", color: "#9a9a94", direction: isRtl ? "rtl" : "ltr" }}>{text.title}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32" }}>· {text.titleEn}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "80px", height: "2px", background: "rgba(255,255,255,0.07)", position: "relative" }}>
                            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: pct === 100 ? "#2db54e" : "#3a5c42" }} />
                          </div>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#2e2e32" }}>{pct}%</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32" }}>{text.lastRead}</span>
                        </div>
                      </div>
                      <Link
                        to={`/library/${text.id}`}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2db54e", textDecoration: "none", border: "1px solid rgba(45,181,78,0.2)", padding: "5px 12px", transition: "all 0.15s ease", whiteSpace: "nowrap" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(45,181,78,0.07)"; e.currentTarget.style.borderColor = "rgba(45,181,78,0.4)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(45,181,78,0.2)"; }}
                      >
                        {text.linesRead === 0 ? "Start" : "Continue"} →
                      </Link>
                    </div>
                  );
                })}
              </div>
              <button
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2e2e32", background: "transparent", border: "1px solid rgba(255,255,255,0.05)", padding: "8px 16px", cursor: "pointer", letterSpacing: "0.06em", marginTop: "20px", transition: "color 0.15s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4e4e48")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2e2e32")}
              >
                Export as CSV
              </button>
            </div>
          )}

          {/* Shortcuts */}
          {section === "shortcuts" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {allShortcuts.map((group) => (
                <div key={group.category}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2db54e", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                    {group.category}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
                    {group.items.map((item) => (
                      <div key={item.label} style={{ background: "#0c0c0f", padding: "10px 16px", display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ display: "flex", gap: "4px", minWidth: "80px" }}>
                          {item.keys.map((k) => (
                            <kbd key={k} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#9a9a94", background: "#1a1a1d", border: "1px solid rgba(255,255,255,0.1)", borderBottom: "2px solid rgba(255,255,255,0.06)", padding: "2px 6px", minWidth: "20px", textAlign: "center" }}>{k}</kbd>
                          ))}
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#4e4e48" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function SettingsGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2db54e", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
        {label}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

function SettingsField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "center" }}>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9a9a94", marginBottom: hint ? "3px" : "0" }}>{label}</div>
        {hint && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#2e2e32", lineHeight: 1.4 }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: "36px",
        height: "20px",
        background: value ? "#2db54e" : "#1a1a1d",
        border: `1px solid ${value ? "#2db54e" : "rgba(255,255,255,0.1)"}`,
        cursor: "pointer",
        padding: "0",
        position: "relative",
        flexShrink: 0,
        transition: "all 0.2s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: value ? "18px" : "2px",
          width: "14px",
          height: "14px",
          background: value ? "#060608" : "#3e3e38",
          transition: "left 0.2s ease, background 0.2s ease",
        }}
      />
    </button>
  );
}
